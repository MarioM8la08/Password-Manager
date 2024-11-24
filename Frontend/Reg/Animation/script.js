const mattonella1 = document.querySelector(".mattonella1");
const mattonella5 = document.querySelector(".mattonella5");
const main = document.getElementById("main")

mattonella1.addEventListener('animationend', function() {   
    for(i=1; i < 10; i++){
        let namemt = "mattonella" + i;
        let mattonella = document.querySelector(`.${namemt}`);
        if(i != 5){
            mattonella.style.animation = `${namemt} 0.5s ease-in-out 1 forwards`;
            setTimeout(function(){
                mattonella.remove();
                main.style.width = "100%"
                main.style.height = "100%"
            }, 400)
        } else {
            setTimeout(function(){
                mattonella.style.animation = `${namemt} 1s ease-in-out 1 forwards`;
            }, 400)
        }
    }
});
setTimeout(function () {
    window.location.href = "../Registration.html";
}, 4000)
