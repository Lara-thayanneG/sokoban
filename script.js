$(function(){
    var jogador = new Bloco("#jogador",20,20);
    var parede1 = new Bloco("#parede1",60,60);
    var parede2 = new Bloco("#parede2",60,140);

    var main = $("#main"); 
    var position;
    var mainPosition = main.position();


   
    $(window).keydown(function(e){

        jogadorPosition = jogador.div.position();

        //esquerda
        if(e.keyCode=='37' && (jogadorPosition.left-jogador.div.width())>mainPosition.left){ 
           if(!jogador.colisaoLeft(parede1) && !jogador.colisaoLeft(parede2)){ 
            jogador.mover(0,-20);

           }
        }
        //cima
         if(e.keyCode=='38' && (jogadorPosition.top-jogador.div.height())>mainPosition.top){
           if(!jogador.colisaoTop(parede1) && !jogador.colisaoTop(parede2)){ 
            jogador.mover(-20,0);
           }
        }
        //direita
         if(e.keyCode=='39' && (jogadorPosition.left)<main.width()){
           if(!jogador.colisaoRight(parede1) && !jogador.colisaoRight(parede2)){ 
              jogador.mover(0,20);
           }
        }
        //baixo
         if(e.keyCode=='40' && (jogadorPosition.top)<main.height()){
            if(!jogador.colisaoDown(parede1) && !jogador.colisaoDown(parede2)){   
               jogador.mover(20,0);
            }
        }
    });


   
   
   function Bloco(id,topInicial,leftInicial){
       this.div = $(id);
       this.top = topInicial;
       this.left = leftInicial;


       this.div.css({"top":this.top+"px","left":this.left+"px"});



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


       this.colisaoTop = function(outro){
            var colidiuNoYTopo = ((outro.top + outro.div.height()) >= this.top) && (this.left>=outro.left && this.left<outro.left+outro.div.width());
            return colidiuNoYTopo;
       }

        this.colisaoDown = function(outro){
            
            var colidiuNoYBase =  outro.top == (this.top + this.div.height()) && (this.left>=outro.left && this.left<outro.left+outro.div.width());
            return colidiuNoYBase;
       }

       this.colisaoLeft = function(outro){
            var colidiuNoYBase =((outro.left + outro.div.width()) == this.left) && (this.top>=outro.top && this.top<outro.top+outro.div.height());
            return colidiuNoYBase;
       }

       this.colisaoRight = function(outro){
          
            var colidiuNoYBase =  outro.left == (this.left + this.div.width()) && (outro.top<=this.top && this.top<outro.top+outro.div.height());
            return colidiuNoYBase;
       }

     


   }
})