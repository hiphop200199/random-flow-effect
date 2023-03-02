window.addEventListener("load",function(){
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
   
    let hue=0;
    let color=`hsl(${hue},100%,75%)`;
    let particleArray=[];
    let vangle=0.03;
    let timer=0;
    let interval=1300;
    let lastTime=0;
    let spawnInterval=Math.floor(Math.random()*500)+1100;
  class Particle{
      constructor(x,y,color,vangle) {
          this.x=x;
          this.y=y;
          this.size=Math.floor(Math.random()*5)+6;
          this.color=color;
          this.angle=0;
          this.vangle=vangle;
          this.vx;
          this.vy;
          this.markedForDeletion=false;
      }
      update(deltaTime){
          if(timer>interval){
              this.vangle*=-1;
              timer=0;
          }else{
              timer+=deltaTime;
          }
        this.angle+=this.vangle;
        this.vx=Math.cos(this.angle)*8;
        this.vy=Math.sin(this.angle)*4;
      this.x+=this.vx;
       this.y+=this.vy;
      this.size-=0.06;
      if(this.size<=0.5)this.markedForDeletion=true;
        
      }
      draw(){
          context.fillStyle=this.color;
       
         
          context.beginPath();
         
          context.arc(this.x, this.y, this.size, 0, Math.PI*2);
         
          context.fill();
          context.closePath();
      }
  }
  


  
          
      
    
  
  
    function animate(timeStamp) {
      const deltaTime=timeStamp-lastTime;
     lastTime=timeStamp;
      context.fillStyle='rgba(0,0,0,0.08)';
      context.fillRect(0,0,canvas.width,canvas.height);
      
      particleArray.forEach(particle =>particle.update(deltaTime));
     for(let i=0;i<particleArray.length;i++){
      if(particleArray[i].markedForDeletion){
          particleArray.splice(i,1);
          i--;
      }
     }
      particleArray.forEach(particle => particle.draw());
     
     if(hue==360)hue=0;
     hue++;
     console.log(hue)
              color=`hsl(${hue},100%,75%)`;
      if(timer>spawnInterval){
          
            
              let x=Math.random()*canvas.width;
              let y=Math.random()*canvas.height;
              particleArray.push(new Particle(x,y,color,vangle));
              timer=0;
           }
          else{
              timer+=deltaTime;
          }
      requestAnimationFrame(animate);
    }
    
    
    animate(0);
});