// var x = window.matchMedia("(max-width: 320px)")

// function reSize(x) {
//     let target = document.getElementsById('details-section')
//     if (x.matches) { // If media query matches
//         target.classList.remove("col-8")
//     } 
//     // else { 
//     //     target.classList.add("col-8")
//     // }
//   }

// reSize(x)  
// x.addEventListener(reSize)

// $(document).ready( function($) {

//   $(window).bind('resize', function(){
//     console.log($(this).width())
//     if($(this).width() <= 320){
//       $('div').removeClass('.col-8')
//     }
//   })

// })


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the cancel button element that closes the modal
var cBtn = document.getElementsByClassName("cancel-button")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on the button, closes the modal
cBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}