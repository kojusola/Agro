let email = document.getElementById("profile").textContent
const sub = email.split('@')
document.getElementById("profile").textContent = sub[0]


function farmers() {
    location.href = '/farmers'
}


function contactus() {
    location.href = '/email'
}