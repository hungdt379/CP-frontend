var endpoint = "http://localhost:8080/login";

function login() {
  var username = document.querySelector('input[name="username"]').value;
  var password = document.querySelector('input[name="password"]').value;
  var data = {
    username: username,
    password: password,
  };
  let status;
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    status = response.status;  
    return response.json()
    })
  .then(function(res){
      if(res['success'] == true && status == 200){
        localStorage.setItem("token", res["jwtToken"]);
        alert("Login success")
        window.location = "http://127.0.0.1:5500/html/employee.html";
      }else{
          alert("Login fail")
      }
  });
}
