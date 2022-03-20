import React, {useState,useCallback,useEffect} from 'react';
import {ColorPicker,TextField} from '@shopify/polaris';
import html2canvas from 'html2canvas';

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hslToHex(h,s,l)
{
  let rgb=hslToRgb(h,s,l);
 let hex=rgbToHex(rgb[0],rgb[1],rgb[2]);
 return hex;
}


function hslToRgb(h, s, l){
  var r, g, b;

  if(s == 0){
      r = g = b = l; // achromatic
  }else{
      var hue2rgb = function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

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

      <div style={{marginTop:'auto',marginLeft:'auto',marginRight:'auto',marginBottom:'auto',padding:'30px',fontSize:'40px',color:`hsla(${color.hue}, ${color.saturation*100}%, ${color.brightness*100}%, ${color.alpha})`}}>{value}</div>
    </div>
    <button style={{marginLeft:'25px',marginTop:'-10px'}} id="Save" onClick={handleDownloadImage}>Save as PNG</button>
</div>
}
