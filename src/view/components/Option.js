// module: Option.js
// author: Ben Riegel
// overview: declares and exports the Option component class. This component
// handles click events and adding/removing the click handler from the dom
// when necessary. It also updates the selected class when the option is
// selected by the user.


//----- imports ----------------------------------------------------------------

import { useEffect } from 'react';
import '../stylesheets/option.css';


//----- export code block ------------------------------------------------------

export default function Option(props){

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
    if (props.controlsEnabled && !props.animationInProgress){
      return handleClick;
    } else {
      return null;
    }
  }

  //----- jsx block -----

  return (
    <div className={calcClassNames()}
         data-value={props.value}
         onClick={getClickListener()}
         onAnimationEnd={props.onAnimationEnd}>
        {props.label}
    </div>
  );

}
