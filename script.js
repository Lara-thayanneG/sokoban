$(function(){

    const LEFT="37";
    const UP="38";
    const RIGHT="39";
    const DOWN="40";

    const JOGADOR = 1;
    const PAREDE = 2;
    const CAIXA = 3; 

    var jogador = new Bloco("#jogador",JOGADOR,20,20);
    var parede1 = new Bloco("#parede1",PAREDE,60,60);
    var parede2 = new Bloco("#parede2",PAREDE,60,120);

    var caixa1 = new Bloco("#caixa1",CAIXA,60,40);
    var caixa2 = new Bloco("#caixa2",CAIXA,120,20);
    var caixa3 = new Bloco("#caixa3",CAIXA,80,0);


    var blocos = [parede1,parede2,caixa1,caixa2,caixa3];
    var paredes = [parede1,parede2,caixa1,caixa2,caixa3];


    var main = $("#main"); 
    var position;
    var mainPosition = main.position();


    var leftMain = function(bloco){
        return bloco.left>mainPosition.left;
    }
    var rightMain = function(bloco){
        return (bloco.left+bloco.div.width())<main.width();
    }
    var topMain = function(bloco){
        return (bloco.top)>mainPosition.top;
    }
    var bottomMain = function(bloco){
        return (bloco.top+bloco.div.height())<main.height();
    }

    $(window).keydown(function(e){

        jogadorPosition = jogador.div.position();
        var elemColidido = null;
        //esquerda
        if(e.keyCode=='37' && leftMain(jogador)){ 
            elemColidido = jogador.colisao(LEFT,blocos);
           if(elemColidido==null){ 

              jogador.mover(0,-20);

           }else if(elemColidido.getTipo()==CAIXA){
              
              if(elemColidido.colisao(LEFT,paredes)==null){
                  if(leftMain(elemColidido)){
                    elemColidido.mover(0,-20);
                    jogador.mover(0,-20);
                  }
               }
           }
        }
        //cima
         if(e.keyCode=='38' && topMain(jogador)){
           elemColidido = jogador.colisao(UP,blocos);  
           if(elemColidido==null){ 
             jogador.mover(-20,0);
           }else if(elemColidido.getTipo()==CAIXA){
             if(elemColidido.colisao(UP,paredes)==null){
                 if(topMain(elemColidido)){
                   elemColidido.mover(-20,0);
                   jogador.mover(-20,0);
                 }
               }
           }
        }
        //direita
         if(e.keyCode=='39' && rightMain(jogador)){
             elemColidido = jogador.colisao(RIGHT,blocos);
            if(elemColidido==null){ 
              jogador.mover(0,20);
           }else if(elemColidido.getTipo()==CAIXA){
               if(elemColidido.colisao(RIGHT,paredes)==null){
                   if(rightMain(elemColidido)){
                      elemColidido.mover(0,20);
                      jogador.mover(0,20);
                   }
               }
           }
        }
        //baixo
         if(e.keyCode=='40' && bottomMain(jogador)){
             elemColidido = jogador.colisao(DOWN,blocos);
             if(elemColidido==null){    
               jogador.mover(20,0);
            }else if(elemColidido.getTipo()==CAIXA){
               if(elemColidido.colisao(DOWN,paredes)==null){
                   if(bottomMain(elemColidido)){
                      elemColidido.mover(20,0);
                      jogador.mover(20,0);
                   }
               }
           }
        }
    });



   
   function Bloco(id,tipo,topInicial,leftInicial){
       this.div = $(id);
       this.top = topInicial;
       this.left = leftInicial;
       this.tipo = tipo;


       this.div.css({"top":this.top+"px","left":this.left+"px"});

       this.getTipo = function(){
           return this.tipo;
       }

       this.mover = function(dTop, dLeft) {
            this.top += dTop;
            this.left += dLeft;

            if(dTop!=0){
                this.div.css("top",this.top+"px");
            }

            if(dLeft!=0){
                this.div.css("left",this.left+"px");
            }
       }


       this.colisao = function(direcao,outros){
           var colidiu;
           var elemColidido=null;
           outros.forEach(function(outro) {
               switch (direcao){
                   case UP:
                      colidiu = ((outro.top + outro.div.height()) == this.top) && (this.left>=outro.left && this.left<outro.left+outro.div.width());
                      break;
                   case DOWN:
                      colidiu = outro.top == (this.top + this.div.height()) && (this.left>=outro.left && this.left<outro.left+outro.div.width());
                      break;
                   case LEFT:
                      colidiu = ((outro.left + outro.div.width()) == this.left) && (this.top>=outro.top && this.top<outro.top+outro.div.height());   
                      break;
                   case RIGHT:
                      colidiu = outro.left == (this.left + this.div.width()) && (this.top>=outro.top && this.top<outro.top+outro.div.height());
                      break;
                   default:
                       colidiu=false;   
               }

               if(colidiu==true){
                   elemColidido=outro;
               }
           }, this);

           return elemColidido;
           
       }

     


   }
})