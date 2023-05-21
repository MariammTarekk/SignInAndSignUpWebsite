var LogInEmail = document.getElementById('LogInEmail');
var LogInPassword = document.getElementById('LogInPassword');
var SignUpEmail = document.getElementById('SignUpEmail');
var SignUpPassword = document.getElementById('SignUpPassword');
var SignUpName = document.getElementById('SignUpName');


var pathparts = location.pathname.split('/');
var baseURL = '';
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);



var SignUpArr = [];
if (localStorage.getItem('users') == null) {
    SignUpArr= [];
} else {
    SignUpArr = JSON.parse(localStorage.getItem('users'));
}

function CheckSignUp() {
    if (SignUpName.value == "" || SignUpEmail.value == "" || SignUpPassword.value == "") {
        return false;
    }
    else {
        return true;
    }
}

function CheckLogIn() {
    if (LogInEmail.value == "" || LogInPassword.value == "") {
        return false;
    }
    else {
        return true;
    }
}

function EmailExisted() {
    for (var i = 0; i < SignUpArr.length; i++) {
        if (SignUpArr[i].email.toLowerCase() == SignUpEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}


function signUp() {
    if (!CheckSignUp()) {
        document.getElementById('exist').innerHTML = '<p class="text-danger m-2">All inputs are required</p>';
        return false;
    }
    var signUp = {
        name: SignUpName.value,
        email: SignUpEmail.value,
        password: SignUpPassword.value,
    }
    if (EmailExisted()) {
        document.getElementById('exist').innerHTML = '<p class="text-danger m-2">Email Address is already existed!</p>';

    }
    else {
        SignUpArr.push(signUp);
        localStorage.setItem('users', JSON.stringify(SignUpArr));
        document.getElementById('exist').innerHTML = '<p class="text-success m-2">Success</p>';

    }
}





function logIn() {
    if (!CheckLogIn()) {
        document.getElementById('incorrect').innerHTML = `<p class="text-danger m-2">All inputs are required</p>`;
        return false;
    }
    var email = LogInEmail.value;
    var password = LogInPassword.value;
    for (var i = 0; i < SignUpArr.length; i++) {
        if (SignUpArr[i].email.toLowerCase() == email.toLowerCase() && SignUpArr[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', SignUpArr[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(baseURL + '/home.html')

            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }


}



function logOut() {
    localStorage.removeItem('sessionUsername');
}

var userName = localStorage.getItem('sessionUsername');
if (userName) {
    document.getElementById('userName').innerHTML = `Welcome `+ userName;
}

