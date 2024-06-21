console.log('Client side JS file is loaded')

// fetch("http://localhost:3000/weather?address=Ichalkaranji").then((response) => {
//     response.json().then((data)=>{
//         if(data.error){
//             return console.log(data.error)
//         }
//         console.log(data)
//     })
// })

const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value;
    console.log(location)
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                return console.log(data.error)
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
            console.log(data)
        })
    })
})
