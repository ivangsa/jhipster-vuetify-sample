import { Component, Vue, Inject } from 'vue-property-decorator';

import { IPost } from '@/shared/model/post.model';
import PostService from './post.service';

@Component
export default class PostDetails extends Vue {
  @Inject('postService')
  private postService: () => PostService;
  public post: IPost = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.postId) {
        vm.retrievePost(to.params.postId);
      }
    });
  }

  public retrievePost(postId) {
    this.postService()
      .find(postId)
      .then(res => {
        this.post = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
