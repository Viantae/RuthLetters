// Product Slider Script
const initSlider = () => {
  const imageList = document.querySelector(".product-slider-wrapper .product-image-list");
  const sliderBtns = document.querySelectorAll(".product-slider-wrapper .product-slide-button");
  const sliderScrollbar = document.querySelector(".product-slider-container .product-slider-scrollbar");
  const sliderScrollbarThumb = sliderScrollbar.querySelector(".product-scrollbar-thumb");
  const maxScrollWidth = imageList.scrollWidth - imageList.clientWidth

  // Handles scrollbar dragging
  sliderScrollbarThumb.addEventListener("mousedown", (e) =>{
    const startX = e.clientX // Returns horizontal mouse pointer coordinate
    const thumbPos = sliderScrollbarThumb.offsetLeft;

    // Update scrollbar thumb position based on mouse move
    const mousemovement = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPos = thumbPos + deltaX;
      const maxThumbPos = sliderScrollbar.getBoundingClientRect().width - sliderScrollbarThumb.offsetWidth;

      const boundary = Math.max(0, Math.min(maxThumbPos, newThumbPos))
      const scrollPosition = (boundary / maxThumbPos) * maxScrollWidth;
      
      sliderScrollbarThumb.style.left = `${boundary}px`
      imageList.scrollLeft = scrollPosition;
    }

    const mouseLeave = () => {
      document.removeEventListener("mousemove", mousemovement)
      document.removeEventListener("mouseup", mouseLeave)
    }

    // Event for drag interaction
    document.addEventListener("mousemove", mousemovement)
    document.addEventListener("mouseup", mouseLeave)

  })

  // Slide images according to button clicks
  sliderBtns.forEach((button) => {
    button.addEventListener("click", () => {
      updateScroll();
      const direction = button.id === "product-prevSlide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behaviour: "smooth" });
      
    });
  });

  // Update scrollbar thumb position based on image scrolling
  const updateScroll = () => {
    const scrollPos = imageList.scrollLeft;
    const thumbPos = (scrollPos / maxScrollWidth) * (sliderScrollbar.clientWidth - sliderScrollbarThumb.offsetWidth)
    sliderScrollbarThumb.style.left = `${thumbPos}px`;
  }

  const showBtns = () => {
    console.log(Math.round(imageList.scrollLeft))
    console.log(Math.round(maxScrollWidth));
    sliderBtns[0].style.display = imageList.scrollLeft <= 0 ? "none" :  "block";
    sliderBtns[1].style.display = Math.round(imageList.scrollLeft) >= maxScrollWidth - 1 ? "none" :  "block";
  }

  imageList.addEventListener("scroll", () => {
    showBtns();
    updateScroll();
  })
};


// News Gallery Slider Script
const ngContainer = document.querySelector(".news-gallery-container");
const ngControlsContainer = document.querySelector(".news-gallery-controls");
const ngControls = ['prev', 'next'];
const ngItems = document.querySelectorAll('.news-gallery-item');

class Carousel{
  constructor(container, items, controls){
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  updateNewsGallery(){
    this.carouselArray.forEach(element => {
      element.classList.remove('news-gallery-item1');
      element.classList.remove('news-gallery-item2');
      element.classList.remove('news-gallery-item3');
      element.classList.remove('news-gallery-item4');
      element.classList.remove('news-gallery-item5');
    })

    this.carouselArray.slice(0, 5).forEach((element, i) =>{
      element.classList.add(`news-gallery-item${i+1}`);
    })
  }

  setCurrentState(direction){
    if(direction.className == 'news-gallery-controls-prev'){
      this.carouselArray.unshift(this.carouselArray.pop());
    }
    else{
      this.carouselArray.push(this.carouselArray.shift());
    }
    
    this.updateNewsGallery();
   
  }

  setControls(){
    this.carouselControls.forEach(control => {
      ngControlsContainer.appendChild(document.createElement('button')).className = `news-gallery-controls-${control}`;
      document.querySelector(`.news-gallery-controls-${control}`).innerText = control;
    })
  }

  useControls(){
    const triggers = [...ngControlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    })
  } 

}

const exampleCarousel = new Carousel(ngContainer, ngItems, ngControls);


exampleCarousel.setControls();
exampleCarousel.useControls();

setInterval(function(){
  exampleCarousel.carouselArray.push(exampleCarousel.carouselArray.shift());
  exampleCarousel.updateNewsGallery();
}, 10000)


window.addEventListener("load", initSlider);
window.addEventListener("resize", initSlider);