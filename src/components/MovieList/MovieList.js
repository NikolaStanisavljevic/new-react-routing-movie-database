import React from 'react';
import './MovieList.css';

const movieList = (props) => {

    // Display added movies on second page
    
    return (
        <div className= 'collection'>
            {this.props.movies.map( ([{title,poster_path}]) => {
                return (
                    <div className='movies'>
                        <img src={'https://image.tmdb.org/t/p/w500' + poster_path} alt="poster"/>
                    </div>    
                )
            }
            )}
        </div>
    )
}

export default movieList
