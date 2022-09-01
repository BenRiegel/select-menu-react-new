import { useEffect, useRef } from 'react';

export function usePropHasChanged(obj, propName){
  const prevValue = useRef(obj[propName]);
  const hasChanged = useRef(false);
  useEffect(() => {
    hasChanged.current = (obj[propName] !== prevValue.current);
    prevValue.current = obj[propName];
  }, [obj]);
  return hasChanged.current;
}
