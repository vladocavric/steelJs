// classList
// getAttribute()
// setAttribute()
// appendChild()
// append()
// prepend()
// removeChild()
// remove()
// createElement
// innerText // razlika izmedju 'innerText' i 'textContent'-a je to sto iz iner teksta dobijamo suvi tekst kakav je i na stranici
// textContent // dok iz textContent'-a dobijamo formatiran tekst iz code-a (sa enterim, cudnim razmacima sto stripuje HTML, tekst iz skripti kao i tekst doji je display nan-ovan)            
// innerHTML
// value
// parentElement
// children
// nestSibling
// previousSibling
// style


const buttons = document.querySelectorAll('button')

for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        const button = buttons[i]
        button.parentNode.classList.toggle('done')
        // console.dir(button.parentNode.classList)
    })
}

//appendChild
const newh2 = document.createElement('h2')
newh2.innerText = 'nesto novo, nesto divlje'
newh2.classList.add('red')
document.body.appendChild(newh2)

const newLink = document.createElement('a')
newLink.href = 'https://www.youtube.com/watch?v=_JYCAX6yVB0'
newLink.innerText = 'novakov video'
newLink.setAttribute('target', '_blank')
document.body.appendChild(newLink)

const newPicture = document.createElement('img')
newPicture.src = 'https://images.unsplash.com/photo-1492799808351-30d7d3955cac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1954&q=80'
document.body.appendChild(newPicture)


//insert before
const newLi = document.createElement('li')
newLi.innerHTML = 'first li from app.js <button>next</button>'
newLi.classList.add('todo', 'inserted')
const beforeLast = document.createElement('li')
beforeLast.innerHTML = 'first li from app.js <button>next</button>'
beforeLast.classList.add('todo', 'inserted')
const firstLi = document.querySelector('li')
const allTodoLi = document.querySelectorAll('li.todo')
const lastTodo = document.querySelectorAll('li.todo')[allTodoLi.length-1]
const parentUl = document.querySelector('ul')
parentUl.insertBefore(newLi, firstLi)
parentUl.insertBefore(beforeLast, lastTodo)

//insertAdjacentElement
//beforebegin
//afterbegin
//beforeend
//afterend

const frut1 = document.createElement('li')
frut1.innerText = 'apple'
frut1.classList.add('red')
const frut2 = document.createElement('li')
frut2.innerText = 'orange'
frut2.classList.add('red')
const frut3 = document.createElement('li')
frut3.innerText = 'almonds'
frut3.classList.add('red')
const frut4 = document.createElement('li')
frut4.innerText = 'peenuts'
frut4.classList.add('red')
const veggies = document.querySelector('.veggies')
const veggLi = document.querySelectorAll('.vegg-li')
veggies.insertAdjacentElement('afterbegin', frut1)
veggies.insertAdjacentElement('beforeend', frut2)
veggies.insertAdjacentElement('beforebegin', frut3)
veggies.insertAdjacentElement('afterend', frut4)


//append
const section = document.querySelector('section')
const bold1 = document.createElement('b')
bold1.innerText = 'this is bold element'
const italic1 = document.createElement('i')
italic1.innerText = 'this is italic element'
section.append(italic1, bold1)


//prepend

const footer = document.querySelector('footer')
const bold2 = document.createElement('b')
bold2.innerText = ' this is bold element from footer'
const italic2 = document.createElement('i')
italic2.innerText = 'this is italic element from footer '
footer.prepend(italic2, bold2)


//remuveChild
const ulVegg = document.querySelector('ul.veggies')
const broccoli = document.querySelectorAll('.vegg-li')[3] 
const returnedDeleted = ulVegg.removeChild(broccoli)
console.log(returnedDeleted)

//remove
const cauliflower = document.querySelectorAll('.vegg-li')[2]