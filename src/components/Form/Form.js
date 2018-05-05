import React from 'react'
import './Form.css';


const form = (props) => {
  return (
    <div className='form'>
      {/*<input type= 'text' placeholder = 'Enter movie here...' onChange= { props.setMovie } value={ props.value } /> */}
      <button onClick={()=> props.searchMovie(props.value)} >Search</button> 
    </div>

    
  )
}

export default form;
