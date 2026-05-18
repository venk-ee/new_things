// https://www.youtube.com/watch?v=m55PTVUrlnA&t=145s


function newstuff() {
    console.log("This is the new stuff")
}


const DOsomething = () => {
    console.log("hello world")
}



// if u want to export to a different file then 

export default function newstuff() {
    console.log("This is the new stuff")
}



export const DOsomething = () => {
    console.log("hello world")
}

// return html 
const Mycomponent = () => {
    return (
        <div>
            <h1>My component</h1>
        </div>
    )
}

// annomous fn 
<button onClick={() => {
    console.log("hello world")
}}>click me</button>

// turnary operator
// condition
if (true) {
    console.log("This is the new stuff")
}
else {
    console.log("This is the old stuff")
}

let age=10;
let name="venkat";

if (age>10){
    name="venkat";
}
else{
    name="venky"
}

// the above stuffs takes lot of work so we use turnary op there are 3 types 

let age=10;
let name=age>10 &&"venkat";    //&& (ie.if condtion is true then do the next thing) also called as short circuit operator

// ?:     (ie if else operator)

let name=age>10?"venkat":"venky";
console.log(name);

// ||  (ie opposite of && operator ie if condtion is false then do the next thing)

let name=age>10||"venkat";
console.log(name);

// where u use this ?

const component=()=>{
    return age>10? <div>venky</div>:<div>venkat</div>;
}



//object in js 

const person={
    name:"venkat",
    age:21,
    is_alive:true,   
}

const personName=person.name
// or
const {personname,personage,personis_alive}=person;

// or 
const name="venkat2";
const {personname}=person;

const person2={...person,name:"venky"};

//array in js 
const arr=[1,2,3,4,5];
const arr2=[...arr,33];

// .map(),.filter(),   this .reduce() is not used a lot

arr.map((arrvalue)=>{
    return arrvalue *2;
})


let names=["a","b","c"]

names.map((name)=>{
    return <h1>{name}</h1>
})

let namess=['a','a','b','c']

const newnames=namess.filter((name)=>{
    return name != "a"
})



// promices,async and await and fetch

// example Promise

const event=new Promise((resolve,reject)=>{
  var name="venkat"
  if (name==="venkat"){
    resolve("this is good")
  }
  else{
    reject("this is bad")
  }
})

event.then().catch()  // if error ocures (ie . reject()) in that then catch block will execute else (ie . resolve()) then block will execute (ie. reject => catch else resolve => then)
// then === resolve , catch === reject 

// how would u use this ?? 
event.then((value)=>{
    console.log(value);
}).catch((error)=>{
    console.log(error);
}).finally(()=>{
    console.log("finally");
})


// real world example
const axios= require("axios");


const data =axios.get("https://cat-fact.herokuapp.com/facts/random")

data.then((response)=>{
    console.log(response.data);
}).catch((error)=>{
    console.log(error);
})

const fetchdata=async () => {
    try{
        const response=await axios.get("https://cat-fact.herokuapp.com/facts/random")
        console.log(response.data);
    }
    catch(error){
        console.log(error);
    }
    finally{
        console.log("finally");
    }
}

fetchdata();


