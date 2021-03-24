createElements();


//creating elements on html page
function createElements(){
  
  var element = document.getElementById("div_1");
  var element2 = document.getElementById("div_2");
  var element3 = document.getElementById("div_3");
  var element4 = document.getElementById("div_4");

  //Header
  var header = document.createElement("HEADER");
  var text = document.createTextNode("Todo App");
  header.appendChild(text);

  element.appendChild(header);

  //Input field
  var input = document.createElement("INPUT");
  input.type="text";
  input.setAttribute('placeholder','Title...');
  
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
  text = document.createTextNode("Pending tasks: ");
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
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user clicks add button
  let InputValue = inputBox.value; //getting input field value
  let localStorageData = localStorage.getItem("New Todo"); //getting localstorage

  if (localStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  } else {
    listArray = JSON.parse(localStorageData);  //transforming json string into a js object
  }

  if(InputValue.trim() != 0){ //check for valid input
    if(InputValue.length >= 3 && InputValue.length < 30){ 
      listArray.push(InputValue); //pushing or adding new value in array
      localStorage.setItem("New Todo", JSON.stringify(listArray)); //pushing item to local storage
    } else {
      alert("Task name invalid");
    }
  }else {
    alert("Cannot be empty");
  }

  showTasks(); //calling showTask function
}

function showTasks(){
  let localStorageData = localStorage.getItem("New Todo");

  if(localStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(localStorageData); 
  }

  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //Getting task list length

  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><span>\u00D7</span></span></span></li>`;
  });

  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let localStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(localStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}
