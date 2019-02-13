/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import PostDetailComponent from '@/entities/post/post-details.vue';
import PostClass from '@/entities/post/post-details.component';
import PostService from '@/entities/post/post.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('Component Tests', () => {
  describe('Post Management Detail Component', () => {
    let wrapper: Wrapper<PostClass>;
    let comp: PostClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<PostClass>(PostDetailComponent, { store, i18n, localVue, provide: { postService: () => new PostService() } });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: '123' } }));

        // WHEN
        comp.retrievePost('123');
        await comp.$nextTick();

        // THEN
        expect(comp.post).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
