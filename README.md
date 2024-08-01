# Canvas Drawing Tool

This project is a canvas-based drawing tool that allows users to create, modify, and save various shapes. It supports basic shape manipulation, including changing colors, size, and position. The project also includes undo functionality and the ability to save and load drawings.

## Features

- **Shape Creation**: Create rectangles and paths.
- **Shape Selection**: Select shapes to modify their properties.
- **Property Modification**: Change the fill color, stroke color, stroke width, position (x, y), width, and height of selected shapes.
- **Undo Functionality**: Undo the last modification made to the shapes.
- **Save and Load**: Save the current drawing to a JSON file and load drawings from a JSON file.

## Setup

1. Clone the repository or download the source code.
2. Open the `index.html` file in a web browser.

## Usage

### Initialization

- The canvas is set up with specific properties for width, height, and center based on the `SHOW_HIT_REGION` flag.
- The main canvas (`myCanvas`) and a helper canvas (`helperCanvas`) are initialized and sized according to the window dimensions.

### Event Listeners

- **Keydown**: Press the "Delete" key to delete the selected shape.
- **Pointer Down**: Depending on the current tool, handle shape creation, selection, or manipulation.

### Tools

- **Rectangle Tool**: Creates rectangles on the canvas.
- **Path Tool**: Creates freeform paths on the canvas.
- **Select Tool**: Selects shapes for manipulation.

### Functions

- **changeTool(tool)**: Switches between different drawing tools.
- **changeFillColor(value)**: Changes the fill color of selected shapes.
- **changeFill(value)**: Toggles the fill option of selected shapes.
- **changeStrokeColor(value)**: Changes the stroke color of selected shapes.
- **changeStroke(value)**: Toggles the stroke option of selected shapes.
- **changeStrokeWidth(value)**: Changes the stroke width of selected shapes.
- **changeX(value)**: Changes the x-position of selected shapes.
- **changeY(value)**: Changes the y-position of selected shapes.
- **changeWidth(value)**: Changes the width of selected shapes.
- **changeHeight(value)**: Changes the height of selected shapes.
- **updateProperties(selectedShapes)**: Updates the properties panel with the selected shape's properties.
- **drawShapes(shapes)**: Redraws all shapes on the canvas.
- **getOptions()**: Returns the current drawing options.
- **clearCanvas()**: Clears the canvas and draws the background.
- **updateHistory(shapes)**: Saves the current state of shapes for undo functionality.
- **undo()**: Undoes the last action.
- **save()**: Saves the current drawing to a JSON file.
- **loadShapes(data)**: Loads shapes from a JSON object.
- **load()**: Loads a drawing from a JSON file.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- This tool was inspired by various online drawing tools and built using plain JavaScript and HTML5 Canvas API.
