"use strict";
let temperamentInput = document.getElementById("temperament");
let temperamentText = document.getElementById("temperamentValue");
temperamentInput.addEventListener("input", showValue);
function showValue() {
    temperamentText.textContent = temperamentInput.value;
}
class Pet {
    constructor(name, isMale, breed, age, color, isNeutered, isChipped, temperament) {
        this.name = name;
        this.isMale = isMale;
        this.breed = breed;
        this.age = age;
        this.color = color;
        this.isNeutered = isNeutered;
        this.isChipped = isChipped;
        this.temperament = temperament;
    }
}
let inHolding = {};
function getValue(id) {
    return document.getElementById(id).value;
}
function getChecked(id) {
    return document.getElementById(id).checked;
}
function Register() {
    let name = getValue("name");
    let isMale = getChecked("isMale");
    let breed = getValue("breed");
    let age = parseInt(getValue("age"));
    let color = getValue("color");
    let isNeutered = getChecked("neuteredYes");
    let isChipped = getChecked("chippedYes");
    let temperament = parseInt(getValue("temperament"));
    let pet = new Pet(name, isMale, breed, age, color, isNeutered, isChipped, temperament);
    inHolding[pet.name] = pet;
    render(pet);
    localStorage.setItem("pet", JSON.stringify(inHolding));
}
function booleanChecker(id, trueValue, falseValue) {
    if (document.getElementById(id).checked) {
        return trueValue;
    }
    else {
        return falseValue;
    }
}
function render(pet) {
    let tile = document.createElement("div");
    tile.className = "tile";
    document.getElementById("tilesContainer").appendChild(tile);
    let name = document.createElement("h4");
    tile.appendChild(name);
    name.innerText = pet.name;
    let isMale = document.createElement("p");
    tile.appendChild(isMale);
    isMale.innerText = "Gender: " + (pet.isMale ? "male" : "female");
    let breed = document.createElement("p");
    tile.appendChild(breed);
    breed.innerText = "Breed: " + pet.breed;
    let age = document.createElement("p");
    tile.appendChild(age);
    age.innerText = "Age: " + pet.age;
    let color = document.createElement("p");
    tile.appendChild(color);
    color.innerText = "Color: " + pet.color;
    let neutered = document.createElement("p");
    tile.appendChild(neutered);
    neutered.innerText = "Neutered: " + (pet.isNeutered ? "yes" : "no");
    let chipped = document.createElement("p");
    tile.appendChild(chipped);
    chipped.innerText = "Chipped: " + (pet.isChipped ? "yes" : "no");
    let temperament = document.createElement("p");
    tile.appendChild(temperament);
    temperament.innerText = "Temperament: " + pet.temperament;
    // for (let attribute in pet) {
    //     let petAttribute = document.createElement("p")
    //     petAttribute.innerText += `${attribute}: ${pet[attribute]}`
    //     tile.appendChild(petAttribute)
    // }
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    tile.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteEntry);
    deleteButton.dataset.name = pet.name;
}
inHolding = JSON.parse(localStorage.getItem("pet"));
function showInHolding() {
    document.getElementById("tilesContainer").innerHTML = "";
    if (inHolding == null) {
        inHolding = {};
    }
    for (const name in inHolding) {
        render(inHolding[name]);
    }
}
function deleteEntry(e) {
    let button = e.target;
    delete inHolding[button.dataset.name];
    showInHolding();
    localStorage.setItem("pet", JSON.stringify(inHolding));
}
showInHolding();
//# sourceMappingURL=script.js.map