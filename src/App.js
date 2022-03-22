import React, {useState,useCallback,useEffect} from 'react';
import {ColorPicker,TextField, hsbToRgb} from '@shopify/polaris';
import html2canvas from 'html2canvas';
//import { SketchPicker } from 'react-color';


export default function ColorPickerWithTransparentValueExample() {
  const printRef = React.useRef();
  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  const [value, setValue] = useState('your quote');
  
const handleChange = useCallback((newValue) => setValue(newValue), []);
  const [color, setColor] = useState({
    hue: 50,
    brightness: 0.5,
    saturation: 0.5,
    alpha: 0.5
  });
  useEffect(() => {
    setColor(color);
}, [color]);
console.log(color);

  let rgba = hsbToRgb(color);

  return <div> 
    <TextField
      label="Your Quote"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      width={"200px"}
    />
    <div style={{margin:'20px'}}>
    <ColorPicker height={"100px"} width={"200px"}  onChange={setColor} color={color} margin={"25px"} 
    
     allowAlpha fullWidth={false} />
     </div>
    <div ref={printRef} style={{display: 'flex', lineHeight: '40px',height:'500px',width:'1000px',backgroundColor:'black',color:'white',margin:'25px'}}>

      <div style={{marginTop:'auto',marginLeft:'auto',marginRight:'auto',marginBottom:'auto',padding:'30px',fontSize:'40px',color:`rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`}}>{value}</div>
    </div>
    <button style={{marginLeft:'25px',marginTop:'-10px'}} id="Save" onClick={handleDownloadImage}>Save as PNG</button>
</div>
}
