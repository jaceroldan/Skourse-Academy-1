var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");
var canvas3 = document.getElementById("canvas3");
var ctx3 = canvas3.getContext("2d");
var canvas4 = document.getElementById("canvas4");
var ctx4 = canvas4.getContext("2d");
var canvas5 = document.getElementById("canvas5");
var ctx5 = canvas5.getContext("2d");
var canvas6 = document.getElementById("canvas6");
var ctx6 = canvas6.getContext("2d");


const encodings = [0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x6f];
// a - mid 1
const segA = createSegment(35, 16, 40, 12, 8, true);
// b - right 1
const segB = createSegment(78, 30, 12, 40, 8);
// c - right 2
const segC = createSegment(78, 88, 12, 40, 8);
// d - mid 3
const segD = createSegment(35, 130, 40, 12, 6, true);
// e - left 2
const segE = createSegment(20, 88, 12, 40, 8);
// f - left 1
const segF = createSegment(20, 30, 12, 40, 8);
// g - mid 2
const segG = createSegment(35, 73, 40, 12, 7, true);

const segments = [segA, segB, segC, segD, segE, segF, segG];


function createSegment(x, y, width, height, pointDepth, horizontal) {
  let rectangle = new Path2D();
  rectangle.rect(x, y, width, height);
  rectangle.moveTo(x, y);
  if (horizontal) {
    // left triangle
    rectangle.lineTo(x - pointDepth, y + height / 2);
    rectangle.lineTo(x, y + height);
    // right triangle
    rectangle.moveTo(x + width, y);
    rectangle.lineTo(x + width + pointDepth, y + height / 2);
    rectangle.lineTo(x + width, y + height);
  } else {
    // top triangle
    rectangle.lineTo(x + width / 2, y - pointDepth);
    rectangle.lineTo(x + width, y);
    // bottom triangle
    rectangle.moveTo(x, y + height);
    rectangle.lineTo(x + width / 2, y + height + pointDepth);
    rectangle.lineTo(x + width, y + height);
  }

  rectangle.closePath();

  return rectangle;
}


function setSegment(context, segment, isOn) {
  var offColor = "#00000033";
  var onColor = "red";
  
  context.strokeStyle = offColor;
  context.stroke(segment);
  
  if (isOn) {
    context.fillStyle = onColor;
    
  } else {
    
    context.fillStyle = offColor;
  }
  context.fill(segment);
}


function setAllSegments(context, segments, isOn) {
  for (let i = 0; i < segments.length; i++) {
    setSegment(context, segments[i], isOn);
  
  }
}

function applyNumber(number, context, segments) {
  for (let i = 0; i < 7; i++) {
    setSegment(context, segments[i], encodings[number] & (1 << i));
   
  }
}

setAllSegments(ctx, segments, false);
setAllSegments(ctx2, segments, false);
setAllSegments(ctx3, segments, false);
setAllSegments(ctx4, segments, false);
setAllSegments(ctx5, segments, false);
setAllSegments(ctx6, segments, false);

const ampm = document.getElementById("format")

