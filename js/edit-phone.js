console.log("phone");

var selFile = document.getElementById('file_choice');
var cleaeButton = document.getElementById('button');
var c = document.getElementById('board');
var ctx = c.getContext('2d');
const tagImage = new Image();
tagImage.src = "img/tag.png";

let pos = {x: 0, y: 0};
let rectPas = {x: 0, y: 0};

const stampWidth = 30;
const stampHeight = 30;

function drawStamp(x, y) {
  ctx.drawImage(tagImage, x-18, y+15, stampWidth, stampHeight);
}

c.addEventListener('touchstart', (event) => {
  event.preventDefault();
  const touch = event.touches[0];
  const rect = c.getBoundingClientRect();
  const touchX = touch.clientX - rect.left;
  const touchY = touch.clientY - rect.top;
  drawStamp(touchX - stampWidth / 2, touchY - stampHeight / 2);
});

function clear(){
  ctx.clearRect(0, 0, c.width, c.height);
}

function touchStartListener(e){
    e.preventDefault();
    const touch = e.touches[0];
    const rect = c.getBoundingClientRect();
    pos.x = touch.clientX - rect.left;
    pos.y = touch.clientY - rect.top;
}

selFile.addEventListener("change", function(evt){
  var file = evt.target.files;
  var reader = new FileReader();

  reader.readAsDataURL(file[0]);

  reader.onload = function(){
    var dataUrl = reader.result;
    var img = new Image();

    img.src = dataUrl;
    img.onload=function(){
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
      ctx.drawImage(img,0,0,400,400);
    }
  }
}, false);

window.addEventListener("load", function(){
  c.addEventListener("touchstart", touchStartListener, false);

  c.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    rectPas.x = touch.clientX - c.getBoundingClientRect().left;
    rectPas.y = touch.clientY - c.getBoundingClientRect().top;
  }, {once: false});

  c.addEventListener('touchend', (event) => {
    event.preventDefault();
    const touch = event.changedTouches[0];
    const endX = touch.clientX - c.getBoundingClientRect().left;
    const endY = touch.clientY - c.getBoundingClientRect().top;
    ctx.strokeRect(rectPas.x, rectPas.y, endX - rectPas.x, endY - rectPas.y);
  }, {once: false});
});

cleaeButton.addEventListener('touchstart', clear, false);
