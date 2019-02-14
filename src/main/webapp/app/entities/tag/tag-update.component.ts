import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import VuelidateVuetifyMixin from '@/shared/validation/vuelidate-vuetify.mixin';

import PostService from '../post/post.service';
import { IPost } from '@/shared/model/post.model';

import AlertService from '@/shared/alert/alert.service';
import { ITag, Tag } from '@/shared/model/tag.model';
import TagService from './tag.service';

const validations: any = {
  tag: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(254)
    }
  }
};

@Component({
  validations,
  mixins: [VuelidateVuetifyMixin]
})
export default class TagUpdate extends Vue {
  @Inject('alertService')
  private alertService: () => AlertService;
  @Inject('tagService')
  private tagService: () => TagService;
  public tag: ITag = new Tag();

  @Inject('postService')
  private postService: () => PostService;
  public posts: IPost[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tagId) {
        vm.retrieveTag(to.params.tagId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.tag.id) {
      this.tagService()
        .update(this.tag)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.tag.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.tagService()
        .create(this.tag)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.tag.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveTag(tagId): void {
    this.tagService()
      .find(tagId)
      .then(res => {
        this.tag = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.postService()
      .retrieve()
      .then(res => {
        this.posts = res.data;
      });
  }
}
