// module: Output.js
// author: Ben Riegel
// overview: declares and exports the Output component class. This component
// displays the messages about select menu events


//----- imports ----------------------------------------------------------------

import { useEffect, useRef } from 'react';
import '../stylesheets/output.css';


//----- export code block ------------------------------------------------------

export default function Output(props){

  //----- state vars -----

  let content = useRef(null);

  //----- effects -----

  //makes sure that the output is scrolled in such a way that the content
  //at the bottom is always visible
  useEffect( ()=>{
    content.current.scrollTop = content.current.scrollHeight;
  });

  //----- render block -----

  return (
    <div className='output' ref={content}>
      {
        props.messages.map( (message, index) => {
          return (
            <p key={index}>
              { message}
            </p>
          );
        })
      }
    </div>
  );
}
