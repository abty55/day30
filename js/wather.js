const weatherUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current=weather_code";

const drizzle = [51, 53, 56, 57, 59]; //霧雨
const rain = [61,, 63, 65, 66, 67]; //雨
const passingShower = [80, 81, 82]; //にわか雨
const thunderStorm = [95, 96, 99]; //雷雨


export async function fetchWeather() {
    try {
        const responce = await fetch(weatherUrl);
         
        if (!responce.ok){
            throw new Error("HTTPエラー");
        }

        const weatherData = await responce.json();
        const weatherCode = weatherData.current.weather_code;
        console.log(`return${convertWeatherCode(weatherCode)}`);
        return convertWeatherCode(weatherCode);
    } catch(error){
        console.log("取得に失敗しました");
        console.log(error);
        return "取得失敗";
    }
}

function convertWeatherCode(code){
    console.log(code);
    if (code === 0){
        return "快晴";
    }
    if (code >= 1 && code <= 3){
        return "曇り";
    }
    if (drizzle.includes(code)){
        return "霧雨";
    }
    if(rain.includes(code)){
        return "雨";
    }
    if(passingShower.includes(code)){
        return "にわか雨";
    }
    if(thunderStorm.includes(code)){
        return "雷雨";
    }
    return "不明";
}