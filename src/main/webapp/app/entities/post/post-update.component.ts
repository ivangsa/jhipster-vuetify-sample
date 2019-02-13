import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import TagService from '../tag/tag.service';
import { ITag } from '@/shared/model/tag.model';

import AlertService from '@/shared/alert/alert.service';
import { IPost, Post } from '@/shared/model/post.model';
import PostService from './post.service';

const validations: any = {
  post: {
    name: {
      required
    }
  }
};

@Component({
  validations
})
export default class PostUpdate extends Vue {
  @Inject('alertService')
  private alertService: () => AlertService;
  @Inject('postService')
  private postService: () => PostService;
  public post: IPost = new Post();

  @Inject('tagService')
  private tagService: () => TagService;
  public tags: ITag[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.postId) {
        vm.retrievePost(to.params.postId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.post.id) {
      this.postService()
        .update(this.post)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.post.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.postService()
        .create(this.post)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.post.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePost(postId): void {
    this.postService()
      .find(postId)
      .then(res => {
        this.post = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.tagService()
      .retrieve()
      .then(res => {
        this.tags = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
