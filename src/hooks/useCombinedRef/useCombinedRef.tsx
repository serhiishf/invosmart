import React from 'react';
import { useMemo } from 'react';

export default function useCombinedRef<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> | null {
  return useMemo(() => {
    if (refs.every((ref) => ref === null || ref === undefined)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => {
        /*         setRef(ref, instance); */
      });
    };
  }, refs);
}
