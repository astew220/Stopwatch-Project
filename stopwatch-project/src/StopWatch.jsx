import React, {useState, useEffect, useRef} from 'react';

function StopWatch(){

const [isRunning, setIsRunning] = useState(false);
const [elapsedTime, setElapsedTime] = useState(0);
const intervalIdRef = useRef(null);
const startTimeRef = useRef(0);

useEffect(()=> {
 if(isRunning){
    intervalIdRef.current = setInterval(()=> {
        setElapsedTime(Date.now() - startTimeRef.current)
    },10)
 }
 return ()=>{
    clearInterval(intervalIdRef.current)
 }
},[isRunning])

function start(){
 setIsRunning(true);
 startTimeRef.current = Date.now() - elapsedTime
}

function stop(){
 setIsRunning(false)
}

function reset(){
 setElapsedTime(0);
 isRunning(false)
}

function formatTime(){

let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
let seconds = Math.floor(elapsedTime / (1000 % 60));
let milliseconds = Math.floor((elapsedTime % 1000) / 10)

hours = String(hours).padStart(2, "0")
minutes = String(minutes).padStart(2, "0")
seconds = String(seconds).padStart(2, "0")
milliseconds = String(milliseconds).padStart(2, "0")

  return `${hours}:${minutes}:${seconds}:${milliseconds}`

}

return (
    <div className="stopWatch">
 <div className="display">{formatTime()}</div>
 <div className="controls">
    <button onClick={start} className="start-button">START</button>
    <button onClick={stop} className="stop-button">STOP</button>
    <button onClick={reset} className="reset-button">RESET</button>
 </div>
    </div>
)

}

export default StopWatch;