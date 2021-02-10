
var ODAComponent = fabric.util.createClass(fabric.Object, {

    type: 'ODAComponent',
    // initialize can be of type function(options) or function(property, options), like for text.
    // no other signatures allowed.
    initialize: function(options) {
        options || (options = { left: 0, top: 0, width: 700, height: 700 }); // create default options if one present
        this.callSuper('initialize', options);
        var angle = 72
        var tri_width = 0.5 * this.width
        var tri_height = 0.345 * this.height
        console.log(this.width)
        var colors = ["#CCCCCC", "#D84942", "#A8D379", "#FFD441", "#78ACFF"]
        this.triangles=[]
        for(index=0; index<5; index++) {
            var p1 = { x:this.left, y:this.top}, p2 = {x:this.left - tri_width/2, y:tri_height+this.top}, p3 = {x:tri_width/2+this.left,y:tri_height+this.top};
            console.log({index, p1, p2, p3})
            var rotation_origin = new fabric.Point(p1.x, p1.y);
            var angle_radians = fabric.util.degreesToRadians(angle*index);
            var p2Rotated = fabric.util.rotatePoint(new fabric.Point(p2.x, p2.y), rotation_origin, angle_radians);
            var p3Rotated = fabric.util.rotatePoint(new fabric.Point(p3.x, p3.y), rotation_origin, angle_radians);
            //console.log({rotation_origin,p2Rotated,p3Rotated})
            var shape = new fabric.Polygon([p1, p2Rotated, p3Rotated], { fill: colors[index] });
            this.triangles.push(shape);
        }
        var circle_radius=80
        var center_x = this.left-circle_radius
        var center_y = this.top-circle_radius
        this.circle = new fabric.Circle({ radius: circle_radius, fill: '#CCCCCC', left: center_x, top: center_y });                                 
    },

    toObject: function() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
    });
    },

    _render: function(ctx) {
    this.callSuper('_render', ctx);

    this.triangles[0].render(ctx);
    this.triangles[1].render(ctx);
    this.triangles[2].render(ctx);
    this.triangles[3].render(ctx);
    this.triangles[4].render(ctx);
    this.circle.render(ctx);
    }
});
