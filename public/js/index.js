let email = document.getElementById("profile").textContent
const sub = email.split('@')
document.getElementById("profile").textContent = sub[0]

setTimeout(function(){
    document.getElementsByClassName("alert")[0].style.display = 'none'
}, 3000)