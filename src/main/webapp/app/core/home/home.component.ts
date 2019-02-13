import Component from 'vue-class-component';
import { Inject, Vue } from 'vue-property-decorator';
import LoginModalService from '@/account/login-modal.service';

@Component
export default class Home extends Vue {
  @Inject('loginModalService')
  private loginModalService: () => LoginModalService;

  public openLogin(): void {
    this.loginModalService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
