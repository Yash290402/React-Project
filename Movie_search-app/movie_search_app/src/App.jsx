import { useEffect, useState } from 'react'
import Result from './components/Result'
import axios from 'axios'

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


function App() {

  const [movie, Setmovie] = useState([])
  const [search, Setsearch] = useState("")

  const changeThesearch = (e) => {
    Setsearch(e.target.value)
  }

  const getAllmovie = () => {
    axios.get(APIURL)
      .then(
        (response) => {
          Setmovie(response.data.results);
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  const getSearchMovies = () => {
    axios.get(SEARCHAPI + search)
      .then(
        (response) => {
          Setmovie(response.data.results);
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }


  useEffect(
    () => {

      Setmovie([]);

      if (search === "") {
        getAllmovie()
      }
      else {
        getSearchMovies()
      }
    },
    [search]
  )

  return (
    <>
      <div className='max-w-[1240px] shadow-xl min-h-[400px] mx-auto p-3'>
        <input type="text"
          value={search}
          onChange={changeThesearch}
          className='w-full border border-black rounded text-slate-700 p-4' 
          placeholder='Search here '/>
        {
          movie.length === 0 ?
            <div className='txet-3xl text-center mt-2'>Loading...</div> :
            <Result movie={movie} />
        }
      </div>
    </>
  )
}

export default App
