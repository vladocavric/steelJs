const feachNext = (url = 'http://swapi.dev/api/planets/') => {
    return axios.get(url)
}
const printPlanets = ({data}) => {
    for (let planet of data.results) {
        console.log(planet.name)
    }
    console.log('=========================')
    return Promise.resolve(data.next)
}

feachNext()
.then(printPlanets)
.then(feachNext)
.then(printPlanets)
.then(feachNext)
.then(printPlanets)
.catch(err => {
    console.log('err in catch')
    console.log(err)
})