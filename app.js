'use strict';
const btnS = document.querySelector('button');
const taskInput = document.querySelector('.input__text');
const list = document.querySelector('.list');
const showBtn = document.querySelector('.show__done');
const hideBtn = document.querySelector('.show__pending');
let i = 0;
//render
const app = {
	checker: false,
	createTodo: (value) => {
		i = ++i;
		const newLi = document.createElement('li');
		if (app.checker) {
			newLi.classList.add('list__task', 'hide', 'fade');
		} else {
			newLi.classList.add('list__task');
		}
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.setAttribute('id', `${i}`);
		checkbox.classList.add('check__box');
		const newDiv = document.createElement('label');
		newDiv.classList.add('task__content');
		newDiv.setAttribute('for', `${i}`);
		newDiv.innerText = value;
		const newEdit = document.createElement('i');
		newEdit.classList.add('fa-solid', 'fa-pen-to-square');
		const newDelete = document.createElement('i');
		newDelete.classList.add('fa-solid', 'fa-trash-can');
		newLi.append(checkbox, newDiv, newEdit, newDelete);
		list.appendChild(newLi);
	},
	add: () => {
		//click add
		btnS.onclick = () => {
			if (taskInput.value) {
				app.createTodo(taskInput.value);
				app.saveLocal(taskInput.value);
				taskInput.value = '';
			}
		};
		taskInput.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				btnS.click();
			}
		});
	},
	// Mark as done
	mark: () => {
		list.onclick = (e) => {
			const parents = e.target.closest('li');
			const child1 = e.target.closest('.fa-trash-can');
			const child2 = e.target.closest('.check__box');
			const child3 = parents.children;
			if (child2) {
				if (child2.checked) {
					if (!hideBtn.checked) {
						parents.classList.add('done');
					} else if (hideBtn.checked && showBtn.checked) {
						parents.classList.add('done');
					} else {
						parents.classList.add('done', 'hide', 'fade');
					}
				} else {
					if (!showBtn.checked) {
						parents.classList.remove('done');
					} else if (hideBtn.checked && showBtn.checked) {
						parents.classList.remove('done');
					} else {
						parents.classList.remove('done');
						parents.classList.add('hide', 'fade');
					}
				}
			}
			if (child1) {
				if (child1) {
					parents.classList.add('fade');
					setTimeout(() => {
						parents.remove();
					}, 200);
					app.deleteLocal(child3[1].textContent);
				}
			}
		};
	},
	showDone: () => {
		showBtn.onclick = (e) => {
			if (hideBtn.checked) {
				app.hideDone();
			} else {
				app.hidePending();
			}
			const showChild = e.target.closest('input');
			app.checker = showChild.checked;
		};
	},
	showPending: () => {
		hideBtn.onclick = () => {
			if (showBtn.checked) {
				app.hidePending();
			} else {
				app.hideDone();
			}
			console.log(hideBtn.checked);
		};
	},
	hideDone: () => {
		const listTask = document.querySelectorAll('.done');
		listTask.forEach((value) => {
			value.classList.toggle('fade');
			value.classList.toggle('hide');
		});
	},
	hidePending: () => {
		const listTasks = document.querySelectorAll('.list__task');
		const listPending = [];
		for (var i = 0; i < listTasks.length; i++) {
			if (listTasks[i].className !== 'list__task done') {
				listPending.push(listTasks[i]);
			}
		}
		listPending.forEach((value) => {
			value.classList.toggle('fade');
			value.classList.toggle('hide');
		});
	},
	edit: () => {},
	saveLocal: (todo) => {
		let todos;
		if (localStorage.getItem('todos')) {
			todos = JSON.parse(localStorage.getItem('todos'));
		} else {
			todos = [];
		}
		todos.push(todo);
		localStorage.setItem('todos', JSON.stringify(todos));
	},
	loadLocal: () => {
		let todos;
		if (localStorage.getItem('todos')) {
			todos = JSON.parse(localStorage.getItem('todos'));
		} else {
			todos = [];
		}
		todos.forEach((value) => {
			app.createTodo(value);
		});
	},
	deleteLocal: (value) => {
		let todos;
		if (localStorage.getItem('todos')) {
			todos = JSON.parse(localStorage.getItem('todos'));
		} else {
			todos = [];
		}
		todos.splice(todos.indexOf(value), 1);
		localStorage.setItem('todos', JSON.stringify(todos));
	},
	//call events
	start: () => {
		app.mark();
		app.add();
		app.showDone();
		app.showPending();
		app.edit();
		app.loadLocal();
	},
};
app.start();
