const SHOW_HIT_REGION = false;

if (!SHOW_HIT_REGION) {
    helperCanvas.style.display = "none";
}

const stageProperties = {
    width:600,
    height:480,
}

const canvasProperties = {
    width: SHOW_HIT_REGION? window.innerWidth/2 : window.innerWidth,
    height: window.innerHeight,
    center:{
        x: SHOW_HIT_REGION ? window.innerWidth/4 : window.innerWidth/2,
        y: window.innerHeight / 2 
    }
}


stageProperties.left = canvasProperties.center.x - stageProperties.width/2,
stageProperties.top = canvasProperties.center.y - stageProperties.height/2

myCanvas.width = canvasProperties.width;
myCanvas.height = canvasProperties.height;
helperCanvas.width = canvasProperties.width;
helperCanvas.height = canvasProperties.height;

const ctx = myCanvas.getContext('2d');
const helperCtx = helperCanvas.getContext('2d');
clearCanvas();

const shapes = [];
const history = [];
let currentShape = null;


window.addEventListener("keydown", (e)=>{
    //Delete selected shape
    if (e.key === "Delete") {
        shapes.splice(
            shapes.findIndex((s)=>s.selected),
            1
        );

        drawShapes(shapes);
    }
});




myCanvas.addEventListener("pointerdown", Path.downCallbackForPath);



function changeTool(tool) {
    myCanvas.removeEventListener('pointerdown',Path.downCallbackForPath);
    myCanvas.removeEventListener('pointerdown',Rect.downCallbackForRect);
    myCanvas.removeEventListener('pointerdown',downCallbackForSelect);
    
    //Unselect when outside of shape is clicked
    shapes.forEach((s)=>(s.selected =false));
    drawShapes(shapes);

    switch (tool) {
        case "rect":
            myCanvas.addEventListener("pointerdown", Rect.downCallbackForRect)
            break;
        case "path":
            myCanvas.addEventListener("pointerdown", Path.downCallbackForPath)
            break;
        case "select":
            myCanvas.addEventListener("pointerdown", downCallbackForSelect)
            break;
       
    }
}


function changeFillColor(value) {

    shapes.filter(shape=>shape.selected).forEach(shape=>shape.options.fillColor=value)
    drawShapes(shapes);
}

function changeFill(value) {

    shapes.filter(shape=>shape.selected).forEach(shape=>shape.options.fill=value)
    drawShapes(shapes);
}

function changeStrokeColor(value) {

    shapes.filter(shape=>shape.selected).forEach(shape=>shape.options.strokeColor=value)
    drawShapes(shapes);
}

function changeStroke(value) {

    shapes.filter(shape=>shape.selected).forEach(shape=>shape.options.stroke=value)
    drawShapes(shapes);
}

function changeStrokeWidth(value) {

    shapes
        .filter(shape=>shape.selected)
        .forEach(shape=>shape.options.strokeWidth=Number(value)
    )
    
    updateHistory(shapes);
    drawShapes(shapes);
}

function changeX(value) {
    shapes
        .filter((s)=>s.selected)
        .forEach((s)=>(s.center.x = Number(value) +stageProperties.left)
    );
    updateHistory(shapes);
    drawShapes(shapes);
}
function changeY(value) {
    shapes
        .filter((s)=>s.selected)
        .forEach((s)=>(s.center.y = Number(value) +stageProperties.top)
    );
    updateHistory(shapes);
    drawShapes(shapes);
}

function changeWidth(value) {
    shapes
        .filter((s)=>s.selected)
        .forEach((s)=>s.setWidth(Number(value))
    );
    
    updateHistory(shapes);
    drawShapes(shapes);
} 

function changeHeight(value) {
    shapes
        .filter((s)=>s.selected)
        .forEach((s)=>s.setHeight(Number(value))
    );
    updateHistory(shapes);
    drawShapes(shapes);
}

function updateProperties(selectedShapes) {
    if (selectedShapes.length ===0) {
        document.getElementById("properties").innerHTML = "";
        return;
    }
    const shape  = selectedShapes[0];
    x.value = Math.round(shape.center.x - stageProperties.left);
    y.value = Math.round(shape.center.y - stageProperties.top);
    width.value = Math.round(shape.size.width);
    height.value = Math.round(shape.size.height);
    fillColor.value = shape.options.fillColor;
    fill.checked = shape.options.fill;
    strokeColor.value = shape.options.strokeColor;
    stroke.checked = shape.options.stroke;
    strokeWidth.value = shape.options.strokeWidth;
}


function drawShapes(shapes) {
    clearCanvas();
    for(const shape of shapes){
       shape.draw(ctx);
    }

    helperCtx.clearRect(0,0,canvasProperties.width, canvasProperties.height);
    for(const shape of shapes){
       shape.draw(helperCtx,true);
    }
}

function getOptions() {
    return {
        fillColor:fillColor.value,
        strokeColor:strokeColor.value,
        fill:fill.checked,
        stroke:stroke.checked,
        strokeWidth:Number(strokeWidth.value),
        lineCap : "round",
        lineJoin : "round"
    }
}


function clearCanvas() {
    ctx.clearRect(0,0, myCanvas.width,myCanvas.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(0,0,myCanvas.width, myCanvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(
        stageProperties.left,
        stageProperties.top,
        stageProperties.width,
        stageProperties.height
    );

    //For debugging mode
    helperCtx.fillStyle = "red";
    helperCtx.fillRect(0,0,canvasProperties.width,canvasProperties.height)
}


function updateHistory(shapes) {
    history.push(shapes.map((s)=>s.serialize(stageProperties)))
}

function undo() {
    console.log(history)
    history.pop();
    console.log(history)
    if (history.length > 0) {
        loadShapes(history[history.length - 1]);
    }else{
        shapes.length = 0;
    }

    drawShapes(shapes);
}



function save() {
    const data = JSON.stringify(shapes.map((s)=>s.serialize(stageProperties)));
    const a = document.createElement("a");
    const file = new Blob([data], {type: "application/json"});
    a.href = URL.createObjectURL(file);
    a.download = "drawing.json";
    a.click();
}


function loadShapes(data) {
    shapes.length = 0;
    for(shapeData of data){
        let shape;
        switch (shapeData.type) {
            case "Rect":
                shape = Rect.load(shapeData, stageProperties)
                
                break;
            case "Path":
                shape = Path.load(shapeData, stageProperties)
                
                break;
        
            default:
                break;
        }
        shapes.push(shape);
    }
}

function load(){
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e)=>{
        const file = e.target.files[0];
        const reader =new FileReader();
        reader.onload = (e)=>{
            const data = JSON.parse(e.target.result);          
            loadShapes(data);
            drawShapes(shapes);
            updateHistory(shapes);
        };
        reader.readAsText(file);
    };
    input.click();
}

