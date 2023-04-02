import React, { useState, useEffect } from 'react'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'
import './App.css'

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=684bcc33'

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`)
    const data = await res.json()
    setMovies(data.Search)
  }
  useEffect(() => {
    searchMovies('')
  }, [])
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm)
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, l) => (
            <MovieCard key={l} movie={movie} />
          ))}
        </div>
      ) : (
        <div>
          <h1>No Movies Found</h1>
        </div>
      )}
    </div>
  )
}

export default App
