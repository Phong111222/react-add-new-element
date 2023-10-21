import { RefObject, useEffect } from 'react';

export const useCtrlS = (ref: RefObject<HTMLElement>, handler: Function) => {
  const listener = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key == 's') {
      handler();
    }
  };

  const keydownListener = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key == 'KeyS') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    ref.current?.addEventListener('keydown', keydownListener);
    ref.current?.addEventListener('keyup', listener);

    return () => {
      ref.current?.removeEventListener('keydown', keydownListener);
      ref.current?.removeEventListener('keyup', listener);
    };
  }, [handler]);
};
