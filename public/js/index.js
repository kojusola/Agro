
$(document).ready(function() {
    // $('.js-example-basic-single').select2();
    // $('.js-example-basic-multiple').select2();
   
    AOS.init();
});
let email = document.getElementById("profile").textContent
const sub = email.split('@')
document.getElementById("profile").textContent = sub[0]


function farmers() {
    location.href = '/farmers'
}


function contactus() {
    location.href = '/contactus'
}
