import React from 'react';
import style from './AudioController.module.css';
const OnOffAudio = (audio,play) => {
    if(play){
        audio.play();
        alert('play');
    }
    else {
        audio.pause();
        alert('stop');
    }
}
const AudioController = (props) => {
    const audio = new Audio(props.urlMusic);
    console.log('hi',audio);
    return (
        <div className={style.AudioContainer}>
            <div className={style.AudioButtonControl}>
                <div className={style.Previose}>previose</div>
                <div className={style.PlayPause} onClick={()=>{props.toggelPlay(); OnOffAudio(audio, props.play);} }>{!props.play? "Play" : "Pause"}</div>
                <div className={style.PlayPause}>next</div>
            </div>
            
        </div>
    )
}

export default AudioController;
