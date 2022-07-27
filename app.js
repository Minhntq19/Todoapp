const btns = document.querySelector('button');
const taskinput = document.querySelector('.input__text');
const listtask = document.querySelector('.list');
const html = [];
//render
const app = {
	render: () => {
		const htmls = html.map((value, index) => {
			return `<li class="list__task" id="${index}">
				<input type="checkbox" class="check__box"/>
				<div class="task__content" >${value}</div>
				<i class="fa-solid fa-pen-to-square"></i>
				<i class="fa-solid fa-trash-can"></i>
			</li>`;
		});
		listtask.innerHTML = htmls.join('');
		taskinput.value = '';
	},
	add: function () {
		btns.onclick = () => {
			if (taskinput.value) {
				html.push(taskinput.value);
				app.render();
			}
		};
		taskinput.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				btns.click();
				app.render();
			}
		});
	},
	// Mark as done
	mark: () => {
		listtask.onclick = (e) => {
			const parents = e.target.closest('li');
			const child1 = e.target.closest('.fa-trash-can');
			const child2 = e.target.closest('.check__box');
			if (child2) {
				if (child2.checked) {
					parents.querySelector('.task__content').classList.add('done');
				} else {
					parents.querySelector('.task__content').classList.remove('done');
				}
			}
			if (child1) {
				if (child1) {
					parents.remove();
					html.splice(parents.id, 1);
				}
				app.render();
			}
			console.log(child2, parents, child1);
		};
	},
	// Delete task
	// deletefnc: () => {
	// 	listtask.onclick = (e) => {
	// 		const parents = e.target.closest('li');
	// 		const child1 = e.target.closest('.fa-trash-can');
	//
	// 		app.render();
	// 	};
	// },
	start: () => {
		app.render();
		app.mark();
		// app.deletefnc();
		app.add();
	},
};
app.start();
