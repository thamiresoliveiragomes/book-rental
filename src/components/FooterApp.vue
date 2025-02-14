<template>
  <footer class="footer">
    <div class="footer__language" @click="changeLanguage">
      <i class="pi pi-globe"></i>
      <p>{{ locale === 'en' ? 'EN' : 'PT' }}</p>
    </div>
    <div class="footer__text">
      <p>@ {{ t('footer.text') }}</p>
    </div>
    <div class="footer__social">
      <a href="https://www.linkedin.com/in/thamires-oliveira-/" target="_blank">
        <i class="pi pi-linkedin"></i>
      </a>
      <a href="https://github.com/thamiresoliveiragomes" target="_blank">
        <i class="pi pi-github"></i>
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'FooterApp',
  setup() {
    const { locale, t } = useI18n();

    const changeLanguage = () => {
      locale.value = locale.value === 'en' ? 'pt' : 'en';
      localStorage.setItem('locale', locale.value);
    };

    onMounted(() => {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale) {
        locale.value = savedLocale;
      }
    });

    return {
      locale,
      t,
      changeLanguage,
    };
  },
});
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  border-top: 2px solid;
  padding: 16px;

  &__language {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;

    p {
      border: 1px solid #000;
      padding: 2px;
    }
  }

  &__social {
    display: flex;
    align-items: center;
    gap: 10px;

    a {
      color: #000;

      i {
        font-size: 24px;
      }
    }
  }
}
</style>
