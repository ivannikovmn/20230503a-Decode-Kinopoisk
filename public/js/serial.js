let addFilmUrlBtn = document.querySelector('#addFilmUrlBtn')
let addSeriesBtn = document.querySelector('#addSeriesBtn')
let urls = document.querySelector('#urls')
function addSeries(){
    // console.log('work');
    addFilmUrlBtn.style.display = 'none'
    // console.log(urls.innerHTML);
    let output = urls.innerHTML
    let number = document.querySelectorAll('.series')
    let series = document.createElement('div')
    series.classList.add('series')
    let title = document.createElement('p')
    let input = document.createElement('input')
    title.innerHTML = number.length + 1 + 'серия'
    input.name = 'series'
    input.placeholder = 'Введите ссылку на видео'
    series.append(title)
    series.append(input)
    urls.append(series)
    // output += 
    //     `<div class="series">
    //         <p>${number.length + 1} серия</p>
    //         <input type="text" name="series" placeholder="Введите ссылку на видео">
    //     </div>`
    // urls.innerHTML = output
}
function addFilmUrl(){
    addSeriesBtn.style.display = 'none'
    let filmUrl = document.querySelectorAll('#filmUrl')
    // console.log(filmUrl);
    if(filmUrl.length <= 0){
        urls.innerHTML = 
        `<fieldset class="fieldset">
            <label for="">Ссылка на фильм</label>
            <input type="text" placeholder="Введите ссылку на фильм" name="video">
        </fieldset>`
    }
    // console.log(urls.innerHTML);
}