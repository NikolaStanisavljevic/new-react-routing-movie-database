import React, { Component } from 'react';
import './Collection.css';
import NavBar from '../../../components/Navbar/Navbar';


export class Collection extends Component {
  render() {
    return (
        <div>
            <NavBar />
            <div className= 'collections'>  
                {this.props.movies.map( ([{poster_path}]) => {
                    return (
                        <div className='collection'  key={ poster_path }>
                            <img src={ 'https://image.tmdb.org/t/p/w500' + poster_path } alt="poster"/>
                        </div>
                           
                     )
                }
          )}
         </div>  
      </div>
  )
  }
}

export default Collection
