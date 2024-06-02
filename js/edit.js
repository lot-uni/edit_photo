var selFile = document.getElementById('file_choice'); // input type="file"の要素取得
var cleaeButton = document.getElementById('button');
var c = document.getElementById('board'); // canvasの要素取得
var ctx = c.getContext('2d');
const tagImage = new Image();
tagImage.src = "img/tag.png";

let pos = {x: 0, y: 0};   // クリックしたXY座標
let rectPas = {x: 0, y: 0};

// スタンプのサイズを指定
const stampWidth = 30;
const stampHeight = 30;

// スタンプを描画する関数
function drawStamp(x, y) {
  ctx.drawImage(tagImage, x-18, y+15, stampWidth, stampHeight);
}

c.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  const touchX = touch.clientX - c.getBoundingClientRect().left;
  const touchY = touch.clientY - c.getBoundingClientRect().top;
  drawStamp(touchX - stampWidth / 2, touchY - stampHeight / 2);
});

function clear(){
  ctx.clearRect(0, 0, c.width, c.height);
}

function touchDownListener(e){
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    pos.x = touch.clientX - rect.left;
    pos.y = touch.clientY - rect.top;
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
  // キャンバス情報取得

  // キャンバス上でタッチした時の処理
  c.addEventListener("touchstart", touchDownListener, false);

  c.addEventListener('touchstart', () => {
    rectPas.x=pos.x;
    rectPas.y=pos.y;
  }, {once: false});
  c.addEventListener('touchend', () => {
    const touch = event.changedTouches[0];
    const rect = event.target.getBoundingClientRect();
    const endX = touch.clientX - rect.left;
    const endY = touch.clientY - rect.top;
    ctx.strokeRect(rectPas.x, rectPas.y, endX - rectPas.x, endY - rectPas.y);
  }, {once: false});
});

cleaeButton.addEventListener('touchstart', clear, false);
