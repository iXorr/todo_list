let editFlag;
let subtaskFlag;

const btn_add_task = document.querySelector(".add-task");
const header_no_tasks = document.querySelector(".header-no-tasks");
const header_any_tasks = document.querySelector('.header-any-tasks');
const tasks_menu = document.querySelector(".tasks-menu");
const task_menu_form = document.querySelector(".tasks-menu__form"); 
const usual_task_check = document.getElementById("usual-task");
const descr_task_check = document.getElementById("descr-task");
const many_task_check = document.getElementById("many-task");
const descr_task_element = document.querySelector(".descr-task-element");
const many_task_element = document.querySelector(".many-task-element");
const tasks_menu_body = document.querySelector(".tasks-menu__body");
const tasks_menu_btns = document.querySelector(".tasks-menu__btns");
const tasks_menu_inputs = document.querySelectorAll(".tasks-menu__input");
const subtask_first_input = document.getElementById("subtask__first-input");
const subtask_second_input = document.getElementById("subtask__second-input");
const subtask_third_input = document.getElementById("subtask__third-input");
const subtask_first_btn = document.getElementById("subtask__first-btn");
const subtask_second_btn = document.getElementById("subtask__second-btn");
const subtask_third_btn = document.getElementById("subtask__third-btn");
const tasks_submenu = document.querySelector(".tasks-submenu");
const descr_task_input = document.querySelector(".tasks-menu__descr");
const task_title_input = document.getElementById("task-title");
const task_descr = document.getElementById("task-descr");
const btn_submit = document.getElementById("task-btn-submit");
const btn_cancel = document.getElementById("task-btn-cancel");
const tasks_container = document.querySelector('.tasks-container');

// data.js

function getTasks() {
    let userTasks = localStorage.getItem('userTasks');

    if (userTasks) {
        return JSON.parse(userTasks);
    }

    return [];
}

let userTasks = getTasks();

function setNewTask() {
    let newTask = {};

    for (let input of tasks_menu_inputs) {
        switch (input.id) {
            case 'task-title':
                newTask.title = input.value;
                break;

            case 'task-descr':
                newTask.descr = input.value;
                break;

            case 'subtask__first-input':
                newTask.subtask1 = input.value;
                break;

            case 'subtask__second-input':
                newTask.subtask2 = input.value;
                break;

            case 'subtask__third-input':
                newTask.subtask3 = input.value;
                break;
        }
    }

    return newTask;
}

function pushNewTask(newTask) {
    if (editFlag) {
        userTasks[editFlag] = newTask;
    } else {
        userTasks.push(newTask);
    }
}

function updateTasks() {
    localStorage.setItem('userTasks', JSON.stringify(userTasks));
}

// Если есть хоть одна задача

const task_collections = document.querySelectorAll('.tasks-elements');

task_collections[0].style.opacity = 0;
task_collections[1].style.opacity = 0;
task_collections[2].style.opacity = 0;

function* generate() {
    yield 0;
    yield 1;
    yield 2;
}

let ident = generate();

let index = 0;

