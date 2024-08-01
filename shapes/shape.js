class Shape {
    constructor(options){
        this.id=Math.floor(16777216 * Math.random());
        this.options = options;
        this.center = null;
        this.size = null;
        this.selected = false;
    }

    setCenter(center){
        this.center= center
    }

    recenter(){
        const points = this.getPoints();
        this.center = Vector.midVector(points);
        this.size = getSize(points);
        for(const point  of points){
            const newPoint = Vector.subtract(point,this.center);
            point.x = newPoint.x; 
            point.y = newPoint.y;
        }

        this.setPoints(points);
    }

    serialize(){
        throw new Error("Serialize method must be implemeted");
    }

    setWidth(width){

        throw new Error("setWidth method must be implemented")
    
    }
    setHeight(width){

        throw new Error("setHeight method must be implemented")

    }



    applyHitRegionStyles(ctx,dilation = 10){
        const red = (this.id & 0xFF0000) >> 16;
        const green = (this.id & 0x00FF00) >> 8;
        const blue = this.id & 0x0000FF;
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.lineWidth = this.options.strokeWidth + dilation;
        ctx.lineCap = this.options.lineCap;
        ctx.lineJoin = this.options.lineJoin;


        // if (this.options.fill) {
            ctx.fill();
        // }
        if (this.options.stroke) {
            ctx.stroke();
        }
    }


    applyStyles(ctx){
        ctx.strokeStyle = this.options.strokeColor;
        ctx.fillStyle = this.options.fillColor;
        ctx.lineWidth = this.options.strokeWidth;
        ctx.lineCap = this.options.lineCap;
        ctx.lineJoin = this.options.lineJoin;
        if (this.options.fill) {
            ctx.fill();
        }
        if (this.options.stroke) {
            ctx.stroke();
        }
    }

    drawGizmo(ctx){
        const center = this.center;
        const points = this.getPoints();
        const minX = Math.min(...points.map(p=>p.x));
        const minY = Math.min(...points.map(p=>p.y));
        const maxX = Math.max(...points.map(p=>p.x));
        const maxY = Math.max(...points.map(p=>p.y));
  
        ctx.save();
        ctx.beginPath();
        ctx.rect(minX+center.x,minY+center.y,maxX-minX,maxY-minY);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.setLineDash([5,5]);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(center.x, center.y, 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    };

    getPoints(){
        throw new Error("getPoints method must be implemented."); 
    }


    setPoints(){
        throw new Error("setPoints method must be implemented."); 
    }


    drawHitRegion(ctx){
        throw new Error("draw method must be implemented.");
    }

    draw(ctx){
        throw new Error("draw method must be implemented.");
    }
}