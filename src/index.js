import './styles/index.css';
import slide1 from './assets/slide1.jpg';
import slide2 from './assets/slide2.jpg';
import slide3 from './assets/slide3.jpg';
import slide4 from './assets/slide4.jpg';
import sliderBtnSrc from './assets/nextIcon.png';

const main = document.querySelector('main');
const sliderImgEl = document.querySelector('#slider-image-el');
const sliderBtnImg1 = createSliderImg(sliderBtnSrc, 'slider-btn-img');
const sliderBtnImg2 = createSliderImg(sliderBtnSrc, 'slider-btn-img');
const prevSlideBtn = document.querySelector('#prev-slide-btn');
const nextSlideBtn = document.querySelector('#next-slide-btn');
const sliderDotsCon = document.querySelector('#slider-dots-con');
const sliderImages = [slide1, slide2, slide3, slide4];
let autoUpdate;
// const img1 = createSliderImg(slide1, 'slider-img');
// const img2 = createSliderImg(slide2, 'slider-img');
// const img3 = createSliderImg(slide3, 'slider-img');
// const img4 = createSliderImg(slide4, 'slider-img');
// const sliderImages = [img1, img2, img3, img4];

init();

// prevSlideBtn
function init(){
  // Set slider initial image
  sliderImgEl.src = slide1;
  // Add icon to buttons
  prevSlideBtn.appendChild(sliderBtnImg1);
  nextSlideBtn.appendChild(sliderBtnImg2);
  // Add event listener to buttons 
  prevSlideBtn.addEventListener('click', () => updateSliderByArrow('previous'));
  nextSlideBtn.addEventListener('click', () => updateSliderByArrow('next'));

  // Create slider dots and add event listener
  // Used 'for' against alternatives to know when at last iteration
  for(let i = 0; i < sliderImages.length; i++){
    // let img = sliderImages[i]
    // main.appendChild(img);
    let dot = createSliderDot();
    if(i == sliderImages.length-1) dot.classList.add('last-dot'); // 
    appendSliderDot(dot);
    if(i == 0) checkRadio(dot);
  }

  // Set up slider auto browse
  autoUpdate = setInterval(updateSliderDotsAndImageAuto, 5000); 
}

function updateSliderByDot(dot){
  if(dot.getAttribute('data-state') !== 'checked'){
    const dotIndex = [... document.querySelectorAll('.slider-dots')].indexOf(dot);
    selectRadio(dot);
    updateSliderImg(dotIndex);
    clearInterval(autoUpdate)
    autoUpdate = setInterval(updateSliderDotsAndImageAuto, 5000); 
  } else return 0;
}

function updateSliderByArrow(direction){
  const {dots, nextDot, nextDotIndex} = getNextDotAndIndex();

  if(direction == 'previous'){
    const previousDotIndex = (nextDotIndex-2 >= 0 ) ? nextDotIndex-2: dots.length + (nextDotIndex - 2);
    selectRadio(dots[previousDotIndex]);
    updateSliderImg(previousDotIndex);
  }else if (direction == 'next'){
    selectRadio(nextDot);
    updateSliderImg(nextDotIndex);
  }
  clearInterval(autoUpdate)
  autoUpdate = setInterval(updateSliderDotsAndImageAuto, 5000); 
}

function createSliderImg(src, className){
  const img = document.createElement('img');
  img.src = src;
  img.classList.add(className)
  return img;
}

function createSliderDot(){
  const sliderDot = document.createElement('div');
  sliderDot.classList.add('slider-dots');
  sliderDot.setAttribute('name', 'slider-dots-group');
  sliderDot.addEventListener('click', () => updateSliderByDot(sliderDot));
  return sliderDot;
}

function appendSliderDot(sliderDot){
  sliderDotsCon.appendChild(sliderDot);
}

function selectRadio(radio){
  checkRadio(radio);
  uncheckOtherRadios(radio);
}

function checkRadio(radio){
  if(!radio.firstElementChild){
    const innerRadio = document.createElement('div');
    innerRadio.classList.add('inner-radio');
    radio.appendChild(innerRadio); 
    radio.setAttribute('data-state', 'checked');
  } else return 0;
};

function uncheckOtherRadios(radio){
  const radioNameGroup = `[name='${radio.getAttribute('name')}']`;
  const otherRadios = [... document.querySelectorAll(radioNameGroup)]
  .filter(currentRadio => currentRadio != radio);
  otherRadios.forEach(currentRadio => uncheckRadio(currentRadio));
  
};

function uncheckRadio(radio){
  if(radio.firstElementChild) radio.removeChild(radio.firstElementChild);
  radio.setAttribute('data-state', 'unchecked');
};

function getNextDotAndIndex(){
  const dots = [... sliderDotsCon.children];
  const currentDot = dots.find((dot) => dot.getAttribute('data-state') == 'checked');
  const currentDotIndex = dots.indexOf(currentDot);
  const nextDotIndex = (currentDotIndex+1 < dots.length) ? currentDotIndex+1: 0;
  const nextDot = dots[nextDotIndex];
  return {dots, nextDot, nextDotIndex};
};

function updateSliderDotsAndImageAuto(){
  const {nextDot, nextDotIndex} = getNextDotAndIndex();
  selectRadio(nextDot);
  updateSliderImg(nextDotIndex);
}

function updateSliderImg(imgIndex){
  sliderImgEl.src = sliderImages[imgIndex];
}

// function createSliderImg(src, className){
//   const img = document.createElement('img');
//   img.src = src;
//   img.classList.add(className)
//   return img;
// }

// function updateSlider(){
  //   updateSliderImg();
  //   updateSliderDots();
  // }
  
  
  // function updateSliderDots(){
    //   const dots = [... sliderDotsCon.children];
    //   const currentDot = dots.find((dot) => dot.getAttribute('data-state') == 'checked');
    //   const currentDotIndex = dots.indexOf(currentDot);
    //   const nextDotIndex = (currentDotIndex+1 < dots.length) ? currentDotIndex+1: 0;
    //   const nextDot = dots[nextDotIndex];
    //   selectRadio(nextDot);
    
    // }
    
    