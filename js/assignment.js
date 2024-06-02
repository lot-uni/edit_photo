window.onload=function(){
    const scriptElement = document.createElement('script');
    var userAgent = navigator.userAgent.toLowerCase();
    var isSmartphone = /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/.test(userAgent);
    
    // PCかどうかを判定
    var isPC = !isSmartphone;
    console.log("a");
    // スマホの場合の処理
    if (isSmartphone) {
        scriptElement.src = "js/edit-pc.js";
    }
    
    // PCの場合の処理
    if (isPC) {
        scriptElement.src = "js/edit-pc.js";
    }
    document.body.appendChild(scriptElement);
}
