//GLOBALS

const HOST = "http://microbloglite.us-east-2.elasticbeanstalk.com";

function register(input) {
    fetch(HOST + "/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input)
    })
    .then(response=>response.json())
    .then(output=>{
        document.body.innerHTML += `<pre>` + JSON.stringify(output,0,4) + `</pre>`;
    });
}

function login(input) {
    fetch(HOST + "/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(input)
    })
    .then(response=>response.json())
    .then(output=>{
        //TODO set session rembmer that we are logged in
        localStorage.token = output.token;
        localStorage.username = output.username;
        document.body.innerHTML += `<pre>` + JSON.stringify(output,0,4) + `</pre>`;

        posts();//ask only after login
    });
}


function posts() {
    fetch(HOST + "/api/posts?limit=100&offset=0", {
        method: "GET",
        headers: { 'Authorization': `Bearer ${localStorage.token}` }
    })
    .then(response => response.json())
    .then(output=>{
        console.log(JSON.stringify(output,0,4));
        document.body.innerHTML += output.map(
            p=> `<div>${p.username} (${p.createdAt}) [${p.likes}]: "${p.text}"</div>`
        ).join("");
    });
}


