// module: utils.js
// author: Ben Riegel
// overview: declares and exports some custom hooks, which keep track of when
// specific events occur: animation start, animation end, and update
// complete. When events occur, then callback is executed


//----- imports ----------------------------------------------------------------

import { useEffect, useRef } from 'react';


//----- export code block ------------------------------------------------------

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
