const btn = document.querySelector('.btnNewPhrase')
const phrase = document.querySelector('.phrase')

const flagBr = document.querySelector('.br')
const flagUsa = document.querySelector('.usa')
var language = 'usa'

flagBr.addEventListener('click', ()=>{
    if(language != 'br'){
        toggleLanguage()
    }
})

flagUsa.addEventListener('click', ()=>{
    if(language != 'usa'){
        toggleLanguage()
    }
})

btn.addEventListener('click', ()=>{
    getPhrase()
})

function toggleLanguage(){
    let languageBar = document.querySelector(".languageBar")

    if(language == 'usa'){
        language = 'br'
        languageBar.style.left = '10px'
    } else{
        language = 'usa'
        languageBar.style.left = '46px'
    }
}


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