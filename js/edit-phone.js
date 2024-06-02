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
  const rect = event.target.getBoundingClientRect();
  pos.x = event.touches[0].clientX - rect.left;
  pos.y = event.touches[0].clientY - rect.top;
  drawStamp(pos.x - stampWidth / 2, pos.y - stampHeight / 2);
});

function clear(){
  ctx.clearRect(0, 0, c.width, c.height);
}

function touchDownListener(e){
    const rect = e.target.getBoundingClientRect();
    pos.x = e.touches[0].clientX - rect.left;
    pos.y = e.touches[0].clientY - rect.top;
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
  c.addEventListener("touchstart", touchDownListener, false);

  c.addEventListener('touchstart', () => {
    const rect = c.getBoundingClientRect();
    rectPas.x = event.touches[0].clientX - rect.left;
    rectPas.y = event.touches[0].clientY - rect.top;
  }, {once: false});

  c.addEventListener('touchend', () => {
    const rect = c.getBoundingClientRect();
    ctx.strokeRect(rectPas.x, rectPas.y, pos.x - rectPas.x, pos.y - rectPas.y);
  }, {once: false});
});

cleaeButton.addEventListener('touchstart', clear, false);
