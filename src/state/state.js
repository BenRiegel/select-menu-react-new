// module: state.js
// author: Ben Riegel
// overview: declares and exports the stateReducer function, which determines
// how the state is updated based on a particular action


//----- export code block ------------------------------------------------------

export function stateReducer(prevState, action){
  return {
    options: prevState.options,
    selectedOption: action.clickedOption,        //assigns the clicked option as the selected option
    isOpen: !prevState.isOpen,                   //toggles open state
  }
}

export function updateReducer(prevState, action){
  let type, status;
  switch(action.type){
    case 'onClick':
      type = (action.animationsEnabled ? 'async' : 'sync');
      status = (action.animationsEnabled ? 'animating' : 'complete');
      break;
    case 'onAnimationsComplete':
      type = prevState.type;
      status = 'complete';
      break;
    default:
      break;
  }
  return { type, status };
}
