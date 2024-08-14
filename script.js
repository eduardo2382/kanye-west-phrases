const btn = document.querySelector('button')
const main = document.querySelector('main')

btn.addEventListener('click', ()=>{
    getPhrase()
})

async function getPhrase() {
    try{
        let phrase = await fetch('https://api.kanye.rest').then(reponse => reponse.json())

        loadPhrase(phrase.quote)
    } catch(e){
        main.innerHTML = ''
        main.innerText = 'Sem frases'
    }
}

async function loadPhrase(phrase){
    main.innerHTML = ''

    let text = document.createElement('h1')

    let author = document.createElement('p')
    author.innerText = '-Kanye West'

    text.innerText = `"${phrase}"`
    main.appendChild(text)
    main.appendChild(author)

}

getPhrase()