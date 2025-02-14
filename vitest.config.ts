import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom para manipular o DOM em testes
    globals: true,
    testTransformMode: {
      web: ['\\.vue$'],
    },
    coverage: {
      provider: 'v8', // Usando v8 para cobertura
      reporter: ['text', 'html', 'json'], // Relatórios em texto, HTML e JSON
      all: true, // Garante que todas as funções sejam analisadas
    },
  },
  plugins: [vue()],
});
