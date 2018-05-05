import React from 'react';
import './SearchButton.css';

const searchButton = (props) => {
    return (
        <div className='searchButton'>
            <button onClick={()=> props.searchMovie(props.value)} >Search</button>
        </div>


    )
};

export default searchButton;