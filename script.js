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
        translatePhrase('current', 'pt-br')
        currentLanguage = 'pt-br'
        translatePage()
        languageBar.style.left = '10px'
    } else{
        translatePhrase('current', 'en')
        currentLanguage = 'en'
        translatePage()
        
        languageBar.style.left = '46px'
    }
}

function translatePage(){
    languages.forEach((item)=>{
        if(item.language == currentLanguage){
            btn.innerText = item.btnNewPhrase
            document.querySelector('.textFooter').innerText = item.txtFooter
        }
    })
}

async function translatePhrase(text='current', language){
    if(text=='current'){
        let newPhrase = await fetch(`https://api.mymemory.translated.net/get?q=${elementPhrase.innerText}&langpair=${currentLanguage}|${language}`).then(reponse => reponse.json())

        elementPhrase.innerText = newPhrase.responseData.translatedText
    } else{
        let newPhrase = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|${language}`).then(reponse => reponse.json())

        return newPhrase.responseData.translatedText
    }
}

async function getPhrase() {
    try{
        let phrase = await fetch('https://api.kanye.rest').then(reponse => reponse.json())

        loadPhrase(phrase.quote)
    } catch(e){
        elementPhrase.Phrase.innerHTML = ''
        elementPhrase.innerText = 'Sem frases'
    }
}

async function loadPhrase(text){
    if(currentLanguage == 'pt-br'){
        elementPhrase.innerText = await translatePhrase(text, 'pt-br')
    } else{
        elementPhrase.innerText = text
    }
}

getPhrase()