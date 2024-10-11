searchFormBtn.addEventListener('click', () => {
  location.hash = '#search=' + `${searchFormInput.value.trim()}`
})
trendingBtn.addEventListener('click', () => {
  location.hash = '#trends='
})
arrowBtn.addEventListener('click', () => {
  // location.hash = '#home='
  // location.hash = window.history.back()
  history.back()
})
window.addEventListener('DOMContentLoaded', navigator, false)
// * no le decimos oye contenido carga sino cuando el contenido ya haiga cargado
window.addEventListener('hashchange', navigator, false)
function navigator() {
  console.log({ location });
  // if (location.hash.startsWith('#trends')) {
  //   trendsPage();
  // } else if (location.hash.startsWith('#search=')) {
  //   searchPage()
  // } else if (location.hash.startsWith('#movie=')) {
  //   movieDetailsPage();
  // } else if (location.hash.startsWith('#category=')) {
  //   categoriesPage();
  // } else {
  //   homePage();
  // }
  location.hash.startsWith('#trends') ? trendsPage() :
  location.hash.startsWith('#search') ? searchPage() :
  location.hash.startsWith('#movie') ? movieDetailsPage() :
  location.hash.startsWith('#category') ? categoriesPage() :
  homePage();
  // document.body.scrollTop = 0
  // document.documentElement.scrollTop = 0
  smoothscroll();

}
function smoothscroll() {
  const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
  if (currentScroll > 0) {
    window.scrollTo(0,currentScroll - (currentScroll/5) )
  }
}
//* ahora ya no esta cargando la consulta a la API xk si,ahora solo esta cargando unicamanente cuando estamos en el home

function homePage() {
  console.log('Home!!');

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive')
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.remove('inactive')
  categoriesPreviewSection.classList.remove('inactive')
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview()
  getCategoriesPreview()
}
function categoriesPage() {
  window.scroll(0,0)
  console.log('Categories!!');
  headerSection.classList.remove('header-container--long')
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const url = location.hash.split('='); //['#category, 'id-name']
  // const urlPage = url[0]
  // const urlInfo = url[1]
  const [_,categoryData] = location.hash.split('='); //['#category, 'id-name']
  const [categoryID,categoryName] = categoryData.split('-'); //['id, 'name']
  const newName2 = decodeURI(categoryName);
  headerCategoryTitle.innerHTML = newName2
  getMoviesByCategory(categoryID)
}
// http://127.0.0.1:5500/index.html#category=123
// location.hash = '#category=456'
function movieDetailsPage() {
  console.log('Moviee!!');
  // 11
  headerSection.classList.add('header-container--long')
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  const [_,movieId] = location.hash.split('='); //['#movie, '123']
  getMovieById(movieId)
}
function searchPage() {
  console.log('Search!!');
  headerSection.classList.remove('header-container--long')
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_,searchValue] = location.hash.split('='); //['#search, 'name']
  // const searchValue = decodeURI(location.hash.split('='));
  getMoviesBySearch(searchValue)
  // searchValue = value ?
}
function trendsPage() {
  console.log('TRENDS!!');
  headerSection.classList.remove('header-container--long')
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias'

  getTrendingMovies()
}