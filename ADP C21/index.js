const baseUrl = 'http://www.omdbapi.com/'

let leftMovie
let rightMovie
const onMovieSelect = async (movie, side) => {
    const response = await axios.get(baseUrl, {
        params: {
            apikey: 'd577095',
            i: movie.imdbID
        }
    });
    const sideClass = side === 'left' ? '.left-content' : '.right-content'
    const movieElement = document.querySelector(sideClass)
    movieElement.innerHTML = movieTemplate(response.data)
    side === 'left' ? leftMovie = response.data : rightMovie = response.data
    leftMovie && rightMovie ? runComparison() : null
}

const runComparison = () => {
    const leftSideStats = document.querySelectorAll('.left-content .notification')
    const rightSideStats = document.querySelectorAll('.right-content .notification')
    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index]
        const leftStatNo = parseFloat(leftStat.dataset.value)
        const rightStatNo = parseFloat(rightStat.dataset.value)
        console.log(leftStatNo, rightStatNo)
        leftStatNo > rightStatNo ? rightStat.classList.add('has-background-danger') : leftStatNo < rightStatNo ? leftStat.classList.add('has-background-danger') : null
    })
}

const movieTemplate = (movie) => {
    const imgSrc = movie.Poster === "N/A" ? 'large_movie_poster.png' : movie.Poster 
    const metascoreNo = parseInt(movie.Metascore) 
    const imdbRatingNo = parseFloat(movie.imdbRating)
    const imdbVotesNo = parseInt(movie.imdbVotes.replace(/,/g, '')) 
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const awardsNo = movie.Awards.replace(/([A-Z]|[a-z]|[.,&])/g, '').split(' ').map(x=>+x).reduce(reducer)
    return`
    <article class="media">
        <figure class="media-left">
            <p class="image">
            <img src="${imgSrc}" alt="Movie Poster">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movie.Title}</h1>
                <h4>${movie.Genre}</h4>
                <p>${movie.Plot}</p>
            </div>
        </div>
    </article>
    <article data-value="${awardsNo}" class="notification is-primary">
        <p class="title">${movie.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movie.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article data-value="${metascoreNo}" class="notification is-primary">
        <p class="title">${movie.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value="${imdbRatingNo}" class="notification is-primary">
        <p class="title">${movie.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value="${imdbVotesNo}" class="notification is-primary">
        <p class="title">${movie.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movie.Writer}</p>
    <p class="subtitle">Writer</p>
</article>
    `
}




const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === "N/A" ? 'large_movie_poster.png' : movie.Poster
        return `
        <img src="${imgSrc}">
        ${movie.Title} (${movie.Year})
    `
    },
    inputValue(movie) {
        return movie.Title
    },
    async fetchData(searchTerm) {
        const response = await axios.get(baseUrl, {
            params: {
                apikey: 'd577095',
                s: searchTerm
            }
        });
        if (response.data.Error) {
            return []
        }
        const movies = response.data.Search
        return movies
    }
}
createAutoComplete({
    ...autoCompleteConfig,
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, 'left')
    },
    root: document.querySelector('#left-autocomplete')
})

createAutoComplete({
    ...autoCompleteConfig,
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, 'right')
    },
    root: document.querySelector('#right-autocomplete')
})