setInterval(function(){
  var time = new Date();
  var hour = time.getHours();
  var hour_12Format = time.getHours() % 12;
  var clockFormat = document.querySelector('input[name="hour-format"]:checked');
  
  if(clockFormat.value === "12hour"){

  
    if(hour_12Format.toString().length == 2){
      var onesHour = (hour_12Format % 10);
      var tensHour = Math.trunc((hour_12Format / 10) % 10); 
      applyNumber(tensHour, ctx, segments);
      applyNumber(onesHour, ctx2, segments);
    }else if(hour_12Format.toString().length == 1) {
      
      if(hour_12Format === 0){
        applyNumber(1, ctx, segments);
        applyNumber(2, ctx2, segments);
      }else{
        applyNumber(0, ctx, segments);
        applyNumber(hour_12Format, ctx2, segments);
      }
    }
    var minutes = time.getMinutes();
    if(minutes.toString().length == 2){
      var onesMinutes = (minutes % 10);
      var tensMinutes = Math.trunc((minutes / 10) % 10);
      applyNumber(tensMinutes, ctx3, segments);
      applyNumber(onesMinutes, ctx4, segments);
    }else if(minutes.toString().length == 1) {
      applyNumber(0, ctx3, segments);
      applyNumber(minutes, ctx4, segments);
    }
    
    var seconds = time.getSeconds();
    
    if(seconds.toString().length == 2){
      var onesSeconds = (seconds % 10);
      var tensSeconds = Math.trunc((seconds / 10) % 10);
      
      
     applyNumber(tensSeconds, ctx5, segments);
     applyNumber(onesSeconds, ctx6, segments);
     
    }else if(seconds.toString().length == 1) {
      
     applyNumber(0, ctx5, segments);
     applyNumber(seconds, ctx6, segments);
    }
    

    if(hour < 12){
      ampm.innerText ="AM"
    
    }else if (hour >= 12){
     ampm.innerText ="PM"
     
    }else if(hour == 24){
      ampm.innerText ="AM"
    }
    

  }else{
      var exist = document.getElementById("format");
     
      if(exist !== null){
        ampm.innerText ="";
      }
     
  

    if(hour.toString().length == 2){
      var onesHour = (hour % 10);
      var tensHour = Math.trunc((hour / 10) % 10); 
      applyNumber(tensHour, ctx, segments);
      applyNumber(onesHour, ctx2, segments);
    }else if(hour.toString().length == 1) {
      applyNumber(0, ctx, segments);
      applyNumber(hour, ctx2, segments);
    }
    var minutes = time.getMinutes();
    if(minutes.toString().length == 2){
      var onesMinutes = (minutes % 10);
      var tensMinutes = Math.trunc((minutes / 10) % 10);
      applyNumber(tensMinutes, ctx3, segments);
      applyNumber(onesMinutes, ctx4, segments);
    }else if(minutes.toString().length == 1) {
      applyNumber(0, ctx3, segments);
      applyNumber(minutes, ctx4, segments);
    }
    
    var seconds = time.getSeconds();
    
    if(seconds.toString().length == 2){
      var onesSeconds = (seconds % 10);
      var tensSeconds = Math.trunc((seconds / 10) % 10);
      
      
     applyNumber(tensSeconds, ctx5, segments);
     applyNumber(onesSeconds, ctx6, segments);
     
    }else if(seconds.toString().length == 1) {
      
     applyNumber(0, ctx5, segments);
     applyNumber(seconds, ctx6, segments);
    }
  }
  
  
})



//TIMER

var canvas7 = document.getElementById("canvas7");
var ctx7 = canvas7.getContext("2d");
var canvas8 = document.getElementById("canvas8");
var ctx8 = canvas8.getContext("2d");
var canvas9 = document.getElementById("canvas9");
var ctx9 = canvas9.getContext("2d");
var canvas10 = document.getElementById("canvas10");
var ctx10 = canvas10.getContext("2d");
var canvas11 = document.getElementById("canvas11");
var ctx11 = canvas11.getContext("2d");
var canvas12 = document.getElementById("canvas12");
var ctx12 = canvas12.getContext("2d");



setAllSegments(ctx7, segments, false);
setAllSegments(ctx8, segments, false);
setAllSegments(ctx9, segments, false);
setAllSegments(ctx10, segments, false);
setAllSegments(ctx11, segments, false);
setAllSegments(ctx12, segments, false);

const clock = document.getElementById("box");
const formatClock = document.getElementById("clock");
const formatTimer = document.getElementById("timer");
const Timer= document.getElementById("box2");


formatTimer.addEventListener('click',function(){
  console.log("hello");
  clock.classList.remove("box");
  clock.classList.add("display");
  Timer.classList.add("box");
  Timer.classList.remove("display");
  formatClock.classList.remove("active");
  formatTimer.classList.add("active");
  
})

formatClock.addEventListener('click',function(){
  clock.classList.remove("display");
  clock.classList.add("box");
  Timer.classList.remove("box");
  Timer.classList.add("display");
  formatClock.classList.add("active");
  formatTimer.classList.remove("active");
})


let start = document.getElementById("start")
let reset = document.getElementById("reset");
let hourNumber = document.getElementById("hours-number");
let minuteNumber = document.getElementById("minutes-number");
let secondsNumber = document.getElementById("seconds-number");

var startTimer = null;


