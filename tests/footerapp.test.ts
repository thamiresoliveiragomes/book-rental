import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FooterApp from '../src/components/FooterApp.vue';
import { createI18n } from 'vue-i18n';

describe('FooterApp.vue', () => {
  let i18n;

  beforeEach(() => {
    i18n = createI18n({
      locale: 'en',
      messages: {
        en: { footer: { text: 'All rights reserved' } },
        pt: { footer: { text: 'Todos os direitos reservados' } },
      },
    });
  });

  it('renders footer text correctly', () => {
    const wrapper = mount(FooterApp, {
      global: { plugins: [i18n] },
    });
    expect(wrapper.find('.footer__text p').text()).toContain(
      'All rights reserved'
    );
  });

  it('changes language when clicked', async () => {
    const wrapper = mount(FooterApp, {
      global: { plugins: [i18n] },
    });

    await wrapper.find('.footer__language').trigger('click');
    expect(wrapper.find('.footer__language p').text()).toBe('PT');
  });

  it('has social media links', () => {
    const wrapper = mount(FooterApp, {
      global: { plugins: [i18n] },
    });

    expect(
      wrapper
        .find('a[href="https://www.linkedin.com/in/thamires-oliveira-/"]')
        .exists()
    ).toBe(true);
    expect(
      wrapper
        .find('a[href="https://github.com/thamiresoliveiragomes"]')
        .exists()
    ).toBe(true);
  });
});
