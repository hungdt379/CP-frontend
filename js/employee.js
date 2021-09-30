function getAllEmployee() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/api/employee/read");
  var token = localStorage.getItem("token");
  console.log(token);
  xhttp.setRequestHeader("Authorization", "Bearer " + token);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      var trHTML = "";
      for (let object of objects["list"]) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["employeeId"] + "</td>";
        trHTML += "<td>" + object["employeeName"] + "</td>";
        trHTML += "<td>" + object["sex"] + "</td>";
        trHTML += "<td>" + object["employeeBirthday"] + "</td>";
        trHTML += "<td>" + object["employeeAddress"] + "</td>";
        trHTML += "<td>" + object["employeeEmail"] + "</td>";
        trHTML += "<td>" + object["employeePhone"] + "</td>";
        trHTML += "<td>" + object["department"] + "</td>";
        trHTML +=
          "<td>" +
          '<button type="button"  onclick="showEmployee(' +
          object["employeeId"] +
          ')">View</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

function showEmployee(id) {
  var token = localStorage.getItem("token");
  document.getElementById("pop").style.display = "block";
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/api/employee/id?id=" + id);
  xhttp.setRequestHeader("Authorization", "Bearer " + token);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const user = objects["obj"];
      var popupHTML = "";
      popupHTML += "<div class='update-form'>";
      popupHTML += "<h2 class='h2-padding'>Employee Information</h2>";
      popupHTML +=
        '<input id="id" class="hiden-input" type="hidden" value=' +
        user["employeeId"] +
        ">" +
        '<input id="account" class="hiden-input" type="hidden" value=' +
        user["account"] +
        ">" +
        '<input id="password" class="hiden-input" type="hidden" value=' +
        user["password"] +
        ">" +
        "<br>" +
        'Name <br> <input id="name" value="' +
        user["employeeName"] +
        '">' +
        'Sex <br> <input id="sex" value=' +
        user["sex"] +
        ">" +
        "<br>" +
        'Birthday <br> <input id="date" value="' +
        user["employeeBirthday"] +
        '">' +
        "<br>" +
        'Address <br> <input id="address" value="' +
        user["employeeAddress"] +
        '">' +
        "<br>" +
        'Phone <br> <input id="phone" value="' +
        user["employeePhone"] +
        '">' +
        "<br>" +
        'Email <br> <input id="email" value="' +
        user["employeeEmail"] +
        '">' +
        "<br>" +
        'Department <br> <input id="department" class="swal2-input" value="' +
        user["department"] +
        '">' +
        "<br>" +
        '<button onclick="updateEmployee()">Save</button>';
      popupHTML += "</div>";
    }
    document.getElementById("pop").innerHTML = popupHTML;
  };
}

var modal = document.getElementById("pop");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function addEmployee() {
  const employeeName = document.getElementById("name").value;
  const sex = document.getElementById("sex").value;
  const employeeBirthday = document.getElementById("date").value;
  const employeeAddress = document.getElementById("address").value;
  const employeePhone = document.getElementById("phone").value;
  const employeeEmail = document.getElementById("email").value;
  const department = document.getElementById("department").value;
  const password = document.getElementById("password").value;
  const account = document.getElementById("account").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8080/api/employee/create");
  var token = localStorage.getItem("token");
  xhttp.setRequestHeader("Authorization", "Bearer " + token);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      employeeName: employeeName,
      employeeBirthday: employeeBirthday,
      employeeAddress: employeeAddress,
      employeePhone: employeePhone,
      department: department,
      password: password,
      account: account,
      sex: sex,
      employeeEmail: employeeEmail,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      window.location = "http://127.0.0.1:5500/html/employee.html";
    }
  };
}

function updateEmployee() {
  const employeeId = document.getElementById("id").value;
  const employeeName = document.getElementById("name").value;
  const employeeBirthday = document.getElementById("date").value;
  const employeeAddress = document.getElementById("address").value;
  const employeePhone = document.getElementById("phone").value;
  const department = document.getElementById("department").value;
  const employeeEmail = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const account = document.getElementById("account").value;
  const sex = document.getElementById("sex").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:8080/api/employee/update");
  var token = localStorage.getItem("token");
  xhttp.setRequestHeader("Authorization", "Bearer " + token);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      employeeId: employeeId,
      employeeName: employeeName,
      employeeBirthday: employeeBirthday,
      employeeAddress: employeeAddress,
      employeePhone: employeePhone,
      employeeEmail: employeeEmail,
      department: department,
      password: password,
      account: account,
      sex: sex,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      getAllEmployee();
      modal.style.display = "none";
    }
  };
}

//setTimeout(()=>getAllEmployee(), 300);
getAllEmployee();
