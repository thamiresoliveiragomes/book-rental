<template>
  <div class="order-history">
    <h1>{{ $t('orderHistory.title').toLocaleUpperCase() }}</h1>
    <div v-if="orders.length">
      <div
        v-for="(order, index) in orders"
        :key="index"
        class="order-history__order"
      >
        <div class="order-history__order-details">
          <h2>
            {{ $t('orderHistory.order').toLocaleLowerCase() }} {{ index + 1 }}
          </h2>
          <p>
            {{ $t('orderHistory.email').toLocaleLowerCase() }}:
            {{ order.email }}
          </p>
          <p>
            {{ $t('orderHistory.total').toLocaleLowerCase() }}: R$
            {{ order.total.toFixed(2) }}
          </p>
          <p>
            {{ $t('orderHistory.date').toLocaleLowerCase() }}:
            {{ new Date(order.date).toLocaleString() }}
          </p>
        </div>
        <ul>
          <li v-for="(item, idx) in order.items" :key="idx">
            <div class="order-history__order-book-details">
              <img :src="item.book.coverImage" :alt="$t('bookInfo.coverAlt')" />
              <div class="order-history__order-book-details--text">
                <h3>{{ item.book.title }}</h3>
                <p>{{ item.book.author }}</p>
                <div>
                  {{ $t('orderHistory.rentalDays').toLocaleLowerCase() }}:
                  {{ item.rentalDays }}
                </div>
                <div class="time-left">
                  {{ $t('orderHistory.daysLeft').toLocaleLowerCase() }}:
                  {{ timeLeft[`${index}-${idx}`].days }}
                  {{ $t('orderHistory.days').toLocaleLowerCase() }},
                  {{ timeLeft[`${index}-${idx}`].hours }}
                  {{ $t('orderHistory.hours').toLocaleLowerCase() }},
                  {{ timeLeft[`${index}-${idx}`].minutes }}
                  {{ $t('orderHistory.minutes').toLocaleLowerCase() }} e
                  {{ timeLeft[`${index}-${idx}`].seconds }}
                  {{ $t('orderHistory.seconds').toLocaleLowerCase() }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>{{ $t('orderHistory.noOrders').toLocaleLowerCase() }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    interface Order {
      email: string;
      total: number;
      date: string;
      items: {
        book: { title: string; author: string; coverImage: string };
        rentalDays: number;
      }[];
    }

    const orders = ref<Order[]>([]);
    const timeLeft = ref<{
      [key: string]: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
      };
    }>({});

    const calculateDaysLeft = (startDate: string, rentalDays: number) => {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + rentalDays);
      const today = new Date();
      const diffTime = end.getTime() - today.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffMinutes = Math.floor(
        (diffTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);
      return {
        days: diffDays > 0 ? diffDays : 0,
        hours: diffHours > 0 ? diffHours : 0,
        minutes: diffMinutes > 0 ? diffMinutes : 0,
        seconds: diffSeconds > 0 ? diffSeconds : 0,
      };
    };

    const updateTimesLeft = () => {
      orders.value.forEach((order, orderIndex) => {
        order.items.forEach((item, itemIndex) => {
          const key = `${orderIndex}-${itemIndex}`;
          timeLeft.value[key] = calculateDaysLeft(order.date, item.rentalDays);
        });
      });
    };

    onMounted(() => {
      orders.value = JSON.parse(localStorage.getItem('orders') || '[]');
      updateTimesLeft();
      setInterval(updateTimesLeft, 1000);
    });

    return {
      orders,
      timeLeft,
    };
  },
});
</script>

<style scoped lang="scss">
.order-history {
  h1 {
    padding: 30px;
  }
  &__order {
    border-top: 2px solid;

    &-details {
      text-align: right;
      padding: 24px;
    }

    &-book-details {
      border-top: 2px solid;
      display: flex;
      padding: 24px;

      &--text {
        text-align: left;
        margin-left: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .time-left {
      font-weight: 500;
    }

    img {
      max-width: 64px;
    }

    ul {
      list-style-type: none;
    }
  }
}
</style>
