// we want to call this function every milli-second so we are setting the interval
setInterval(setClock, 1000);

const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minutes-hand]');
const secondHand = document.querySelector('[data-second-hand]');

function setClock(){
    const currentDate = new Date();
    const secondRatio = currentDate.getSeconds() /60;
    const minuteRatio = (secondRatio + currentDate.getMinutes() )/60;
    const handRatio = (minuteRatio+ currentDate.getHours()) /12;
    setRotation(secondHand,secondRatio );
    setRotation(minuteHand,minuteRatio );
    setRotation(hourHand,handRatio );


}

function setRotation(element, roatationRatio){
    element.style.setProperty("--rotation", roatationRatio * 360);
}

setClock();