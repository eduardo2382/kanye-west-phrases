const btn = document.querySelector('button')
const phrase = document.querySelector('.phrase')

btn.addEventListener('click', ()=>{
    getPhrase()
})


async function getPhrase() {
    try{
        let phrase = await fetch('https://api.kanye.rest').then(reponse => reponse.json())

        loadPhrase(phrase.quote)
    } catch(e){
        phrase.innerHTML = ''
        phrase.innerText = 'Sem frases'
    }
}

async function loadPhrase(text){
    phrase.innerText = text

}

getPhrase()