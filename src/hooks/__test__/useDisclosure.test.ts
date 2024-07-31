import { act, renderHook } from '@testing-library/react';
import useDisclosure from '../useDisclosure';

describe('useDisclosure', () => {
  it('should initialize with the correct state', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('should initialize with the given initial state', () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('should open the disclosure', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close the disclosure', () => {
    const { result } = renderHook(() => useDisclosure(true));

    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle the disclosure', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should set the disclosure state', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.setOpen(true);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.setOpen(false);
    });

    expect(result.current.isOpen).toBe(false);
  });
});
