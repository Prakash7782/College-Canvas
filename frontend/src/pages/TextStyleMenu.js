import React, { useState } from 'react';
import { Type as TextIcon } from 'lucide-react';
import { Textbox } from "fabric";

const textStyles = [
  {
    name: 'Regular Text',
    props: {
      fontSize: 30,
      fontFamily: 'Arial',
      fill: '#333',
    }
  },
  {
    name: 'Bold Heading',
    props: {
      fontSize: 48,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#000',
    }
  },
  {
    name: 'Elegant Script',
    props: {
      fontSize: 36,
      fontFamily: 'Brush Script MT, cursive',
      fill: '#2c3e50',
      fontStyle: 'italic',
    }
  },
  {
    name: 'Modern Sans',
    props: {
      fontSize: 32,
      fontFamily: 'Helvetica, Arial',
      fill: '#333',
      letterSpacing: 2,
    }
  },
  {
    name: 'Classic Serif',
    props: {
      fontSize: 34,
      fontFamily: 'Times New Roman, serif',
      fill: '#2c3e50',
      fontWeight: '500',
    }
  },
  {
    name: 'Typewriter',
    props: {
      fontSize: 28,
      fontFamily: 'Courier New, monospace',
      fill: '#34495e',
      letterSpacing: 1,
    }
  },
  {
    name: 'Handwritten',
    props: {
      fontSize: 36,
      fontFamily: 'Comic Sans MS, cursive',
      fill: '#2c3e50',
      fontStyle: 'italic',
      lineHeight: 1.2,
    }
  },
  {
    name: 'Decorative Title',
    props: {
      fontSize: 42,
      fontFamily: 'Impact, sans-serif',
      fill: '#34495e',
      letterSpacing: 3,
      fontWeight: 'bold',
    }
  },
  {
    name: 'Thin Modern',
    props: {
      fontSize: 38,
      fontFamily: 'Helvetica Neue, Arial',
      fill: '#2c3e50',
      fontWeight: '200',
      letterSpacing: 4,
    }
  },
  {
    name: 'Bold Condensed',
    props: {
      fontSize: 36,
      fontFamily: 'Arial Narrow, Arial',
      fill: '#000',
      fontWeight: 'bold',
      fontStretch: 'condensed',
    }
  },
  {
    name: 'Vintage Style',
    props: {
      fontSize: 32,
      fontFamily: 'Georgia, serif',
      fill: '#5d4037',
      fontStyle: 'italic',
      lineHeight: 1.2,
      charSpacing: 100,
    }
  },
  {
    name: 'Tech Look',
    props: {
      fontSize: 30,
      fontFamily: 'Monaco, monospace',
      fill: '#2196f3',
      letterSpacing: 1,
      fontWeight: '500',
    }
  },
  {
    name: 'Playful Text',
    props: {
      fontSize: 34,
      fontFamily: 'Comic Sans MS, cursive',
      fill: '#e91e63',
      lineHeight: 1.3,
      fontWeight: 'bold',
    }
  },
  {
    name: 'Professional',
    props: {
      fontSize: 32,
      fontFamily: 'Calibri, Arial',
      fill: '#333',
      letterSpacing: 1,
      fontWeight: '400',
    }
  }
];

const TextStyleMenu = ({ canvas }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const addTextToCanvas = (styleProps) => {
    if (canvas) {
      const text = new Textbox('Add Your Text', {
        top: Math.random() * 300,
        left: Math.random() * 300,
        width: 200,
        ...styleProps
      });
      
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
      setIsOpen(false);
    }
  };

  const filteredStyles = textStyles.filter(style =>
    style.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
      >
        <TextIcon className="w-5 h-5" />
        <span className="text-sm">Text</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search styles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          
          <div className="py-1">
            {filteredStyles.map((style) => (
              <button
                key={style.name}
                onClick={() => addTextToCanvas(style.props)}
                className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-2 border-b border-gray-50"
              >
                <TextIcon className="w-4 h-4 flex-shrink-0" />
                <div>
                  <span className="text-sm" style={{
                    fontFamily: style.props.fontFamily,
                    fontWeight: style.props.fontWeight,
                    fontStyle: style.props.fontStyle,
                  }}>
                    {style.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextStyleMenu;