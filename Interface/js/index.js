fabric.Interface = fabric.util.createClass(fabric.Object, {

  type: 'interface',

  mouseDownFunct: function() {
    console.log('Selected an interface. Current visibility:' + this.operationsHeadingBox.opacity); 
      if (this.operationsHeadingBox.opacity==1) {
        this.operationsHeadingBox.opacity=0;
        for (var i=0;i<this.operationsBox.length;i++) {
      		this.operationsBox[i].opacity=0;
    		}
      } else {
        this.operationsHeadingBox.opacity=1;
        for (var i=0;i<this.operationsBox.length;i++) {
      		this.operationsBox[i].opacity=1;
    		}
      }
  },

  initialize: function(options) {
   
    options || (options = { });
		options.operationsVisible=true;
    this.callSuper('initialize', options);
    this.rect=new fabric.Rect({width:5,height:options.height,left:0,top:0});
		this.circle=new fabric.Circle({radius:10,left:0,top:-options.height/2+5});
    this.text=new fabric.Text(options.name, { angle:-90, left: -12, top: 0, fontFamily:'Arial', fontSize:18 });
    this.operations=options.operations;
		this.operationsBox=[];

    this.set('operationsHeadingBox',new fabric.Text('Operations', {  left: 0, top: -options.height/2+30, fontFamily:'Arial', fontSize:14, opacity:1 }));
    this.get('operationsHeadingBox').set('left', this.operationsHeadingBox.getBoundingRectWidth()/2+10);
    for (var i=0;i<options.operations.length;i++) {
      var operationsBoxTxt=new fabric.Text(options.operations[i].name + ":"+ options.operations[i].status, {  left: 0, top: -options.height/2+50+i*20, fontFamily:'Arial', fontSize:14, opacity:1 });
      operationsBoxTxt.set('left', operationsBoxTxt.getBoundingRectWidth()/2+10);
      
      this.operationsBox.push(operationsBoxTxt);
      console.log('added operation ' + options.operations[i].name);
    }
    console.log('Initialising interface. ' );
    
    this.name= options.name || '';
  },

  toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      name: this.get('name')
    });
  },

  _render: function(ctx) {
    //this.callSuper('_render', ctx);
		this.rect.render(ctx);
		this.circle.render(ctx);
		this.text.render(ctx);
    
		this.operationsHeadingBox.render(ctx);
    for (var i=0;i<this.operationsBox.length;i++) {
      this.operationsBox[i].render(ctx);  
    }
  
  }
});

fabric.Platform = fabric.util.createClass(fabric.Object, {
  self: {},
  type: 'platform',
	interface: {},
  
  initialize: function(options) {
    self=this;
    options || (options = { });
		this.callSuper('initialize', options);
    
    this.interface = new fabric.Interface({
      width: 40,
      height: 150,
      left: 50,
      top: 50,
      operationsVisibility:true,
      name: 'test',
      fill: '#faa',
      operations:[{name:'op1', status:'production'},{name:'op2', status:'production'},{name:'op3', status:'candidate'}]
    });
    console.log('Initialising platform. ' );
  },

    toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      name: this.get('name')
    });
  },
  
  _render: function(ctx) {
		this.interface.render(ctx);	
  }
});

var canvas = new fabric.Canvas('c');
/*
var platform = new fabric.Platform({
  width: 800,
  height: 400,
  left: 450,
  top: 250,
  name: 'test',
  fill: '#faa',
});
//canvas.add(platform);
*/
var interface = new fabric.Interface({
      width: 40,
      height: 150,
      left: 100,
      top: 100,
      operationsVisibility:true,
      name: 'lester',
      fill: '#faa',
      operations:[{name:'operation1', status:'production'},{name:'operation2', status:'production'},{name:'op3', status:'candidate'}]
    });
canvas.add(interface);
var interface2 = new fabric.Interface({
      width: 40,
      height: 150,
      left: 300,
      top: 100,
      operationsVisibility:true,
      name: 'service2',
      fill: '#faa',
      operations:[{name:'serv2operation1', status:'production'},{name:'operation3', status:'production'},{name:'servop3', status:'candidate'}]
    });
canvas.add(interface2);
var interface3= new fabric.Interface({
      width: 40,
      height: 150,
      left: 500,
      top: 100,
      operationsVisibility:true,
      name: 'servicen',
      fill: '#faa',
      operations:[{name:'zzz', status:'production'},{name:'yyyy', status:'production'},{name:'xxxx', status:'candidate'}]
    });
canvas.add(interface3);


canvas.on('mouse:down', function(options ) {
  
  if (options.target) {
    console.log('an object was clicked! ', options.target.type);
    options.target.mouseDownFunct();
  }
  
});







