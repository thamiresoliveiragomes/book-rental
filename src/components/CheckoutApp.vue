<template>
  <div class="checkout">
    <h1 class="checkout__title">
      {{ $t('checkout.title').toLocaleUpperCase() }}
    </h1>
    <div class="checkout__main">
      <div class="checkout__main-image">
        <img src="../assets/image_3.png" alt="Checkout" />
      </div>
      <div class="checkout__form">
        <div class="checkout__form-title">
          <h2>{{ $t('checkout.formTitle') }}</h2>
        </div>
        <div class="checkout__form-items">
          <div class="checkout__form-item">
            <FloatLabel>
              <label for="email">{{ $t('checkout.email') }}</label>
              <InputText
                id="email"
                v-model="email"
                class="checkout__form-item-input"
                type="email"
                :invalid="emailTouched && !validateEmail(email)"
                @input="emailTouched = true"
              />
            </FloatLabel>
          </div>
          <div class="checkout__form-item">
            <FloatLabel>
              <label for="cardNumber">{{ $t('checkout.cardNumber') }}</label>
              <InputText
                id="cardNumber"
                v-model="cardNumber"
                class="checkout__form-item-input"
                type="number"
              />
            </FloatLabel>
          </div>
          <div class="checkout__form-item">
            <FloatLabel>
              <label for="cardCode">{{ $t('checkout.cardCode') }}</label>
              <InputText
                id="cardCode"
                v-model="cardCode"
                class="checkout__form-item-input"
                type="number"
                maxlength="3"
              />
            </FloatLabel>
          </div>
          <div class="checkout__form-item">
            <FloatLabel>
              <label for="cardExpirationDate">{{
                $t('checkout.cardExpirationDate')
              }}</label>
              <InputText
                id="cardExpirationDate"
                v-model="cardExpirationDate"
                class="checkout__form-item-input"
                type="text"
              />
            </FloatLabel>
          </div>
        </div>
      </div>
    </div>
    <div class="checkout__footer">
      <p>{{ $t('cart.total') }}: R$ {{ totalCartPrice.toFixed(2) }}</p>
      <div class="checkout__footer-buttons">
        <Button
          :label="$t('checkout.cancel')"
          class="p-button-secondary"
          @click="goToCart"
        />
        <Button
          :label="$t('checkout.completePurchase')"
          class="p-button-primary"
          :disabled="!isFormValid"
          @click="completePurchase"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useCartStore } from '../stores/cartStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Button, InputText, FloatLabel } from 'primevue';

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    InputText,
    FloatLabel,
  },
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();
    const { totalCartPrice } = storeToRefs(cartStore);
    const email = ref('');
    const cardNumber = ref(null);
    const cardCode = ref(null);
    const cardExpirationDate = ref('');
    const emailTouched = ref(false);

    const goToCart = () => {
      router.push('/cart');
    };

    const completePurchase = () => {
      cartStore.clearCart();
      router.push('/order-completed');
    };

    const validateEmail = (email: string): boolean => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    const isFormValid = computed(() => {
      return (
        validateEmail(email.value) &&
        cardNumber.value &&
        cardCode.value &&
        cardExpirationDate.value
      );
    });

    return {
      email,
      cardNumber,
      cardCode,
      cardExpirationDate,
      emailTouched,
      totalCartPrice,
      goToCart,
      completePurchase,
      validateEmail,
      isFormValid,
    };
  },
};
</script>

<style scoped lang="scss">
.checkout {
  &__title {
    padding: 30px;
    border-bottom: 2px solid;
  }

  &__main {
    display: flex;
    align-items: center;

    &-image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 85%;
      height: auto;

      img {
        max-width: 100%;
        width: 100%;
        height: auto;
      }
    }
  }

  &__form {
    margin: 24px 0;
    width: 100%;

    &-title {
      font-size: 24px;
      h2 {
        font-weight: 500;
      }
    }

    &-item {
      display: flex;
      padding: 16px;
      justify-content: center;
      font-size: 16px;

      &-input {
        font-size: 28px;
        border-radius: 40px;
        padding-left: 30px;
        border: 1px solid #000;
        outline: #000;

        &:focus {
          margin-top: 4px;
          border: 1px solid #000 !important;
          outline: #000 !important;
        }
      }

      .p-floatlabel label {
        padding-left: 20px;
      }

      .p-floatlabel:has(input:focus) label {
        color: #000;
      }

      .p-floatlabel:has(input:-webkit-autofill) label,
      .p-floatlabel:has(input.p-filled) label {
        color: #000;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-top: 2px solid;

    p {
      font-size: 36px;
      font-weight: 700;
    }

    &-buttons {
      display: flex;
      gap: 10px;

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
  }

  @media screen and (max-width: 768px) {
    &__form {
      &-item span {
        width: 100%;

        input {
          width: 100%;
        }
      }
    }

    &__main {
      &-image {
        display: none;
      }
    }

    &__footer {
      gap: 12px;
      flex-direction: column;

      &-buttons {
        flex-direction: column;
        gap: 12px;
      }
    }
  }
}
</style>
