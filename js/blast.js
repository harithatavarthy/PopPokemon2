function Blast(domContainer){
	
	var blasts=[], 
		spareBlasts=[];
		
	this.container = domContainer;  
	
	this.update = function(){
		
		for(var i=0; i<blasts.length; i++){
			var blast = blasts[i]; 
			if(!blast.enabled) continue; 
			blast.update(); 
			if(!blast.enabled) this.removeblast(blast); 
		}
		
	};
	
	this.removeblast = function(blast) {
		blast.domElement.style.visibility = "hidden"; 
		blast.enabled = false; 
		spareBlasts.push(blast); 
	};
	
	this.makeExplosion = function(xpos, ypos, zpos){
		
		for(var i=0; i<30; i++) {
			var blast = this.makeblast(); 
			blast.x = xpos; 
			blast.y = ypos; 
			blast.z = zpos; 
			
			blast.xVel = Math.random() - 0.5; 
			blast.yVel = Math.random() - 0.5; 
			blast.zVel = Math.random() - 0.5;
			
			var speed = Math.sqrt((blast.xVel * blast.xVel)+(blast.yVel * blast.yVel)+(blast.zVel * blast.zVel));
			blast.xVel *= 40/speed;
			blast.yVel *= 40/speed;
			blast.zVel *= 40/speed;
			
			blast.size = 1.5; 
		
			blast.update(); 
			
		}
		
	};	
	
	this.makeblast = function(){
		
		var blast; 
		
		if(spareBlasts.length>0){
			blast = spareBlasts.shift();
			blast.domElement.style.visibility = "visible"; 
		
		} else {
			blast = new blastParticle(); 
			blasts.push(blast); 
			this.container.appendChild(blast.domElement);
		}
		
		blast.enabled = true;  
	
		return blast; 
		
	};
	
}

function blastParticle(){
	
	var domElement = this.domElement = document.createElement('div');

	 
	this.domElement.style.background = 'url(img/blast.png) transparent';
	domElement.style.position = 'absolute';
	domElement.style.display = 'block'; 
	domElement.style.width = "128px"; 
	domElement.style.height = "128px";
	domElement.style.webkitTransformOrigin = "64px 64px"; 
	
	this.x = 0; 
	this.y = 0;
	this.z = 0; 
	this.xVel = 0; 
	this.yVel = 0; 
	this.zVel = 0; 
	this.size = 1; 
	
	this.enabled = true; 
	
	this.update = function(){
		
		var drag = 0.84; 
		
		this.xVel*=drag; 
		this.yVel*=drag; 
		this.zVel*=drag; 
		
		this.x+=this.xVel; 
		this.y+=this.yVel; 
		this.z+=this.zVel; 
		
		this.size*=0.9; 

		domElement.style.webkitTransform = "translate3d("+this.x+"px, "+this.y+"px, "+this.z+"px) scale("+this.size+")"; 
		
		if(this.size<0.05) this.enabled = false; 

	};
	
}/**
 * 
 */