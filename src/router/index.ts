import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CategoryView from '../views/CategoryView.vue';
import ProductView from '../views/ProductView.vue';
import SearchResultsView from '../views/SearchResultsView.vue';
import CartView from '../views/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import { useCartStore } from '../stores/cartStore';
import OrderCompletedView from '../views/OrderCompletedView.vue';
import OrderHistory from '../views/OrderHistoryView.vue';

const routes = [
  { path: '/', component: HomeView },
  {
    path: '/category/:category',
    name: 'Category',
    component: CategoryView,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductView,
  },
  { path: '/search', component: SearchResultsView },
  { path: '/cart', component: CartView },
  { path: '/checkout', component: CheckoutView },
  { path: '/order-completed', component: OrderCompletedView },
  { path: '/order-history', component: OrderHistory },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  const cartStore = useCartStore();
  if (to.path === '/checkout' && cartStore.cart.length === 0) {
    next('/');
  } else {
    next();
  }
});

export default router;
