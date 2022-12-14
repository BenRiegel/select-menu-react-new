// module: App.js
// author: Ben Riegel
// overview: declares and exports the main App component. It keeps track of
// whether the select menu is enabled or not, whether animations are enabled
// or not, and which event messages have been received.


//----- imports ----------------------------------------------------------------

import { useState } from 'react';
import { optionsSchema, initSelectedOption, initIsOpen } from '../../config/config.js';
import Output from './Output.js';
import ControlsForm from './ControlsForm.js';
import AnimationsForm from './AnimationsForm.js';
import SelectMenu from './SelectMenu.js';
import '../stylesheets/app.css';


//----- export code block ------------------------------------------------------

export default function App(){

  //----- local functions -----

  function addNewMessage(newMessage){
    setMessages( messages => [...messages, newMessage] );
  }

  //----- state variables -----

  const [messages, setMessages] = useState( [] );
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  //----- render block -----

  return (
    <div className='app'>
      <main>
        <section>
          <ControlsForm controlsEnabled={controlsEnabled}
                        onValueChange={setControlsEnabled}/>
          <AnimationsForm animationsEnabled={animationsEnabled}
                          onValueChange={setAnimationsEnabled}/>
        </section>
        <section>
          <SelectMenu initOptions={optionsSchema}
                      initSelectedOption={initSelectedOption}
                      initIsOpen={initIsOpen}
                      controlsEnabled={controlsEnabled}
                      animationsEnabled={animationsEnabled}
                      onEvent={addNewMessage}/>
        </section>
        <section>
          <p>Event Messages</p>
          <Output messages={messages}/>
        </section>
      </main>
    </div>
  );
}
