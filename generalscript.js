// Ensure everything loads
document.getElementById("hideAll").style.display = "block";
window.onload = function() {document.getElementById("hideAll").style.display = "none"; }

const hamburgerIcon = document.getElementById("nav-icon-container");
const navItems = document.getElementById("navItems");

if(hamburgerIcon){
  hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.classList.toggle("change");
    hamburgerIcon.classList.toggle('active');
    navItems.classList.add('active');
    if(!hamburgerIcon.classList.contains("active")){
      navItems.classList.remove('active');
    }
  })
}