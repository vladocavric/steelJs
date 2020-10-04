// for(let i = 1; i < 10; i++) {
//     console.log(i*i)
// }

const myStudents = [
    {
        firstName: 'Pera',
        score: 55
    },
    {
        firstName: 'Mica',
        score: 65
    },
    {
        firstName: 'Djoka',
        score: 80
    },
]
let scoreSum = 0

for (i = 0; i < myStudents.length; i++) {
    
    let score = myStudents[i].score
    scoreSum += myStudents[i].score
   
}

let averageScore = scoreSum / myStudents.length
console.log(averageScore)

// let word = 'stressed'
// let reversWord = ''

// for (i = 7; i >= 0; i--) { 
//     console.log(word[i])
//     reversWord += word[i]
// }
// console.log(reversWord)