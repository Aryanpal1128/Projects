let btn1 = document.getElementById("button1");
let btn2 = document.getElementById("button2");
let copy = document.querySelector(".copycode");
let hexavalue="0123456789abcdef";
let rgb1="#111";
const hexvalues =()=> {
   let colours="#";
    for(let i =0;i<6;i++){
    colours=colours+hexavalue[Math.floor(Math.random()*16)];
    
    }
    return colours;
};
const handlebutton1 =()=> {
    rgb1 = hexvalues();
    console.log(rgb1);
document.body.style.backgroundImage=`linear-gradient(to right,${rgb1},#444)`;
copy.innerHTML=`Background colour - ${rgb1},#4845 `
 btn1.style.backgroundColor = rgb1;
  btn2.style.backgroundColor = "#444";
   
};
const handlebutton2 =()=> {
    rgb2 = hexvalues();
    console.log(rgb1);
document.body.style.backgroundImage=`linear-gradient(to right,${rgb1},${rgb2})`;
copy.innerHTML=`Background colour - ${rgb1},${rgb2} `
 btn1.style.backgroundColor = rgb1;
  btn2.style.backgroundColor = rgb2;
   
};
btn1.addEventListener("click",handlebutton1);
btn2.addEventListener("click",handlebutton2);