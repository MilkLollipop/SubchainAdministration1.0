import Identicon from 'identicon.js';
export default function indentData(str, size) {
  let options = {
    margin: 0.2, // 20% margin
    size: size, // square
    format: 'svg', // use SVG instead of PNG
  };
  let data;
  if (str == undefined) {
    data = new Identicon('identicon', options).toString();
  } else {
    data = new Identicon(str, options).toString();
  }
  return data;
}
