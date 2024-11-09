import './styles/Canva.css';

import {Canvas, Circle, Rect, Textbox, Triangle, util} from "fabric";
import React, {useRef, useState, useEffect} from 'react';
import {IconButton} from "blocksin-system";
import {SquareIcon, CircleIcon, ResetIcon, TriangleIcon, TextIcon, DownloadIcon, PenIcon, ImageIcon} from "sebikostudio-icons";
import Settings from './settings';
import Video from './video';
import CanvasSettings from './CanvasSettings';
import {handleObjectMoving} from "./snappingHelpers";
import {ImageDownIcon, Route, Trash2} from "lucide-react"
import Export from "./Export";
// import Drawing from './Drawing';
 import ImageHandler from './ImageHandler';


function CanvasApp() {

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [guidelines, setGuidelines] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [copiedObject, setCopiedObject] = useState(null);
   const [undoStack, setUndoStack] = useState([]);
   const [redoStack, setRedoStack] = useState([]);
  const undostack = useRef([]); 
  const redostack = useRef([]); 


  useEffect(() => {
    if(canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width : 350,
        height : 350,
      });

      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();

      setCanvas(initCanvas);


      initCanvas.on("object:moving", (event) => 
        handleObjectMoving(initCanvas, event.target, guidelines, setGuidelines)
      );

      initCanvas.on("object:modified", (event) => 
        handleObjectMoving(initCanvas, guidelines, setGuidelines)
      );

      initCanvas.on('mouse:down', (event) => {
        if (event.button === 3) { 
          event.e.preventDefault();
          showContextMenu(event.e.clientX, event.e.clientY);
        } else {
          hideContextMenu();
        }
      });

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const saveState = () => {
    if(canvasRef.current){
    setRedoStack([]); 
    setUndoStack([...undoStack, canvasRef.current.toJSON()]); 
    }
  }


const addRectangle= () => {
  if(canvas){
    const rect = new Rect({
      top : Math.random()*300,
      left : Math.random()*300,
      width : 100,
      height : 60,
      fill : "black",
    });

    canvas.add(rect);
  } 
}

const addCircle= () => {
  if(canvas){
    const circle = new Circle({
      top : Math.random()*300,
      left : Math.random()*300,
      radius : 30,
      fill : "black",
    });

    canvas.add(circle);
  } 
}

const addTriangle = () => {
  if(canvas){
    const triangle = new Triangle({
      top : Math.random()*300,
      left : Math.random()*300,
      height : 100,
      width : 100,
      fill : "black",
    });
    canvas.add(triangle);
  }
}

const addTextToCanvas = () => {
  if (canvas) {
      const text = new Textbox('Add Your Text', {
          top : Math.random()*300,
          left : Math.random()*300,
          fontSize: 30,
          fill: '#333',
          fontFamily: 'Arial'
      });
            canvas.add(text);
            canvas.setActiveObject(text);
            canvas.renderAll();
  }
}
const clearCanvas = () => {
  if (canvas) {
      canvas.clear();
      canvas.backgroundColor = "#fff"; 
  }
};

const toggleExport = () => {
  setShowExport(!showExport);
};

const cut = () => {
  copy();
  deleteObject();
};

const copy = () => {
  if (canvasRef.current && canvasRef.current.getActiveObject()) {
      setCopiedObject(util.object.clone(canvasRef.current.getActiveObject()));
  }
};

const paste = () => {
  if (canvasRef.current && copiedObject) {
    const clone = util.object.clone(copiedObject);
    clone.set({ left: clone.left + 10, top: clone.top + 10 });
    canvasRef.current.add(clone);
    saveState();
}
};

const deleteObject = () => {
  if (canvasRef.current && canvasRef.current.getActiveObject()) {
    canvasRef.current.remove(canvasRef.current.getActiveObject());
    saveState();
  }
};

const undo = () => {
  if (undostack.current && undostack.current.length > 1) { // Ensure stack exists and has more than one state
      const currentState = undostack.current.pop();
      redostack.current.push(currentState);
      const previousState = undostack.current[undostack.current.length - 1];
      canvas.current.loadFromJSON(previousState, () => {
          canvas.current.renderAll();
      });
  }
};

const redo = () => {
  if (redoStack.current && redostack.current.length > 0) { // Ensure stack exists and has items
      const nextState = redostack.current.pop();
      undostack.current.push(nextState);
      canvas.current.loadFromJSON(nextState, () => {
          canvas.current.renderAll();
      });
  }
};

const showContextMenu = (x, y) => {
  const menu = document.getElementById('contextMenu');
  if (menu) {
    menu.style.display = 'block';
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    
    // Ensure menu stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const menuRect = menu.getBoundingClientRect();
    
    if (x + menuRect.width > viewportWidth) {
      menu.style.left = `${viewportWidth - menuRect.width}px`;
    }
    
    if (y + menuRect.height > viewportHeight) {
      menu.style.top = `${viewportHeight - menuRect.height}px`;
    }
  }
};

const hideContextMenu = () => {
  document.getElementById('contextMenu').style.display = 'none';
};

  return (
    <div className="App">
      <div className='Toolbar darkmode'>
       <IconButton onClick={addRectangle} variant="ghost" size="medium">
        <SquareIcon/>
       </IconButton>
       <IconButton onClick={addCircle} variant="ghost" size="medium">
        <CircleIcon/>
       </IconButton>
       <IconButton onClick={addTriangle} variant="ghost" size="medium">
        <TriangleIcon/>
       </IconButton>
       <IconButton onClick={addTextToCanvas} variant="ghost" size="medium">
        <TextIcon/>
       </IconButton>
       <IconButton variant="ghost" size="medium">
        <PenIcon/>
       </IconButton>
       <IconButton onClick={() => ImageUpload({canvasRef})} variant="ghost" size="medium">
        <ImageDownIcon/>
       </IconButton>
       <Video canvas={canvas} canvasRef={canvasRef}/>
       <IconButton variant="ghost" size="medium">
         <Trash2 />
       </IconButton>
       <IconButton onClick={clearCanvas} variant="ghost" size="medium">
        <ResetIcon/>
       </IconButton>
       <IconButton onClick={toggleExport} variant="ghost" size="medium">
        <DownloadIcon/>
       </IconButton>
       
       
      </div>
      <canvas id='canvas' ref={canvasRef} />
      {showExport && <Export canvasRef={canvasRef} />}
      <Settings canvas={canvas}/>
      <CanvasSettings canvas={canvas}/>
      <div 
        id="contextMenu" 
        style={{
          display: 'none',
          position: 'fixed', // Changed from absolute to fixed
          zIndex: 1000,
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '4px 0',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          minWidth: '150px'
        }}
      >
        <ul style={{ 
          listStyle: 'none', 
          margin: 0, 
          padding: 0 
        }}>
          <li 
            onClick={() => {
              cut();
              hideContextMenu();
            }} 
            style={{ 
              padding: '8px 12px', 
              cursor: 'pointer',
              hover: {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Cut
          </li>
          <li 
            onClick={() => {
              copy();
              hideContextMenu();
            }} 
            style={{ 
              padding: '8px 12px', 
              cursor: 'pointer',
              hover: {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Copy
          </li>
          <li 
            onClick={() => {
              paste();
              hideContextMenu();
            }} 
            style={{ 
              padding: '8px 12px', 
              cursor: 'pointer',
              hover: {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Paste
          </li>
          <li 
            onClick={() => {
              deleteObject();
              hideContextMenu();
            }} 
            style={{ 
              padding: '8px 12px', 
              cursor: 'pointer',
              hover: {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Delete
          </li>
          <li 
            onClick={() => {
              undo();
              hideContextMenu();
            }} 
            style={{ 
              padding: '8px 12px', 
              cursor: 'pointer',
              hover: {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Undo
          </li>
          <li 
            onClick={() => {
              redo();
              hideContextMenu();
            }} 
            style={{ 
              padding: '8px 12px', 
              cursor: 'pointer',
              hover: {
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Redo
          </li>
        </ul>
      </div>  
    </div>
  );
}
export default CanvasApp;