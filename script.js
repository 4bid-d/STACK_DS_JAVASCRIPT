const inputDiv = document.querySelector("#inputDiv")
const undoBtn = document.querySelector("#undo")
const redoBtn = document.querySelector("#redo")
const inputTag = document.createElement("input")
inputTag.setAttribute("id","input")
inputTag.setAttribute("type","text")
inputTag.setAttribute("value","")

inputDiv.appendChild(inputTag)
const h1 = document.querySelector("h1")
const input = document.querySelector("#input")
let undoStackTop = null
let redoStackTop = null


class Undo{
    constructor(data) {
      this.data = data;
    }
}
class Redo{
    constructor(data) {
      this.data = data;
    }
}

const undoReadFirstValue = ()=>{
    if(!undoStackTop.next ?? !undoStackTop.next.data )  return undoStackTop.data
     return undoStackTop.next.data
}

const redoReadFirstValue = ()=>{
    if(!redoStackTop.next ?? !redoStackTop.next.data )  return redoStackTop.data
     return redoStackTop.next.data
}

const UndoPop = () => {
    if(undoStackTop == null || !undoStackTop.next  ) return 
    const popped = undoStackTop.next
    undoStackTop = popped
}
const RedoPop = () => {
    if(redoStackTop == null || !redoStackTop.next  ) return 
    const popped = redoStackTop.next
    redoStackTop = popped
}


const undo = ()=>{
    const VALUE = undoReadFirstValue()
    input.remove()
    inputTag.value = VALUE
    redoStackPush(undoStackTop.next.data)
    inputDiv.appendChild(inputTag)
    UndoPop()
    if(!undoStackTop.next ?? !undoStackTop.next.data ) {
        undoBtn.disabled = true 
    }
    // console.log(undoStackTop)
}

const redo = ()=>{
    undoBtn.disabled = false
    const VALUE = redoReadFirstValue()
    input.remove()
    inputTag.value = VALUE
    undoStackPush(VALUE)
    inputDiv.appendChild(inputTag)
    RedoPop()
    if(!redoStackTop.next ?? !redoStackTop.next.data ) {
        redoBtn.disabled = true 
    }
    console.log(redoStackTop)
}

const undoStackPush = (data)=>{
    const newNode = new Undo(data)

    if(undoStackTop == null){
        undoStackTop = newNode
        // console.log(undoStackTop)
        return 
    }else{
        newNode.next = undoStackTop
        undoStackTop = newNode
        // console.log(undoStackTop)
        return
    }
}

const redoStackPush = (data)=>{
    const newNode = new Redo(data)

    if(redoStackTop == null){
        redoStackTop = newNode
        console.log(redoStackTop)
        return 
    }else{
        newNode.next = redoStackTop
        redoStackTop = newNode
        console.log(redoStackTop)
        return
    }
}

function localStorageSave(e){
    localStorage.setItem("data" ,input.value.toString())
    undoStackPush(input.value.toString())
    if(undoStackTop.data || undoStackTop.next.data ) {
        undoBtn.disabled = false 
    }
}

function getDataAppend(){
    const data = localStorage.getItem("data")
    console.log(data)
}

