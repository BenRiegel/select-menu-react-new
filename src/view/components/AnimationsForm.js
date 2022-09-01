
export default function AnimationsForm(props){

  function valueChangeHandler(evt){
    const isEnabled = (evt.target.value === 'Enabled');
    props.onValueChange(isEnabled);
  }

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
