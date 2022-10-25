
const getGenres = (data) => {

    const selectElm = document.getElementById('select-genre');
    selectElm.innerHTML = data.map((item) => {
      return `

        <option value=${item}>${item}</option>

      `;
    }).join('');
}

fetch('https://apps.kodim.cz/daweb/trening-api/apis/movie-api/genres')
.then((response) => response.json())
.then(getGenres);


const Movie = (props) => {
    const { posterUrl, title, year, url } = props

    // console.log(props)
    return `
        <li class="movie-detail">
            <div class="movie-poster">
            <img 
                src=${posterUrl}
                alt=${title}
            />
            </div>
            <div class="movie-info">
            <h2 class="movie-title">${title}</h2>
            <div class="movie-year">Rok vydání: ${year}</div>
            <div class="movie-link">
                <a href=${url} target="_blank">Odkaz na CSFD</a>
            </div>
            </div>
        </li>
    `;
}


const displayMovies = (event) => {

    event.preventDefault();
    const getMovies = (data) => {

        const genreResult = document.getElementById("select-genre").value;

        const movieList = document.querySelector('.movie-list');
        movieList.innerHTML = data.map((item) => {

            if (item.genres.includes(genreResult)) {

                 return Movie(item)
        
            }
            
        }).join('');
    }

    fetch('https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies')
    .then((response) => response.json())
    .then(getMovies);
  
}

document.getElementById("btn").addEventListener("click", displayMovies);