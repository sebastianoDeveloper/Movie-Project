const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type':'application/json;charset="UTF-8"'
  },
  params: {
    'api_key': API_KEY,
    'language':'es-PE'
  }
})

// Utils
function createMovies(movies, container) {
  container.innerHTML = ""
  movies.forEach(movie => {

    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')
    movieContainer.addEventListener('click', () => {
     location.hash = '#movie=' + movie.id
    })
    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    movieImg.setAttribute('alt',movie.title)
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    )
    movieContainer.appendChild(movieImg)
    container.appendChild(movieContainer)
  });


}
function createCategories(categories, container) {
  container.innerHTML = ""

  //* Recibimos una category x cada una de las lista de categorias
  categories.forEach(category => {

    const categoryContainer = document.createElement('div')
    categoryContainer.classList.add('category-container')
    const categoryTitle = document.createElement('h3')
    categoryTitle.classList.add('category-title')
    categoryTitle.setAttribute('id', 'id' + category.id)
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`
    })
    const categoryTitleText = document.createTextNode(`${category.name == 'Suspense' ? 'Suspenso' : category.name }`)

    categoryTitle.appendChild(categoryTitleText)
    categoryContainer.appendChild(categoryTitle)
    container.appendChild(categoryContainer)
  });

}
// Lllamados a a la API
async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/day')
  // * movies es una Array de objetos
  const movies = data.results
  // * moviesTitles da el nombre de peliculas
  const moviesTitles = data.results.map(movie => movie.title)
  createMovies(movies,trendingMoviesPreviewList)
  console.log({data});
  console.log(moviesTitles);
  console.log(movies);
}
async function getMoviesByCategory(id) {
  // const { data } = await api('discover/movie?with_generes=13,1768')
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id
    }
  })
  // * movies es una Array de objetos
  const movies = data.results
  console.log(movies);

  // * moviesTitles da el nombre de peliculas
  const moviesTitles = data.results.map(movie => movie.title)
  createMovies(movies,genericSection)

  console.log({data});
  console.log(moviesTitles);
  console.log(movies);
}
async function getCategoriesPreview() {
  const { data} = await api('genre/movie/list?')
  // const { data} = await api('genre/movie/list?language=es')
  const categories = data.genres
  createCategories(categories,categoriesPreviewList);



}

async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    }
  })
  const movies = data.results
  createMovies(movies,genericSection)
}

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day')
  const movies = data.results
  createMovies(movies,genericSection)
}
async function getMovieById(id) {
  const { data: movie } = await api('movie/' + id)
  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
  console.log(movieImgUrl);
  headerSection.style.background = `
   linear-gradient(
     180deg,
     rgba(0, 0, 0, 0.35) 19.27%,
     rgba(0, 0, 0, 0) 29.17%
   ),
  url(${movieImgUrl})`

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;
  createCategories(movie.genres, movieDetailCategoriesList)
  getRelatedMoviesId(id)
}
// getTrendingMoviesPreview()
// getCategoriesPreview()
// comen de la clase 11

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/similar`)
  // const { data } = await api(`movie/${id}/recommendations`)
  const relatedMovies = data.results
  createMovies(relatedMovies,relatedMoviesContainer)

}
