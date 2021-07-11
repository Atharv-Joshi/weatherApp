const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit' , (e) =>{
    //stops refresh after submitting the form
    e.preventDefault()
    if(!search.value){
        message2.textContent = 'Enter an location'
    }
    else{
    message2.textContent = 'Loading..'    
    fetch('/weather?address=' + search.value).then(
        (response) =>{
            response.json().then(
                (data) =>{
                    if(data.error){
                        message2.textContent = data.error
                    }
                    else{
                        message1.textContent = data.location
                        message2.textContent = data.forecast
                    }
                    
                }
            )
        }
    )
    }
})