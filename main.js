/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n\n\n\nlet library = document.getElementById(\"library\")\nlet todolibrary = [];\n\n\nlet storedlibrary = (0,_store__WEBPACK_IMPORTED_MODULE_0__.getStore)();\nif (storedlibrary != false){\ntodolibrary = storedlibrary;\n}\n\nconsole.log(todolibrary);//debug\n\ndisplay()\n\n//factory function for todo item\nfunction Todoitem(title, description, duedate, priority, project, check){\n    return {title, description, duedate, priority, project, check}\n}\n//create an overlay to focus on the current todo\nlet overlay = document.getElementById('overlay')\n//allow user to edit sections of the todo\nfunction expand(currentTodo){\n    overlay.replaceChildren();\n    document.getElementById(\"overlay\").style.display = \"block\";\n    let expandedCard = document.createElement('div');\n    expandedCard.id = \"expandedcard\"\n    overlay.appendChild(expandedCard);\n\n    let todoTitle = document.createElement('h2');\n    todoTitle.textContent = currentTodo.title;\n    todoTitle.setAttribute('contenteditable', 'true');\n    expandedCard.appendChild(todoTitle);\n\n    let todoDescription = document.createElement('p');\n    todoDescription.textContent = currentTodo.description;\n    todoDescription.setAttribute('contenteditable', 'true');\n    expandedCard.appendChild(todoDescription);\n\n    let todoDuedate = document.createElement('input');\n    todoDuedate.type = 'date';\n    todoDuedate.value = currentTodo.duedate;\n    expandedCard.appendChild(todoDuedate)\n\n    let priorityarr = ['low', 'medium', 'high'];\n    let prioritydiv = document.createElement('div')\n    prioritydiv.id = \"prioritydiv\"\n    prioritydiv.textContent = \"Priority:\"\n    priorityarr.forEach(function(selection){\n        let prioritybutton = document.createElement('button');\n        prioritybutton.className = 'prioritybuttons';\n        prioritydiv.appendChild(prioritybutton)\n        prioritybutton.textContent = selection;\n        expandedCard.appendChild(prioritydiv)\n\n        prioritybutton.addEventListener('click', function(){\n            todolibrary[currentTodo.libraryIndex]['priority'] = prioritybutton.textContent\n            console.log(todolibrary[currentTodo.libraryIndex]['priority'])\n        })\n    })\n    let selectedPriorityButton;\n    prioritydiv.onclick = function(e){\n        if (e.target.className == 'prioritybuttons'){\n            highlight(e.target)\n        }\n    }\n\n    function highlight(prioritybtn){\n        if (selectedPriorityButton){\n            selectedPriorityButton.classList.remove(\"highlight\")\n        }\n        selectedPriorityButton = prioritybtn;\n        selectedPriorityButton.classList.add(\"highlight\")\n    }\n\n   \n    \n    let closebutton = document.createElement('button');\n    closebutton.textContent = 'Save changes';\n    expandedCard.appendChild(closebutton);\n\n    closebutton.addEventListener('click', function(){\n        overlay.style.display = \"none\";\n        todolibrary[currentTodo.libraryIndex]['title'] = todoTitle.textContent;\n        todolibrary[currentTodo.libraryIndex]['description'] = todoDescription.textContent;\n        todolibrary[currentTodo.libraryIndex]['duedate'] = todoDuedate.value;\n        \n        display();\n    })\n\n    let cancelbutton = document.createElement('button');\n    cancelbutton.textContent = \"Cancel\";\n    expandedCard.appendChild(cancelbutton);\n    cancelbutton.addEventListener('click', () =>{\n        overlay.style.display = \"none\";\n        display();\n    })\n}\n\n\n//display all to do items\nfunction display(){\n    library.replaceChildren();\n    for (let i=0; i<todolibrary.length;i++){\n        let currentTodo = todolibrary[i];\n\t    currentTodo.libraryIndex = i;\n\n        let libraryCard = document.createElement('div');\n\t    libraryCard.classList.add('libraryCard');\n\t    libraryCard.setAttribute('data-deleteIndex', currentTodo.libraryIndex);\n\t    library.appendChild(libraryCard);\n\n        let todoTitle = document.createElement('h2');\n\t    todoTitle.textContent = currentTodo.title;\n\t    libraryCard.appendChild(todoTitle);\n\n        let todoDescription = document.createElement('p');\n        todoDescription.textContent = currentTodo.description;\n        libraryCard.appendChild(todoDescription);\n\n        let todoDuedate = document.createElement('p');\n        todoDuedate.textContent = `Due: ${currentTodo.duedate}`;\n        libraryCard.appendChild(todoDuedate);\n\n        let todoPriority = document.createElement('p');\n        todoPriority.textContent = `${currentTodo.priority} priority`;\n        libraryCard.appendChild(todoPriority);\n\n        let todoCheck = document.createElement('input');\n        todoCheck.setAttribute('type', 'checkbox');\n        libraryCard.appendChild(todoCheck);\n        todoCheck.addEventListener('click', function(){\n            if(currentTodo.check == false){\n            currentTodo.check = true\n            }else{\n                currentTodo.check = false\n            }\n        })\n        let todoCheckLabel = document.createElement('label');\n        todoCheckLabel.innerHTML = 'checklabel'\n        todoCheck.appendChild(todoCheckLabel)\n\n        let deleteButton = document.createElement('button');\n        deleteButton.innerHTML = 'Delete this todo';\n        deleteButton.setAttribute('data-buttonDeleteIndex', currentTodo.libraryIndex);\n        libraryCard.appendChild(deleteButton);\n    \n        deleteButton.addEventListener('click', function(){\n            (0,_store__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(todolibrary)\n        })\n        //add event listener to each button that will check if button's attribute == library card's attribute\n        //remove book from DOM and from array\n        deleteButton.addEventListener(\"click\", function(){\n            if (deleteButton.getAttribute('data-buttonDeleteIndex') == libraryCard.getAttribute('data-deleteIndex')) {\n                libraryCard.remove()\n                todolibrary.splice(libraryCard.getAttribute('data-deleteIndex'), 1)\n            }})\n\n            let expandButton = document.createElement('button');\n            expandButton.innerHTML = 'Expand this todo';\n            expandButton.addEventListener('click', function(){\n                expand(currentTodo);\n            })\n            libraryCard.appendChild(expandButton);\n    }\n}\n\n//add the current todo item to the array of all todo items\nfunction createtodoitem(){\n     let addtodo = Todoitem(document.getElementById(\"title\").value,\n                            document.getElementById(\"description\").value,\n                            document.getElementById(\"duedate\").value,\n                            document.getElementById(\"priority\").value,\n                            document.getElementById(\"project\").value,\n                            false)\n    todolibrary.push(addtodo)\n   \n    display();\n}\n// display according to one of the three categories\nfunction displaycategory(x){\n    display();\n\n        for (let i=0; i<todolibrary.length;i++){\n            let currentTodo = todolibrary[i];\n            currentTodo.libraryIndex = i;\n    \n        if (currentTodo.project != x){\n            let libraryCard = document.querySelector(`[data-deleteIndex=\"${currentTodo.libraryIndex}\"]`);\n            libraryCard.style.display = 'none';\n        }\n    }\n}\n\nlet selectedCategory;\ndocument.getElementById(\"projectcontainer\").onclick = function(e){\n    if (e.target.className = \"projectitem\"){\n        highlight(e.target)\n    }\n}\nfunction highlight(category){\n    if (selectedCategory){\n        selectedCategory.classList.remove(\"highlight\")\n    }\n    selectedCategory = category;\n    category.classList.add(\"highlight\")\n}\n\n\nconst submitbutton = document.getElementById(\"submit\");\nsubmitbutton.addEventListener(\"click\", createtodoitem);\nsubmitbutton.addEventListener(\"click\", function(){\n    document.getElementById('todoform').reset();\n})\nsubmitbutton.addEventListener(\"click\", function(){\n    ;(0,_store__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(todolibrary)\n})\n\nlet homebutton = document.getElementById('home');\nhomebutton.addEventListener('click', function(){\n    displaycategory('home')\n});\n\n\nlet acadbutton = document.getElementById('academic');\nacadbutton.addEventListener('click', function(){\n    displaycategory('academic')\n});\n\nlet workbutton = document.getElementById('work');\nworkbutton.addEventListener('click', function(){\n    displaycategory('work')\n});\n\nlet allbutton = document.getElementById('all');\nallbutton.addEventListener('click', function(){\n    display()\n});\n\n\n\n\n\n\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ store),\n/* harmony export */   \"getStore\": () => (/* binding */ getStore)\n/* harmony export */ });\n\nfunction store(todolibrary){\n    if (typeof(Storage) !== \"undefined\") {\n        // Store\n        localStorage.setItem(\"librarystorage\", JSON.stringify(todolibrary));\n        // Retrieve\n        const writelibrary = JSON.parse(localStorage.getItem(\"librarystorage\"));\n        console.log(writelibrary)\n      } else {\n        console.log(\"Sorry, your browser does not support Web Storage...\")\n      }\n}\n\nfunction getStore(){\n    if (typeof(Storage) !== \"undefined\" && localStorage.getItem(\"title\")!=null) {\n        // Retrieve\n        let storedlibrary = JSON.parse(localStorage.getItem(\"librarystorage\"))\n        console.log(storedlibrary)\n        return storedlibrary\n      } else {\n        return false;\n      }\n}\n\n//# sourceURL=webpack://todo/./src/store.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;