import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const Export = ({ canvasRef }) => {
  const [exportFormat, setExportFormat] = useState('PNG');

  const downloadImage = (dataURL, filename) => {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    link.click();
  };

  const handleExport = () => {
    switch (exportFormat) {
      case 'PNG':
        exportPNG();
        break;
      case 'JPG':
        exportJPG();
        break;
      case 'PDF':
        exportPDF();
        break;
      default:
        break;
    }
  };

  const exportPNG = () => {
    const dataURL = canvasRef.current.toDataURL('image/png', 1.0);
    downloadImage(dataURL, 'canvas.png');
  };

  const exportJPG = () => {
    const dataURL = canvasRef.current.toDataURL('image/jpeg', 1.0);
    downloadImage(dataURL, 'canvas.jpg');
  };

  const exportPDF = () => {
    const dataURL = canvasRef.current.toDataURL('image/png', 1.0);
    const pdf = new jsPDF('landscape');
    pdf.addImage(dataURL, 'PNG', 10, 10, 190, 120);
    pdf.save('canvas.pdf');
  };

  return (
    <div>
      <select 
        value={exportFormat}
        onChange={(e) => setExportFormat(e.target.value)}
      >
        <option value="PNG">Export as PNG</option>
        <option value="JPG">Export as JPG</option>
        <option value="PDF">Export as PDF</option>
      </select>
      <button onClick={handleExport}>
        Export
      </button>
    </div>
  );
};

export default Export;
