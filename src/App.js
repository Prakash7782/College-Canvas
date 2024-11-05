import './styles.scss';
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
import Drawing from './Drawing';
import {BrowserRoute, Router, Routes} from "react-router-dom";
import ImageUpload from './Image';


function App() {
<Routes>

<Route to="/canvas" element={<Canvas/>}>
 
</Route>

</Routes>
  
   return (
    <div>

    </div>
   )
   
}
<Routes>

  <Route to="/canvas" element={<Canvas/>}>
  

  </Route>

</Routes>


export default App;
