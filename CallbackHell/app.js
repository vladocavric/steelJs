const button = document.querySelector( 'button' )

// setTimeout(() => {
//     button.style.transform = 'translate(100px)'
//     setTimeout(() => {
//         button.style.transform = 'translate(200px)'
//         setTimeout(() => {
//             button.style.transform = 'translate(300px)'
//             setTimeout(() => {
//                 button.style.transform = 'translate(400px)'
//                 setTimeout(() => {
//                     button.style.transform = 'translate(500px)'
//                 }, 1000)
//             }, 1000)
//         }, 1000)
//     }, 1000)
// }, 1000)

// setTimeout(() => {
//     button.style.transform = 'translate(20px)'
// }, 1000)

// const moveX = ( element, amount, delay, successCB, failCB ) => {
//     setTimeout( () => {
//         const screenWidth = document.body.clientWidth
//         const dimensions = element.getBoundingClientRect() // gets button dimensions and position
//         const currentRight = dimensions.right
//         const currentLeft = dimensions.left
//         if ( currentRight + amount > screenWidth ) {
//             console.log( 'done' )
//             failCB()
//         }
//         else {
//             element.style.transform = `translate(${
//                 currentLeft + amount
//             }px)`
//             successCB()
//         }
//     }, delay )
// }
// moveX(button, 100, 1000)
// moveX(button, 100, 1000, () => {
//     moveX(button, 200, 1000, () => {
//         moveX(button, 200, 1000, () => {
//             moveX(button, 400, 1000)
//         })
//     })
// })

// moveX( button, 200, 1000, () => {
//     moveX( button, 200, 1000, () => {
//         moveX( button, 500, 1000, () => {
//             console.log( 'stvarno' )
//         }, () => {
//             alert( 'can not muve further' )
//         } )
//     }, () => {
//         alert( 'can not muve further' )
//     } )
// }, () => {
//     alert( 'can not muve further' )
// } )

const moveXPromise = ( element, amount, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            const screenWidth = document.body.clientWidth
            const dimensions = element.getBoundingClientRect() // gets button dimensions and position
            const currentRight = dimensions.right
            const currentLeft = dimensions.left
            if ( currentRight + amount > screenWidth ) {
                // console.log( 'done' )
                reject({screenWidth, amount, currentRight})
            }
            else {
                element.style.transform = `translate(${currentLeft + amount}px)`
                resolve()
            }
        }, delay )
    })

}

moveXPromise(button, 100, 1000)
    .then(() =>  moveXPromise(button, 200, 1000))
    .then(() =>  moveXPromise(button, 300, 1000))
    .then(() =>  moveXPromise(button, 200, 1000))
    .then(() =>  moveXPromise(button, 100, 1000))
    .catch(({screenWidth, amount, currentRight}) => {
        console.log(`Cannot Move! Body is ${screenWidth}px wide`);
		console.log(`Element is at ${currentRight}px, ${amount}px is too large!`);
    })