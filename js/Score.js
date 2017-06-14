function Score(domContainer){
	
	var scores=[], 
		spareScores=[];
		
	
	this.container = domContainer;  
	
	this.update = function(){
		
		for(var i=0; i<scores.length; i++){
			var goldCoin = scores[i]; 
			if(!goldCoin.enabled) continue; 
			goldCoin.update(); 
			if(!goldCoin.enabled) this.removeGoldCoin(goldCoin); 
		}
		
	};
	
	this.removeGoldCoin = function(goldCoin) {
		goldCoin.domElement.style.visibility = "hidden"; 
		goldCoin.enabled = false; 
		spareScores.push(goldCoin); 
	};
	
	this.makeScore = function(xpos, ypos, zpos, pointsAwarded){
		
		
			var goldCoin = this.makeGoldCoin();
			
				if(pointsAwarded != 0)
				{
				goldCoin.domElement.innerHTML = pointsAwarded;
				}
				else
				{
				goldCoin.domElement.innerHTML = "+1 Sec";
				}
				
	
			goldCoin.x = xpos; 
			goldCoin.y = ypos; 
			goldCoin.z = zpos; 
			
			goldCoin.xVel = Math.random() - 0.5; 
			goldCoin.yVel = Math.random() - 0.5; 
			goldCoin.zVel = Math.random() - 0.5;
			
			var speed = Math.sqrt((goldCoin.xVel * goldCoin.xVel)+(goldCoin.yVel * goldCoin.yVel)+(goldCoin.zVel * goldCoin.zVel));
			goldCoin.xVel *= 40/speed;
			goldCoin.yVel *= 40/speed;
			goldCoin.zVel *= 40/speed;
			
			goldCoin.size = 3; 
		
			goldCoin.update(); 
			
		
		
	};	
	
	this.makeGoldCoin = function(){
		
		var goldCoin; 
		
		if(spareScores.length>0){
			goldCoin = spareScores.shift();
			goldCoin.domElement.style.visibility = "visible"; 
		
		} else {
			goldCoin = new Gold(); 
			scores.push(goldCoin); 
			this.container.appendChild(goldCoin.domElement);
		}
		
		goldCoin.enabled = true;  
	
		return goldCoin; 
		
	};
	
}

function Gold(){
	
	var domElement = this.domElement = document.createElement('div');

	 
	//this.domElement.style.background = 'url(img/goldCoin.png) transparent';
	this.domElement.style.background = 'transparent';
	domElement.style.color = '#ffffff';
	domElement.style.fontsize = '1em';
	domElement.style.position = 'absolute';
	domElement.style.display = 'block'; 
	domElement.style.width = "32px"; 
	domElement.style.height = "32px";
	domElement.style.webkitTransformOrigin = "16px 16px"; 
	
	this.x = 0; 
	this.y = 0;
	this.z = 0; 
	this.xVel = 0; 
	this.yVel = 0; 
	this.zVel = 0; 
	this.size = 3; 
	
	this.enabled = true; 
	
	this.update = function(){
		
		var drag = 0.01; 
		
		this.xVel*=drag; 
		this.yVel*=drag; 
		this.zVel*=drag; 
		
		this.x+=this.xVel; 
		this.y+=this.yVel; 
		this.z+=this.zVel; 
		
		this.size*=0.99; 

		domElement.style.webkitTransform = "translate3d("+this.x+"px, "+this.y+"px, "+this.z+"px) scale("+this.size+")"; 
		
		if(this.size<0.05) this.enabled = false; 

	};
	
}