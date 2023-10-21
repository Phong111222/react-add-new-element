import { useCallback, useEffect, useState } from 'react';

export interface UseWindowDimension {
  width: number;
  height: number;
}

export const useWindowDimension = (): UseWindowDimension => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleWindowResize = useCallback(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimension({
      width,
      height,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return dimension;
};
