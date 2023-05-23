const stars = document.querySelectorAll('.comment-stars>img')
function rateFilm(rate){
    for(let i = 0; i < stars.length; i++){
        // stars[i].style.filter = 'grayscale(100%)'
        stars[i].classList.remove('active-star')
    }
    for(let i = 0; i < rate; i++){
        // stars[i].style.filter = 'grayscale(0%)'
        stars[i].classList.add('active-star')
    }    
}

function sendRate(e){
    e.preventDefault()
    // console.log('work');
    const activeStars = document.querySelectorAll('.active-star')
    const comment_text = document.querySelector('#comment-text').value
    // console.log(activeStars , '-stars');
    // console.log(comment_text , 'text');
    const author = document.querySelector('#comment_author').value
    const film = document.querySelector('#comment_film').value
    // console.log(author);
    // console.log(film);
    if(activeStars.length > 0){
        axios.post('/api/rate' , {rate: activeStars.length , text: comment_text , authorId: author , filmId: film}).then(data =>{
            // console.log(data);
            if(data.data){
                location.reload()
            }
        })
    }
}