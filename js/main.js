//Declearing Variables 
const form = document.querySelector("form");
const input = document.querySelector("form input");
const errorMessage = document.querySelector("#error-message")
const apiKey = "79673df453f955e370ac860b8e5db97f";



function closeModal(){

    document.querySelector(".modal-background").style.display = "none";

    // errorMessage.textContent = "";
    form.reset();
    input.focus();
}

// Making Api call on submit
form.addEventListener("submit", e => {
    e.preventDefault();
   const inputValue = input.value;

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

// Fetch Api
    fetch(url)
        .then(response => response.json())
        .then(data => {
        // do stuff with the data
        const { main, name, sys, weather } = data;
        const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
        }@2x.png`;

            errorMessage.innerHTML= "Loading...";
            const markup= `
            <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <span> - ${sys.country}</span>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
            </div>
            <figure>
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
            <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
        `
            document.querySelector(".modal-background").style.display = "flex" 
            errorMessage.innerHTML= markup;
            document.querySelector("#favicon").href = icon;
        })
    .catch(() => {
        errorMessage.textContent = "Weather Update not available at the moment";
        document.querySelector(".modal-background").style.display = "flex"
        
    });
  });

 
  if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('../service-worker.js', {scope: '../'})
      .then(function(reg){console.log('registered service worker scoped to ' + reg.scope)},
            function(err){console.log(err)})
     }