import axios from 'axios';
import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import AccountService from '@/account/account.service';
import { email, maxLength, minLength, required } from 'vuelidate/lib/validators';
import VuelidateVuetifyMixin from '@/shared/validation/vuelidate-vuetify.mixin';

const validations: any = {
  login: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(254)
  },
  password: { required }
};

@Component({
  watch: {
    $route() {
      this.$root.$emit('bv::hide::modal', 'login-page');
    }
  },
  validations,
  mixins: [VuelidateVuetifyMixin]
})
export default class LoginForm extends Vue {
  public authenticationError = null;
  public login = null;
  public password = null;
  public rememberMe: boolean = null;
  public showPassword: boolean = false;
  public showLoginForm: boolean = false;

  @Inject('accountService')
  private accountService: () => AccountService;

  created() {
    this.$root.$on('bv::hide::modal', data => (this.showLoginForm = data === 'login-page' && false));
    this.$root.$on('bv::show::modal', data => (this.showLoginForm = data === 'login-page' && true));
  }

  public doLogin(): void {
    const data = { username: this.login, password: this.password, rememberMe: this.rememberMe };
    axios
      .post('api/authenticate', data)
      .then(result => {
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (this.rememberMe) {
            localStorage.setItem('jhi-authenticationToken', jwt);
          } else {
            sessionStorage.setItem('jhi-authenticationToken', jwt);
          }
        }
        this.authenticationError = false;
        this.$root.$emit('bv::hide::modal', 'login-page');
        this.accountService().retrieveAccount();
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  public close(): void {
    this.showLoginForm = false;
  }
}
