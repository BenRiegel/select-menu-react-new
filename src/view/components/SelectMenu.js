// module: SelectMenu.js
// author: Ben Riegel
// overview: declares and exports the SelectMenu component class. This
// component creates the global store and the view store. It also registers
// listeners with the stores and updates the component state when the stores
// update. It also handles the animation when the open state changes.


//----- imports ----------------------------------------------------------------

import { useEffect, useReducer, useState } from 'react';
import { usePropHasChanged } from '../../utils/utils.js';
import { stateReducer } from '../../state/state.js';
import Option from './Option.js';
import '../stylesheets/select_menu.css';


//----- export code block ------------------------------------------------------

export default function SelectMenu(props){

  //----- local functions -----

  function completeUpdate(){
    setUpdateProps( {isAnimating:false} );
  }

  function clickAction(clickedOption){
    initStateAction( {type:'click', clickedOption} );
    setUpdateProps( {isAnimating:props.animationsEnabled} );
  }

  //----- state vars -----

  const [state, initStateAction] = useReducer(stateReducer, {
    options: props.initOptions,
    selectedOption: props.initSelectedOption,
    isOpen: props.initIsOpen,
  });

  const [update, setUpdateProps] = useState({
    isAnimating: null
  });

  const selectedOptionHasChanged = usePropHasChanged(state, 'selectedOption');

  //----- effects -----

  useEffect( ()=> {
      if (update.isAnimating){
        props.onEvent('Animation starting . . .');
      } else if (update.isAnimating === false){
        if (props.animationsEnabled){
          props.onEvent('Animation ended');
        }
        if (selectedOptionHasChanged){
          props.onEvent('New selected value - ' + state.selectedOption);
        }
      }
  }, [update]);

  //----- render block -----

  const isClosed = (!state.isOpen && !update.isAnimating);
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
                  isAnimating={update.isAnimating}
                  onClick={clickAction}
                  onAnimationEnd={completeUpdate}/>
          )
        )
      }
    </div>
  );

};
