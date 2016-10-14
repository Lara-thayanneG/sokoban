$(function(){

    const LEFT="37";
    const UP="38";
    const RIGHT="39";
    const DOWN="40";

    const JOGADOR = 1;
    const PAREDE = 2;
    const CAIXA = 3;
    const MARCA = 4;  

    var jogador = new Bloco("#jogador",JOGADOR,560,240);
    var parede6 = new Bloco("#parede6",PAREDE,0,0);
    var parede7 = new Bloco("#parede7",PAREDE,0,400);
    var parede3 = new Bloco("#parede3",PAREDE,0,80);
    var parede4 = new Bloco("#parede4",PAREDE,640,80);
    var parede5 = new Bloco("#parede5",PAREDE,80,80);
	var parede8 = new Bloco("#parede8",PAREDE,160,80);
	var parede9 = new Bloco("#parede9",PAREDE,560,80);
	var parede10 = new Bloco("#parede10",PAREDE,480,80);
	var parede11 = new Bloco("#parede11",PAREDE,320,160);
	var parede12 = new Bloco("#parede12",PAREDE,320,320);
	
	

    var caixa1 = new Bloco("#caixa1",CAIXA,240,240);
    var caixa2 = new Bloco("#caixa2",CAIXA,480,240);
    var caixa3 = new Bloco("#caixa3",CAIXA,400,240);

    var marca1 = new Bloco("#marca1",MARCA,160,240);
    var marca2 = new Bloco("#marca2",MARCA,240,240);
    var marca3 = new Bloco("#marca3",MARCA,480,240);


    var blocos = [parede11,parede12,parede3,parede4,parede5,parede6,parede7,parede8,parede9,parede10,caixa1,caixa2,caixa3];
    var paredes = [parede11,parede12,parede3,parede4,parede5,parede6,parede7,parede8,parede9,parede10,caixa1,caixa2,caixa3];


    var main = $("#main"); 
    var position;
    var mainPosition = main.position();


var verificaVitoria = function(){
       var flag1 = false;
       var flag2 = false;
       var flag3 = false;


       if( (caixa1.top==marca1.top && caixa1.left==marca1.left) 
       || (caixa1.top==marca2.top && caixa1.left==marca2.left) 
       || (caixa1.top==marca3.top && caixa1.left==marca3.left)) {
           caixa1.div.css("background-image","url('Xok.png')");
           flag1=true;
       }else{
           caixa1.div.css("background-image","url('Xcaixa.png')");
           flag1=false;
       }
       
       if( (caixa2.top==marca1.top && caixa2.left==marca1.left) 
       || (caixa2.top==marca2.top && caixa2.left==marca2.left) 
       || (caixa2.top==marca3.top && caixa2.left==marca3.left)  ){

       caixa2.div.css("background-image","url('Xok.png')");
           flag2=true;
       }else{
           caixa2.div.css("background-image","url('Xcaixa.png')");
           flag2=false;
       }
       
       if( (caixa3.top==marca1.top && caixa3.left==marca1.left)
       || (caixa3.top==marca2.top && caixa3.left==marca2.left) 
       || (caixa3.top==marca3.top && caixa3.left==marca3.left)  ) {
           caixa3.div.css("background-image","url('Xok.png')");
           flag3=true;
       }else{
           caixa3.div.css("background-image","url('Xcaixa.png')");
           flag3=false;
       }
       
       
       
       if(flag1 && flag2 && flag3){
           $("p").css("visibility","visible");
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
        if(e.keyCode=='37' && leftMain(jogador)){ 
            elemColidido = jogador.colisao(LEFT,blocos);
           if(elemColidido==null){ 

              jogador.mover(0,-80);

           }else if(elemColidido.getTipo()==CAIXA){
              
              if(elemColidido.colisao(LEFT,paredes)==null){
                  if(leftMain(elemColidido)){
                    elemColidido.mover(0,-80);
                    jogador.mover(0,-80);
                  }
               }
           }
        }
        //cima
         if(e.keyCode=='38' && topMain(jogador)){
           elemColidido = jogador.colisao(UP,blocos);  
           if(elemColidido==null){ 
             jogador.mover(-80,0);
           }else if(elemColidido.getTipo()==CAIXA){
             if(elemColidido.colisao(UP,paredes)==null){
                 if(topMain(elemColidido)){
                   elemColidido.mover(-80,0);
                   jogador.mover(-80,0);
                 }
               }
           }
        }
        //direita
         if(e.keyCode=='39' && rightMain(jogador)){
             elemColidido = jogador.colisao(RIGHT,blocos);
            if(elemColidido==null){ 
              jogador.mover(0,80);
           }else if(elemColidido.getTipo()==CAIXA){
               if(elemColidido.colisao(RIGHT,paredes)==null){
                   if(rightMain(elemColidido)){
                      elemColidido.mover(0,80);
                      jogador.mover(0,80);
                   }
               }
           }
        }
        //baixo
         if(e.keyCode=='40' && bottomMain(jogador)){
             elemColidido = jogador.colisao(DOWN,blocos);
             if(elemColidido==null){    
               jogador.mover(80,0);
            }else if(elemColidido.getTipo()==CAIXA){
               if(elemColidido.colisao(DOWN,paredes)==null){
                   if(bottomMain(elemColidido)){
                      elemColidido.mover(80,0);
                      jogador.mover(80,0);
                   }
               }
           }
        }

      
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

     


   }
})