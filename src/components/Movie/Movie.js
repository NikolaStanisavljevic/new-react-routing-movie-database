import React from 'react';
import './Movie.css';

const movie = (props) => {
    
    let movie =<p style={{ textAlign: 'center' }}>Something went wrong!</p>;

    if(!props.error) {

        movie = props.value.map( ({ title, overview, poster_path, backdrop_path,release_date,vote_average})=>{
            return (
                <div className="content" key={title}>
                <div className='card'>
                    <div className="image">
                        <img src={'https://image.tmdb.org/t/p/w500' + poster_path} alt="poster"/> 
                    </div>

                    <div className="stats">
                        <div className="title">
                            <h1>{title}</h1>
                        </div>

                        <div className="overview">
                            <h2>Overview:</h2>
                            <p>{overview}</p>
                        </div>

                        <div className="date">
                            <h2>Release date:</h2>
                            <p>{release_date}</p>
                        </div>
                        
                        <div className="vote">
                            <h2>Rating:</h2>
                            <p>{vote_average}</p>
                        </div>

                        <div className="add">
                            <button onClick={ props.addMovie }>Add to collection</button>
                        </div>

                    </div>
                    </div>

                    <div className="backdrop">
                        <img src={'https://image.tmdb.org/t/p/original'+ backdrop_path} alt="backdrop"/>
                    </div>


                </div>
        )
    })

  return (
    <div>
        {movie}
    </div>
  )
}}

export default movie;

 
