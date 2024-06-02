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
c.addEventListener('click', (event) => {
  const mouseX = event.clientX - c.getBoundingClientRect().left;
  const mouseY = event.clientY - c.getBoundingClientRect().top;
  drawStamp(mouseX - stampWidth / 2, mouseY - stampHeight / 2);
});
function clear(){
  ctx.clearRect(0, 0, c.width, c.height);
}
function mouseDownListener(e){
    const rect = e.target.getBoundingClientRect();
    pos.x = e.clientX - rect.left;
    pos.y = e.clientY - rect.top;
 
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
  // キャンバス情報取

  // キャンバス上でマウスボタンを押した時の処理
  c.addEventListener("mousedown", mouseDownListener, false);
  c.addEventListener("mouseup", mouseDownListener, false);

  c.addEventListener('mousedown', () => {
    rectPas.x=pos.x;
    rectPas.y=pos.y;
  }, {once: false});
  c.addEventListener('mouseup', () => {
    ctx.strokeRect(rectPas.x,rectPas.y,pos.x-rectPas.x,pos.y-rectPas.y);
  }, {once: false});
});

cleaeButton.addEventListener('mousedown', clear, false);
