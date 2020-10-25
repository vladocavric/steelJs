// function reqListener () {
//     console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();
// oReq.addEventListener("load", reqListener);
// oReq.open("GET", "http://www.example.org/example.txt");
// oReq.send();


// const firstReq = new XMLHttpRequest()
// firstReq.addEventListener('load', function() {
//     // console.log('it works')
//     const data = JSON.parse(this.responseText)
//     console.log(data)
//     for(let planet of data.results) {
//         console.log(planet.name)
//     }
// })

// firstReq.addEventListener('error', function() {
//     console.log('Error!', err)
// })
// // firstReq.onload = function() {
// //     const data = JSON.parse(this.responseText)
// //     console.log(data)
// // }

// // firstReq.onerror = function(err) {
// //     console.log('Error!', err)
// // }

// firstReq.open('get', 'http://swapi.dev/api/planets/', true)
// // firstReq.setRequestHeader('Accept', 'application/json')
// firstReq.send()
// console.log('request sen')

// fetch('http://swapi.dev/api/planets/')
// .then((res) => {
//     if(res.status !== 200) {
//         console.log('Problem:', res.status)
//     }
//     res.json().then((data) => {
//         console.log(data)
//     })
// }).catch(err => {
//     console.log('Fetch Error:', err)
// })

//========================================================================================

// fetch('http://swapi.dev/api/planets/').then(res => { // if(res.status !== 200) {
//         if (!res.ok) { // console.log('Problem:', res.status)
//             throw new Error(`status code error ${ res.status }`)
//         }
//         return res.json()
//     }).then(data => {
//         console.log('fetched first planet')
//         console.log(data.results[0].name)
//         const firstFilm = data.results[0].films[0]
//         return firstFilm
//         // for(let planet of data.results) {
//         //     console.log(planet.name)
//         // }
//     }).then(film => {
//         return fetch(film)
//         // console.log(film)
//     }).then(res => {
//         // console.log(res)
//         if (!res.ok) { // console.log('Problem:', res.status)
//             throw new Error(`status code error ${ res.status }`)
//         }
//         return res.json()
//     }).then(data => {
//         console.log('fetched first film based on planet')
//         console.log(data.title)
//         console.log(data.opening_crawl)
//     })
//     .catch(err => {
//         console.log('something went wrong', err)
//     })
//========================================================================================
const checkStatusAndParse = res => {
    if (!res.ok) { 
        throw new Error(`status code error ${ res.status }`)
    }
    return res.json()
}
const printPlanets = data => {
    for(let planet of data.results) {
        console.log(planet.name)
    }
    console.log('========================================')
    return Promise.resolve(data.next)
}
const fetchNext = (url = 'http://swapi.dev/api/planets/')  => {
    return fetch(url)
}

    fetchNext()
    .then(checkStatusAndParse)
    .then(printPlanets)
    .then(fetchNext)
    .then(checkStatusAndParse)
    .then(printPlanets)
    .then(fetchNext)
    .then(checkStatusAndParse)
    .then(printPlanets)
    .catch(err => {
        console.log('something went wrong', err)
    })