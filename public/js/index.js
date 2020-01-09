let testArr = [];
let thing = 2;
let record = false;
let colorChoice = "black";
let lines = [];
let lineNum = 0;
let lineMax = 6;

const test = () => {
  testArr.push(mouseX, mouseY);
};

function setup() {
  let cnv = createCanvas(640, 480);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
  
  $("#defaultCanvas0")
  .mousedown(function() {
    if (record === true) {
      timer = setInterval(test, 5);
    }
  })
  .mouseup(function() {
    if(record === true){
    lineNum = lineNum + 1;
    let x = {array: testArr, color: colorChoice};
    lines.push(x);
    if(lineNum === lineMax){
      clearInterval(timer);
      record = false;}
    testArr = [];
    }
  });

  let c = document.getElementById("defaultCanvas0");
  let ctx = c.getContext("2d");
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'black';
}

function draw() {
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

$("#go").on("click", function() {
  console.log(lines)
  // record = false;
  thing = 2;
  let currentLine = 0;
  let LineIndex = 0;
  const c = document.getElementById("defaultCanvas0");
  const ctx = c.getContext("2d");
  lineNum = 1;
  timer = setInterval(function(){
    ctx.strokeStyle = lines[lineNum-1].color;
    ctx.moveTo(lines[lineNum-1].array[thing-2], lines[lineNum-1].array[thing-1]);
    thing += 2;
    ctx.lineTo(lines[lineNum-1].array[thing-2], lines[lineNum-1].array[thing-1]);
    ctx.stroke();
    if(thing + 2 === lines[lineNum-1].array.length){
      lineNum = lineNum + 1;
    }
  }, 5);

});

$("#clean").on("click", function() {
  thing = 2;
  let lines = [];
  clear();
});

$("#rec").on("click", function() {
  testArr=[];
  thing=2;
  clear();
  let name = prompt("How would you like to name this recording?");
  if(name.length === 0){alert("Image Name Required To Save. Please Try Again")}else{
  alert("Please start drawing. The recording will be saved under the name " + name +". Once you have finished, you can view your recording by pressing the 'execute' button." )
  record = true;}
})

$("#save").on("click", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();
  
    $.ajax({
      method: "POST",
      url: "/save", 
      data: {
        name:name,
        coordinates: testArr
      }
    })
});

$("#saveImg").on("click", function(){
    // console.log("eyy")
    // var image = new Image();
    // var base64Stream = document.getElementById("defaultCanvas0").toDataURL("image/jpg")
    // .replace("image/jpg", "image/octet-stream");
    // image.src= base64Stream;
    // $("#imgTests").append(image);
    // console.log(image);
    // console.log(testArr.length);
})

$(".colorTag").on("click", function(){
  let c = document.getElementById("defaultCanvas0");
  let ctx = c.getContext("2d");
  colorChoice = $(this).attr("id");
  let colorArr = ["red", "orangered", "yellow", "green", "blue", "purple", "black"]
  for(var i = 0; i < colorArr.length; i++){
    if(colorArr[i] === colorChoice){
      ctx.strokeStyle = colorChoice;
    }}
})