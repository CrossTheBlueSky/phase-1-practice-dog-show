
const editSubmit = document.querySelector("#dog-form")
editSubmit.addEventListener("submit", (e)=>{
    e.preventDefault()
    submitHandler(e)
})

let currentDog

function initializeOrUpdate(){

    fetch("http://localhost:3000/dogs")
    .then(r=>r.json())
    .then((data)=>{

        const table = document.querySelector("#table-body")
        table.innerHTML = ""

        data.forEach((dog)=>{

            addToTable(dog)
        })
    })
}



function addToTable(dog){
    const table = document.querySelector("#table-body")
    const newEntry = document.createElement("tr")
    newEntry.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button id="${dog.name}-edit-button">Edit</button></td>
    `
    table.append(newEntry)
    const editButton = document.querySelector(`#${dog.name}-edit-button`)
    editButton.addEventListener("click",()=>{
    editHandler(dog)
    })
}

function editHandler(dog){
    currentDog = dog
    const dogForm = document.querySelector("#dog-form")
    dogForm["name"].value = dog.name
    dogForm["breed"].value = dog.breed
    dogForm["sex"].value = dog.sex
}

function submitHandler(e){
    
    const patchObj = {
        name : e.target[0].value,
        breed : e.target[1].value,
        sex : e.target[2].value
    }

    fetch(`http://localhost:3000/dogs/${currentDog.id}`, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patchObj)
    })
    .then(()=>{
        initializeOrUpdate()
    })
}
initializeOrUpdate()