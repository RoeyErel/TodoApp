/**
 * @param isDark - Boolean for dark or light mode.
 * @param isDone - Boolean for complete mission status.
 * @param unDoneTodo - array for uncompleted todo.
 * @param doneTodo - array for completed todos.
 * @param counter1 - count the click on the input field.
 */
let isDark = true;
let isDone = false;
let onList = "undone";
const unDoneTodo = [];
const doneTodo = [];
let counter1 =0

//main elements
const main = document.querySelector("div");
const headline = document.querySelector("h1");
const app = document.createElement("div");

//Section A
const sectionA = document.createElement("div");
const inputTodo = document.createElement("input");
const addButton = document.createElement("button");

//Section B
const sectionB = document.createElement("div");
const categories = document.createElement("div");
const doneTab = document.createElement("button");
const unDoneTab = document.createElement("button");
const myList = document.createElement("div");
const toggleButton = document.createElement("button");

//Set properties for the elemnts
app.className = "app";
sectionA.className = "sectionA";
inputTodo.className = "inputTodo";
inputTodo.value = "WHAT WILL BE YOUR TASKS FOR TODAY?";
addButton.className = "addButton";
addButton.innerText = "ADD";

sectionB.className = "sectionB";
myList.className = "myList";
myList.id = 'style-2';
categories.className = 'categories';
doneTab.className = "doneTab";
unDoneTab.className = "unDoneTab";
doneTab.innerText = "Done";
unDoneTab.innerText = "UnDone";
toggleButton.innerText = 'LIGHT';
toggleButton.className = 'toggleButton'

//Power up the dark/light button
toggleButton.addEventListener('click', () => {
    toggleButton.innerText = isDark ? 'DARK' : 'LIGHT';
    toggleButton.style.backgroundColor = isDark ? '#26282f' : '#fff';
    toggleButton.style.border = isDark ? '#26282f' : 'black';
    toggleButton.style.color = isDark ? '#fff' : 'black';
    headline.style.color = isDark ? 'rgba(0, 0, 0, 0.769)' : 'rgba(255, 255, 255, 0.769)';
    inputTodo.style.backgroundColor = isDark ? '#f5f5f5' : '#26282f' ;
    inputTodo.style.color = isDark ? 'rgba(0, 0, 0, 0.669)' : 'rgba(202, 200, 200, 0.769';
    document.body.style.color = isDark ? '#26282f' : '#fff';
    document.body.style.backgroundColor = isDark ? '#f5f5f5' : '#26282f';
    sectionB.style.backgroundColor = isDark ? 'rgba(202, 200, 200, 0.369)' : 'rgba(255, 255, 255, 0.071)';
    unDoneTab.style.backgroundColor = isDark ? 'rgb(180, 180, 180)' : 'rgba(28, 28, 28, 0.67)';
    unDoneTab.style.color = isDark ? 'rgb(41, 41, 41)' : 'rgba(255, 255, 255, 1)';
    doneTab.style.backgroundColor = isDark ? 'rgb(230, 230, 230)' : 'rgba(255, 255, 255, 0)';
    doneTab.style.color = isDark ?  'rgb(41, 41, 41)' : 'rgb(255, 255, 255)';
    myList.style.backgroundColor = isDark ? '#fff' : '#26282f';
    isDark = !isDark;
})

/**
 * append the main elements
 */
document.body.append(main)
main.append(app)
app.append(sectionA, sectionB);
sectionA.append(inputTodo, addButton);
sectionB.append(categories, myList, toggleButton);
categories.append(unDoneTab,doneTab)
inputTodo.addEventListener('click', () =>{
    if(counter1 < 1){
        inputTodo.value = "";
    }
    counter1++;
})

/**
 * ~~~~~~~~~~~~~~
 * @param wichTab 
 */
const renderTodo = (wichTab) => {
    const currentTodosArr = wichTab === "unDone" ? unDoneTodo : doneTodo;
    myList.innerHTML = '';

    currentTodosArr.forEach(todo => {
        const todoContainer = document.createElement("div")
        const actionButtonContainer = document.createElement("div")
        const title = document.createElement("span");
        const removeButton = document.createElement("button");
        const doneButton = document.createElement("button");

        //Remove todo
        removeButton.addEventListener('click',() => {
            todoContainer.parentElement.removeChild(todoContainer);
        })

        //Move todo to the "done todos" list
        doneButton.addEventListener('click',() => {
           const todoIndex= currentTodosArr.findIndex(td => td.id === todo.id);
           const completedTodo = currentTodosArr.splice(todoIndex, 1);
           doneTodo.push(completedTodo[0])
           renderTodo("unDone")
        })
        //Dark/light mode button
        toggleButton.addEventListener('click', () => {
            todoContainer.style.backgroundColor = isDark ? 'rgb(35, 38, 45)' : 'rgba(255, 255, 255, 0.769)';
            todoContainer.style.color = isDark ?  'rgba(255, 255, 255, 0.769)' : 'rgb(33, 33, 33)';
        })

        title.innerText = todo.title;
        title.className = "todoText"
        actionButtonContainer.className = 'actionButton'

        removeButton.innerText = "REMOVE"
        doneButton.innerText = "DONE"
        removeButton.className = "removeButton"
        doneButton.className = "doneButton"
        todoContainer.classList.add('todo-container')

        actionButtonContainer.append(removeButton, doneButton)
        todoContainer.append(title, actionButtonContainer)
        myList.appendChild(todoContainer)

    })  
}

// Add todo with 'Enter' key
inputTodo.addEventListener("keyup", (event) => {
    if(event.code === 'Enter'){
        if(!inputTodo.value){
            return;   
        }
        const newTodo = {title: inputTodo.value ,isDone: false , id: Date.now()};
        unDoneTodo.push(newTodo);
        renderTodo("unDone");
        inputTodo.value = '';
    }
})

// Add todo
addButton.addEventListener('click', (event) => {
    if(!inputTodo.value){
        return;   
    }

    const newTodo = {title: inputTodo.value ,isDone: false , id: Date.now()};
    unDoneTodo.push(newTodo);
    renderTodo("unDone");
    inputTodo.value = '';
})

// create "pressed" mode for the undone button
unDoneTab.addEventListener('click', () => {
    unDoneTab.style.backgroundColor = isDark ? 'rgba(28, 28, 28, 0.67)' : 'rgb(180, 180, 180)';
    unDoneTab.style.color = isDark ? 'rgba(255, 255, 255, 1)' : 'rgb(41, 41, 41)';
    doneTab.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0)' : 'rgb(230, 230, 230)';
    doneTab.style.color = isDark ? 'rgb(255, 255, 255, 0.5)': 'rgb(41, 41, 41)';
    onList = "undone";
    renderTodo("unDone");
})

// create "pressed" mode for the done button
doneTab.addEventListener('click', () => { 
    doneTab.style.backgroundColor = isDark ? 'rgba(28, 28, 28, 0.67)': 'rgb(180, 180, 180)';
    doneTab.style.color = isDark ? 'rgb(255, 255, 255)': 'rgb(41, 41, 41)';
    unDoneTab.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0)' : 'rgb(230, 230, 230)';
    unDoneTab.style.color = isDark ? 'rgb(255, 255, 255, 0.5)': 'rgb(41, 41, 41)';
    onList = "done";
    renderTodo();
})
