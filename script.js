$(function(){
    var human = $("#human");
    var main = $("#main"); 
    var position;
    var mainPosition = main.position();


   
    $(window).keydown(function(e){

        humanPosition = human.position();

        //esquerda
        if(e.keyCode=='37' && (humanPosition.left-human.width())>mainPosition.left){ 
           human.css({"left":"-=20px"});
        }
        //cima
         if(e.keyCode=='38' && (humanPosition.top-human.height())>mainPosition.top){
            human.css({"top":"-=20px"});
        }
        //direita
         if(e.keyCode=='39' && (humanPosition.left)<main.width()){
            human.css({"left":"+=20px"});
        }
        //baixo
         if(e.keyCode=='40' && (humanPosition.top)<main.height()){
            human.css({"top":"+=20px"});
        }
    });
})