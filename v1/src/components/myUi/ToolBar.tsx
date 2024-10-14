import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ColorPicker } from 'primereact/colorpicker';
import './styling/CustomToolbar.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import Quill from 'quill';

interface CustomToolbarProps {
  onColorChange: (color: string) => void; // Function prop for text color change
  exportAsPDF:()=>Promise<void>;
  exportAsDOCX:()=>Promise<void>;
}


const CustomToolbar = ({ onColorChange,exportAsDOCX,exportAsPDF }: CustomToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="toolbar">
      <select className="ql-header mx-1" defaultValue="">
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
        <option value="">Normal</option>
      </select>



      <select className="ql-font mx-1">
        <option value="sans-serif">Sans Serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
      </select>

      <button className="ql-bold mx-1">Bold</button>
      <button className="ql-italic mx-1">Italic</button>
      <button className="ql-underline mx-1">Underline</button>
      <button className="ql-list mx-1" value="ordered">Ordered List</button>

      {/* Text Color Selector */}
      <select className="ql-color mx-1" onChange={(e) => onColorChange(e.target.value)}>
        {/* Red Shades */}
        <optgroup label="Reds">
          <option value="#ff0000">Red</option>
          <option value="#cc0000">Dark Red</option>
          <option value="#b22222">Fire Brick</option>
          <option value="#8b0000">Dark Red</option>
          <option value="#ff6347">Tomato</option>
          <option value="#dc143c">Crimson</option>
        </optgroup>

        {/* Oranges */}
        <optgroup label="Oranges">
          <option value="#ff8c00">Dark Orange</option>
          <option value="#ff7f50">Coral</option>
          <option value="#ff4500">Orange Red</option>
          <option value="#cd853f">Peru</option>
          <option value="#ffa500">Orange</option>
          <option value="#ffd700">Gold</option>
        </optgroup>

        {/* Yellows */}
        <optgroup label="Yellows">
          <option value="#ffff00">Yellow</option>
          <option value="#ffd700">Gold</option>
          <option value="#ffea00">Golden Yellow</option>
          <option value="#f0e68c">Khaki</option>
        </optgroup>

        {/* Greens */}
        <optgroup label="Greens">
          <option value="#006400">Dark Green</option>
          <option value="#008000">Green</option>
          <option value="#3cb371">Medium Sea Green</option>
          <option value="#32cd32">Lime Green</option>
          <option value="#98fb98">Pale Green</option>
        </optgroup>

        {/* Blues */}
        <optgroup label="Blues">
          <option value="#0000ff">Blue</option>
          <option value="#00008b">Dark Blue</option>
          <option value="#1e90ff">Dodger Blue</option>
          <option value="#4682b4">Steel Blue</option>
          <option value="#add8e6">Light Blue</option>
        </optgroup>

        {/* Purples */}
        <optgroup label="Purples">
          <option value="#800080">Purple</option>
          <option value="#9370db">Medium Purple</option>
          <option value="#4b0082">Indigo</option>
          <option value="#663399">Rebecca Purple</option>
          <option value="#da70d6">Orchid</option>
          <option value="#e6e6fa">Lavender</option>
        </optgroup>

        {/* Neutrals */}
        <optgroup label="Neutrals">
          <option value="#000000">Black</option>
          <option value="#696969">Dim Gray</option>
          <option value="#808080">Gray</option>
          <option value="#d3d3d3">Light Gray</option>
          <option value="#ffffff">White</option>
        </optgroup>

        {/* Additional Colors */}
        <optgroup label="Additional Colors">
          <option value="#2f4f4f">Dark Slate Gray</option>
          <option value="#ffb6c1">Light Pink</option>
          <option value="#4682b4">Steel Blue</option>
          <option value="#f5deb3">Wheat</option>
        </optgroup>
      </select>

      {/* Highlight Color Selector */}
      <select className="ql-background mx-1">
        <optgroup label="Highlight Colors">
          <option value="#ff0000">Red</option>
          <option value="#ffff00">Yellow</option>
          <option value="#add8e6">Light Blue</option>
          <option value="#32cd32">Lime Green</option>
          <option value="#ffb6c1">Light Pink</option>
          <option value="#ff8c00">Dark Orange</option>
          <option value="#ff4500">Orange Red</option>
          <option value="#000000">Black</option>
          <option value="#d3d3d3">Light Gray</option>
          <option value="#f0e68c">Khaki</option>
          <option value="#b22222">Fire Brick</option>
          <option value="#800080">Purple</option>
          <option value="#ffea00">Golden Yellow</option>
          <option value="#4682b4">Steel Blue</option>
          <option value="#cd853f">Peru</option>
        </optgroup>
      </select>

      <button className="ql-list mx-1" value="bullet">Bullet List</button>
      <button className="ql-image mx-1">Image</button>
      <button className="ql-blockquote mx-1">Quote</button>
      <button className="ql-code-block mx-1">Code Block</button>

      <div className='ql-custom-button flex items-center justify-center mx-1'>
        <div className="w-[20px] h-[20px] border-[1px] rounded-full border-black flex items-center justify-center">
          <div className='bg-yellow-500 overflow-hidden w-full h-full rounded-full'>
            <ColorPicker
              className='h-[20px] flex items-center justify-center text-center scale-[1.5] overflow-hidden'
              onChange={(e) => onColorChange(e.value as string)}
            />
          </div>
        </div>
      </div>

      <div className='ql-export'>
        <DropdownMenu>
          <DropdownMenuTrigger className='outline-none'>
            <Download />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className='text-xs' onClick={exportAsPDF}>Export as PDF</DropdownMenuItem>
            <DropdownMenuItem className='text-xs' onClick={exportAsDOCX}>Export as DOCX</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>




      </div>


    </div>
  );
};

export default CustomToolbar;
