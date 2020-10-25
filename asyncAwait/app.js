// const checkStatusAndParse = res => {
//     if (!res.ok) { 
//         throw new Error(`status code error ${ res.status }`)
//     }
//     return res.json()
// }
// const printPlanets = data => {
//     for(let planet of data.results) {
//         console.log(planet.name)
//     }
//     console.log('========================================')
//     return Promise.resolve(data.next)
// }
// const fetchNext = (url = 'http://swapi.dev/api/planets/')  => {
//     return fetch(url)
// }

//     fetchNext()
//     .then(checkStatusAndParse)
//     .then(printPlanets)
//     .then(fetchNext)
//     .then(checkStatusAndParse)
//     .then(printPlanets)
//     .then(fetchNext)
//     .then(checkStatusAndParse)
//     .then(printPlanets)
//     .catch(err => {
//         console.log('something went wrong', err)
//     })

//========================================================================================
const printPlanets = (planets) => {
    for (let planet of planets) {
        console.log(planet.name)
    }
}
const getData = async () => {
    try{
        const first = await axios.get('http://swapi.dev/api/planetsdfdsfdsfsd/')
        printPlanets(first.data.results)
        console.log('========================================')
        const second = await axios.get(first.data.next)
        printPlanets(second.data.results)
        console.log('========================================')
        const thred = await axios.get(second.data.next)
        printPlanets(thred.data.results)
        console.log('========================================')
    } catch(e) {
        console.log('america first')
    }

}

getData()

//========================================================================================

async function get3Pokemon() {
    const promise1 = axios.get('http://pokeapi.co/api/v2/pokemon/1')
    const promise2 = axios.get('http://pokeapi.co/api/v2/pokemon/2')
    const promise3 = axios.get('http://pokeapi.co/api/v2/pokemon/3')
    // console.log(promise1)
    // const poke1 = await promise1
    // const poke2 = await promise2
    // const poke3 = await promise3
    // console.log(poke1, poke2, poke3)
    const results = await Promise.all([promise1, promise2, promise3])
    console.log(results)
}

get3Pokemon()