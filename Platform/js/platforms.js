//********************************************************************************************************************************************************
//** Platforms class
//** A subclass of fabric.Rect. This draws a platform, its northbound interfaces, contained COBRA applications and (optionally) its southbound dependencies.
//** Can be constructed as a JSON string passed into canvas.loadFromJSON(jsonString); - see sample JSON below
//** {"objects":[{"type":"platform","name":"Retail Operations","left":250,"top":300,"northboundInterfaces":["stock","storeLocation"],"southboundInterfaces":[],"cobraApplications":["Back Ofice","Central Office","Store Inventory","Live Devices"]}],"background":""}
//** It can also be constructed in Javascript: 
//** var platform = new fabric.Platform({left: 250, top: 300, name: 'Retail Operations', northboundInterfaces:['stock','storeLocation'], cobraApplications:['Back Ofice','Central Office','Store Inventory','Live Devices']});
//** canvas.add(platform);
//********************************************************************************************************************************************************

 var DEFAULT_WIDTH;
 var DEFAULT_HEIGHT; 
 var DEFAULT_LEFT;
 var DEFAULT_TOP; 
 var DEFAULT_DEPENDENT_WIDTH;
 var DEFAULT_DEPENDENT_HEIGHT;
 var DEFAULT_DEPENDENT_TOP;
 var DEFAULT_DEPENDENT_LEFT;
 var DEFAULT_NAME_FONT;
 var DEFAULT_INTERFACE_FONT;
 var DEFAULT_APPLICATIONS_FONT;
 
 var DEFAULT_APP_TEXT_COLOR;
 var DEFAULT_FULL_COLOR;
 var DEFAULT_LINE_COLOR;
 var DEFAULT_ROUND; 
 var DEFAULT_LINE_WIDTH;
 var numberofrows;
 var numberofcols;
 
 fabric.Platform = fabric.util.createClass(fabric.Rect, {

  type: 'platform',

  initialize: function(options) {
  
    options || (options = { });
	//set defaults
	DEFAULT_WIDTH=710;
	DEFAULT_HEIGHT=200; 
	DEFAULT_LEFT=100;
	DEFAULT_TOP=250; 
	DEFAULT_DEPENDENT_WIDTH=200;
	DEFAULT_DEPENDENT_HEIGHT=100;
	DEFAULT_DEPENDENT_TOP=620;
	DEFAULT_DEPENDENT_LEFT=400;
	DEFAULT_NAME_FONT='20px Helvetica';
	DEFAULT_INTERFACE_FONT='14px Helvetica';
	DEFAULT_APPLICATIONS_FONT='12px Helvetica';

	DEFAULT_APP_TEXT_COLOR='#fff';
	DEFAULT_FULL_COLOR='#fba';
	DEFAULT_LINE_COLOR='#333';
	DEFAULT_ROUND=10; 
	DEFAULT_LINE_WIDTH=2;

	if (options.northboundInterfaces.length==0) {
		DEFAULT_TOP=50;
	}
	
	if (options.northboundInterfaces.length>21) {
		DEFAULT_WIDTH=Math.floor(DEFAULT_WIDTH*options.northboundInterfaces.length/21);
		//DEFAULT_LEFT=Math.floor(DEFAULT_WIDTH/2)+110;
	}
	numberofcols=Math.floor((DEFAULT_WIDTH-20)/220);
	numberofrows=Math.ceil(options.cobraApplications.length/numberofcols);
	
	if (numberofrows>4) {
	
		DEFAULT_HEIGHT=Math.floor((DEFAULT_HEIGHT-30)*numberofrows/4)+30;

	}	
    options.rx=DEFAULT_ROUND; 
    options.ry=DEFAULT_ROUND;     
    options.width=options.width || DEFAULT_WIDTH; 
    options.height=options.height || DEFAULT_HEIGHT;     
	options.left=options.left || DEFAULT_LEFT; 
    options.top=options.top || DEFAULT_TOP;     
    options.fill=options.fill || DEFAULT_FULL_COLOR; 
    options.stroke=options.stroke || DEFAULT_LINE_COLOR;
    options.strokeWidth=options.strokeWidth || DEFAULT_LINE_WIDTH;
    this.callSuper('initialize', options);
    this.set('name', options.name || '');
    this.set('northboundInterfaces', options.northboundInterfaces || []);
    this.set('southboundInterfaces', options.southboundInterfaces || []);
    this.set('cobraApplications', options.cobraApplications || []);
    
  },

  toObject: function() {
    var returnObj={};
	//only return the non-default options
    returnObj.type='platform';
    returnObj.name=this.name;   
	returnObj.left=this.left;
    returnObj.top=this.top;
 
	if (this.lockScalingX!=true)
		returnObj.lockScalingX=this.lockScalingX;
	if (this.lockScalingY!=true)
		returnObj.lockScalingY=this.lockScalingY;
	if (this.rx!=DEFAULT_ROUND)
		returnObj.rx=this.rx;
    if (this.ry!=DEFAULT_ROUND)
		returnObj.ry=this.ry;   
    if (this.width!=DEFAULT_WIDTH)
		returnObj.width=this.width;   
    if (this.height!=DEFAULT_HEIGHT)
		returnObj.height=this.height; 
    if (this.left!=DEFAULT_LEFT)
		returnObj.left=this.left;   
    if (this.top!=DEFAULT_TOP)
		returnObj.top=this.top; 		
	if (this.fill!=DEFAULT_FULL_COLOR)
		returnObj.fill=this.fill; 
	if (this.stroke!=DEFAULT_LINE_COLOR)
		returnObj.stroke=this.stroke; 
	if (this.strokeWidth!=DEFAULT_LINE_WIDTH)
		returnObj.strokeWidth=this.strokeWidth; 	

    returnObj.northboundInterfaces=this.northboundInterfaces;
    returnObj.southboundInterfaces=this.southboundInterfaces;
    returnObj.cobraApplications=this.cobraApplications;
    return returnObj;
  },
   

  _render: function(ctx) {
    this.callSuper('_render', ctx);

    ctx.font = DEFAULT_NAME_FONT;
    ctx.fillStyle = DEFAULT_LINE_COLOR;
    ctx.fillText(this.name, -this.width/2+10, -this.height/2 + 30);
    
    ctx.font = DEFAULT_INTERFACE_FONT;
    
    
    var northboundInterfaces=this.get('northboundInterfaces');
    for (var i=0;i<northboundInterfaces.length;i++) {   
        //draw text
		
		
		var interfaceName=northboundInterfaces[i].name;
		width=ctx.measureText(interfaceName).width;
		if (width>155){
			while (width>155) {
				interfaceName = interfaceName.substring(0, interfaceName.length-1)
				width=ctx.measureText(interfaceName).width;
			}
			interfaceName=interfaceName+'...';
		}
        ctx.save();
        ctx.translate( -this.width/2+i*30+25,-this.height/2-5);
        ctx.rotate(-Math.PI/2);
        ctx.textAlign = "left";
        ctx.fillText(interfaceName, 0, 0);
        ctx.restore();
      
        //draw rectangle
        ctx.fillStyle = DEFAULT_LINE_COLOR;
        ctx.fillRect(-this.width/2+i*30+30,-this.height/2-180,6,180);
		
      	//draw circle
        ctx.beginPath();
        ctx.arc(-this.width/2+i*30+33, -this.height/2-180, 8, 0, 2 * Math.PI, false);
        ctx.fillStyle = DEFAULT_LINE_COLOR;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
    } 
    
    var cobraApplications=this.get('cobraApplications');
    var row=0;
	
    for (var i=0;i<cobraApplications.length;i++) {
		//draw rectangle
        ctx.fillStyle = DEFAULT_LINE_COLOR;
        row=Math.floor((i/numberofcols));
        ctx.fillRect(-this.width/2+i*220+20-row*220*numberofcols,-this.height/2 + 40+row*40,210,30);
      
		//draw text
		var cobraName=cobraApplications[i].name;
		width=ctx.measureText(cobraName).width;
		if (width>195){
			while (width>195) {
				cobraName = cobraName.substring(0, cobraName.length-1)
				width=ctx.measureText(cobraName).width;
			}
			cobraName=cobraName+'...';
		}
		
		ctx.font = DEFAULT_APPLICATIONS_FONT;
		ctx.fillStyle = DEFAULT_APP_TEXT_COLOR;
    	ctx.fillText(cobraName,-this.width/2+i*220+25-row*220*numberofcols,-this.height/2 + 60+row*40);
	}
},
 
   drawDependentPlatforms : function (canvas) {
  		 
   var southboundInterfaces=this.get('southboundInterfaces');
   for (var i=0;i<southboundInterfaces.length;i++) {
		var thePlatform=new fabric.Platform(southboundInterfaces[i]);
		var offset=2+i-southboundInterfaces.length/2;
		thePlatform.width=DEFAULT_DEPENDENT_WIDTH;     
		thePlatform.height=DEFAULT_DEPENDENT_HEIGHT;
		thePlatform.top=DEFAULT_DEPENDENT_TOP;
		thePlatform.left=DEFAULT_DEPENDENT_LEFT+Math.floor(offset*(DEFAULT_DEPENDENT_WIDTH+20)); 
		canvas.add(thePlatform);
	}   
}
});


fabric.Platform.fromObject = function (object) {
	var thePlatform=new fabric.Platform(object);
	return thePlatform;
};
//****************************************************************************













