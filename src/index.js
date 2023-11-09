// Your code here
const movieAPI = 'http://localhost:3000/films'
let movieList = []

//CORE DELIVERABLE 1

fetch(`${movieAPI}/1`)
    .then(res => res.json())
    .then(firstMovie => renderMovieDetails(firstMovie))

function renderMovieDetails(movieObj) {
    const image = document.getElementById('poster')
    const title = document.getElementById('title')
    const runtime = document.getElementById('runtime')
    const filmInfo = document.getElementById('film-info')
    const showtime = document.getElementById('showtime')
    const tickets = document.getElementById('ticket-num')

    //Add event listeners to Buy Ticket buttons as they are created
    const buyButton = document.getElementById('buy-ticket')
    buyButton.addEventListener('click', (e) => handleBuyButton(movieObj))

    image.src = movieObj.poster
    title.textContent = movieObj.title
    runtime.textContent = movieObj.runtime
    filmInfo.textContent = movieObj.description
    showtime.textContent = movieObj.showtime
    tickets.textContent = movieObj.tickets_sold
}

//CORE DELIVERABLE 2

fetch(movieAPI)
    .then(res => res.json())
    .then(movieData => {
        movieList = movieData
        renderAllMovies(movieList)
    })

function renderAllMovies(movieList) {
    const movieDiv = document.getElementById('films')
    movieDiv.innerHTML = ''
    movieList.forEach(movieObj => renderOneMovie(movieObj))
}

function renderOneMovie(movieObj) {
    const movieDiv = document.getElementById('films')
    const newMovie = document.createElement('li')
    //BONUS CHALLENGE 1 - Click Movie Name to display details
    newMovie.addEventListener('click', (e) => renderMovieDetails(movieObj))
    newMovie.className = 'film item'
    newMovie.textContent = movieObj.title
    movieDiv.append(newMovie)
}

//CORE DELIVERABLE 3

//Added event listeners to Buy Ticket buttons as they are created above

function handleBuyButton(movieObj) {
    //Assign new ticket amount to variable
    const ticketsSold = (movieObj.tickets_sold) - 1
    if (movieObj.tickets_sold > 0) {
        //EXTRA BONUS 1 - PATCH
        fetch(`${movieAPI}/${movieObj.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(movieObj)
        })
            .then(res => res.json())
            .then(() => {
                //Set DOM tickets to new ticket amount
                movieObj.tickets_sold = ticketsSold
                const tickets = document.getElementById('ticket-num')
                tickets.textContent = movieObj.tickets_sold
            }
            )
    }
    if (movieObj.tickets_sold === 0) {
        alert('No tickets left!')
    }
}

//EXTRA BONUS 2 - DELETE