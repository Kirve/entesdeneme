/*jshint esversion: 6 */

window.addEventListener('load', ()=> {

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let pressureLevel = document.querySelector('.pressure-level');
    let degree = document.querySelector('.temperature span');
    
    
    
    if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition(position =>{
            
            
            longi = position.coords.longitude;
            lati = position.coords.latitude;
           
            
            
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = proxy + "https://api.darksky.net/forecast/e75ed165e1cd8192e50424e97b9a6948/" + lati + "," + longi;

            fetch(api)
            .then( response =>{
                return response.json();
            })
            .then(data =>{
                
                const {temperature, summary, pressure, icon } = data.currently;

                let celsius = (temperature -32) * (5)/(9);
                temperatureDegree.textContent = Math.floor(celsius); 
                temperatureDescription.textContent = summary;
                pressureLevel.textContent = pressure + " mb";
                locationTimezone.textContent = data.timezone;
                degree.textContent="C";

                setIcons(icon, document.querySelector('.icon'));

                
            });
        });

    }
  
    function setIcons(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
  
});

document.getElementById("currentLoca").addEventListener('click', ()=> {

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let pressureLevel = document.querySelector('.pressure-level');
    let degree = document.querySelector('.temperature span');
    
    
    
    if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition(position =>{
            
            
            longi = position.coords.longitude;
            lati = position.coords.latitude;
           
            
            
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = proxy + "https://api.darksky.net/forecast/e75ed165e1cd8192e50424e97b9a6948/" + lati + "," + longi;

            fetch(api)
            .then( response =>{
                return response.json();
            })
            .then(data =>{
                
                const {temperature, summary, pressure, icon } = data.currently;

                let celsius = (temperature -32) * (5)/(9);
                temperatureDegree.textContent = Math.floor(celsius); 
                temperatureDescription.textContent = summary;
                pressureLevel.textContent = pressure + " mb";
                locationTimezone.textContent = data.timezone;
                degree.textContent="C";

                setIcons(icon, document.querySelector('.icon'));

                
            });
        });

    }
  
    function setIcons(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
  
});

document.getElementById("wantedLoca").addEventListener('click', ()=> {
    
    if(document.getElementById("loong").value=="" || document.getElementById("latit").value==""){
        alert("Please enter correct longitude and latitude.");
        
    }
    else{

let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let pressureLevel = document.querySelector('.pressure-level');
let degree = document.querySelector('.temperature span');

        lati = document.getElementById("loong").value;
        longi = document.getElementById("latit").value;
       
        
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = proxy + "https://api.darksky.net/forecast/e75ed165e1cd8192e50424e97b9a6948/" + lati + "," + longi;

        fetch(api)
        .then( response =>{
            return response.json();
        })
        .then(data =>{
            
            const {temperature, summary, pressure, icon } = data.currently;

            let celsius = (temperature -32) * (5)/(9);
            temperatureDegree.textContent = Math.floor(celsius); 
            temperatureDescription.textContent = summary;
            pressureLevel.textContent = pressure + "mb";
            locationTimezone.textContent = data.timezone;
            degree.textContent="C";

            setIcons(icon, document.querySelector('.icon'));

            
        });
    



        function setIcons(icon,iconID){
            const skycons = new Skycons({color:"white"});
            const currentIcon = icon.replace(/-/g,"_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }
    }
    });

