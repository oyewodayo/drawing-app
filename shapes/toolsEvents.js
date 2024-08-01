
function downCallbackForSelect(e){
    const startPosition = new Vector(e.offsetX, e.offsetY);
    const mousePosition = new Vector(e.offsetX, e.offsetY);

    const [r,g,b,a] = helperCtx.getImageData(
        startPosition.x,
        startPosition.y,
        1,
        1
    ).data;

    const id = r << 16 | g << 8 | b;
    const shape = shapes.find(s=>s.id==id);

    //Unselect when outside of shape is clicked
    shapes.forEach((s)=>(s.selected =false));
    drawShapes(shapes);

    if (shape) {  
        //Select shape
        shape.selected = true;
        const oldCenter = shape.center;
        drawShapes(shapes);

        updateProperties(shapes.filter((s)=>s.selected));
        //Move shape on selected 
        const moveCallback = (e)=>{
            const mousePosition = new Vector(e.offsetX, e.offsetY);
            const newPoint = Vector.subtract(mousePosition,startPosition);
            console.log(oldCenter,newPoint)
            // console.log(Vector.add(oldCenter,newPoint))
            shape.setCenter(Vector.add(oldCenter,newPoint))
            drawShapes(shapes)

        }

        const upCallback = (e)=>{
          
            myCanvas.removeEventListener('pointermove',moveCallback);
            myCanvas.removeEventListener('pointerup',upCallback);
            updateProperties(shapes.filter((s)=>s.selected));

            updateHistory(shapes);
        };
        
        myCanvas.addEventListener('pointermove',moveCallback)
        myCanvas.addEventListener('pointerup',upCallback)
    }
}
