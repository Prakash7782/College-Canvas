
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ImageUpload from './Image';
import {Canvas, Circle, Rect, Textbox, Triangle, util} from "fabric";
import React, {useRef, useState, useEffect} from 'react';
import {IconButton} from "blocksin-system";
import {SquareIcon, CircleIcon, ResetIcon, TriangleIcon, TextIcon, DownloadIcon, PenIcon, ImageIcon} from "sebikostudio-icons";
import Settings from './settings';
import Video from './video';
import CanvasSettings from './CanvasSettings';
import {handleObjectMoving} from "./snappingHelpers";
import {ImageDownIcon, Trash2} from "lucide-react"
import Export from "./Export";
import Drawing from './Drawing';
import CanvasApp from './CanvasApp.js'


import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-designs" element={<CanvasApp/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
