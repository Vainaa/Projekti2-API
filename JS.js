
//Create elements for the page
function createElements(){

  //header
  var header = document.createElement("H2");
  var text = document.createTextNode("My todo list");
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

}



//placing elements on the page
createElements();


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

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  li.appendChild(document.createTextNode(inputValue));
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}