import { email, maxLength, minLength, required } from 'vuelidate/lib/validators';
import VuelidateVuetifyMixin from '@/shared/validation/vuelidate-vuetify.mixin';
import axios from 'axios';
import { EMAIL_ALREADY_USED_TYPE } from '@/constants';
import { Vue, Component, Inject } from 'vue-property-decorator';

const validations = {
  settingsAccount: {
    firstName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    lastName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    email: {
      required,
      email,
      minLength: minLength(5),
      maxLength: maxLength(254)
    }
  }
};

@Component({
  validations,
  mixins: [VuelidateVuetifyMixin]
})
export default class Settings extends Vue {
  public success = false;
  public error = false;
  public errorEmailExists = false;
  public languages: any = this.$store.getters.languages || [];

  public save(): void {
    this.error = null;
    this.errorEmailExists = null;
    axios
      .post('api/account', this.settingsAccount)
      .then(() => {
        this.error = null;
        this.success = true;
        this.errorEmailExists = null;
      })
      .catch(error => {
        this.success = null;
        this.error = true;
        if (error.response.status === 400 && error.response.data.type === EMAIL_ALREADY_USED_TYPE) {
          this.errorEmailExists = true;
          this.error = null;
        }
      });
  }

  public get settingsAccount(): any {
    return this.$store.getters.account;
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
