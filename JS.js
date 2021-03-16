//----------- Load on refresh ------

//placing elements on the page
createElements();
loadList();

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}


// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('#myUL');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

//----------- Functions ------

//Create elements for the page
function createElements(){

  //header
  var header = document.createElement("H2");
  var text = document.createTextNode("My to-do list");
  header.appendChild(text);
  
  var element = document.getElementById("div_1");
  element.appendChild(header);

  //Input field
  var input = document.createElement("INPUT");
  input.type="text";
  input.className="input";
  input.setAttribute('id','myInput');
  input.setAttribute('placeholder','Title...');
  
  
  var element = document.getElementById("div_1");
  element.appendChild(input);

  //Add button
  var btn = document.createElement("SPAN");
  var text = document.createTextNode("Add");
  btn.className="addBtn";
  btn.setAttribute('onClick','newElement()');
  btn.setAttribute('placeholder','Title...');
  btn.appendChild(text);
  
  
  var element = document.getElementById("div_1");
  element.appendChild(btn);
  
  //List for the items
  var list = document.createElement("UL");
  list.setAttribute('id','myUL');

  var element = document.getElementById("div_2");
  element.appendChild(list); 

  var removeBtn = document.createElement("SPAN");
  var text = document.createTextNode("remove");
  removeBtn.className="removeBtn";
  removeBtn.setAttribute('onClick','removeFromList()');
  removeBtn.setAttribute('placeholder','Title...');
  removeBtn.appendChild(text);
  var element = document.getElementById("div_1");
  //element.appendChild(removeBtn);
}

//Loading list from localStorage
function loadList(){
  if(localStorage.getItem("toDos") != null) {
    var toDos = JSON.parse(localStorage.getItem("toDos"));
    for(var i = 0; i < toDos.length; i++){
      if(toDos[i].slice(-2).includes("\u00D7")){ 
        newItem(toDos[i].slice(0,-1));
      } else {
        newItem(toDos[i]);
      }
      
    }
  }
}

//Save list to the local storage
function saveStorage(){
  var toDos = [];
  const list = Array.from(document.querySelectorAll('#myUL>li'));
  for (var i = 0; i < list.length; i++ ){
      toDos.push(list[i].textContent);
  }
  const savedText = JSON.stringify(toDos)
  
  const editedText = savedText.slice(0,-1)
  localStorage.setItem("toDos",savedText);
}

//Removing item from list and localStorage
function removeFromList(){
  var toDos = [];
  const list = Array.from(document.querySelectorAll('#myUL>li'));
  
  for (var i = 0; i < list.length; i++ ){
      toDos.push(list[i].textContent);
  }
  localStorage.removeItem("toDos",JSON.stringify(toDos));
}

// Create a new list item when clicking on the "Add" button
function newElement() {

  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  
  if (inputValue === '') {
    alert("You must write something!");
  } else if (inputValue.length < 3 || inputValue.length > 30) {
    alert("The input was not between 3 to 30 characters");
  } else {
    li.appendChild(document.createTextNode(inputValue));
    newItem(inputValue)
    closeButton();
    document.getElementById("myInput").value = "";
  }
}

//Creating list items
function newItem (item){
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
    document.getElementById("myUL").appendChild(li);
    saveStorage();
}

//Add close button and necessary functions for a new list item
function closeButton(){
  var myNodelist = document.getElementsByTagName("LI");
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);

    var close = document.getElementsByClassName("close");
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
}
