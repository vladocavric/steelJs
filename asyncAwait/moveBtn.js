const buttonGreen = document.querySelector( '.btn-green' )
const buttonYellow = document.querySelector( '.btn-yellow' )
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

moveXPromise(buttonGreen, 100, 1000)
    .then(() =>  moveXPromise(buttonGreen, 200, 1000))
    .then(() =>  moveXPromise(buttonGreen, 300, 1000))
    .then(() =>  moveXPromise(buttonGreen, 200, 1000))
    .then(() =>  moveXPromise(buttonGreen, 100, 1000))
    .catch(({screenWidth, amount, currentRight}) => {
        console.log(`Cannot Move! Body is ${screenWidth}px wide`);
		console.log(`Element is at ${currentRight}px, ${amount}px is too large!`);
    })

// buttonYellow.addEventListener('click', () => {
//     console.log('nesto')
// })

const moveXAsync = async(element) => {
    try {
        await moveXPromise(element, 100, 1000)
        await moveXPromise(element, 100, 1000)
        await moveXPromise(element, 100, 1000)
        await moveXPromise(element, 100, 1000)
        await moveXPromise(element, 100, 1000)
        await moveXPromise(element, 100, 1000)
        await moveXPromise(element, 100, 1000)
        await moveXPromise(element, 100, 1000)
        await moveXPromise(element, 100, 1000)
        await moveXPromise(element, 100, 1000)
    } catch (e) {
        console.log(`Cannot Move! Body is ${screenWidth}px wide`);
		console.log(`Element is at ${currentRight}px, ${amount}px is too large!`);
    }
    // try{
    //     const screenWidth = document.body.clientWidth
    //     const dimensions = element.getBoundingClientRect() // gets button dimensions and position
    //     const currentRight = dimensions.right
    //     const currentLeft = dimensions.left
    //     if ( currentRight + amount > screenWidth ) {
    //         throw new Error()
    //     }
    //     element.style.transform = `translate(${currentLeft + amount}px)`
    // } catch (e) {
    //     console.log(`Cannot Move! Body is ${screenWidth}px wide`);
	// 	console.log(`Element is at ${currentRight}px, ${amount}px is too large!`);
    // }
}

moveXAsync(buttonYellow).catch(e => console.log('all done'))


