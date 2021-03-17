// Den vorher angelegten Container einbinden, in dem man sie im Dokument nach ihrer ID sucht und sie einer Konstante zuweisen.
const inpSearch = document.getElementById('inp-search');
const output = document.getElementById('output');

// Wir legen auf das window einen EventListener, der checkt, ob irgendwelche "load"-Events passiert sind, wenn ja, soll die Methode bzw function fetchCharacters aufgerufen werden. Während der Ladezeit soll die Methode loader aufgerufen werden.
window.addEventListener('load', () => {
    loader();
    fetchCharacters();
});

// Auf die Variable legen wir einen EventListener, der checkt, ob sich etwas bei der Sucheingabe geändert hat, wenn ja soll nach der neuen Eingabe gesucht werden, und die dazugehörigen Charactere aus der API geholt werden.Während der Ladezeit soll die Methode loader aufgerufen werden.
inpSearch.addEventListener('change', () => {
let searchQuery = inpSearch.value;
loader();
fetchCharacters(searchQuery);

});

// Diese Funktion ruft während der Ladezeit ein Gif auf, dass sich dreht.
function loader(){

    output.innerHTML = '<div class="gif-spinner mx-auto"><img src="img/loader.webp"></img></div>'
}

// Der function geben wir den Parameter mit, den wir vorher in die Searchbox eingeben.
async function fetchCharacters(query){
let res;

// wenn der gesuchte Name in der API vorhanden ist, sollen wir nur diessen aus der APi herausholen
if(query){
    res = await fetch(`https://www.breakingbadapi.com/api/characters?name=${query}`);
}

// ist der Name nicht in der API enthalten, sollen alle Charactere geholt werden.
else{
    res = await fetch (`https://www.breakingbadapi.com/api/characters`);
}
// Der neuen Variable results weisen wir die variable res der json datei zu
let results = await res.json();

// Bevor die neue Suche ausgegeben werden soll, sollen die anderen Elemente gelöscht werden.
output.innerHTML="";

// wir "mappen" also lassen die resultate anzeigen
results.map(result => {

    //Angezeigt sollen ein Image der gesuchten Person und einige Eckdaten werden, diese speichern wir in der Konstanste htmlString, die Eckdaten - außer das Foto, wird in einen Container gepackt
    const htmlString = `<img src= "${result.img}" class="img">
    <div class="info-display">
        <h5>Name: ${result.portrayed}</5>
        <hr>
        <h6>Actor Name: <span>${result.name}</span></h6>
        <h6>Nickname: <span>${result.nickname}</span></h6>
        <h6>Birthday: <span>${result.birthday}</span></h6>
        <h6>Status: <span>${result.status}</span></h6>
    </div>`;

//Die Variable outputString soll ein neuer Container im Dokument sein und ihm werden Attribute zum Style hinzugegeben
    let outputString = document.createElement('div');
    outputString.classList.add('col-md-3', 'mb-3', 'img-info');

    // Der outputString wird durch die Anweisung innerHTML zu htmlString gesetzt bzw. überschrieben, bzw. es werden ihm die Informationen, die in der Konstante htmlString gespeichert sind, übergeben. Mit appendChild wird das auf die anderen Elemente auch hinzugefügt bzw. angewendet
    outputString.innerHTML = htmlString;
    output.appendChild(outputString);

}); 
}