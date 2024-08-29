import React, { createRef, forwardRef, useRef } from 'react';
import getReactNodeRef from './getReactNodeRef'; // Adjust the import path to your setup
import { describe, it, expect } from 'vitest';

describe('getReactNodeRef', () => {
  it('should return null for non-ReactNode input', () => {
    const result = getReactNodeRef(null);
    expect(result).toBeNull();
  });

  it('should return null for plain text ReactNode', () => {
    const result = getReactNodeRef('Hello');
    expect(result).toBeNull();
  });

  it('should return null when there is no ref in the React element', () => {
    const element = <div>Hello, World!</div>;
    const result = getReactNodeRef(element);
    expect(result).toBeNull();
  });

  it('should return a RefObject when a ref object is passed', () => {
    const ref = createRef<HTMLDivElement>();
    const element = <div ref={ref}>Hello, World!</div>;
    const result = getReactNodeRef(element);
    expect(result).toBe(ref);
  });

  it('should return a callback ref when a callback ref is passed', () => {
    const callbackRef = vi.fn();
    const element = <div ref={callbackRef}>Hello, World!</div>;
    const result = getReactNodeRef(element);
    expect(result).toBe(callbackRef);
  });

  it('should handle ref passed via forwardRef', () => {
    const MyComponent = forwardRef<HTMLDivElement>((props, ref) => (
      <div ref={ref}>Hello, World!</div>
    ));
    const ref = createRef<HTMLDivElement>();
    const element = <MyComponent ref={ref} />;
    const result = getReactNodeRef(element);
    expect(result).toBe(ref);
  });

  it('should return the callback ref when a ref is passed as a prop', () => {
    type MyComponentProps = {
      ref: React.Ref<HTMLDivElement>;
    };
    const MyComponent: React.FC<MyComponentProps> = (props) => (
      <div ref={props.ref}>Hello, World!</div>
    );
    const callbackRef = vi.fn();
    const element = <MyComponent ref={callbackRef} />;
    const result = getReactNodeRef(element);
    expect(result).toBe(callbackRef);
  });
});
