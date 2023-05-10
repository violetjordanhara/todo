import store from "./store"
import { getStore } from "./store"

let library = document.getElementById("library")
let todolibrary = [];


let storedlibrary = getStore();
if (storedlibrary != false){
todolibrary = storedlibrary;
}

console.log(todolibrary);//debug

display()

//factory function for todo item
function Todoitem(title, description, duedate, priority, project, check){
    return {title, description, duedate, priority, project, check}
}
//create an overlay to focus on the current todo
let overlay = document.getElementById('overlay')
//allow user to edit sections of the todo
function expand(currentTodo){
    overlay.replaceChildren();
    document.getElementById("overlay").style.display = "block";
    let expandedCard = document.createElement('div');
    expandedCard.id = "expandedcard"
    overlay.appendChild(expandedCard);

    let todoTitle = document.createElement('h2');
    todoTitle.textContent = currentTodo.title;
    todoTitle.setAttribute('contenteditable', 'true');
    expandedCard.appendChild(todoTitle);

    let todoDescription = document.createElement('p');
    todoDescription.textContent = currentTodo.description;
    todoDescription.setAttribute('contenteditable', 'true');
    expandedCard.appendChild(todoDescription);

    let todoDuedate = document.createElement('input');
    todoDuedate.type = 'date';
    todoDuedate.value = currentTodo.duedate;
    expandedCard.appendChild(todoDuedate)

    let priorityarr = ['low', 'medium', 'high'];
    let prioritydiv = document.createElement('div')
    prioritydiv.id = "prioritydiv"
    prioritydiv.textContent = "Priority:"
    priorityarr.forEach(function(selection){
        let prioritybutton = document.createElement('button');
        prioritybutton.className = 'prioritybuttons';
        prioritydiv.appendChild(prioritybutton)
        prioritybutton.textContent = selection;
        expandedCard.appendChild(prioritydiv)

        prioritybutton.addEventListener('click', function(){
            todolibrary[currentTodo.libraryIndex]['priority'] = prioritybutton.textContent
            console.log(todolibrary[currentTodo.libraryIndex]['priority'])
        })
    })
    let selectedPriorityButton;
    prioritydiv.onclick = function(e){
        if (e.target.className == 'prioritybuttons'){
            highlight(e.target)
        }
    }

    function highlight(prioritybtn){
        if (selectedPriorityButton){
            selectedPriorityButton.classList.remove("highlight")
        }
        selectedPriorityButton = prioritybtn;
        selectedPriorityButton.classList.add("highlight")
    }

   
    
    let closebutton = document.createElement('button');
    closebutton.textContent = 'Save changes';
    expandedCard.appendChild(closebutton);

    closebutton.addEventListener('click', function(){
        overlay.style.display = "none";
        todolibrary[currentTodo.libraryIndex]['title'] = todoTitle.textContent;
        todolibrary[currentTodo.libraryIndex]['description'] = todoDescription.textContent;
        todolibrary[currentTodo.libraryIndex]['duedate'] = todoDuedate.value;
        
        display();
    })

    let cancelbutton = document.createElement('button');
    cancelbutton.textContent = "Cancel";
    expandedCard.appendChild(cancelbutton);
    cancelbutton.addEventListener('click', () =>{
        overlay.style.display = "none";
        display();
    })
}


//display all to do items
function display(){
    library.replaceChildren();
    for (let i=0; i<todolibrary.length;i++){
        let currentTodo = todolibrary[i];
	    currentTodo.libraryIndex = i;

        let libraryCard = document.createElement('div');
	    libraryCard.classList.add('libraryCard');
	    libraryCard.setAttribute('data-deleteIndex', currentTodo.libraryIndex);
	    library.appendChild(libraryCard);

        let todoTitle = document.createElement('h2');
	    todoTitle.textContent = currentTodo.title;
	    libraryCard.appendChild(todoTitle);

        let todoDescription = document.createElement('p');
        todoDescription.textContent = currentTodo.description;
        libraryCard.appendChild(todoDescription);

        let todoDuedate = document.createElement('p');
        todoDuedate.textContent = `Due: ${currentTodo.duedate}`;
        libraryCard.appendChild(todoDuedate);

        let todoPriority = document.createElement('p');
        todoPriority.textContent = `${currentTodo.priority} priority`;
        libraryCard.appendChild(todoPriority);

        let todoCheck = document.createElement('input');
        todoCheck.setAttribute('type', 'checkbox');
        libraryCard.appendChild(todoCheck);
        todoCheck.addEventListener('click', function(){
            if(currentTodo.check == false){
            currentTodo.check = true
            }else{
                currentTodo.check = false
            }
        })
        let todoCheckLabel = document.createElement('label');
        todoCheckLabel.innerHTML = 'checklabel'
        todoCheck.appendChild(todoCheckLabel)

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete this todo';
        deleteButton.setAttribute('data-buttonDeleteIndex', currentTodo.libraryIndex);
        libraryCard.appendChild(deleteButton);
    
        deleteButton.addEventListener('click', function(){
            store(todolibrary)
        })
        //add event listener to each button that will check if button's attribute == library card's attribute
        //remove book from DOM and from array
        deleteButton.addEventListener("click", function(){
            if (deleteButton.getAttribute('data-buttonDeleteIndex') == libraryCard.getAttribute('data-deleteIndex')) {
                libraryCard.remove()
                todolibrary.splice(libraryCard.getAttribute('data-deleteIndex'), 1)
            }})

            let expandButton = document.createElement('button');
            expandButton.innerHTML = 'Expand this todo';
            expandButton.addEventListener('click', function(){
                expand(currentTodo);
            })
            libraryCard.appendChild(expandButton);
    }
}

//add the current todo item to the array of all todo items
function createtodoitem(){
     let addtodo = Todoitem(document.getElementById("title").value,
                            document.getElementById("description").value,
                            document.getElementById("duedate").value,
                            document.getElementById("priority").value,
                            document.getElementById("project").value,
                            false)
    todolibrary.push(addtodo)
   
    display();
}
// display according to one of the three categories
function displaycategory(x){
    display();

        for (let i=0; i<todolibrary.length;i++){
            let currentTodo = todolibrary[i];
            currentTodo.libraryIndex = i;
    
        if (currentTodo.project != x){
            let libraryCard = document.querySelector(`[data-deleteIndex="${currentTodo.libraryIndex}"]`);
            libraryCard.style.display = 'none';
        }
    }
}

let selectedCategory;
document.getElementById("projectcontainer").onclick = function(e){
    if (e.target.className = "projectitem"){
        highlight(e.target)
    }
}
function highlight(category){
    if (selectedCategory){
        selectedCategory.classList.remove("highlight")
    }
    selectedCategory = category;
    category.classList.add("highlight")
}


const submitbutton = document.getElementById("submit");
submitbutton.addEventListener("click", createtodoitem);
submitbutton.addEventListener("click", function(){
    document.getElementById('todoform').reset();
})
submitbutton.addEventListener("click", function(){
    store(todolibrary)
})

let homebutton = document.getElementById('home');
homebutton.addEventListener('click', function(){
    displaycategory('home')
});


let acadbutton = document.getElementById('academic');
acadbutton.addEventListener('click', function(){
    displaycategory('academic')
});

let workbutton = document.getElementById('work');
workbutton.addEventListener('click', function(){
    displaycategory('work')
});

let allbutton = document.getElementById('all');
allbutton.addEventListener('click', function(){
    display()
});





