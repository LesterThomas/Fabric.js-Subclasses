
var ODAComponent = fabric.util.createClass(fabric.Object, {

    type: 'ODAComponent',

    initialize: function(options) {
        var defaultSize = { left: 0, top: 0, width: 500, height: 500 }
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

        for(index=0; index<5; index++) {
            var p1 = { x:this.left, y:this.top}, p2 = {x:this.left - tri_width/2, y:tri_height+this.top}, p3 = {x:tri_width/2+this.left,y:tri_height+this.top};
            var rotation_origin = new fabric.Point(p1.x, p1.y);
            var angle_radians = fabric.util.degreesToRadians(angle*index);
            // use built-in rotation utility
            var p2Rotated = fabric.util.rotatePoint(new fabric.Point(p2.x, p2.y), rotation_origin, angle_radians);
            var p3Rotated = fabric.util.rotatePoint(new fabric.Point(p3.x, p3.y), rotation_origin, angle_radians);
            var shape = new fabric.Polygon([p1, p2Rotated, p3Rotated], { fill: colors[index] });
            
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
            this.triangles.push(shape);
            this.names.push(nametext);
        }

        var circle_radius=80
        var center_x = this.left-circle_radius
        var center_y = this.top-circle_radius
        this.circle = new fabric.Circle({ radius: circle_radius, fill: '#CCCCCC', left: center_x, top: center_y });                                 
    
        this.scaleX = scaleX
        this.scaleY = scaleY

    },

    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {});
    },

    _render: function(ctx) {
        this.callSuper('_render', ctx);
        for(index=0; index<5; index++) {
            this.triangles[index].render(ctx);
            this.names[index].render(ctx);
        }
        this.circle.render(ctx);
    }
});
