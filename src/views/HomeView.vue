<template>
  <div class="home">
    <header class="header">
      <h1>{{ t('welcome') }}</h1>
      <p>{{ t('home_description') }}</p>
    </header>

    <section class="features">
      <div class="feature">
        <h2>📚 {{ t('wide_collection') }}</h2>
        <p>{{ t('wide_collection_desc') }}</p>
      </div>
      <div class="feature">
        <h2>⏳ {{ t('easy_rental') }}</h2>
        <p>{{ t('easy_rental_desc') }}</p>
      </div>
      <div class="feature">
        <h2>🌍 {{ t('global_access') }}</h2>
        <p>{{ t('global_access_desc') }}</p>
      </div>
    </section>

    <footer class="footer">
      <p>{{ t('footer_text') }}</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type LocaleMessages = {
  welcome: string;
  home_description: string;
  browse_books: string;
  wide_collection: string;
  wide_collection_desc: string;
  easy_rental: string;
  easy_rental_desc: string;
  global_access: string;
  global_access_desc: string;
  footer_text: string;
};

const i18n = useI18n<LocaleMessages>();
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.btn {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.footer {
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #666;
}
</style>
