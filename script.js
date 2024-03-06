/* no_doc_ready */

const slide_contents = document.querySelector(".slide-contents");
const arrowIcons = document.querySelectorAll(".slide-container a");
const slideImg1 = slide_contents.querySelectorAll("img")[0];

let isDrag = false, prevPageX, prevScrollLeft, positionDiff;
let slideImg1_Width = slideImg1.clientWidth + 20 // Getting width and adding margin



// scrollLeft gives number of px of element content that is scrolled horizontally
// gets or sets the number of pixels that an element's content is scrolled from its left edge.
const dragStart = (e) => {
  
  // Update global variables on mouse down event 
  isDrag = true;
  prevPageX = e.pageX || e.touched[0].pageX;
  prevScrollLeft = slide_contents.scrollLeft;
}

// Scrolling images to the left according to mouse pointer
const dragging = (e) => {
  if(!isDrag) return;
  else if(e.pageX >= slide_contents.scrollWidth)
  e.preventDefault();
  slide_contents.classList.add("dragging")
  positionDiff = (e.pageX || e.touched[0].pageX) - prevPageX;
  slide_contents.scrollLeft = prevScrollLeft - positionDiff;
}

const stopDrag = () => {
  slide_contents.classList.remove("dragging");
  isDrag = false;
}

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () =>{

    // If clicked icon is left, reduce width value from the images_scrollleft else add to it
    slide_contents.scrollLeft += icon.id == "left" ? -slideImg1_Width : slideImg1_Width;
    showNavIcons();
  })
});

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () =>{

    // If clicked icon is left, reduce width value from the images_scrollleft else add to it
    slide_contents.scrollLeft += icon.id == "left" ? -slideImg1_Width : slideImg1_Width;
  })
});


slide_contents.addEventListener("mousedown", dragStart);
slide_contents.addEventListener("touchstart", dragStart);

slide_contents.addEventListener("mousemove", dragging);
slide_contents.addEventListener("touchmove", dragging);

slide_contents.addEventListener("mouseup", stopDrag);
slide_contents.addEventListener("mouseleave", stopDrag);
slide_contents.addEventListener("touchend", stopDrag);