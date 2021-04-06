//----------- Load on refresh ------

//placing elements on the page
createElements();


//creating elements on html page
function createElements() {
  
  var element = document.getElementById("div_1");
  var element2 = document.getElementById("div_2");
  var element3 = document.getElementById("div_3");
  var element4 = document.getElementById("div_4");

  //Header
  var header = document.createElement("HEADER");
  var text = document.createTextNode("My Todos");
  header.appendChild(text);

  element.appendChild(header);

  //Input field
  var input = document.createElement("INPUT");
  input.type="text";
  input.setAttribute('placeholder','Title...');
  element.setAttribute("required", ""); // HELP
  
  element2.appendChild(input);

  //Add button
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


// getting all required elements
const input = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllButton = document.querySelector(".footer button");

listItems(); //calling listItems function

addButton.onclick = ()=> { //when user clicks add button
  let InputValue = input.value; //getting input field value

  if (localStorage.getItem("New Todo") == null) { //if localstorage has no data
    listArray = []; //create a blank array
  } else {
    listArray = JSON.parse(localStorage.getItem("New Todo"));  //Adding items from local storage
  }
  if (InputValue.trim() != 0) { //check for valid input
    if (InputValue.length >= 3 && InputValue.length < 30) { 
      listArray.push(InputValue); //adding new value in array
      localStorage.setItem("New Todo", JSON.stringify(listArray)); //pushing item to local storage
    } else {
      alert("The input was not between 3 to 30 characters");
    }
  } else {
    alert("You must write something");
  }

  listItems(); //calling listItems function
}

function listItems() {
 

  if (localStorage.getItem("New Todo") == null) { //if localstorage has no data
    listArray = []; //create a blank array
  } else {
    listArray = JSON.parse(localStorage.getItem("New Todo")); //Adding items from local storage
  }
  const pendingTasks = document.querySelector(".pendingTasks");
  pendingTasks.textContent = listArray.length; //Getting task list length

  let newListItem = "";
  listArray.forEach((element, index) => {
    newListItem += `<li onclick="classList.toggle('checked')">${element}<span class="icon" onclick="deleteItem(${index})"><span>\u00D7</span></span></span></li>`;
  });

  todoList.innerHTML = newListItem; //adding new li tag inside ul tag
  input.value = ""; //once task added leave the input field blank
}

// delete item function
function deleteItem(index) {
  listArray = JSON.parse(localStorage.getItem("New Todo"));
  listArray.splice(index, 1); //remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  listItems(); //call the listItems function
}

// delete all items function
deleteAllButton.onclick = ()=> {
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  listItems(); //call the listItems function
}