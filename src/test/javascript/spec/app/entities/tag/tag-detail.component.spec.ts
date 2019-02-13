/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import TagDetailComponent from '@/entities/tag/tag-details.vue';
import TagClass from '@/entities/tag/tag-details.component';
import TagService from '@/entities/tag/tag.service';

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
  describe('Tag Management Detail Component', () => {
    let wrapper: Wrapper<TagClass>;
    let comp: TagClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<TagClass>(TagDetailComponent, { store, i18n, localVue, provide: { tagService: () => new TagService() } });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: '123' } }));

        // WHEN
        comp.retrieveTag('123');
        await comp.$nextTick();

        // THEN
        expect(comp.tag).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
