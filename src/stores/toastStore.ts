import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';

export const useToastStore = defineStore('toast', () => {
  const toast = useToast();

  const showSuccessToast = (summary: string, detail: string) => {
    setTimeout(() => {
      toast.add({
        severity: 'success',
        summary,
        detail,
        life: 5000,
      });
    }, 100);
  };

  return { showSuccessToast };
});
