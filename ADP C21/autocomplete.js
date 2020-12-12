const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData
}) => {
    root.innerHTML = `
        <lable><b>Search</b></lable>
        <input type="text"  class="input search">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `
    const searchInput = root.querySelector('.search')
    const dropdown = root.querySelector('.dropdown')
    const resultsWrapper = root.querySelector('.results')
    // const dropdownContent = document.querySelector('.dropdown-content')

    const onInput = async e => {
        const items = await fetchData(e.target.value)
        const contentEl = document.createElement('div')
        contentEl.classList.add('noContent')
        const noContent = document.querySelector('.noContent')
        noContent ? noContent.parentNode.removeChild(noContent) : null
        if (items.length === 0) {
            contentEl.innerText = 'There are no content with that title'
            root.appendChild(contentEl)
            return
            // dropdown.setAttribute('class', 'dropdown')
        }
        resultsWrapper.innerHTML = ''
        dropdown.classList.add('is-active')
        for (let item of items) {
            const option = document.createElement('a')
            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item)
            option.addEventListener('click', async (e) => {
                resultsWrapper.innerHTML = ''
                searchInput.value = inputValue(item)
                onOptionSelect(item)
            })
            resultsWrapper.appendChild(option)
        }
    }


    searchInput.addEventListener('input', debounce(onInput, 500))
    // searchBox1.addEventListener('blur', () => {
    //     dropdown.setAttribute('class', 'dropdown')
    // })

    document.addEventListener('click', e => {
        !root.contains(e.target) ? dropdown.classList.remove('is-active') : null
    })
}