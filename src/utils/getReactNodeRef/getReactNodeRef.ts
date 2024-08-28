import React from 'react';

/**
 * Utility to get the ref from a ReactNode if it exists.
 * @param {React.ReactNode} node - The ReactNode to inspect.
 * @returns {React.Ref|null} - Returns the ref if it exists in the node's props, otherwise null.
 */

export default function getReactNodeRef<T>(
  element: React.ReactNode
): React.RefObject<T> | ((instance: T | null) => void) | string | null {
  if (!element || !React.isValidElement(element)) {
    return null;
  }

  // Check if `ref` exists in props and is one of the expected types
  const ref = element.props.ref;
  if (typeof ref === 'function' || typeof ref === 'string' || ref instanceof Object) {
    console.log(ref, typeof ref, ref instanceof Object);
    return ref as React.RefObject<T> | ((instance: T | null) => void) | string;
  }

  // Handle cases where `ref` is not in `props` but potentially exists in `element`
  // @ts-expect-error element.ref is not explicitly typed in ReactElement, but valid here
  return element.ref as React.RefObject<T> | ((instance: T | null) => void) | null;
}
