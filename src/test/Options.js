// module: SelectMenu.js
// author: Ben Riegel
// overview: declares and exports the SelectMenu component. It creates the
// state and update variables for tracking state changes and update changes
// On update changes, it notifies the parent component of events that occur:
// animations starting or ending, or changes in selected option


//----- imports ----------------------------------------------------------------

import { useEffect, useReducer, useRef, useState } from 'react';
import { stateReducer, updateReducer } from '../../state/state.js';
import Option from './Option.js';
import '../stylesheets/select_menu.css';


//----- export code block ------------------------------------------------------

export default function Options(props){

  //----- local functions -----

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

  function animationStartHandler(){

  }

  function animationEndHander(){

  }



  //when an option has completed its animation, then we set the update as complete
  function completeUpdate(){
    initUpdateAction( {type:'onAnimationsComplete'} );
  }

  //when there's a click action, record the previous selected option,
  //update the state and set the update properties
  function clickAction(clickedOption){
    prevSelectedOption.current = state.selectedOption;
    initStateAction( {type:'click', clickedOption} );
    let { animationsEnabled } = props;
    initUpdateAction( {type:'onClick', animationsEnabled} );
  }

  //----- state vars -----

  //----- effects -----
  //----- render block -----

  const animationInProgress = (update.status === 'animating');
  const isClosed = (!state.isOpen && !animationInProgress);
  const closedClass = (isClosed ? 'closed' : '');

  return (
    <div onClick={getClickHandler}
         onAnimationStart={animationStartHandler}
         onAnimationEnd={animationEndHandler}>
      {
        props.options.map( (option, index) => (
          <Option key={index}
                  value={option.value}
                  label={option.label}
                  isSelected={option.value === state.selectedOption}
                  controlsEnabled={props.controlsEnabled}
                  selectIsOpen={state.isOpen}
                  isAnimating={animationInProgress}
                  onClick={clickAction}
                  onAnimationEnd={completeUpdate}/>
          )
        )
      }
    </div>
  );

};
