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
  var text = document.createTextNode("My To-Do's");
  header.appendChild(text);

  element.appendChild(header);

  //Input field
  var input = document.createElement("INPUT");
  input.type="text";
  input.setAttribute('placeholder','Title...');
  
  element2.appendChild(input);

  //Add-nappula
  var btn = document.createElement("BUTTON");
  text = document.createTextNode("Add");
 
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

addButton.onclick = ()=> { //Kun käyttäjä klikkaa Add-buttonia
  let InputValue = input.value; //Haetaan Input fieldin arvo

  if (localStorage.getItem("New Todo") == null) { //Jos local storagessa ei ole dataa
    listArray = []; //Luodaan tyhjä array
  } else {
    listArray = JSON.parse(localStorage.getItem("New Todo"));  //Lisätään itemit local storagelta
  }
  if (InputValue.trim() != 0) { //Tarkistetaan kenttävalidaatio
    if (InputValue.length >= 3 && InputValue.length < 30) { 
      listArray.push(InputValue); //Lisätään uusi arvo arrayhin
      localStorage.setItem("New Todo", JSON.stringify(listArray)); //Itemin lisäys local storageen
    } else {
      document.querySelector(".inputField input").style.borderColor = "red";
      alert("The input was not between 3 to 30 characters"); //Alert-viesti  
    }
  } else {
    document.querySelector(".inputField input").style.borderColor = "red";
    alert("You must write something"); //Alert-viesti   
  }

  listItems(); //Kutsutaan listItems-funktiota
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
<<<<<<< HEAD
    newListItem += `<li onclick="classList.toggle('checked')">${element}<span class="icon" onclick="removeItem(${index})"><span>\u00D7</span></span></li>`;
=======
    newListItem += `<li onclick="classList.toggle('checked')">${element}<span class="icon" onclick="removeItem(${index})"><span>\u00D7</span></span></span></li>`; //Tehdyn taskin yliviivaus
>>>>>>> a3bbbb19ad622f3c887b2d1b5fa73bd40300da56
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