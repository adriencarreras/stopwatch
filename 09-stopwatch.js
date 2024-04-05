
const timer = document.querySelector('.js-timer');
const mainButton = document.querySelector('.js-main-btn');
const resetButton = document.querySelector('.js-reset-btn');
const loopButton = document.querySelector('.js-loop-btn');
const loopList = document.querySelector('.js-loops');
const deleteAllButton = document.querySelector('.js-delete-all-btn');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let min;
let sec;
let ms;
let displayedTime = '';
let status = 'off';
let intervalId;
let loopArray = [];

mainButton.addEventListener('click', () => startAndStop())
resetButton.addEventListener('click', () => resetTime())
deleteAllButton.addEventListener('click',() => deleteAllLoops())
loopButton.addEventListener('click', () => {
    addLoop()
    renderLoopList()
});

function startAndStop(){
    if (status === 'off'){
        runTimer();
        status = 'on';
        mainButton.innerHTML = 'Stop';
    } else if (status === 'on') {
        clearInterval(intervalId)
        status = 'off';
        mainButton.innerHTML = 'Start';
    }
}

function runTimer(){
    intervalId = setInterval(() => {
        milliseconds++;
        if (milliseconds == 100){
        seconds++;
        milliseconds = 0;
        }
        if (seconds == 60){
        minutes++;
        seconds = 0;
        } 
        displayTime()
    },1)
}

function displayTime(){
    minutesTwoDigits()
    secondsTwoDigits()
    millisecondsTwoDigits()
    displayedTime = `${min}:${sec}.${ms}`
    timer.innerHTML = displayedTime
}

function minutesTwoDigits(){
    if (minutes < 10){
        min = `0${minutes}`
    } else {
        min = `${minutes}`
    }
}

function secondsTwoDigits(){
    if (seconds < 10){
        sec = `0${seconds}`
    } else {
        sec = `${seconds}`
    }
}

function millisecondsTwoDigits(){
    if (milliseconds < 10){
        ms = `0${milliseconds}`
    } else {
        ms = `${milliseconds}`
    }
}

function resetTime(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTime();
}

function addLoop(){
    if (displayedTime != '') {
        loopArray.push(displayedTime)
        console.log(loopArray)           
    }
}

function deleteAllLoops(){
    loopArray = []
    renderLoopList()
    console.log(loopArray)
}

function renderLoopList(){
    let loopListHTML = ''
    
    for (i = 0; i < loopArray.length; i++){
    const newLoop = loopArray[i]
    const html = `
    <div class="new-loop">
        <span>${loopArray[i]}</span>
        <button class="js-delete-btn">delete</button>
    </div>`
    
    loopListHTML += html
} 
    loopList.innerHTML = loopListHTML;

    document.querySelectorAll('.js-delete-btn')
    .forEach((deleteButton, index)=>{
        deleteButton.addEventListener('click',()=>{
    loopArray.splice(index, 1);
    renderLoopList()
    console.log(loopArray)
    })
    })

    if (loopArray.length > 1){
        document.querySelector('.delete-all').classList.remove('hidden')
    } else if (loopArray.length <= 1){
        document.querySelector('.delete-all').classList.add('hidden')
    }           
}
