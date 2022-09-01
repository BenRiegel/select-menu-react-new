// module: Option.js
// author: Ben Riegel
// overview: declares and exports the Option component class. This component
// determines which state the options are in on each render and renders them
// appropriately.


//----- imports ----------------------------------------------------------------

import { useEffect } from 'react';
import '../stylesheets/option.css';


//----- export code block ------------------------------------------------------

export default function Option(props){

  //----- render block -----

  //logic for determining the current state of the option
  function getState(){
    const { isSelected, selectIsOpen, isAnimating } = props;
    if (isSelected){
      return 'visible';
    } else {
      if (selectIsOpen && isAnimating){
        return 'revealing';
      }
      if (selectIsOpen && !isAnimating){
        return 'visible';
      }
      if (!selectIsOpen && isAnimating){
        return 'hiding';
      }
      if (!selectIsOpen && !isAnimating){
        return 'hidden';
      }
    }
  }

  function calcClassNames(){
    let classList = ['option'];
    if (props.isSelected){
      classList.push('selected');
    }
    let state = getState();
    classList.push(state);
    return classList.join(' ');
  }

  function handleClick(evt){
    let clickedOption = evt.target.dataset.value;
    props.onClick(clickedOption);
  }

  function getClickListener(){
    if (props.controlsEnabled && !props.isAnimating){
      return handleClick;
    } else {
      return null;
    }
  }

  return (
    <div className={calcClassNames()}
         data-value={props.value}
         onClick={getClickListener()}
         onAnimationEnd={props.onAnimationEnd}>
        {props.label}
    </div>
  );

}
