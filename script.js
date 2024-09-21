const btn = document.querySelector('.btnNewPhrase')
const phrase = document.querySelector('.phrase')

const flagBr = document.querySelector('.br')
const flagUsa = document.querySelector('.usa')
var currentLanguage = 'en'
const languages = [
    {
        language: 'pt-br',
        btnNewPhrase: 'Nova Frase',
        txtFooter: 'Feito por eduardo2382'
    },
    {
        language: 'en',
        btnNewPhrase: 'New Phrase',
        txtFooter: 'Make by eduardo2382'
    }
]

flagBr.addEventListener('click', ()=>{
    if(currentLanguage != 'pt-br'){
        toggleLanguage()
    }
})

flagUsa.addEventListener('click', ()=>{
    if(currentLanguage != 'en'){
        toggleLanguage()
    }
})

btn.addEventListener('click', ()=>{
    getPhrase()
})

function toggleLanguage(){
    let languageBar = document.querySelector(".languageBar")

    if(currentLanguage == 'en'){
        currentLanguage = 'pt-br'
        translationPage()
        languageBar.style.left = '10px'
    } else{
        currentLanguage = 'en'
        translationPage()
        languageBar.style.left = '46px'
    }
}

function translationPage(){
    languages.forEach((item)=>{
        if(item.language == currentLanguage){
            btn.innerText = item.btnNewPhrase
            document.querySelector('.textFooter').innerText = item.txtFooter
        }
    })
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