import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useToastStore } from '../../src/stores/toastStore';
import { useToast } from 'primevue/usetoast';
import { setActivePinia, createPinia } from 'pinia';

vi.mock('primevue/usetoast', () => ({
  useToast: vi.fn(),
}));

describe('useToastStore', () => {
  let toastStore;
  let toast;

  beforeEach(() => {
    setActivePinia(createPinia());
    toast = {
      add: vi.fn(),
    };
    vi.mocked(useToast).mockReturnValue(toast);
    toastStore = useToastStore();
  });

  it('should call toast.add with correct parameters for success toast', () => {
    const summary = 'Success';
    const detail = 'Operation completed successfully';

    toastStore.showSuccessToast(summary, detail);

    setTimeout(() => {
      expect(toast.add).toHaveBeenCalledWith({
        severity: 'success',
        summary,
        detail,
        life: 5000,
      });
    }, 100);
  });
});
