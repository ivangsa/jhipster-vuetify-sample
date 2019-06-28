import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import { required, minLength, maxLength, helpers, email } from 'vuelidate/lib/validators';
import LoginService from '@/account/login.service';
import VuelidateVuetifyMixin from '@/shared/validation/vuelidate-vuetify.mixin';
import RegisterService from '@/account/register/register.service';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '@/constants';

const loginPattern = helpers.regex('alpha', /^[_.@A-Za-z0-9-]*$/);
const validations: any = {
  registerAccount: {
    login: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50),
      pattern: loginPattern
    },
    email: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(254),
      email
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(254)
    }
  },
  confirmPassword: {
    required,
    minLength: minLength(4),
    maxLength: maxLength(254)
  }
};
@Component({
  validations,
  mixins: [VuelidateVuetifyMixin]
})
export default class Register extends Vue {
  @Inject('registerService') private registerService: () => RegisterService;
  @Inject('loginService') private loginService: () => LoginService;
  public registerAccount: any = {
    login: undefined,
    email: undefined,
    password: undefined
  };
  public confirmPassword: any = null;
  public doNotMatch = false;
  public error = false;
  public errorEmailExists = false;
  public errorUserExists = false;
  public success = false;

  public register(): void {
    if (this.registerAccount.password !== this.confirmPassword) {
      this.doNotMatch = true;
    } else {
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      this.registerAccount.langKey = this.$store.getters.currentLanguage;
      this.registerService()
        .processRegistration(this.registerAccount)
        .then(() => {
          this.success = true;
        })
        .catch(error => {
          this.success = null;
          if (error.response.status === 400 && error.response.data.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = true;
          } else if (error.response.status === 400 && error.response.data.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = true;
          } else {
            this.error = true;
          }
        });
    }
  }

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }
}
