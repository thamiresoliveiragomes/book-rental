<template>
  <div class="order-completed">
    <h1>{{ t('orderCompleted.title').toLocaleUpperCase() }}</h1>
    <p>{{ t('orderCompleted.message').toLocaleLowerCase() }}</p>
    <div class="order-completed-buttons">
      <Button
        :label="$t('orderCompleted.home')"
        class="p-button-secondary"
        @click="goToHome"
      />
      <Button
        :label="$t('orderCompleted.orders')"
        class="p-button-primary"
        @click="goToOrders"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const goToHome = () => {
  router.push('/');
};

const goToOrders = () => {
  router.push('/order-history');
};
</script>

<style scoped lang="scss">
.order-completed {
  text-align: center;
  padding: 50px 20px;

  &-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;

    .p-button {
      font-size: 24px;
      padding: 8px 32px;
    }

    .p-button-secondary {
      background: #fff;
      border: 1px solid #000;
      border-radius: 20px;
      color: #000;
      &:hover {
        background: #fff;
        color: #000;
        border: 1px solid #000;
      }
    }

    .p-button-primary {
      background: #000;
      border: 1px solid #000;
      border-radius: 20px;
      color: #fff;
      &:hover {
        background: #000;
        color: #fff;
        border: 1px solid #000;
      }
    }
  }
  p {
    font-size: 18px;
    margin: 20px 0;
  }

  @media screen and (max-width: 768px) {
    &-buttons {
      flex-direction: column;
    }
  }
}
</style>
