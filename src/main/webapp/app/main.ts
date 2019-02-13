// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import router from './router';
import * as config from './shared/config/config';
import * as bootstrapVueConfig from './shared/config/config-bootstrap-vue';
import * as vuetifyConfig from './shared/config/config-vuetify';
import JhiItemCountComponent from './shared/jhi-item-count.vue';
import AuditsService from './admin/audits/audits.service';
import HealthService from './admin/health/health.service';
import MetricsService from './admin/metrics/metrics.service';
import LogsService from './admin/logs/logs.service';
import ActivateService from './account/activate/activate.service';
import LoginModalService from './account/login-modal.service';
import RegisterService from './account/register/register.service';
import UserManagementService from '@/admin/user-management/user-management.service';

import AccountService from './account/account.service';

import '../content/scss/vendor.scss';
import AlertService from '@/shared/alert/alert.service';
import TranslationService from '@/locale/translation.service';
import ConfigurationService from '@/admin/configuration/configuration.service';

import PostService from '@/entities/post/post.service';
import TagService from '@/entities/tag/tag.service';
// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

Vue.config.productionTip = false;

const i18n = config.initI18N(Vue);
const store = config.initVueXStore(Vue);

const alertService = new AlertService(store);
const translationService = new TranslationService(store, i18n);
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
vuetifyConfig.initVuetify(Vue);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);

const activateService = new ActivateService();
const loginModalService = new LoginModalService();
const registerService = new RegisterService();
const userManagementService = new UserManagementService();

const auditsService = new AuditsService();
const healthService = new HealthService();
const metricsService = new MetricsService();
const configurationService = new ConfigurationService();
const logsService = new LogsService();

const accountService = new AccountService(store, translationService, router);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/not-found');
  }

  if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    if (!accountService.hasAnyAuthority(to.meta.authorities)) {
      sessionStorage.setItem('requested-url', to.fullPath);
      next('/forbidden');
    } else {
      next();
    }
  } else {
    // no authorities, so just proceed
    next();
  }
});

const postService = new PostService();
const tagService = new TagService();
// jhipster-needle-add-entity-service-to-main-declaration - JHipster will declare entities services here

/* tslint:disable */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  provide: {
    activateService: () => activateService,
    loginModalService: () => loginModalService,
    registerService: () => registerService,
    userService: () => userManagementService,

    auditsService: () => auditsService,
    healthService: () => healthService,

    configurationService: () => configurationService,
    logsService: () => logsService,
    metricsService: () => metricsService,
    alertService: () => alertService,
    translationService: () => translationService,
    accountService: () => accountService,

    postService: () => postService,
    tagService: () => tagService
    // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
  },
  i18n,
  store
});
