// const willYouGetADog = new Promise((resolve, reject) => {
//     const no = Math.random()
//     if (no > 0.5) {
//         resolve()
//     }
//     else {
//         reject()
//     }
// })

// willYouGetADog.then(() => {
//     console.log('yupi')
// }).catch(() => {
//     console.log(':( nooooo')
// })
// =======================================================================================================
// const willYouGetADog = new Promise( ( resolve, reject ) => {
//     setTimeout( () => {
//         const no = Math.random()
//         if ( no > 0.5 ) {
//             resolve()
//         }
//         else {
//             reject()
//         }
//     }, 5000 )
// } )

// willYouGetADog.then( () => {
//     console.log( 'yupi' )
// } ).catch( () => {
//     console.log( ':( nooooo' )
// } )

// =======================================================================================================
// const makeADogPromise = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const no = Math.random()
//             console.log(no)
//             if (no > 0.5) {
//                 resolve()
//             } else {
//                 reject()
//             }
//         }, 5000)
//     })
// }

// makeADogPromise()
//     .then(() => {
//         console.log('yupi')
//     })
//     .catch(() => {
//         console.log(':( nooooo')
//     })

// =======================================================================================================
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pages = {
                '/users': [
                    {id: 1, usersname: 'dovla'},
                    {id: 5, usersname: 'vlado'}
                ],
                '/about': 'This is data from about page'
            }
            const data = pages[url]
            if (data) {
                resolve({status: 200, data})
            } else {
                reject({status: 404})
            }
        }, 1000)
        
    })
}

fakeRequest('/users').then((res) => {
    console.log(res.status)
    console.log(res.data)
}).catch((res) => {
    console.log(res.status)
    console.log('too bad')
})

fakeRequest('/about').then((res) => {
    console.log(res.status)
    console.log(res.data)
}).catch((res) => {
    console.log(res.status)
    console.log('too bad')
})

fakeRequest('/login').then((res) => {
    console.log(res.status)
    console.log('nicely resolved')
    console.log(data)
}).catch((res) => {
    console.log(res.status)
    console.log('too bad')
})