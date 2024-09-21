const btn = document.querySelector('.btnNewPhrase')
const elementPhrase = document.querySelector('.phrase')

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

const loading = {
    newLoading : ()=>{
        let modal = document.querySelector('.modal')
        modal.style.display = 'flex'
    },
    deleteLoading : ()=>{
        let modal = document.querySelector('.modal')
        modal.style.display = 'none'
    }
}

if(localStorage.getItem('language') != undefined){
    currentLanguage = localStorage.getItem('language')
    setLanguage()
    translatePage()
    getPhrase()
} else{
    getPhrase()
}

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

function setLanguage(){
    let languageBar = document.querySelector(".languageBar")

    if(currentLanguage == 'pt-br'){
        languageBar.style.left = '10px'
        translatePage('pt-br')
    } else{
        languageBar.style.left = '46px'
        translatePage('en')
    }
}

function toggleLanguage(){
    if(currentLanguage == 'en'){
        translatePhrase('current', 'pt-br')
        currentLanguage = 'pt-br'
        window.localStorage.setItem('language', 'pt-br')
        translatePage('pt-br')
        setLanguage()
    } else{
        translatePhrase('current', 'en')
        currentLanguage = 'en'
        window.localStorage.setItem('language', 'en')
        translatePage('en')
        setLanguage()
    }
}

function translatePage(language){
    languages.forEach((item)=>{
        if(item.language == language){
            btn.innerText = item.btnNewPhrase
            document.querySelector('.textFooter').innerText = item.txtFooter
        }
    })
}

async function translatePhrase(text='current', language){
    if(text=='current'){
        let newPhrase = await fetch(`https://api.mymemory.translated.net/get?q=${elementPhrase.innerText}&langpair=${currentLanguage}|${language}`).then(reponse => reponse.json()).finally(loading.deleteLoading())

        elementPhrase.innerText = newPhrase.responseData.translatedText
        
    } else{
        let newPhrase = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|${language}`).then(reponse => reponse.json()).finally(loading.deleteLoading())

        return newPhrase.responseData.translatedText
    }
}

async function getPhrase() {
    try{
        let phrase = await fetch('https://api.kanye.rest').then(reponse => reponse.json())

        loadPhrase(phrase.quote)
    } catch(e){
        elementPhrase.Phrase.innerHTML = ''
        if(currentLanguage == 'pt-br'){
            elementPhrase.innerText = 'Sem frases'
        } else{
            elementPhrase.innerText = 'No sentences'
        }
    }
}

async function loadPhrase(text){
    if(currentLanguage == 'pt-br'){
        elementPhrase.innerText = await translatePhrase(text, 'pt-br')
    } else{
        elementPhrase.innerText = text
    }
}


