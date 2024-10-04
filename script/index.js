async function getTrendingMoviesPreview() {
  const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key='+ llave)
  const data = await res.json()
  const movies = data.results
  // * movies es una srray de objetos
  const moviesTitles = data.results.map(movie => movie.title)
  // * moviesTitles da el nombre de peliculas
  movies.forEach(movie => {
    const trendingPreviewMoviesSection = document.querySelector('#trendingPreview .trendingPreview-movieList')
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')

    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    movieImg.setAttribute('alt',movie.title)
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path)

    movieContainer.appendChild(movieImg)
    trendingPreviewMoviesSection.appendChild(movieContainer)
  });

  console.log({data});
  console.log(moviesTitles);
  console.log(movies);
}
async function getCategoriesPreview() {
  const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key='+ llave+'&language=es')
  const data = await res.json()

  const categories = data.genres

  //* Recibimos una category x cada una de las lista de categorias
  categories.forEach(category => {
    const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

    const categoryContainer = document.createElement('div')
    categoryContainer.classList.add('category-container')

    const categoryTitle = document.createElement('h3')
    categoryTitle.classList.add('category-title')
    categoryTitle.setAttribute('id', 'id' + category.id)
    const categoryTitleText = document.createTextNode(category.name)

    categoryTitle.appendChild(categoryTitleText)
    categoryContainer.appendChild(categoryTitle)
    previewCategoriesContainer.appendChild(categoryContainer)
  });

}
getTrendingMoviesPreview()
getCategoriesPreview()
console.log(llave);
