import 'dotenv/config'
import axios from 'axios'

const data = [
  {
    id: 1,
    title: 'Matrix',
    poster: 'https://www.themoviedb.org/t/p/original/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg',
    year: 1999
  },
  {
    id: 2,
    title: 'Titanic',
    poster: 'https://www.themoviedb.org/t/p/w1280/1kLYRzVj6byWvFa3SLrAOcfgnfp.jpg',
    year: 1997
  }, {
    id: 3,
    title: 'Terminator 2',
    poster: 'https://www.themoviedb.org/t/p/w1280/5M0j0B18abtBI5gi2RhfjjurTqb.jpg',
    year: 1991
  }
]

axios.post('http://localhost:7700/indexes/movies/documents', data, {
  headers: {
    Authorization: `Bearer ${process.env.MEILI_MASTER_KEY}`
  }
})
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
