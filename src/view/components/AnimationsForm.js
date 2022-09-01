// module: AnimationForm.js
// author: Ben Riegel
// overview: declares and exports the AnimationForm component, which handles
// user manipulation of the radio buttons responsible for enabling and disabling
// the select menu animations.


//----- export code block ------------------------------------------------------

export default function AnimationsForm(props){

  //----- local functions -----

  function valueChangeHandler(evt){
    const isEnabled = (evt.target.value === 'Enabled');
    props.onValueChange(isEnabled);
  }

  //----- render block -----

  return (
    <>
      <form name='animations'>
        <p>Animations</p>
        <div>
          <input type='radio'
                 id='animations-enabled'
                 name='animations-button'
                 value='Enabled'
                 checked={props.animationsEnabled}
                 onChange={valueChangeHandler}/>
          <label htmlFor='animations-enabled'>Enabled</label>
        </div>
        <div>
          <input type='radio'
                 id='animations-disabled'
                 name='animations-button'
                 value='Disabled'
                 checked={!props.animationsEnabled}
                 onChange={valueChangeHandler}/>
          <label htmlFor='animations-disabled'>Disabled</label>
        </div>
      </form>
    </>
  );
}
