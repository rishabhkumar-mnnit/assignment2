//Declare ToDo Tasks List
var tasksList = [];
var taskCount = 1;


//On Window load check todoList length if no data found show empty message otherwise Todo List.
window.onload = function () {
    const finalData = generateTasksList();
    document.getElementById("divTasksList").innerHTML = finalData;

}

//Insert New Task in tasksList.
function insertNewTask() {
    let newTask = document.getElementById("input_new_task").value;
    let obj = {};
    obj['id'] = taskCount;
    obj['task'] = newTask;
    obj['complete'] = false;
    tasksList.push(obj);
    taskCount += 1;
    const finalData = generateTasksList();
    document.getElementById("divTasksList").innerHTML = finalData;
    document.getElementById("input_new_task").value = '';
}

//On Enter Key Press insert New Task in tasksList.
function addTaskOnEnterKey(event) {
    if (event.keyCode === 13) {
        insertNewTask();
    }
}

//On Task Checkox click update status of task in taskList.
function onClickTaskComplete(object) {
    var task_index = object.getAttribute('task_index');
    if (object.checked) {
        tasksList[Math.abs((tasksList.length - 1) - task_index)].complete = true;
        document.getElementById("task_label_" + task_index).setAttribute('class', 'submited_task');
    } else {
        tasksList[Math.abs((tasksList.length - 1) - task_index)].complete = false;
        document.getElementById("task_label_" + task_index).classList.remove('submited_task');
    }
    console.log(tasksList);
}

//On Delete Task remove entry from taskList
function removeTask(object) {
    var task_index = Number(object.getAttribute('task_index'));
    let id = Math.abs((tasksList.length - 1) - task_index);
    tasksList = tasksList.filter((val, index) => index != id);
    const finalData = generateTasksList();
    document.getElementById("divTasksList").innerHTML = finalData;
    console.log(tasksList);
}

//Dynamically generate(Reverse Order) Todo Tasks List using todoList.
function generateTasksList() {
    var finalData = "";
    if (tasksList.length === 0) {
        finalData += "<span class='item_list_empty'>No Data Found</span>";
    } else {

        tasksList.slice(0).reverse().map((val, index) => {
            finalData += "<div class='item_container'>";
            finalData += (val.complete) ?
                ("<input type='checkbox'  task_index = '" + index + "' onclick = 'onClickTaskComplete(this);' checked></input>") :
                ("<input type='checkbox'  task_index = '" + index + "' onclick = 'onClickTaskComplete(this);'></input>");
            finalData += "<div class='item'>";
            finalData += (val.complete) ?
                ("<label id ='task_label_" + index + "' class=' submited_task item_task' task_index = '" + index + "' >" + val.task + "</label>") :
                ("<label id ='task_label_" + index + "' class='item_task' task_index = '" + index + "' >" + val.task + "</label>");
            finalData += "</div><button id='btn_delete_" + index + "' task_index = '" + index + "' class='btn btn-danger btn_circle' onclick='removeTask(this);'><i class='fa fa-remove'></i></button></div><br/>";
        })
    }


    return finalData;
}

//On Button(Add New Task) click add new task in taskList.
function onclick_add_new_task() {
    insertNewTask();
}
