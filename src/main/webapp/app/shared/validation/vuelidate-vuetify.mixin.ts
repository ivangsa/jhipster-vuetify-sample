import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import Component from 'vue-class-component';

@Component({
  mixins: [validationMixin]
})
export default class VuelidateVuetifyMixin extends Vue {
  validationMessages(fieldName: string, messageKeyTemplate: string = 'entity.validation.{constraintTypeToLower}') {
    const field = this.nestedField(this.$v, fieldName);
    const errors = [];
    if (!field.$dirty) {
      return errors;
    }
    for (const key in field.$params) {
      const constraintType = field.$params[key].type;
      if (!field[constraintType]) {
        errors.push(this.$t(this.processMessageKeyTemlate(messageKeyTemplate, fieldName, constraintType), field.$params[constraintType]));
      }
    }
    return errors;
  }

  private processMessageKeyTemlate(messageKeyTemplate: string, fieldName: string, constraintType) {
    return messageKeyTemplate
      .replace(/{constraintType}/, constraintType)
      .replace(/{constraintTypeToLower}/, constraintType.toLowerCase())
      .replace(/{fieldName}/, fieldName);
  }

  private nestedField(field: any, path: string) {
    let paths: string[] = path.split('.');
    let property = paths.shift();
    let nesteField = field[property];
    if (paths.length == 0) {
      return nesteField;
    } else {
      return this.nestedField(nesteField, paths.join('.'));
    }
  }
}
