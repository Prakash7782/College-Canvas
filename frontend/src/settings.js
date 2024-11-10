import React, {useState, useEffect} from 'react';
import {Input} from "blocksin-system";
import { Color } from 'fabric';

const Settings = ({canvas}) => {
    const [selectedObject, setSelectedObject] = useState(null);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [diameter, setDiameter] = useState("");
    const [color, setColor] = useState("black");
    const [fontSize, setFontSize] = useState("");
    const [textColor, setTextColor] = useState("black");

    useEffect(() => {
        if(canvas){
            canvas.on("selection:created", (event) => {
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:updated", (event) => {
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:cleared", (event) => {
                setSelectedObject(null);
                clearSettings();
            });

            canvas.on("object:modified", (event) => {
                handleObjectSelection(event.target);
            });

            canvas.on("object:scaling", (event) => {
                handleObjectSelection(event.target);
            });
            

        }
    }, [canvas]);

    const handleObjectSelection = (object) => {
        if(!object) return;
    
        setSelectedObject(object);
        if(object.type === "rect"){
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
            setDiameter("");
        }
        else if(object.type === "circle"){
           setDiameter(Math.round(object.radius * 2 * object.scaleX));
           setColor(object.fill);
           setWidth("");
           setHeight("");

        }
        if(object.type === "triangle"){
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
            setDiameter("");
        }
    }

    const clearSettings = () => {
        setWidth("");
        setHeight("");
        setColor("");
        setDiameter("");
    }

    const handleWidthChange = (e) => {
       const value = e.target.value.replace(/,/g,"");
       const intValue = parseInt(value, 10);

       setWidth(intValue);

       if(selectedObject && (selectedObject.type === "rect" || selectedObject.type === "triangle") && intValue >= 0){
        selectedObject.set({width : intValue / selectedObject.scaleX});
        canvas.renderAll();
       }
    };

    const handleHeightChange = (e) => {

       const value = e.target.value.replace(/,/g,"");
       const intValue = parseInt(value, 10);

       setHeight(intValue);

       if(selectedObject && (selectedObject.type === "rect" || selectedObject.type === "triangle") && intValue >= 0){
        selectedObject.set({height : intValue / selectedObject.scaleX});
        canvas.renderAll();
       }
        
    };

    const handleDiameterChange = (e) => {

       const value = e.target.value.replace(/,/g,"");
       const intValue = parseInt(value, 10);
       setDiameter(intValue);
       if(selectedObject && selectedObject.type === "circle" && intValue >= 0){
        selectedObject.set({radius : intValue / 2 / selectedObject.scaleX});
        canvas.renderAll();
       }

    };

    const handleColorChange = (e) => {

       const value = e.target.value;
       setColor(value);
       if(selectedObject){
        selectedObject.set({fill : value});
        canvas.renderAll();
       }

    };

    const handleFontSizeChange = (e) => {
      const value = parseInt(e.target.value, 10);
      setFontSize(value);
 
      if (selectedObject && selectedObject.type === "textbox") {
          selectedObject.set({ fontSize: value });
          canvas.renderAll();
      }
  };
 
  

    const handleTextColorChange = (e) => {
        const value = e.target.value;
        setTextColor(value);

        if(selectedObject && selectedObject.type === "textbox"){
            selectedObject.set({fill : value});
            canvas.renderAll();
        }
    };

  return (
    <div className="Settings darkmode">
       {selectedObject && selectedObject.type === "rect" && (
        <>
          <Input
          fluid
          label="Width"
          value={width}
          onChange={handleWidthChange}/>

         <Input
          fluid
          label="Height"
          value={height}
          onChange={handleHeightChange}/>

        <Input
          fluid
          label="Color"
          type="color"
          onChange={handleColorChange}/>
        </>
       )}

       {selectedObject && selectedObject.type === "circle" && (
        <>
        <Input
         fluid
         label="Diameter"
         value={diameter}
         onChange={handleDiameterChange}/>

        <Input
          fluid
          label="Color"
          type="color"
          value={color}
          onChange={handleColorChange}/>
        </>
       )}

       {selectedObject && (selectedObject.type === "triangle") && (
        <>
          <Input
          fluid
          label="Width"
          value={width}
          onChange={handleWidthChange}/>

         <Input
          fluid
          label="Height"
          value={height}
          onChange={handleHeightChange}/>

        <Input
          fluid
          label="Color"
          value={textColor}
          type="color"
          onChange={handleColorChange}/>
        </>
       )}

      {selectedObject && (selectedObject.type === "textbox") && (
        <>
          <Input
          fluid
          label="Font Size"
          id="fontSizeInput"
          type="number"
          defaultValue={20}
          min={1}
          onChange={handleFontSizeChange}
          />

        <Input
          fluid
          label="Color"
          value={textColor}
          type="color"
          onChange={handleTextColorChange}/>
        </>
       )}

    </div>
  )
}

export default Settings;
