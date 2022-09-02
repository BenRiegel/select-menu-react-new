// module: utils.js
// author: Ben Riegel
// overview: declares and exports the custom usePropHasChanged hook, keeps track
// of whether a particular state variable property has changed during the last
// update of the state variable


//----- imports ----------------------------------------------------------------

import { useEffect, useRef } from 'react';


//----- export code block ------------------------------------------------------

export function usePropHasChanged(obj, propName){
  //the previous value is the current state property value
  const prevValue = useRef(obj[propName]);
  const hasChanged = useRef(false);

  //when state object changes, compare current property value with previous value
  //and assign current value to be next previous value
  useEffect(() => {
  //  console.log('state use effect');
    hasChanged.current = (obj[propName] !== prevValue.current);
    prevValue.current = obj[propName];
  }, [obj]);
  return hasChanged.current;
}


export function useOnAnimationStart(updateStatus, callback){
  useEffect( ()=> {
    if (updateStatus === 'animating'){
      callback();
    }
  }, [updateStatus]);
}

export function useOnAnimationEnd(update, callback){
  useEffect( ()=> {
    if (update.status === 'complete' && update.type === 'async'){
      callback();
    }
  }, [update]);
}

export function useOnUpdateComplete(update, callback){
  useEffect( ()=> {
    if (update.status === 'complete'){
      callback();
    }
  }, [update]);
}
