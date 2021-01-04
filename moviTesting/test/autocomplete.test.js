const waitFor = (selector) => {
    return new Promise((resolve, reject) => {
        const interval =  setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(interval)
                clearTimeout(timer)
                resolve()
            }
        }, 50);
        const timer = setTimeout(() => {
            clearTimeout(interval)
            reject()
        }, 5000);
    }) 
}

beforeEach(() => {
    document.getElementById('target').innerHTML = ''
    createAutoComplete({
        root: document.getElementById('target'),
        fetchData() {
            return     [
                {Title: 'Avengers'},
                {Title: 'Dark knight'},
                {Title: 'Tesna koza'}
            ]
        },
        renderOption(movie) {
            return movie.Title
        },
    })
})
it('dropdown should not be visible at the start', () => {
    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).not.to.include('is-active')
})

it('should show dropdown', async () => {
    const input = document.querySelector('input')
    input.value = 'avengers'
    input.dispatchEvent(new Event('input'))
    await waitFor('.dropdown-item')
    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).to.include('is-active')
})

it('should show x no of results after search', async () => {
    const input = document.querySelector('input')
    input.value = 'avengers'
    input.dispatchEvent(new Event('input'))
    await waitFor('.dropdown-item')
    const dropdownItems = document.querySelectorAll('.dropdown-item')
    expect(dropdownItems.length).to.equal(3)
})