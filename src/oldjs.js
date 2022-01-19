let prevBtn = document.querySelector('#prev-btn');
let nextBtn = document.querySelector('#next-btn');
let sliderDotsCon = document.querySelector('#slider-dots-con');

let imgStorage = [1,1,1,1,1];

let sample = createSliderDot();
let sample1= createSliderDot();
let sample2 = createSliderDot();
let sample3= createSliderDot();

sliderDotsCon.appendChild(sample)
sliderDotsCon.appendChild(sample1)
sliderDotsCon.appendChild(sample2)
sliderDotsCon.appendChild(sample3)

function createSliderDot(){
  let sliderDot = document.createElement('a');
  sliderDot.classList.add('slider-dot');
  return sliderDot;
}