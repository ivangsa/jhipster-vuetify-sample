import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IPost } from '@/shared/model/post.model';
import AlertService from '@/shared/alert/alert.service';

import PostService from './post.service';

@Component
export default class Post extends Vue {
  @Inject('alertService')
  private alertService: () => AlertService;
  @Inject('postService')
  private postService: () => PostService;
  private removeId: string = null;
  public itemsPerPage = 10;
  public queryCount: number = null;
  public page = 1;
  public previousPage: number = null;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;
  public posts: IPost[] = [];

  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllPosts();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllPosts();
  }

  public retrieveAllPosts(): void {
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    this.postService()
      .retrieve(paginationQuery)
      .then(res => {
        this.posts = res.data;
        this.totalItems = Number(res.headers['x-total-count']);
        this.queryCount = this.totalItems;
      });
  }

  public get pagination(): any {
    const pagination = {
      descending: this.reverse,
      page: this.page,
      rowsPerPage: this.itemsPerPage,
      sortBy: this.propOrder,
      totalItems: this.totalItems
    };
    console.log('get pagination', pagination);
    return pagination;
  }

  public set pagination(pagination: any) {
    console.log('set pagination', pagination);
    if (this.itemsPerPage !== pagination.rowsPerPage) {
      this.previousPage = null;
    }
    this.propOrder = pagination.sortBy;
    this.reverse = pagination.descending;
    this.itemsPerPage = pagination.rowsPerPage;
    this.page = pagination.page;
    this.loadPage(pagination.page);
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removePost(): void {
    this.postService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.post.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllPosts();
        this.closeDialog();
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllPosts();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
  }

  public closeDialog(): void {
    this.removeId = null;
  }
}
