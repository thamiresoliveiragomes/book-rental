<template>
  <div class="searchbar__container">
    <span class="p-input-icon-right">
      <i class="pi pi-search" @click="searchBooks"></i>
      <InputText
        v-model="searchQuery"
        :placeholder="$t('search.placeholder')"
        class="p-inputtext-lg searchbar__input"
        @keyup.enter="searchBooks"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';

export default defineComponent({
  name: 'SearchBar',
  components: {
    InputText,
  },
  setup() {
    const searchQuery = ref('');
    const router = useRouter();

    const searchBooks = () => {
      if (!searchQuery.value.trim()) return;
      router.push({ path: '/search', query: { q: searchQuery.value } });
    };

    return {
      searchQuery,
      searchBooks,
    };
  },
});
</script>

<style lang="scss" scoped>
.searchbar {
  &__container {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
    span {
      width: 50%;
    }
  }

  &__input {
    width: 100%;
    border-radius: 30px;
    background-color: white;
    border: 1px solid #000;
    color: #000;
    padding: 8px 16px;

    &:focus,
    &:hover {
      border-color: #000 !important;
      box-shadow: none;
      outline: none !important;
    }
  }
}

.p-input-icon-right {
  position: relative;
  .pi {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #000;
  }
}
</style>
