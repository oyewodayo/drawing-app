class Path extends Shape {
    constructor(startPoint, options){
        super(options);
        this.points = [startPoint];
    }

    static load(data,stageProperties){
        const path = new Path();
        path.id = data.id;
        path.options= JSON.parse(JSON.stringify(data.options));
        path.center = new Vector(
            data.center.x + stageProperties.left,
            data.center.y + stageProperties.top,
        )
        path.size = data.size;
        path.selected = data.selected,
        path.points = data.points.map((p)=>
            Vector.load(p)
        );

        return path;
    }

    serialize(stageProperties){
        return {
            type : "Path",
            id: this.id,
            options:this.options,
            center: new Vector(
                this.center.x - stageProperties.left,
                this.center.y - stageProperties.top,
            ),
            size:this.size,
            selected:this.selected,
            points:this.points.map((p)=>
                Vector.load(p)
            )
        };
    }

    addPoint(point){
        this.points.push(point);
    }


    getPoints(){
        return this.points;
    }

    //Accepts an array argument
    setPoints(points){
       this.points = points;
    }

    setWidth(width){
        const size =  getSize(this.points);
        const ratio = width / size.width;
        for(const point of this.points){
            point.x *=ratio
        }

        this.size.width = width;
    }

    setHeight(height){
        const size =  getSize(this.points);
        const ratio = height / size.height;
        for(const point of this.points){
            point.y *=ratio
        }

        this.size.height = height;
    }

    draw(ctx, hitRegion){
        const center = this.center?this.center:{x:0,y:0};
        ctx.beginPath();
        ctx.moveTo(this.points[0].x+center.x, this.points[0].y+center.y); 

        for(let i =1; i < this.points.length; i++){
            ctx.lineTo(this.points[i].x+center.x,this.points[i].y+center.y)
        }

        if (hitRegion) {
            this.applyHitRegionStyles(ctx)
        }else{
            this.applyStyles(ctx)
            if (this.selected) {
                 this.drawGizmo(ctx)
            }
        }
       
    }


    static downCallbackForPath(e){
        const mousePosition = new Vector(e.offsetX, e.offsetY);
    
        currentShape = new Path(mousePosition,getOptions());
    
        const moveCallback = (e)=>{
            const mousePosition =new Vector(e.offsetX, e.offsetY);
            currentShape.addPoint(mousePosition);
    
            clearCanvas();
            drawShapes([...shapes,currentShape]);

    
        }
    
        const upCallback = (e)=>{
            myCanvas.removeEventListener('pointermove',moveCallback)
            myCanvas.removeEventListener('pointerup',upCallback)
            currentShape.recenter();
            shapes.push(currentShape);   
            updateHistory(shapes);
        };
        
        myCanvas.addEventListener('pointermove',moveCallback)
        myCanvas.addEventListener('pointerup',upCallback)
    }
    

}