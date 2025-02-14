<template>
  <Menubar :model="items" />
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue';
import { useBookStore } from '../stores/bookStore';
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const bookStore = useBookStore();
const categories = computed(() => bookStore.allCategories);
const router = useRouter();

interface MenuItem {
  label: string;
  items?: MenuItem[];
  command?: () => void;
}

const items = ref<MenuItem[]>([]);

const updateMenuItems = () => {
  items.value = [
    {
      label: t('categories.categories').toLocaleLowerCase(),
      items: categories.value.map((category) => ({
        label: t(`categories.${category}`).toLocaleLowerCase(),
        command: () => filterByCategory(category),
      })),
    },
    {
      label: t('categories.bestSellers').toLocaleLowerCase(),
      command: () => filterByCategory('Mais Vendidos'),
    },
    {
      label: t('categories.newReleases').toLocaleLowerCase(),
      command: () => filterByCategory('Lançamentos'),
    },
    {
      label: t('categories.viewAll').toLocaleLowerCase(),
      command: () => filterByCategory('Ver Todos'),
    },
  ];
};

const filterByCategory = (category: string) => {
  const encodedCategory = encodeURIComponent(category);
  router.push({ name: 'Category', params: { category: encodedCategory } });
};

onMounted(async () => {
  await bookStore.loadBooks();
});

watchEffect(updateMenuItems);
</script>

<style scoped lang="scss">
.p-menubar {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-radius: 0;
}
</style>
