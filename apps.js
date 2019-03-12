window.addEventListener('load', ()=> {

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let pressureLevel = document.querySelector('.pressure-level');
    let degree = document.querySelector('.temperature span');
    
    
    if(navigator.geolocation){
        let userLongitude = document.getElementById("loong").nodeValue;
        let userLatitude = document.getElementById("loong").nodeValue;
        navigator.geolocation.getCurrentPosition(position =>{
            
            
            longi = position.coords.longitude;
            console.log(longi);
            lati = position.coords.latitude;
            
            
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = proxy + "https://api.darksky.net/forecast/5951716312f6542a505fb5c9bccffc33/" + lati + "," + longi;

            fetch(api)
            .then( response =>{
                return response.json();
            })
            .then(data =>{
                
                const {temperature, summary, pressure, icon } = data.currently;

                let celsius = (temperature -32) * (5)/(9);
                temperatureDegree.textContent = Math.floor(celsius); 
                temperatureDescription.textContent = summary;
                pressureLevel.textContent = pressure;
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