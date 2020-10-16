const warriorsGames = [
    {
        awayTeam: {
            team: 'Golden State',
            points: 119,
            isWinner: true,
        },
        homeTeam: {
            team: 'Houston',
            points: 106,
            isWinner: false,
        },
    },
    {
        awayTeam: {
            team: 'Golden State',
            points: 105,
            isWinner: false,
        },
        homeTeam: {
            team: 'Houston',
            points: 127,
            isWinner: true,
        },
    },
    {
        homeTeam: {
            team: 'Golden State',
            points: 126,
            isWinner: true,
        },
        awayTeam: {
            team: 'Houston',
            points: 85,
            isWinner: false,
        },
    },
    {
        homeTeam: {
            team: 'Golden State',
            points: 92,
            isWinner: false,
        },
        awayTeam: {
            team: 'Houston',
            points: 95,
            isWinner: true,
        },
    },
    {
        awayTeam: {
            team: 'Golden State',
            points: 94,
            isWinner: false,
        },
        homeTeam: {
            team: 'Houston',
            points: 98,
            isWinner: true,
        },
    },
    {
        homeTeam: {
            team: 'Golden State',
            points: 115,
            isWinner: true,
        },
        awayTeam: {
            team: 'Houston',
            points: 86,
            isWinner: false,
        },
    },
    {
        awayTeam: {
            team: 'Golden State',
            points: 101,
            isWinner: true,
        },
        homeTeam: {
            team: 'Houston',
            points: 92,
            isWinner: false,
        },
    },
]

const list = document.createElement('ol')
document.body.append(list)
for (const game of warriorsGames) {
    const { homeTeam, awayTeam } = game
    const { team: hTeam, points: hTeamPoints, isWinner: hTeamIsWinner } = homeTeam
    const { team: aTeam, points: aTeamPoints, isWinner: aTeamIsWinner } = awayTeam
    const gameLi = document.createElement('li')
    aTeamIsWinner ? (gameLi.innerHTML = `${aTeam} @ ${hTeam} <b>${aTeamPoints}</b>:${hTeamPoints}`) : (gameLi.innerHTML = `${aTeam} @ ${hTeam} ${aTeamPoints}:<b>${hTeamPoints}</b>`)
    if ((hTeam === 'Golden State' && hTeamIsWinner) || (aTeam === 'Golden State' && aTeamIsWinner)) {
        gameLi.classList.add('green')
    } else {
        gameLi.classList.add('pink')
    }
    list.appendChild(gameLi)
}
// ========================================
const ul = document.createElement('ul')
document.body.append(ul)
warriorsGames.forEach((game, i) => {
    const gameLi = document.createElement('li')
    const bold = document.createElement('b')
    const span = document.createElement('span')

    let vs = ''
    let opponent = ''
    let gsScore = ''
    let opponentScore = ''
    if (game.homeTeam.team === 'Golden State') {
        vs = 'vs'
        opponent = game.awayTeam.team
    } else {
        vs = '@'
        opponent = game.homeTeam.team
    }

    if (game.homeTeam.team === 'Golden State' && game.homeTeam.isWinner) {
        gameLi.innerHTML = `Golden State ${vs} ${opponent} <b>${game.homeTeam.points}</b> - ${game.awayTeam.points}`
        gameLi.classList.add('green')
    } else if (game.awayTeam.team === 'Golden State' && game.awayTeam.isWinner) {
        gameLi.innerHTML = `Golden State ${vs} ${opponent} <b>${game.awayTeam.points}</b> - ${game.homeTeam.points}`
        gameLi.classList.add('green')
    } else if (game.homeTeam.team === 'Golden State' && !game.homeTeam.isWinner) {
        gameLi.innerHTML = `Golden State ${vs} ${opponent} ${game.homeTeam.points} -  <b>${game.awayTeam.points}</b>`
        gameLi.classList.add('pink')
    } else {
        gameLi.innerHTML = `Golden State ${vs} ${opponent} ${game.awayTeam.points} - <b>${game.homeTeam.points}</b>`
        gameLi.classList.add('pink')
    }
    ul.appendChild(gameLi)
})

// ============================================================================
// video solution
const ulParent = document.createElement('ul')
document.body.prepend(ulParent)
for (const game of warriorsGames) {
    const { homeTeam, awayTeam } = game
    const { team: hTeam, points: hTeamPoints, isWinner: hTeamIsWinner } = homeTeam
    const { team: aTeam, points: aTeamPoints, isWinner: aTeamIsWinner } = awayTeam
    const gameLi = document.createElement('li')
    const teamNames = `${aTeam} @ ${hTeam}`
    let scoreLine
    aTeamPoints > hTeamPoints ? (scoreLine = `<b>${aTeamPoints}</b> - ${hTeamPoints}`) : (scoreLine = `${aTeamPoints} - <b>${hTeamPoints}</b>`)
    const myTeam = hTeam === 'Golden State' ? homeTeam : awayTeam
    gameLi.classList.add(myTeam.isWinner ? 'green' : 'pink')
    gameLi.innerHTML = `${teamNames} ${scoreLine}`
    ulParent.appendChild(gameLi)
}

// =============================================================================================================

const makeChart = (games, forTeam) => {
    const ulParent = document.createElement('ul')
    const id = `#${forTeam.replace(' ', '-').toLowerCase()}`
    const element = document.querySelector(id)
    element.append(ulParent)
    for (const game of games) {
        const { homeTeam, awayTeam } = game
        const gameLi = document.createElement('li')
        gameLi.innerHTML = getScoreLine(game)
        gameLi.classList.add(isWinner(game, forTeam) ? 'green' : 'pink')
        ulParent.appendChild(gameLi)
    }
    return ulParent
}

const getScoreLine = ({ homeTeam, awayTeam }) => {
    const { team: hTeam, points: hTeamPoints, isWinner: hTeamIsWinner } = homeTeam
    const { team: aTeam, points: aTeamPoints, isWinner: aTeamIsWinner } = awayTeam
    const teamNames = `${aTeam} @ ${hTeam}`
    let scoreLine
    aTeamPoints > hTeamPoints ? (scoreLine = `<b>${aTeamPoints}</b> - ${hTeamPoints}`) : (scoreLine = `${aTeamPoints} - <b>${hTeamPoints}</b>`)
    return `${teamNames} ${scoreLine}`
}

const isWinner = ({ homeTeam, awayTeam }, forTeam) => {
    const { team: hTeam, points: hTeamPoints, isWinner: hTeamIsWinner } = homeTeam
    const { team: aTeam, points: aTeamPoints, isWinner: aTeamIsWinner } = awayTeam
    const myTeam = hTeam === forTeam ? homeTeam : awayTeam
    return myTeam.isWinner
    
}
const chart1 = makeChart(warriorsGames, 'Houston')
const chart2 = makeChart(warriorsGames, 'Golden State')
