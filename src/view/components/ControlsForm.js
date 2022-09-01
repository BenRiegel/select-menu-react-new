
export default function ControlsForm(props){

  function valueChangeHandler(evt){
    const isEnabled = (evt.target.value === 'Enabled');
    props.onValueChange(isEnabled);
  }

  return (
    <>
      <form name='controls'>
        <p>Controls</p>
        <div>
          <input type='radio'
                 id='controls-enabled'
                 name='controls-button'
                 value='Enabled'
                 checked={props.controlsEnabled}
                 onChange={valueChangeHandler}/>
          <label htmlFor='controls-enabled'>Enabled</label>
        </div>
        <div>
          <input type='radio'
                 id='controls-disabled'
                 name='controls-button'
                 value='Disabled'
                 checked={!props.controlsEnabled}
                 onChange={valueChangeHandler}/>
          <label htmlFor='controls-disabled'>Disabled</label>
        </div>
      </form>
    </>
  );
}