function timer(){
  
  if(hourNumber.value == 0 && minuteNumber.value == 0 && secondsNumber.value == 0){
    hourNumber.value = 0;
    minuteNumber.value = 0;
    secondsNumber.value = 0;
    clearInterval(startTimer);
    alert("Times Up!");
  }
   else if(secondsNumber.value != 0){    
        if(secondsNumber.value.toString().length == 2){
        
        var onesSeconds = (secondsNumber.value % 10);
        var tensSeconds = Math.trunc((secondsNumber.value / 10) % 10);
        console.log(onesSeconds);
       applyNumber(tensSeconds, ctx11, segments);
       applyNumber(onesSeconds, ctx12, segments);
       
       }else if(secondsNumber.value.toString().length == 1) {
        
       applyNumber(0, ctx11, segments);
       applyNumber(secondsNumber.value, ctx12, segments);
       }
       secondsNumber.value--;
       
  }
  else if(minuteNumber.value !=0 && secondsNumber.value ==0){
   
      if(minuteNumber.value.toString().length == 2){
            var onesMinutes = (minuteNumber.value % 10);
            var tensMinutes = Math.trunc((minuteNumber.value / 10) % 10);
            applyNumber(tensMinutes, ctx9, segments);
            applyNumber(onesMinutes, ctx10, segments);
          }else if(minuteNumber.value.toString().length == 1) {
            applyNumber(0, ctx9, segments);
            applyNumber(minuteNumber.value, ctx10, segments);
          }
          secondsNumber.value = 59;
          minuteNumber.value--;
   
    
  }
  else if(hourNumber.value != 0 && minuteNumber == 0){
    
    if(hourNumber.value.toString().length == 2){
            var onesHour = (hourNumber.value % 10);
            var tensHour = Math.trunc((hourNumber.value / 10) % 10); 
            applyNumber(tensHour, ctx7, segments);
            applyNumber(onesHour, ctx8, segments);
          }else if(hourNumber.value.toString().length == 1) {
            applyNumber(0, ctx7, segments);
            applyNumber(hourNumber.value, ctx8, segments);
          }
    
    
          minuteNumber.value = 59;
          hourNumber.value--;
   
  }
  
}

function stopTimer(){
  clearInterval(startTimer);
}


start.addEventListener('click',function(){
 
  function startInterval(){
    startTimer = setInterval(function(){
      timer();
      
    },1000);
  }
  startInterval();
})

reset.addEventListener('click',function(){
  hourNumber.value = 0;
  minuteNumber.value = 0
  secondsNumber.value =0;
  clearInterval(startTimer);
})
// setInterval(updateCountdown, 1000)


// function updateCountdown(hourNumber, minuteNumber,secondsNumber){

//   hourNumberFormat = hourNumber * 60 * 60;
//   minuteNumberFormat = minuteNumber * 60;
//   let secondsNumberFormat;
//   if(secondsNumber != ""){
//     secondsNumberFormat = parseInt(secondsNumber);
//   }else{
//     secondsNumberFormat = 0;
//   }
//   var totalTimeInSeconds = hourNumberFormat + minuteNumberFormat + secondsNumberFormat;
  
//   console.log(totalTimeInSeconds);
 
//   totalTimeInSeconds += totalTimeInSeconds-1;
  // if(hourNumber.toString().length == 2){
  //       var onesHour = (hourNumber % 10);
  //       var tensHour = Math.trunc((hourNumber / 10) % 10); 
  //       applyNumber(tensHour, ctx7, segments);
  //       applyNumber(onesHour, ctx8, segments);
  //     }else if(hourNumber.toString().length == 1) {
  //       applyNumber(0, ctx7, segments);
  //       applyNumber(hourNumber, ctx8, segments);
  //     }
     
  //     if(minuteNumber.toString().length == 2){
  //       var onesMinutes = (minuteNumber % 10);
  //       var tensMinutes = Math.trunc((minuteNumber / 10) % 10);
  //       applyNumber(tensMinutes, ctx9, segments);
  //       applyNumber(onesMinutes, ctx10, segments);
  //     }else if(minuteNumber.toString().length == 1) {
  //       applyNumber(0, ctx9, segments);
  //       applyNumber(minuteNumber, ctx10, segments);
  //     }
      
     
      
  //     if(secondsNumber.toString().length == 2){
  //       var onesSeconds = (secondsNumber % 10);
  //       var tensSeconds = Math.trunc((secondsNumber / 10) % 10);
        
        
  //      applyNumber(tensSeconds, ctx11, segments);
  //      applyNumber(onesSeconds, ctx12, segments);
       
  //     }else if(secondsNumber.toString().length == 1) {
        
  //      applyNumber(0, ctx11, segments);
  //      applyNumber(secondsNumber, ctx12, segments);
  //     }
      

  
// }
