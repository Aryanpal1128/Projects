

const ar = document.querySelector(".todo-list-element");
const element = document.getElementById("inpt");
 
 const getlist  = (e) =>{
     return JSON.parse(localStorage.getItem("listing"));

 }

 const dynamic = (currelement) =>{
    const divelement = document.createElement("div");
    divelement.classList.add("ar");
    divelement.innerHTML = `<li> ${currelement}</li><button class="deletebtn">Delete</button>`;
ar.append(divelement);


 };
 const adtdlist =(local) =>{
 return local.setItem("listing" , JSON.stringify(local));
 };
    let local= getlist() || [];


const AddtodoList= (e) =>{
    e.preventDefault();             
    const listvalue = element.value.trim();
    element.value = "";
      if(!local.includes(listvalue || "")){   
    local.push(listvalue);
    local = [...new Set(local)]; 
    console.log(local);
    localStorage.setItem("listing" , JSON.stringify(local));
   dynamic(listvalue);
   }
};

const gettodolist = () =>{
 console.log(local);
 local.forEach((currelement) => {
    dynamic(currelement);
 });
};

gettodolist();  

const deleteelement = (e) => {
 
 const todoremove = e.target;
 let remove = todoremove.previousElementSibling.innerText;
 let parentElement = todoremove.parentElement;
 console.log(remove);
 local =local.filter((currtodo) =>{
 return currtodo != remove.toLowerCase();
 });

 parentElement.remove();
 console.log(local);
};
ar.addEventListener("click", (e) => {
    e.preventDefault(); 
    deleteelement(e);
});


document.querySelector(".btn").addEventListener( "click", AddtodoList) ;

