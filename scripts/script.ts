"use strict";

let temperamentInput = (<HTMLInputElement>document.getElementById("temperament")!)
let temperamentText = document.getElementById("temperamentValue")!

temperamentInput.addEventListener("input", showValue)

function showValue() {
    temperamentText.textContent = temperamentInput.value
}

class Pet{
    name:string
    isMale:boolean
    breed:string
    age:number
    color:string
    isNeutered:boolean
    isChipped:boolean
    temperament:number

    constructor(name:string, isMale:boolean, breed:string, age:number, color:string, isNeutered:boolean, isChipped:boolean,temperament:number,){
            this.name = name
            this.isMale = isMale
            this.breed = breed
            this.age = age
            this.color = color 
            this.isNeutered = isNeutered 
            this.isChipped = isChipped 
            this.temperament = temperament
    }
}

let inHolding: Record<string, Pet> = {}

function getValue(id:string){
    return (<HTMLInputElement>document.getElementById(id)!).value
}

function getChecked(id:string){
    return (<HTMLInputElement>document.getElementById(id)!).checked
}

function Register() {
    let name:string = getValue("name")
    let isMale:boolean = getChecked("isMale")
    let breed:string = getValue("breed")
    let age:number = parseInt(getValue("age"))
    let color:string = getValue("color")
    let isNeutered:boolean = getChecked("neuteredYes")
    let isChipped:boolean = getChecked("chippedYes")
    let temperament:number = parseInt(getValue("temperament"))
    let pet = new Pet(name, isMale, breed, age, color, isNeutered, isChipped, temperament)
    inHolding[pet.name] = pet
    render(pet)
    localStorage.setItem("pet",JSON.stringify(inHolding))
}

function booleanChecker(id:string, trueValue:string, falseValue:string){
    if ((<HTMLInputElement>document.getElementById(id)!).checked){
        return trueValue
    }
    else { 
        return falseValue
    }
}

function render(pet:Pet) {
    
    let tile = document.createElement("div")
    tile.className="tile";
    (<HTMLInputElement>document.getElementById("tilesContainer")!).appendChild(tile)

    let name = document.createElement("h4")
    tile.appendChild(name)
    name.innerText = pet.name

    let isMale = document.createElement("p")
    tile.appendChild(isMale)
    isMale.innerText = "Gender: " + (pet.isMale?"male":"female")

    let breed = document.createElement("p")
    tile.appendChild(breed)
    breed.innerText = "Breed: " + pet.breed

    let age = document.createElement("p")
    tile.appendChild(age)
    age.innerText = "Age: " + pet.age

    let color = document.createElement("p")
    tile.appendChild(color)
    color.innerText = "Color: " + pet.color

    let neutered = document.createElement("p")
    tile.appendChild(neutered)
    neutered.innerText = "Neutered: " + (pet.isNeutered?"yes":"no")

    let chipped = document.createElement("p")
    tile.appendChild(chipped)
    chipped.innerText = "Chipped: " + (pet.isChipped?"yes":"no")

    let temperament = document.createElement("p")
    tile.appendChild(temperament)
    temperament.innerText = "Temperament: " + pet.temperament  

    // for (let attribute in pet) {
    //     let petAttribute = document.createElement("p")
    //     petAttribute.innerText += `${attribute}: ${pet[attribute]}`
    //     tile.appendChild(petAttribute)
    // }

    let deleteButton = document.createElement("button")
    deleteButton.innerText="Delete"
    tile.appendChild(deleteButton)

    deleteButton.addEventListener("click", deleteEntry)
    deleteButton.dataset.name = pet.name

}

inHolding = JSON.parse(localStorage.getItem("pet")!)

function showInHolding(){
    (<HTMLInputElement>document.getElementById("tilesContainer")!).innerHTML = ""
    if (inHolding==null){inHolding={}}
    for (const name in inHolding){
    render(inHolding[name])
    }
}

function deleteEntry(e:any){

    let button=e.target
    delete inHolding[button.dataset.name]
    showInHolding()
    localStorage.setItem("pet", JSON.stringify(inHolding))
}

showInHolding()

