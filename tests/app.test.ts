import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createI18n } from 'vue-i18n';
import Toast from 'primevue/toast';

const messages = {
  en: { welcomeMessage: 'Welcome to the app!' },
  pt: { welcomeMessage: 'Bem-vindo ao aplicativo!' },
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: {
        template: '<div>{{ $t("welcomeMessage") }}</div>',
      },
    },
  ],
});

describe('App.vue', () => {
  it('should render the Toast component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, i18n],
      },
    });

    expect(wrapper.findComponent(Toast).exists()).toBe(true);
  });

  it('should render content inside router-view', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, i18n],
      },
    });

    await router.isReady();
    expect(wrapper.text()).toContain(messages.en.welcomeMessage);
  });

  it('should apply scoped styles to #app', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, i18n],
      },
    });

    const appDiv = wrapper.find('#app');
    expect(appDiv.exists()).toBe(true);
  });
});
