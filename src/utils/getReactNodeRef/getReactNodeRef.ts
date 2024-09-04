import React from 'react';

/**
 * Utility to get the ref from a ReactNode if it exists.
 * @param {React.ReactNode} node - The ReactNode to inspect.
 * @returns {React.Ref|null} - Returns the ref if it exists in the node's props, otherwise null.
 */

type ReactElementRefType<T> = React.RefObject<T> | ((instance: T | null) => void) | null;

function isValidNodeRef<T>(ref: unknown): ref is ReactElementRefType<T> {
  return ref === null || typeof ref === 'function' || (typeof ref === 'object' && 'current' in ref);
}

export default function getReactNodeRef<T>(element: React.ReactNode): ReactElementRefType<T> {
  if (!element || !React.isValidElement(element)) {
    return null;
  }

  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to children in older versions
  if (element.props.propertyIsEnumerable('ref') && isValidNodeRef(element.props.ref)) {
    return element.props.ref as ReactElementRefType<T>;
  }

  // @ts-expect-error element.ref is not explicitly typed in ReactElement, but valid here
  if (isValidRef(element.ref)) {
    // @ts-expect-error element.ref is not explicitly typed in ReactElement, but valid here
    return element.ref as ReactElementRefType<T>;
  }

  return null;
}
