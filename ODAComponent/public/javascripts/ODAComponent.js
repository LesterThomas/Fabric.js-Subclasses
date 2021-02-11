
fabric.Component = fabric.util.createClass(fabric.Object, {

    type: 'component',

    initialize: function(options) {
        console.log('initialize function. ' );
        console.log({options});
        var defaultSize = { left: 0, top: 0, width: 800, height: 800 }
        options || (options = defaultSize); // create default options if one present

        //calculations are done based on default size and then scaled afterwards
        var scaleX = options.width / defaultSize.width
        var scaleY = options.height / defaultSize.height
        options.width = defaultSize.width
        options.height = defaultSize.height

        this.callSuper('initialize', options);

        //pentagon built from 5 triangles rotated through 72 degrees
        var angle = 72
        var tri_width = 0.5 * this.width
        var tri_height = 0.345 * this.height
        var colors = ["#CCCCCC", "#D84942", "#A8D379", "#FFD441", "#78ACFF"]
        var names = ["Environment\n\rRequirements", "Security", "Core Function", "Notification/\n\rReporting", "Management &\n\rOperations"]
        this.triangles=[]
        this.names=[]
        this.exposedAPIss=[]
        var p2 = {x:this.left - tri_width/2, y:tri_height+this.top}
        var p3 = {x:tri_width/2+this.left,y:tri_height+this.top};

        var rotation_origin = new fabric.Point(options.left, options.top);

        for(index=0; index<5; index++) {
            // use built-in rotation utility
            var angle_radians = fabric.util.degreesToRadians(angle*index);
            var p2Rotated = fabric.util.rotatePoint(new fabric.Point(p2.x, p2.y), rotation_origin, angle_radians);
            var p3Rotated = fabric.util.rotatePoint(new fabric.Point(p3.x, p3.y), rotation_origin, angle_radians);
            var shape = new fabric.Polygon([{x: options.left, y: options.top}, p2Rotated, p3Rotated], { fill: colors[index] });
            // Create text starting position at bottom of grey triangle and move/rotate later
            var nametext = new fabric.Text(names[index], { 
                left: p2Rotated.x, 
                top: p2Rotated.y, 
                fontSize: 24,
                fontFamily: 'Arial', 
                fill: 'black'
            })
            if ((index==2) || (index==3)) {
                var nameStartRotated = fabric.util.rotatePoint(new fabric.Point((p2.x + p3.x + nametext.width)/2, (p2.y + p3.y )/2 -5), rotation_origin, angle_radians);
                nametext.left = nameStartRotated.x
                nametext.top = nameStartRotated.y
                nametext.angle = angle*index + 180
            } else {
                var nameStartRotated = fabric.util.rotatePoint(new fabric.Point((p2.x + p3.x - nametext.width)/2, (p2.y + p3.y - nametext.height*2)/2-5), rotation_origin, angle_radians);
                nametext.left = nameStartRotated.x
                nametext.top = nameStartRotated.y
                nametext.angle = angle*index
            }

            // add segment-specific objects
            switch(index) {
                case 1:
                    this.exposedAPIss = this.exposedAPIss.concat(addInterfaces(options.security, [], p2, p3, nametext, rotation_origin, angle_radians, angle*index+180, true, 20, 148))
                    break;
                case 2:
                    this.exposedAPIss = this.exposedAPIss.concat(addInterfaces(options.coreFunction.exposedAPIs, options.coreFunction.dependentAPIs, p2, p3, nametext, rotation_origin, angle_radians, angle*index+180, true, 20, 148))
                    break;
                case 3:
                    this.exposedAPIss = this.exposedAPIss.concat(addInterfaces(options.eventNotification.publishedEvents, options.eventNotification.subscribedEvents, p2, p3, nametext, rotation_origin, angle_radians, angle*index+180, false, -50, 180))
                break;
                case 4:
                    this.exposedAPIss = this.exposedAPIss.concat(addInterfaces(options.management, [], p2, p3, nametext, rotation_origin, angle_radians, angle*index+180, false, 30, 180))
                break;
                default:
                  // code block
              }
              
            this.triangles.push(shape);
            this.names.push(nametext);
        }

        var circle_radius=80
        var center_x = this.left-circle_radius
        var center_y = this.top-circle_radius
        this.circle = new fabric.Circle({ radius: circle_radius, fill: '#CCCCCC', left: center_x, top: center_y });                                 
    


        this.scaleX = scaleX
        this.scaleY = scaleY
        console.log(this )

    },

    toObject: function() {
        console.log('toObject function. ' );
        return fabric.util.object.extend(this.callSuper('toObject'), {});
    },


    _render: function(ctx) {
        console.log('_render function. ' );
        console.log({ctx});
        //this.callSuper('_render', ctx);
        for(index=0; index<5; index++) {
            this.triangles[index].render(ctx);
            this.names[index].render(ctx);
        }
        for(var key in this.exposedAPIss) {
            this.exposedAPIss[key].render(ctx);
        }
        this.circle.render(ctx);
    }
});


fabric.Component.fromObject = function (object) {
    console.log('fromObject function. ' );
    console.log({object});
    var theComponent=new fabric.Component(object);
	return theComponent;
};

function addInterfaces(inboundInterfaceList, outboundInterfaceList, triangle_p2, triangle_p3, nametext, rotation_origin, angle_radians, inAngle, inReverse, inOffsetX, inOffsetY) {
    var interfacelist=[]
    var apiObjectList=[]
    console.log({inboundInterfaceList, outboundInterfaceList})

    for(var interfaceKey in inboundInterfaceList) {
        interfacelist.push({type: "outbound", reverse: inReverse, name: inboundInterfaceList[interfaceKey].name})
    }

    for(var interfaceKey in outboundInterfaceList) {
        interfacelist.push({type: "inbound", reverse: inReverse, name: outboundInterfaceList[interfaceKey].name})
    }
    console.log({interfacelist})
    for(var interfaceKey in interfacelist) {

        var interface = interfacelist[interfaceKey]
        console.log({interface})

        var interfaceRotated = fabric.util.rotatePoint(new fabric.Point((triangle_p2.x + triangle_p3.x - nametext.width)/2+inOffsetX + 40*interfaceKey, (triangle_p2.y + triangle_p3.y - nametext.height*2)/2+inOffsetY), rotation_origin, angle_radians);


        var interface = new fabric.Interface({
            left: interfaceRotated.x,
            top: interfaceRotated.y,
            width: 20,
            height: 120,
            name: interface.name,
            type: interface.type,
            reverse: interface.reverse,
            operations: []
        });
        interface.angle = inAngle

        apiObjectList.push(interface)
    }
    return apiObjectList    
}