if (userTasks.length > 0) {
    header_no_tasks.style.display = 'none';

    setTimeout(() => {
        header_any_tasks.style.opacity = 0.5;
        task_collections[0].style.opacity = 1;
        task_collections[1].style.opacity = 1;
        task_collections[2].style.opacity = 1;
    }, 100);

    for (let task of userTasks) {
        let taskElem = document.createElement('div');
        taskElem.classList.add('task-element');

            let taskChecker = document.createElement('input');
            taskChecker.classList.add('task-checker');
            taskChecker.type = 'radio';
            taskElem.prepend(taskChecker);

            let taskBody = document.createElement('div');
            taskBody.classList.add('task-body');

                let taskHeader = document.createElement('h1');
                taskHeader.classList.add('task-body__title');
                taskHeader.textContent = task.title;
                taskBody.prepend(taskHeader);

                if (task.descr) {
                    let taskBodyPopup = document.createElement('div');
                    taskBodyPopup.classList.add('task-body__popup');
                    taskBodyPopup.classList.add('task-body__list');
                    taskBodyPopup.textContent = task.descr;
                    taskBody.append(taskBodyPopup);
                } 
                
                else if (task.subtask1 || task.subtask2 || task.subtask3) {
                    let taskBodyPopup = document.createElement('ul');
                    taskBodyPopup.classList.add('task-body__popup');
                    taskBodyPopup.classList.add('task-body__list');

                        if (task.subtask1) {
                            let subtaskOne = document.createElement('li');
                            subtaskOne.classList.add('task-body__list-item');
                            subtaskOne.textContent = task.subtask1;
                            taskBodyPopup.append(subtaskOne);
                        }

                        if (task.subtask2) {
                            let subtaskTwo = document.createElement('li');
                            subtaskTwo.classList.add('task-body__list-item');
                            subtaskTwo.textContent = task.subtask2;
                            taskBodyPopup.append(subtaskTwo);
                        }

                        if (task.subtask3) {
                            let subtaskThree = document.createElement('li');
                            subtaskThree.classList.add('task-body__list-item');
                            subtaskThree.textContent = task.subtask3;
                            taskBodyPopup.append(subtaskThree);
                        }

                    taskBody.append(taskBodyPopup);
                }

            taskElem.append(taskBody);

            // чуток генератора

            let res = ident.next();

            if (innerWidth >= 1740) {
                if (res.value == 2) {
                    ident = generate();
                }
            } else if (innerWidth >= 1120) {
                if (res.value == 1) {
                    ident = generate();
                }
            } else {
                if (res.value == 0) {
                    ident = generate();
                }
            }
            
            // вставка элементов

            if (res.value == 0) {
                task_collections[0].append(taskElem);
            } else if (res.value == 1) {
                task_collections[1].append(taskElem);
            } else if (res.value == 2) {
                task_collections[2].append(taskElem);
            }
    }
}

// попытка добавить флажочки

let all_tasks = document.querySelectorAll('.task-element');

for (let task of all_tasks) {
    if (task.querySelector('.task-body__popup')) {
        task.querySelector('.task-body__title').classList.add('task-body__title--special');
    }
}

// data.js end

const task_elements_bodies = document.querySelectorAll(".task-body");
const task_elements = document.querySelectorAll(".task-element");

task_elements_bodies.forEach(element => {
    element.querySelector(".task-body__title").addEventListener("click", () => {
        if (element.contains(element.querySelector('.task-body__popup'))) {
            element.querySelector('.task-body__title--special').classList.toggle('task-body__title--special--rotated');

            if (element.style.height == `${25 + element.querySelector(".task-body__popup").clientHeight}px`) {
                element.querySelector(".task-body__popup").classList.remove("task-body__popup--active");
                element.style.height = "85px";
            }
    
            else {
                element.querySelector(".task-body__popup").classList.add("task-body__popup--active");
                element.style.height = `${25 + element.querySelector(".task-body__popup").clientHeight}px`;
            }
        }
    });
});

task_elements.forEach(element => {
    element.addEventListener("contextmenu", (event) => {
        event.preventDefault();

        contextmenu.disabled = false;
        contextmenu.style.left = `${event.clientX - 10}px`;
        contextmenu.style.top = `${event.clientY - 10}px`;
        contextmenu.style.opacity = "1";

        contextmenu_btn_delete.disabled = false;
        contextmenu_btn_edit.disabled = false;

        contextmenu.addEventListener("mouseleave", () => {
            contextmenu_btn_delete.disabled = true;
            contextmenu_btn_edit.disabled = true;
            contextmenu.disabled = true;
            contextmenu.style.opacity = "0";

            setTimeout(() => {
                contextmenu.style.left = `${event.clientX - 1000}px`;
                contextmenu.style.top = `${event.clientY - 1000}px`;
            }, 250);
        });

        contextmenu_btn_delete.onclick = () => {
            let taskBody = element.querySelector('.task-body');
            let taskTitle = taskBody.querySelector('.task-body__title');

            userTasks = userTasks.filter(task => task.title != taskTitle.textContent);

            element.style.opacity = '0';

            updateTasks();

            if (localStorage.getItem('userTasks') == '[]') {
                header_any_tasks.style.opacity = 0;
            }

            setTimeout(() => {
                window.location.reload();
            }, 500);
        };

        contextmenu_btn_edit.onclick = () => {
            tasks_menu_inputs.item("#task-title").value = element.querySelector(".task-body__title").textContent;

            if (element.querySelector('.task-body__popup')) {
                if (element.querySelector('.task-body__popup').children.length == 0) {
                    tasks_menu_inputs[1].value = element.querySelector('.task-body__popup').textContent;
                } else {
                    for (let i = 0; i < element.querySelectorAll('.task-body__list-item').length; i++) {
                        tasks_menu_inputs[i+2].value = element.querySelectorAll('.task-body__list-item')[i].textContent;
                        tasks_menu_inputs[i+2].dataset['edit'] = true;
                    }
                }
            }

            tasks_menu.classList.add("tasks-menu--active");

            let keyChangingTask;

            for (let key in userTasks) {
                if (userTasks[key].title == element.querySelector(".task-body__title").textContent) {
                    keyChangingTask = key;
                    break
                }
            }

            editFlag = keyChangingTask;

            setTimeout(() => {
                task_menu_form.classList.add("tasks-menu__form--active");
            }, "500");
        };
    });
});

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

