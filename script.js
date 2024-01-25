let numberDay=document.getElementById('numofday')
let monthToday=document.getElementById('month')
let Today=document.getElementById('Day')
let TodayLocation=document.getElementById('locationToday')
let tempToday=document.getElementById('tempo')
let textToday=document.getElementById('textt')
let imgToday=document.getElementById('imgtoday')
let humidityToday=document.getElementById('umpr')
let windToday=document.getElementById('wind')
let winddirToday=document.getElementById('windir')
let maxitemp=document.getElementsByClassName('maxtemp')
let mintemp=document.getElementsByClassName('mintemp')
let imgNext=document.getElementsByClassName('imgnext')
let textNext=document.getElementsByClassName('nexttext')
let NextDay=document.getElementsByClassName('Nextday')
let searchInput=document.getElementById('search')



async function getweather(country){
    let data= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c4820b47a9b7440fbce00159241901&q=${country}&days=3&aqi=no&alerts=no`, 
)
    
    let result= await data.json()
    return result;
    
}

function displayToday(data){

 let todayDate= new Date()
 Today.innerHTML=todayDate.toLocaleDateString("en-us" , {weekday:"long"}) 
 numberDay.innerHTML=todayDate.getDate();
 monthToday.innerHTML=todayDate.toLocaleDateString("en-us" , {month:"long"});
TodayLocation.innerHTML=data.location.name;
tempToday.innerHTML=data.current.temp_c+"Cْ";
imgToday.setAttribute("src","https//cdn.weatherapi.com/weather/64x64/night/116.png");
textToday.innerHTML=data.current.condition.text;
humidityToday.innerHTML=data.current.humidity+"%";
windToday.innerHTML=data.current.wind_kph+"km/h";
winddirToday.inert=data.current.wind_dir;
}

function displaynextday(data){
let forecastData=data.forecast.forecastday
console.log(forecastData)
for(let i=0 ; i<2 ;i++){

    let nextDate=new Date(forecastData[i+1].date)
    NextDay[i].innerHTML=nextDate.toLocaleDateString("en-us" , {weekday:"long"});
    maxitemp[i].innerHTML=forecastData[i+1].day.maxtemp_c+"Cْ";
    mintemp[i].innerHTML=forecastData[i+1].day.mintemp_c+"Cْ";
    imgNext[i].setAttribute("src",forecastData[i+1].day.condition.icon);
    textNext[i].innerHTML=forecastData[i+1].day.condition.text; 

}
}

async function callingfun(country="London"){

    let result =await getweather(country)
    if(!result.error){
        displayToday(result)
    displaynextday(result)
    }
    
}

callingfun()

searchInput.addEventListener("input", function(){
// console.log(searchInput.value)
callingfun(searchInput.value)
})