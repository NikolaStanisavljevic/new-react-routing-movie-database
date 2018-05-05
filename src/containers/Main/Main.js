import React, { Component } from 'react';
import MovieDatabase from './MovieDatabase/MovieDatabase';
import Collection from './Collection/Collection';
import {Route} from 'react-router-dom';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './Main.css';



const movies = [];
const moviesName = [];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : moviesName.filter(lang =>
        lang.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div className='suggest'>
        {suggestion}
    </div>
);

class Main extends Component {

  state = {
    movies : [],
    movie: [],
    movieName : '',
    error : false,
    value: '',
    suggestions: [],
  };

  // Get starting screen point (movie)

  componentDidMount() {
    const newMovie = [];
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c14f219f034f43147391971bf0c07ba4&language=en-US&query=Inferno&page=1&include_adult=false`)
    .then(response=>{
      newMovie.push(response.data.results[0]);
      this.setState({
        movie:newMovie
      });
    })
    .catch(error => {
      this.setState({
        error: true
      });
    })
    
  }

  // Handling user input on search button

  addMovie = (movie) => {
    const newMovies =[...this.state.movies];
    newMovies.push(this.state.movie);
    this.setState({
      movies: newMovies
    });
  };

  searchMovie = (event) => {
    const newMovie = [];
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c14f219f034f43147391971bf0c07ba4&language=en-US&query=${this.state.movieName}&page=1&include_adult=false`)
    .then(response=> {
      newMovie.splice(0,1,response.data.results[0]);
      this.setState({
        movie: newMovie,
        movieName: ''
      });
    })
    .catch(error => {
      this.setState({
        error: true
      });
    }
    )
  };

  // Storing user value of input field

  setMovie = (event) => {
    this.setState({
      movieName: event.target.value
    })
  };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c14f219f034f43147391971bf0c07ba4&language=en-US&query=${this.state.value}&page=1&include_adult=false`)
            .then(response => {
                const movies = response.data.results;
                const moviesName = movies.map(name => {
                    return name.title
                });
                this.setState({suggestions : moviesName})
                //  console.log(this.state.suggestions);
            })


    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });

    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event,{ suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
        if (method === 'click'){
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c14f219f034f43147391971bf0c07ba4&language=en-US&query=${suggestion}&page=1&include_adult=false`)
                .then(response=> {
                    console.log(response);
                })
        }
    };

  render() {

      const { value, suggestions } = this.state;

      // Autosuggest will pass through all these props to the input.
      const inputProps = {
          placeholder: 'Type a movie name',
          value,
          onChange: this.onChange
      };

    return (
      
        // Passing props via react router

        <div>
            <Route path="/" exact render={()=><MovieDatabase 
                      error={this.state.error} 
                      movies={this.state.movies}
                      movie={this.state.movie}
                      movieName={this.state.movieName}
                      setMovie={this.setMovie}
                      searchMovie={this.searchMovie}
                      addMovie={this.addMovie}/>} />

            <Route path="/collection" exact render={()=><Collection  
                      movies={this.state.movies}
                      delete={this.deleteMovie}/>} />

            <Autosuggest  suggestions={suggestions}
                          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={renderSuggestion}
                          inputProps={inputProps}
                          onSuggestionSelected={this.onSuggestionSelected} />
        </div>
    )
  }
}

export default Main;
