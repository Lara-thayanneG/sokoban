$(function(){

    const LEFT="37";
    const UP="38";
    const RIGHT="39";
    const DOWN="40";

    const JOGADOR = 1;
    const PAREDE = 2;
    const CAIXA = 3;
    const MARCA = 4;  

    var jogador = new Bloco("#jogador",JOGADOR,160,240);
    var parede1 = new Bloco("#parede1",PAREDE,0,0);
    var parede2 = new Bloco("#parede2",PAREDE,0,400);
    var parede3 = new Bloco("#parede3",PAREDE,0,80);
    var parede4 = new Bloco("#parede4",PAREDE,480,80);
    var parede5 = new Bloco("#parede5",PAREDE,160,160);

    var caixa1 = new Bloco("#caixa1",CAIXA,240,160);
    var caixa2 = new Bloco("#caixa2",CAIXA,240,240);
    var caixa3 = new Bloco("#caixa3",CAIXA,320,240);

    var marca1 = new Bloco("#marca1",MARCA,320,160);
    var marca2 = new Bloco("#marca2",MARCA,240,240);
    var marca3 = new Bloco("#marca3",MARCA,320,240);


    var blocos = [parede1,parede2,parede3,parede4,parede5,caixa1,caixa2,caixa3];
    var paredes = [parede1,parede2,parede3,parede4,parede5,caixa1,caixa2,caixa3];


    var main = $("#main"); 
    var position;
    var mainPosition = main.position();
    var movimentos_jogador = 0;



var verificaVitoria = function(){
       var flag1 = false;
       var flag2 = false;
       var flag3 = false;


       if( (caixa1.isSamePosition(marca1)) 
       || (caixa1.isSamePosition(marca2)) 
       || (caixa1.isSamePosition(marca3))) {
           caixa1.div.css("background-image","url('Xok.png')");
           flag1=true;
       }else{
           caixa1.div.css("background-image","url('Xcaixa.png')");
           flag1=false;
       }
       
       if( (caixa2.isSamePosition(marca1)) 
       || (caixa2.isSamePosition(marca2)) 
       || (caixa2.isSamePosition(marca3))) {

       caixa2.div.css("background-image","url('Xok.png')");
           flag2=true;
       }else{
           caixa2.div.css("background-image","url('Xcaixa.png')");
           flag2=false;
       }
       
      if( (caixa3.isSamePosition(marca1)) 
       || (caixa3.isSamePosition(marca2)) 
       || (caixa3.isSamePosition(marca3))) {
           caixa3.div.css("background-image","url('Xok.png')");
           flag3=true;
       }else{
           caixa3.div.css("background-image","url('Xcaixa.png')");
           flag3=false;
       }
       
       
       //todas as caixas estão em seus devidos lugares, então o jogador
       //venceu o estágio
       if(flag1 && flag2 && flag3){
           $("p").css("visibility","visible");
           $(window).unbind();
       }
   }


    verificaVitoria();
    $(window).keydown(function(e){
        movimenta(e);
    });
   












    var movimenta = function(e){
         

        jogadorPosition = jogador.div.position();
        var elemColidido = null;
        //esquerda
        if(e.keyCode==LEFT && leftMain(jogador)){ 
            elemColidido = jogador.colisao(LEFT,blocos);
           if(elemColidido==null){ 

              jogador.mover(0,-80);
              ++movimentos_jogador;

           }else if(elemColidido.getTipo()==CAIXA){
              
              if(elemColidido.colisao(LEFT,paredes)==null){
                  if(leftMain(elemColidido)){
                    elemColidido.mover(0,-80);
                    jogador.mover(0,-80);
                    ++movimentos_jogador;
                  }
               }
           }
        }
        //cima
         if(e.keyCode==UP && topMain(jogador)){
           elemColidido = jogador.colisao(UP,blocos);  
           if(elemColidido==null){ 
             jogador.mover(-80,0);
             ++movimentos_jogador;
           }else if(elemColidido.getTipo()==CAIXA){
             if(elemColidido.colisao(UP,paredes)==null){
                 if(topMain(elemColidido)){
                   elemColidido.mover(-80,0);
                   jogador.mover(-80,0);
                   ++movimentos_jogador;
                 }
               }
           }
        }
        //direita
         if(e.keyCode==RIGHT && rightMain(jogador)){
             elemColidido = jogador.colisao(RIGHT,blocos);
            if(elemColidido==null){ 
              jogador.mover(0,80);
              ++movimentos_jogador;
           }else if(elemColidido.getTipo()==CAIXA){
               if(elemColidido.colisao(RIGHT,paredes)==null){
                   if(rightMain(elemColidido)){
                      elemColidido.mover(0,80);
                      jogador.mover(0,80);
                      ++movimentos_jogador;
                   }
               }
           }
        }
        //baixo
         if(e.keyCode==DOWN && bottomMain(jogador)){
             elemColidido = jogador.colisao(DOWN,blocos);
             if(elemColidido==null){    
               jogador.mover(80,0);
               ++movimentos_jogador;
            }else if(elemColidido.getTipo()==CAIXA){
               if(elemColidido.colisao(DOWN,paredes)==null){
                   if(bottomMain(elemColidido)){
                      elemColidido.mover(80,0);
                      jogador.mover(80,0);
                      ++movimentos_jogador;
                   }
               }
           }
        }

       $("#movimentos").text("Movimentos: " + movimentos_jogador);
       verificaVitoria();

    }

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





    

   //função construtora para os elementos do jogo (parede,jogador,caixa,espaco vazio)
   function Bloco(id,tipo,topInicial,leftInicial){
       this.div = $(id);
       this.top = topInicial;
       this.left = leftInicial;
       this.tipo = tipo;

       //posiciona o bloco
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
                      colidiu = ((outro.top + outro.div.height()) == this.top) && ((this.left+this.div.width())>outro.left && this.left<outro.left+outro.div.width());
                      break;
                   case DOWN:
                      colidiu = outro.top == (this.top + this.div.height()) && (this.left+this.div.width()>outro.left && this.left<outro.left+outro.div.width());
                      break;
                   case LEFT:
                      colidiu = ((outro.left + outro.div.width()) == this.left) && ((this.top+this.div.height())>outro.top && this.top<outro.top+outro.div.height());   
                      break;
                   case RIGHT:
                      colidiu = outro.left == (this.left + this.div.width()) && (this.top+this.div.height()>outro.top && this.top<outro.top+outro.div.height());
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

       this.isSamePosition = function(outro){
           if(this.top==outro.top && this.left==outro.left){
               return true;
           }
           return false;
       }

     


   }
})