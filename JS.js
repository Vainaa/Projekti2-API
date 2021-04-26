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
  var text = document.createTextNode("Search for country");
  header.appendChild(text);

  element.appendChild(header);

  //Input field
  var input = document.createElement("INPUT");
  input.type="text";
  input.setAttribute('placeholder','Title...');
  
  element2.appendChild(input);

  //Add-nappula
  var btn = document.createElement("BUTTON");
  text = document.createTextNode("Search");
 
  btn.appendChild(text);

  element2.appendChild(btn);

  //List
  var list = document.createElement("UL");
  list.className="todoList";
  
  element3.appendChild(list); 

  //Footer
  var spn = document.createElement("SPAN");
  text = document.createTextNode("Current tasks: ");
  spn.appendChild(text);
  var number = document.createElement("SPAN");
  number.className="pendingTasks";
  spn.appendChild(number)

  element4.appendChild(spn);

  var btn = document.createElement("BUTTON");
  text = document.createTextNode("Clear All");
  btn.appendChild(text);
  element4.appendChild(btn);
}


//Haetaan elementit
const input = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const removeAllButton = document.querySelector(".footer button");

listItems(); //Kutsutaan listItems-funktiota

function loadDoc(value) {
  fetch("https://api.covid19api.com/country/"+value+"/status/confirmed/live")
  .then(response => response.json())
  .then(data => numberOfCases=(data[data.length-1].Cases))
}

var numberOfCases ='';


addButton.onclick = ()=> { //Kun käyttäjä klikkaa Add-buttonia
  var InputValue = input.value; //Haetaan Input fieldin arvo
  loadDoc(InputValue); 
  setTimeout(()=>{
    
    
    if (localStorage.getItem("New Todo") == null) { //Jos local storagessa ei ole dataa
      listArray = []; //Luodaan tyhjä array
    }
    if (InputValue.trim() != 0) { //Tarkistetaan kenttävalidaatio
        var text = InputValue+": "+numberOfCases+" Confirmed cases.";
        listArray.push(text); //Lisätään uusi arvo arrayhin
        localStorage.setItem("New Todo", JSON.stringify(listArray)); //Itemin lisäys local storageen
      
        
        
    } else {
      document.querySelector(".inputField input").style.borderColor = "red";
      alert("You must write something"); //Alert-viesti   
    }
    
    listItems(); //Kutsutaan listItems-funktiota
  },100
  )
  
}

function listItems() {
 

  if (localStorage.getItem("New Todo") == null) { //Jos local storagessa ei ole dataa
    listArray = []; //Luodaan tyhjä array
  } else {
    listArray = JSON.parse(localStorage.getItem("New Todo")); //Lisätään itemit local storagelta
  }
  const pendingTasks = document.querySelector(".pendingTasks");
  pendingTasks.textContent = listArray.length; //Lasketaan jäljellä olevat tehtävät ja tulostetaan Current tasksin perään numerona

  let newListItem = "";
  listArray.forEach((element, index) => {
    newListItem += `<li>${element}<span class="icon" onclick="removeItem(${index})"><span>\u00D7</span></span></li>`;
  });

  todoList.innerHTML = newListItem; //Lisätään uusi li-tagi ul-tagin sisällä
  input.value = ""; //Jätetään Input field tyhjäksi, kun taski on lisätty listaan
}

// Remove item -funktio
function removeItem(index) {
  listArray = JSON.parse(localStorage.getItem("New Todo"));
  listArray.splice(index, 1); //Poistetaan li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  listItems(); //Kutsutaan listItems-funktiota
}

// Clear All -nappula, joka poistaa kaiken listalta
removeAllButton.onclick = ()=> {
  listArray = []; //Tyhjennetään array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set item local storagessa
  listItems(); //Kutsutaan listItems-funktiota
}