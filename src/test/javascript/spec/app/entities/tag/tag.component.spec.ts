/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import TagComponent from '@/entities/tag/tag.vue';
import TagClass from '@/entities/tag/tag.component';
import TagService from '@/entities/tag/tag.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn(),
  delete: jest.fn()
}));

describe('Component Tests', () => {
  describe('Tag Management Component', () => {
    let wrapper: Wrapper<TagClass>;
    let comp: TagClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<TagClass>(TagComponent, {
        store,
        i18n,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: true },
        provide: {
          alertService: () => new AlertService(store),
          tagService: () => new TagService()
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      mockedAxios.get.mockReturnValue(Promise.resolve({ data: [{ id: '123' }] }));

      // WHEN
      comp.retrieveAllTags();
      await comp.$nextTick();

      // THEN
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(comp.tags[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should load a page', async () => {
      // GIVEN
      mockedAxios.get.mockReturnValue(Promise.resolve({ data: [{ id: '123' }] }));

      // WHEN
      comp.loadPage(1);
      await comp.$nextTick();

      // THEN
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(comp.tags[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      mockedAxios.get.mockReset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(mockedAxios.get).toHaveBeenCalledTimes(0);
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({ data: [{ id: '123' }] }));

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
      expect(comp.page).toEqual(1);
      expect(comp.tags[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });

    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      mockedAxios.delete.mockReturnValue(Promise.resolve({}));
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      // WHEN
      comp.prepareRemove({ id: 'test' });
      comp.removeTag();
      await comp.$nextTick();

      // THEN
      expect(mockedAxios.delete).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });
});
