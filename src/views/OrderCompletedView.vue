<template>
  <DefaultLayout>
    <div class="order-completed">
      <h1>{{ t('orderCompleted.title').toLocaleUpperCase() }}</h1>
      <p>{{ t('orderCompleted.message').toLocaleLowerCase() }}</p>
      <Button @click="goHome">{{ t('orderCompleted.button') }}</Button>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.order-completed {
  text-align: center;
  padding: 50px 20px;
}

p {
  font-size: 18px;
  margin: 20px 0;
}

button {
  background: black;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 20px;
}
</style>
