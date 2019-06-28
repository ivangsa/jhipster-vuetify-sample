import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import VuelidateVuetifyMixin from '@/shared/validation/vuelidate-vuetify.mixin';
import axios from 'axios';
import { mapGetters } from 'vuex';
import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';

const validations = {
  resetPassword: {
    currentPassword: {
      required
    },
    newPassword: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(254)
    },
    confirmPassword: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(254)
    }
  }
};

@Component({
  validations,
  mixins: [VuelidateVuetifyMixin],
  computed: {
    ...mapGetters(['account'])
  }
})
export default class ChangePassword extends Vue {
  success = false;
  error = false;
  doNotMatch = false;
  resetPassword: any = {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  };

  public changePassword(): void {
    if (this.resetPassword.newPassword !== this.resetPassword.confirmPassword) {
      this.error = false;
      this.success = false;
      this.doNotMatch = true;
    } else {
      this.doNotMatch = null;
      axios
        .post('api/account/change-password', {
          currentPassword: this.resetPassword.currentPassword,
          newPassword: this.resetPassword.newPassword
        })
        .then(() => {
          this.success = true;
          this.error = null;
        })
        .catch(() => {
          this.success = null;
          this.error = true;
        });
    }
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }
}
