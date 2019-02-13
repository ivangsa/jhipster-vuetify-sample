import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import Component from 'vue-class-component';

@Component({
  mixins: [validationMixin]
})
export default class VuelidateVuetifyMixin extends Vue {
  validationMessages(fieldName: string) {
    const field = this._nestedField(this.$v, fieldName);
    const errors = [];
    if (!field.$dirty) {
      return errors;
    }
    for (const key in field.$params) {
      const constraintType = field.$params[key].type;
      if (!field[constraintType]) {
        errors.push(this.$t('entity.validation.' + constraintType.toLowerCase(), field.$params[constraintType]));
      }
    }
    return errors;
  }

  _nestedField(field: any, path: string) {
    let paths: string[] = path.split('.');
    let property = paths.shift();
    let nesteField = field[property];
    if (paths.length == 0) {
      return nesteField;
    } else {
      return this._nestedField(nesteField, paths.join('.'));
    }
  }
}
