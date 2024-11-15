import { Input } from 'blocksin-system';
import React, { useEffect, useState } from 'react'

const CanvasSettings = ({canvas}) => {
    const [canvasHeight, setCanvasHeight] = useState(350);
    const [canvasWidth, setCanvasWidth] = useState(350);
    const [canvasColor, setCanvasColor] = useState("white");

    useEffect(() => {
            if(canvas){
                canvas.setWidth(canvasWidth);
                canvas.setHeight(canvasHeight);
                canvas.renderAll();
            }
    }, [canvasHeight, canvasWidth, canvas]);

    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        if(intValue >= 0){
            setCanvasWidth(intValue);
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        if(intValue >= 0){
            setCanvasHeight(intValue);
        }
    }
    const handleColorChange = (e) => {

        const value = e.target.value;
 
        setCanvasColor(value);
 
        canvas.backgroundColor = value;
         canvas.renderAll();
 
     };

  return (
    <div className='CanvasSettings darkmode'>
        <Input
        fluid 
        label="Canvas Width"
        type="number"
        value={canvasWidth}
        min={1}
        onChange={handleWidthChange}
        />

        <Input
        fluid 
        label="Canvas Height"
        type="number"
        value={canvasHeight}
        min={1}
        onChange={handleHeightChange}
        />

        <Input
        fluid
        label="Canvas Color"
        type="color"
        value={canvasColor}
        onChange={handleColorChange}
        />
      
    </div>
  )
}

export default CanvasSettings;
