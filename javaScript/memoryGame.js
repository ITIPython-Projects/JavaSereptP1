
//--------------------------SAFAA
let imgs = [
    '../media/images/memoryGame/1.gif',
    '../media/images/memoryGame/2.gif',
    '../media/images/memoryGame/3.gif',
    '../media/images/memoryGame/4.gif',
    '../media/images/memoryGame/5.gif',
    '../media/images/memoryGame/6.gif'];
let rightAudio = new Audio('../media/sound/memoryGame/right.wav');    

let memory = document.getElementById('memory');
let allDivs = document.getElementsByTagName('div');

function drowimgs(){
    for (let i=0; i<imgs.length; i++){
        memory.innerHTML += '<div><img src="' +imgs[i]+ '"></div>';
    }
}
drowimgs();
drowimgs();

var flg = true;
var arr =[];
for(let i=0; i<allDivs.length; i++){
    allDivs[i].addEventListener('click',function(){
        if(flg){
            this.firstChild.style.opacity = '1';
            if(arr.length == 0){
                arr[0] = this;
            }else if(arr.length ==1){
                arr[1] = this;
            }
            if(arr.length == 2){
                flg = false;
                setTimeout(checkImg, 200);
            }
        }else{
            return;
        }
    })
    
    function checkImg(){
        if(arr[0].firstChild.getAttribute('src') == arr[1].firstChild.getAttribute('src')){
            rightAudio.play();
        }else{
            arr[0].firstChild.style.opacity = 0;
            arr[1].firstChild.style.opacity = 0;
        }

        arr = [];
        flg = true;
    }
}