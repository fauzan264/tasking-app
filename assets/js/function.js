const dateFormat = (datetime) =>{
    let newDate = new Date(datetime);

    let monthCreatedAt = newDate.getMonth().toString().length < 2 ? `0${newDate.getMonth()+1}` : newDate.getMonth()+1;
    let dateCreatedAt = newDate.getDate().toString().length < 2 ? `0${newDate.getDate()}` : newDate.getDate();

    let fullDate = [dateCreatedAt, monthCreatedAt, newDate.getFullYear()].join('-');

    if (newDate.getHours() != null) {
        let hourCreatedAt = newDate.getHours();
        let minuteCreatedAt = newDate.getMinutes();
        let secondCreatedAt = newDate.getSeconds();
        let fullClock = [hourCreatedAt, minuteCreatedAt, secondCreatedAt].join(":");
        fullDateTime = [fullDate, fullClock].join(" ");

        return fullDateTime;
    }
    
    return fullDate;
}

let listTask = (id, task, deadline, assign, status) => {
    let statusTask;
    let statusColor;
    let btnFinish;
    if (status == 0) {
        statusTask = "Pending";
        statusColor = "is-warning";
        btnFinish = `<button class="button is-small is-success edit-status" data-id="${id}">Finish</button>`;
    } else {
        statusTask = "Done";
        statusColor = "is-success";
        btnFinish = "";
    }
    return 	`<tr>
                <td><a href="#" class="detail-data" data-id="${id}">${task}</a></td>
                <td>${assign}</td>
                <td>${deadline}</td>
                <td><span class="tag is-rounded is-small ${statusColor} is-light">${statusTask}</span></td>
                <td>
                    <button class="button is-small is-info edit-data" data-id="${id}">Edit</button>
                    ${btnFinish}
                </td>
            </tr>`
};

const list = ()=>{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let getData = JSON.parse(xhttp.responseText);
            let data = getData.data;
            data.forEach(e => {
                let deadline = dateFormat(e.deadline);
                document.getElementById("task-list").innerHTML += listTask(e.id, e.task, deadline, e.assign, e.status);
            });
    
            const editData = document.getElementsByClassName('edit-data');
            for (let edit of editData) {
                edit.addEventListener('click', ()=> {
                    window.location = `/form?id=${edit.getAttribute('data-id')}`;
                });
            }
    
            const editStatus = document.getElementsByClassName('edit-status');
            for (let edit of editStatus) {
                edit.addEventListener('click', ()=> {
                    updateStatus(edit.getAttribute('data-id'))
                });
            }
    
            const updateStatus = (id)=> {
                let data = {
                    status: 1
                }
    
                fetch("http://localhost:8080/api/v1/status/"+id, {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                }).then(res => {
                    alert('Update status task succes!');
                    window.location = `/`;
                });
            }
    
            const detailData = document.getElementsByClassName('detail-data');
            for (let detail of detailData) {
                detail.addEventListener('click', ()=> {
                    window.location = `/detail?id=${detail.getAttribute('data-id')}`;
                });
            }
        }
    };
    
    xhttp.open("GET", "http://localhost:8080/api/v1/tasks", true);
    xhttp.send();
}

const getDetail = ()=> {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let getData = JSON.parse(xhttp.responseText);
            let data = getData.data;
            let date = new Date(data.deadline);

            let monthDeadline = date.getMonth().toString().length < 2 ? `0${date.getMonth()+1}` : date.getMonth()+1;
            let dateDeadline = date.getDate().toString().length < 2 ? `0${date.getDate()}` : date.getDate();
            let deadline = [dateDeadline, monthDeadline, date.getFullYear()].join('-');
            let fullCreatedAt = dateFormat(data.created_at);

            statusTask = data.status == 0 ? "Pending" : "Done";

            document.getElementById("content").innerHTML += `
                        <div class="field">
                            <label for="task" class="label">Task</label>
                            <p>${data.task}</p>
                        </div>
                        <div class="field">
                            <label for="assign" class="label">Assign</label>
                            <p>${data.assign}</p>
                        </div>
                        <div class="field">
                            <label for="deadline" class="label">Deadline</label>
                            <p>${deadline}</p>
                        </div>
                        <div class="field">
                            <label for="status" class="label">Status</label>
                            <p>${statusTask}</p>
                        </div>
                        <div class="field">
                            <label for="created_at" class="label">Created at</label>
                            <p>${fullCreatedAt}</p>
                        </div>
                    `;
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/v1/task/"+paramId, true);
    xhttp.send();
}

const getData = ()=> {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let getData = JSON.parse(xhttp.responseText);
            let data = getData.data;
            document.getElementById('task').value = data.task;
            document.getElementById('assign').value = data.assign;
            let date = new Date(data.deadline);
            let monthDeadline = date.getMonth().toString().length < 2 ? `0${date.getMonth()+1}` : date.getMonth()+1;
            let dateDeadline = date.getDate().toString().length < 2 ? `0${date.getDate()}` : date.getDate();
            
            document.getElementById('deadline').value = [date.getFullYear(), monthDeadline, dateDeadline].join('-');
        }
    };
    xhttp.open("GET", "http://localhost:8080/api/v1/task/"+paramId, true);
    xhttp.send();
}

const create = ()=> {
    const data = {
        task: document.getElementById("task").value,
        assign: document.getElementById("assign").value,
        deadline: document.getElementById("deadline").value
    }
    const url = "http://localhost:8080/api/v1/tasks";
    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        alert('Create task succes!');
        window.location = `/`;
    });
}

const update = (id)=> {
    const data = {
        task: document.getElementById("task").value,
        assign: document.getElementById("assign").value,
        deadline: document.getElementById("deadline").value
    }
    const url = "http://localhost:8080/api/v1/task/"+id 
    fetch(url, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        alert('Update task succes!');
        window.location = `/`;
    });
}

