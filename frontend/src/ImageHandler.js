import React, { useRef, useState } from 'react';
import { IconButton } from 'blocksin-system';
import { ImageIcon } from 'lucide-react';
import { FabricImage } from 'fabric';

const ImageHandler = ({ canvas }) => {
    const [uploadMessage, setUploadMessage] = useState("");
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const url = e.target.result;
                
                
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    
                    const fabricImage = new FabricImage(img, {
                        left: 0,
                        top: 0,
                    });

                  
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    const scale = Math.min(
                        canvasWidth / img.width,
                        canvasHeight / img.height
                    );
                    
                    
                    fabricImage.scale(scale);
                    fabricImage.set({
                        cornerSize: 10,
                        cornerStyle: 'circle'
                    });
                    
                    
                    canvas.add(fabricImage);
                    
                 
                    canvas.renderAll();
                     
                    setUploadMessage("Image uploaded");
                    setTimeout(() => {
                        setUploadMessage("");
                    }, 3000);
                };
            };
            
            reader.readAsDataURL(file);
        }
    };

    const handleImageUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="relative">
            <input 
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
            />
            
            <IconButton
                onClick={handleImageUploadButtonClick}
                variant="ghost"
                size="sm"
                className="flex items-center justify-center"
            >
                <ImageIcon className="w-5 h-5" />
            </IconButton>
            
            {uploadMessage && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-green-500 text-white rounded-md text-sm">
                    {uploadMessage}
                </div>
            )}
        </div>
    );
};

export default ImageHandler;