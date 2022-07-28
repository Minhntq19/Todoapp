const btnS = document.querySelector('button');
const taskInput = document.querySelector('.input__text');
const list = document.querySelector('.list');
//render
const app = {
	createTodo: (value) => {
		const newLi = document.createElement('li');
		newLi.classList.add('list__task');
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.classList.add('check__box', 'checkmark');
		const newDiv = document.createElement('div');
		newDiv.classList.add('task__content');
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
			if (child2) {
				if (child2.checked) {
					parents.classList.add('done');
				} else {
					parents.classList.remove('done');
				}
			}
			if (child1) {
				if (child1) {
					parents.remove();
				}
			}
		};
	},
	showDone: () => {
		const showBtn = document.querySelector('.show__done');
		showBtn.onclick = () => {
			app.hidePending();
		};
	},
	showPending: () => {
		const hideBtn = document.querySelector('.show__pending');
		hideBtn.onclick = () => {
			app.hideDone();
		};
	},
	hideDone: () => {
		const listTask = document.querySelectorAll('.done');
		listTask.forEach((value) => {
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
		listPending.forEach((e) => {
			e.classList.toggle('hide');
		});
	},
	edit: () => {},
	//call events
	start: () => {
		app.mark();
		app.add();
		app.showDone();
		app.showPending();
		app.edit();
	},
};
app.start();
