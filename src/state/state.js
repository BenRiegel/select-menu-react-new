export function stateReducer(prevState, action){
  return {
    options: prevState.options,
    selectedOption: action.clickedOption,
    isOpen: !prevState.isOpen,
  }
}
