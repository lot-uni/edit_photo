var selFile = document.getElementById('file_choice'); // input type="file"の要素取得
var cleaeButton = document.getElementById('button');
var c = document.getElementById('board'); // canvasの要素取得
var ctx = c.getContext('2d');
const tagImage = new Image();
tagImage.src = "img/tag.png";
let pos = {x: 0, y: 0};
let rectPas = {x: 0, y: 0};
const stampWidth = 30;
const stampHeight = 30;

function drawStamp(x, y) {
  ctx.drawImage(tagImage, x-30, y, stampWidth, stampHeight);
}

function touchStartListener(e){
    const rect = e.target.getBoundingClientRect();
    pos.x = e.touches[0].clientX - rect.left;
    pos.y = e.touches[0].clientY - rect.top;
}

function touchEndListener(e){
    const rect = e.target.getBoundingClientRect();
    var endX = e.changedTouches[0].clientX - rect.left;
    var endY = e.changedTouches[0].clientY - rect.top;
    ctx.strokeRect(rectPas.x,rectPas.y,endX-rectPas.x,endY-rectPas.y);
    drawStamp(rectPas.x,rectPas.y);
}

function clearCanvas(evt){
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}

selFile.addEventListener("change", function(evt){
 var file = evt.target.files; // fileの取得
 var reader = new FileReader();

 reader.readAsDataURL(file[0]); // fileの要素をdataURL形式で読み込む

 // ファイルを読み込んだ時に実行する
 reader.onload = function(){
  var dataUrl = reader.result; // 読み込んだファイルURL
  var img = new Image(); // 画像

  img.src = dataUrl;
  img.onload=function(){
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    ctx.drawImage(img,0,0,400,400);
  }
 }
}, false);

window.addEventListener("load", function(){
  c.addEventListener("touchstart", touchStartListener, false);
  c.addEventListener("touchend", touchEndListener, false);

  c.addEventListener('touchstart', () => {
    rectPas.x=pos.x;
    rectPas.y=pos.y;
  }, {once: false});
});

cleaeButton.addEventListener('touchstart', clearCanvas, false);
