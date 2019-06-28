import { Component, Vue } from 'vue-property-decorator';
import { VERSION } from '@/constants';

@Component
export default class JhiFooter extends Vue {
  public version = VERSION ? 'v' + VERSION : '';
}
