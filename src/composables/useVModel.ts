import { computed, type WritableComputedRef } from 'vue';

export function useVModel<P extends Object, K extends keyof P>(
  props: P,
  key: K,
  emit: (event: `update:${K & string}`, value: P[K]) => void,
): WritableComputedRef<P[K]> {
  return computed({
    get: () => props[key],
    set: (value) => emit(`update:${String(key)}` as `update:${K & string}`, value),
  });
}
