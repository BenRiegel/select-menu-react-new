// module: SelectMenu.js
// author: Ben Riegel
// overview: declares and exports the SelectMenu component. It creates the
// state and update variables for tracking state changes and update changes
// On update changes, it notifies the parent component of events that occur:
// animations starting or ending, or changes in selected option


//----- imports ----------------------------------------------------------------

import { useEffect, useReducer, useRef, useState } from 'react';
import { stateReducer, updateReducer } from '../../state/state.js';
import { useOnAnimationStart, useOnAnimationEnd, useOnUpdateComplete } from '../../utils/utils.js';
import Option from './Option.js';
import '../stylesheets/select_menu.css';


//----- export code block ------------------------------------------------------

export default function SelectMenu(props){

  //----- local functions -----

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

  const [state, initStateAction] = useReducer(stateReducer, {
    options: props.initOptions,
    selectedOption: props.initSelectedOption,
    isOpen: props.initIsOpen,
  });

  const [update, initUpdateAction] = useReducer(updateReducer, {
    type: null,
    status: null
  });

  //for keeping track of previous selected option
  const prevSelectedOption = useRef(null);

  //----- effects -----

  //notifies when animation has started
  useOnAnimationStart(update.status, ()=>{
    props.onEvent('Animation starting . . .');
  })

  //notifies when animation has ended
  useOnAnimationEnd(update, ()=>{
    props.onEvent('Animation ended');
  })

  //if update is complete, then check for selected option change
  useOnUpdateComplete(update, ()=>{
    if (prevSelectedOption.current !== state.selectedOption){
      props.onEvent('New selected value - ' + state.selectedOption);
    }
  });

  //----- render block -----

  const animationInProgress = (update.status === 'animating');
  const isClosed = (!state.isOpen && !animationInProgress);
  const closedClass = (isClosed ? 'closed' : '');

  return (
    <div className={`select ${closedClass}`}>
      {
        state.options.map( (option, index) => (
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
