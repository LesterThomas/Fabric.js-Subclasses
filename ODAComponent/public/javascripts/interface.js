fabric.Interface = fabric.util.createClass(fabric.Object, {

  type: 'interface',

  mouseDownFunct: function() {
    console.log('Selected an interface. Current visibility:' + this.operationsHeadingBox.opacity); 
      var i;
      if (this.operationsHeadingBox.opacity==1) {
        this.operationsHeadingBox.opacity=0;
        for (i=0;i<this.operationsBox.length;i++) {
      		this.operationsBox[i].opacity=0;
    		}
      } else {
        this.operationsHeadingBox.opacity=1;
        for (i=0;i<this.operationsBox.length;i++) {
      		this.operationsBox[i].opacity=1;
    		}
      }
      
  },

  initialize: function(options) {
    console.log('Interface initialize function. ' );

    options || (options = { });
    this.callSuper('initialize', options);
    this.rect=new fabric.Rect({width:5,height:options.height-20,left:0,top:-options.height/2+20});
    if (options.type=="outbound") {
      this.circle=new fabric.Circle({radius:10,left:-8,top:-options.height/2});
    } else {
      this.circle=new fabric.Circle({radius:10,left:-8,top:-options.height/2,      
          startAngle: 0-0.2, endAngle: Math.PI+0.2, stroke: '#000', strokeWidth: 4, fill: '' });
    }
    console.log({options})
    if (options.reverse) {
      this.text=new fabric.Text(options.name, { angle:90, left: -30, top: 0, fontFamily:'Arial', fontSize:14 });
      this.text.set('top', -this.text.getBoundingRect().height+60);
      this.text.set('left', 30);
    } else {
      this.text=new fabric.Text(options.name, { angle:-90, left: -25, top: 0, fontFamily:'Arial', fontSize:14 });
      this.text.set('top', this.text.getBoundingRect().width/2+options.height/2-10);
    }
    
    this.operations=options.operations;
		this.operationsBox=[];

    this.set('operationsHeadingBox',new fabric.Text('Operations', {  left: 10, top: -options.height/2+30, fontFamily:'Arial', fontSize:12, opacity:0 }));
   
    for (var i=0;i<options.operations.length;i++) {
      var operationsBoxTxt=new fabric.Text(options.operations[i].name + ":"+ options.operations[i].status, {  left: 10, top: -options.height/2+50+i*20, fontFamily:'Arial', fontSize:12, opacity:0 });
      //operationsBoxTxt.set('left', operationsBoxTxt.getBoundingRect().width/2+10);
      
      this.operationsBox.push(operationsBoxTxt);
      
      console.log('added operation ' + options.operations[i].name);
    }
    
    console.log('Initialising interface. ' );
    this.name= options.name || '';
  },

  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      name: this.get('name'),
      opertions:this.get('operations')
    });
  },

  _render: function(ctx) {
    //this.callSuper('_render', ctx);
    console.log('Rendering interface. ' );
    console.log({ctx});
		this.rect.render(ctx);
		this.circle.render(ctx);
		this.text.render(ctx);
    
		this.operationsHeadingBox.render(ctx);
    
    for (var i=0;i<this.operationsBox.length;i++) {
      this.operationsBox[i].render(ctx);  
    }
  
  }
});

  fabric.Interface.fromObject = function (object) {
    console.log('fromObject function. ' );
	var theInterface=new fabric.Interface(object);
	return theInterface;
};




