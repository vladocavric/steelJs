function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const player = document.querySelector('#player')
const coin = document.querySelector('#coin')
const score = document.querySelector('#score')
let count = 0

window.addEventListener('keyup', function(e) {
	const currTop = extractPos(player.style.top)
	const currLeft = extractPos(player.style.left)
	
	if(e.key === "ArrowDown") {
		player.style.top = `${currTop + 50}px`
	} else if (e.key === "ArrowUp") {
		player.style.top = `${currTop - 50}px`
	} else if (e.key === "ArrowLeft") {
		player.style.left = `${currLeft - 50}px`
		player.style.transform = 'scale(-1,1)'
	} else if (e.key === "ArrowRight") {
		player.style.left = `${currLeft + 50}px`
		player.style.transform = 'scale(1,1)'
	}
	if (isTouching(player, coin)){
		moveCoin()
		count++
		score.innerText = count
		console.log(count)
	} 
})

const extractPos = (pos) => {
	if (!pos && (pos < 25)) return 0
	return parseInt(pos.slice(0, -2))
}

const moveCoin = function() {
	const width = window.innerWidth
	const height = window.innerHeight
	const coinWidth = coin.clientWidth
	const coinHeight = coin.clientHeight
	let  posLeft = Math.floor(Math.random() * width - coinWidth)
    let  posTop = Math.floor(Math.random() * height - coinHeight)
    posLeft < 0 ? posLeft = 0 : posLeft
    posTop < 0 ? posTop = 0 : posTop
    coin.style = `left: ${posLeft}px; top: ${posTop}px`
}

moveCoin()