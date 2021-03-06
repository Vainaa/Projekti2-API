//----------- Load on refresh ------

//Laitetaan elementit sivulle
createElements();


//Luodaan elementit
function createElements() {
  
  var element = document.getElementById("div_1");
  var element2 = document.getElementById("div_2");
  var element3 = document.getElementById("div_3");
  var element4 = document.getElementById("div_4");

  //Header
  var header = document.createElement("HEADER");
  var text = document.createTextNode("Confirmed COVID19 Cases by country");
  header.appendChild(text);

  element.appendChild(header);

  //Input field
  var input = document.createElement("INPUT");
  input.type="text";
  input.setAttribute('placeholder','Country...');
  
  element2.appendChild(input);

  //Add-nappula
  var btn = document.createElement("BUTTON");
  text = document.createTextNode("Search");
 
  btn.appendChild(text);

  element2.appendChild(btn);

  //List
  var list = document.createElement("UL");
  list.className="covidList";
  
  element3.appendChild(list); 

  //Footer
  var btn = document.createElement("BUTTON");
  text = document.createTextNode("Clear All");
  btn.appendChild(text);
  element4.appendChild(btn);
}


//Haetaan elementit
const input = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const covidList = document.querySelector(".covidList");
const removeAllButton = document.querySelector(".footer button");
listItems(); //Kutsutaan listItems-funktiota

async function getCases(value) { // Haetaan rajapinnalta data hakusanan perusteella
  await fetch("https://api.covid19api.com/country/"+value+"/status/confirmed/live")
  .then(response => response.json())
  .then(data =>{
    if (localStorage.getItem("New Query") == null) { //Jos local storagessa ei ole dataa
      listArray = []; //Luodaan tyhjä array
    }
    if (value.trim() != 0) { //Tarkistetaan kenttävalidaatio  
        listArray.push((data[data.length-1].Country)+": "+(data[data.length-1].Cases)+" "+(data[data.length-1].Status) +" cases as of "+(data[data.length-1].Date).slice(0,-10)+"."); //Lisätään uusi arvo arrayhin
        localStorage.setItem("New Query", JSON.stringify(listArray)); //Itemin lisäys local storageen
    }
    else {
      document.querySelector(".inputField input").style.borderColor = "red";
      alert("You must write something"); //Alert-viesti   
    } 
    listItems(); //Kutsutaan listItems-funktiota
  })
  .catch(() => window.alert("Looks like something went wrong!\n\nCheck if the name of the country is spelled right"))
}

addButton.onclick = ()=> { //Kun käyttäjä klikkaa Search-buttonia
  getCases(input.value);//kutsutaan getCases funktiota
}

function listItems() {

  if (localStorage.getItem("New Query") == null) { //Jos local storagessa ei ole dataa
    listArray = []; //Luodaan tyhjä array
  } else {
    listArray = JSON.parse(localStorage.getItem("New Query")); //Lisätään itemit local storagelta
  }

  let newListItem = "";
  listArray.forEach((element, index) => {
    newListItem += `<li>${element}<span class="icon" onclick="removeItem(${index})"><span>\u00D7</span></span></li>`;
  });

  covidList.innerHTML = newListItem; //Lisätään uusi li-tagi ul-tagin sisällä
  input.value = ""; //Jätetään Input field tyhjäksi, kun taski on lisätty listaan
}

// Remove item -funktio
function removeItem(index) {
  listArray = JSON.parse(localStorage.getItem("New Query"));
  listArray.splice(index, 1); //Poistetaan li
  localStorage.setItem("New Query", JSON.stringify(listArray));
  listItems(); //Kutsutaan listItems-funktiota
}

// Clear All -nappula, joka poistaa kaiken listalta
removeAllButton.onclick = ()=> {
  listArray = []; //Tyhjennetään array
  localStorage.setItem("New Query", JSON.stringify(listArray)); //set item local storagessa
  listItems(); //Kutsutaan listItems-funktiota
}