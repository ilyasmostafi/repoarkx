const fs = require('fs');

const weatherData = fs.readFileSync('input.txt' , 'utf8' ,(err , data) => {
    let result ;
    err ? result = `Error : , ${err}` : result = data;
    return result;
   ;
});
const parsedData = JSON.parse(weatherData);

function selectRandomCity(cities){
    const dataLength = Object.keys(cities).length;
    const randomIndex = Math.floor(Math.random() * (dataLength - 1));
    return cities[randomIndex];
}  

const writeFile = (cityname , temperature) => { fs.writeFileSync(`${cityname}.txt` , `Temperature of ${cityname} is: ${temperature} ` );

}

async function fet(){
    try{
    const randomCityData = selectRandomCity(parsedData);
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${randomCityData.lat}&longitude=${randomCityData.lng}&current_weather=true`);
    const data = await response.json();
    const Temperature = data.current_weather.temperature + data.current_weather_units.temperature;

    if(!fs.existsSync(`${randomCityData.name}.txt`))
    {
        writeFile(randomCityData.name , Temperature);
        console.log('File created successfully');
    }else{
        fs.unlinkSync(`${randomCityData.name}.txt` );
            console.log("Deleted successfully");
            writeFile(randomCityData.name , Temperature);
            console.log('File created successfully');    
    }
    }catch(err){
        console.log("Error Fetching Data: ",err);
    }
}

fet();