const contextmenu = document.querySelector(".context-menu");
const contextmenu_btn_add = document.querySelector(".context-menu__add");
const contextmenu_btn_edit = document.querySelector(".context-menu__edit");
const contextmenu_btn_delete = document.querySelector(".context-menu__delete");

// обработка и удаление подзадач

let subtasks_collection = document.querySelectorAll('.task-body__list-item');

for (let subtask of subtasks_collection) {
    subtask.onclick = () => {
        subtask.classList.add('task-body__list-item--done');

        for (let keyTask in userTasks) {

            if (userTasks[keyTask].title == subtask.closest('div').querySelector('h1').textContent) {

                let tempTask = userTasks[keyTask];

                for (let tempKey in tempTask) {
                    if (tempTask[tempKey] == subtask.textContent) {
                        tempTask[tempKey] = null;
                        updateTasks();
                        break;
                    }
                }

                setTimeout(() => { 
                    location.reload();
                }, 500);
            }
        }
    };
}

task_elements.forEach(element => {
    element.querySelector('.task-checker').onclick = function() {
        element.querySelector('.task-body__title').classList.add('task-body__title--done');

        let taskBody = element.querySelector('.task-body');
        let taskTitle = taskBody.querySelector('.task-body__title');

        userTasks = userTasks.filter(task => task.title != taskTitle.textContent);

        element.style.opacity = '0';

        updateTasks();

        if (localStorage.getItem('userTasks') == '[]') {
            header_any_tasks.style.opacity = 0;
        }

        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
});

// ховер для header-any-task

header_any_tasks.addEventListener('mouseover', () => {
    header_any_tasks.classList.add('header-any-tasks--hover');

    header_any_tasks.addEventListener('mouseout', () => {
        header_any_tasks.classList.remove('header-any-tasks--hover');
    })
});

// загрузка страницы без задач и меню

setTimeout(() => {
    header_no_tasks.classList.remove("header-no-tasks--deactive");

    setTimeout(() => {
        btn_add_task.disabled = false;
    }, "250");
}, "500");

tasks_menu_body.style.height = "175px";

descr_task_element.style.translate = "0 -350px";
many_task_element.style.translate = "0 -350px";

descr_task_element.style.opacity = "0";
many_task_element.style.opacity = "0";

btn_add_task.onclick = () => {
    tasks_menu.classList.add("tasks-menu--active");

    setTimeout(() => {
        header_no_tasks.classList.add("header-no-tasks--deactive");

        setTimeout(() => {
            task_menu_form.classList.add("tasks-menu__form--active");
        }, "450");
    }, "150");
};

btn_cancel.addEventListener("click", (event) => {
    event.preventDefault();

    setTimeout(() => {
        tasks_menu.classList.remove("tasks-menu--active");

        setTimeout(() => {    
            tasks_menu_inputs.forEach(element => {
                element.value = null;
            });

            task_menu_form.submit();
        }, "350");
    }, "50");
});

btn_submit.addEventListener("click", (event) => {
    event.preventDefault();

    if (task_title_input.value != "") {
        if (usual_task_check.checked) {
            console.log('обычная задача');

            descr_task_input.value = null;
            subtask_first_input.value = null;
            subtask_second_input.value = null;
            subtask_third_input.value = null;

        } else if (descr_task_check.checked) {
            console.log('задача с описанием');

            subtask_first_input.value = null;
            subtask_second_input.value = null;
            subtask_third_input.value = null;

        } else if (many_task_check.checked) {
            console.log('задача с подзадачами');

            descr_task_input.value = null;
        }

        pushNewTask(setNewTask());
        updateTasks();

        setTimeout(() => {
            tasks_menu.classList.remove("tasks-menu--active");

            setTimeout(() => {
                task_menu_form.submit();
            }, "350");
        }, "50");
    }
});

tasks_menu_inputs.forEach(element => {
    tasks_submenu.addEventListener("mouseover", () => {
        element.blur();
    })
});

task_title_input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

task_descr.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

subtask_first_input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

subtask_second_input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

subtask_third_input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

tasks_submenu.addEventListener("change", () => {
    if (usual_task_check.checked == true) {
        descr_task_check.disabled = true;
        many_task_check.disabled = true;

        descr_task_element.style.opacity = "0";
        many_task_element.style.opacity = "0";

        setTimeout(() => {
            descr_task_element.style.translate = "0 -350px";
            many_task_element.style.translate = "0 -350px";
        }, 250);

        setTimeout(() => {
            tasks_menu_body.style.height = "175px";
            tasks_menu_btns.style.translate = "0 0";
        }, 250);

        setTimeout(() => {
            descr_task_check.disabled = false;
            many_task_check.disabled = false;
        }, 350);

        setTimeout(() => {
            subtask_second_input.disabled = true;
            subtask_second_input.style.opacity = 0;
            subtask_second_btn.disabled = true;
            subtask_second_btn.style.opacity = 0;
            
            subtask_third_input.disabled = true;
            subtask_third_input.style.opacity = 0;
            subtask_third_btn.disabled = true;
            subtask_third_btn.style.opacity = 0;
        }, 500);
    }

    else if (descr_task_check.checked == true) {
        usual_task_check.disabled = true;
        many_task_check.disabled = true;

        many_task_element.style.opacity = "0";

        setTimeout(() => {
            descr_task_element.style.translate = "0 0";
            many_task_element.style.translate = "0 -350px";
        }, 250);

        setTimeout(() => {
            tasks_menu_body.style.height = "350px";
            tasks_menu_btns.style.translate = "0 200px";
        }, 250);

        setTimeout(() => {
            descr_task_element.style.opacity = "1";
        }, 600);

        setTimeout(() => {
            usual_task_check.disabled = false;
            many_task_check.disabled = false;
        }, 700);

        setTimeout(() => {
            subtask_second_input.disabled = true;
            subtask_second_input.style.opacity = 0;
            subtask_second_btn.disabled = true;
            subtask_second_btn.style.opacity = 0;
            
            subtask_third_input.disabled = true;
            subtask_third_input.style.opacity = 0;
            subtask_third_btn.disabled = true;
            subtask_third_btn.style.opacity = 0;
        }, 500);
    }

    else if (many_task_check.checked) {
        if (many_task_element.querySelector('#subtask__first-input').dataset['edit']) {
            if (many_task_element.querySelector('#subtask__third-input').dataset['edit']) {
                console.log('три подзадачи');

                tasks_menu_body.style.height = "395px";
                tasks_menu_btns.style.translate = "0 245px";

                subtask_second_input.disabled = false;
                subtask_second_input.style.opacity = "1";
                subtask_second_btn.disabled = false;
                subtask_second_btn.style.opacity = "1";

                subtask_third_input.disabled = false;
                subtask_third_input.style.opacity = "1";
                subtask_third_btn.disabled = false;
                subtask_third_btn.style.opacity = "1";
            }

            else if (many_task_element.querySelector('#subtask__second-input').dataset['edit']) {
                console.log('всего две задачи');

                setTimeout(() => {
                    tasks_menu_body.style.height = "335px";
                    tasks_menu_btns.style.translate = "0 185px";
                }, 250);

                subtask_second_input.disabled = false;
                subtask_second_input.style.opacity = "1";
                subtask_second_btn.disabled = false;
                subtask_second_btn.style.opacity = "1";
            } else {
                console.log('всего одна задача');

                setTimeout(() => {
                    tasks_menu_body.style.height = "275px";
                    tasks_menu_btns.style.translate = "0 125px";
                }, 250);
            }
        } else {
            setTimeout(() => {
                tasks_menu_body.style.height = "275px";
                tasks_menu_btns.style.translate = "0 125px";
            }, 250);
        }

        descr_task_check.disabled = true;
        many_task_check.disabled = true;

        descr_task_element.style.opacity = "0";

        setTimeout(() => {
            many_task_element.style.translate = "0 0";
            descr_task_element.style.translate = "0 -350px";
        }, 250);

        setTimeout(() => {
            many_task_element.style.opacity = "1";
        }, 600);

        setTimeout(() => {
            descr_task_check.disabled = false;
            many_task_check.disabled = false;
        }, 700);
    }
});

subtask_second_input.style.opacity = "0";
subtask_second_btn.style.opacity = "0";
subtask_third_input.style.opacity = "0";
subtask_third_btn.style.opacity = "0";

subtask_second_btn.disabled = true;
subtask_second_input.disabled = true;
subtask_third_btn.disabled = true;
subtask_third_input.disabled = true;

subtask_first_input.addEventListener("input", () => {
    subtask_second_input.placeholder = "Подзадача #2";

    if (tasks_menu_body.style.height == "275px") {
        setTimeout(() => {
            tasks_menu_body.style.height = "335px";
            tasks_menu_btns.style.translate = "0 185px";
        }, 250);
    
        setTimeout(() => {
            subtask_second_input.disabled = false;
            subtask_second_input.style.opacity = "1";
            subtask_second_btn.disabled = false;
            subtask_second_btn.style.opacity = "1";
        }, 500);
    }
});

subtask_first_btn.addEventListener("click", (event) => {
    event.preventDefault();
    subtask_first_input.value = null;

    subtask_first_input.classList.add("tasks-menu__subtask-changed-placeholder");

    setTimeout(() => {
        subtask_first_input.classList.remove("tasks-menu__subtask-changed-placeholder");
    }, 500);

    subtask_second_input.placeholder = "";
    subtask_second_input.disabled = true;
    subtask_second_input.style.opacity = "0";
    subtask_second_btn.disabled = true;
    subtask_second_btn.style.opacity = "0";
    subtask_second_input.value = null;

    subtask_third_input.placeholder = "";
    subtask_third_input.disabled = true;
    subtask_third_input.style.opacity = "0";
    subtask_third_btn.disabled = true;
    subtask_third_btn.style.opacity = "0";
    subtask_third_input.value = null;

    setTimeout(() => {
        tasks_menu_body.style.height = "275px";
        tasks_menu_btns.style.translate = "0 125px";
    }, 450);
});

subtask_second_input.addEventListener("input", () => {
    subtask_third_input.placeholder = "Подзадача #3";

    if (tasks_menu_body.style.height == "335px") {
        setTimeout(() => {
            tasks_menu_body.style.height = "395px";
            tasks_menu_btns.style.translate = "0 245px";
        }, 250);
    
        setTimeout(() => {
            subtask_third_input.disabled = false;
            subtask_third_input.style.opacity = "1";
            subtask_third_btn.disabled = false;
            subtask_third_btn.style.opacity = "1";
        }, 500);
    }
});

subtask_second_btn.addEventListener("click", (event) => {
    event.preventDefault();
    subtask_second_input.placeholder = "";
    subtask_second_input.disabled = true;
    subtask_second_input.style.opacity = "0";
    subtask_second_btn.disabled = true;
    subtask_second_btn.style.opacity = "0";
    subtask_second_input.value = null;

    subtask_third_input.placeholder = "";
    subtask_third_input.disabled = true;
    subtask_third_input.style.opacity = "0";
    subtask_third_btn.disabled = true;
    subtask_third_btn.style.opacity = "0";
    subtask_third_input.value = null;

    setTimeout(() => {
        tasks_menu_body.style.height = "275px";
        tasks_menu_btns.style.translate = "0 125px";
    }, 450);
});

subtask_third_btn.addEventListener("click", (event) => {
    event.preventDefault();
    subtask_third_input.placeholder = "";
    subtask_third_input.disabled = true;
    subtask_third_input.style.opacity = "0";
    subtask_third_btn.disabled = true;
    subtask_third_btn.style.opacity = "0";
    subtask_third_input.value = null;

    setTimeout(() => {
        tasks_menu_body.style.height = "335px";
        tasks_menu_btns.style.translate = "0 185px";
    }, 450);
});