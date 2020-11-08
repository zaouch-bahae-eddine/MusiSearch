import { faLessThanEqual, faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Component } from 'react';
import style from './AudioController.module.css';

class AudioController extends Component {

    constructor(props){
        super(props);
        this.state = {
            played: false,
            volume: 0.2,
            currentTime: 0,
            duration: 0,
        };
        this.timeTrigger = null;
        this.audio = new Audio(this.props.url);
        this.audio.preload = "metadata";
        this.audio.addEventListener('loadedmetadata', ()=>{
            console.log(this.audio.duration)
            this.setState({duration: this.audio.duration});
        });
    }


    switchPlay = () => {
        this.setState((prevState)=>{
            return {played: !prevState.played};
        });
        if(this.audio.paused){
            this.audio.play();
            this.startTimeReading();
        }
        else {
            this.audio.pause();
            this.stopTimeReading();
        }
    }

    nextAudio = ()=>{
        this.audio.pause();
        this.props.next();
        this.setState({played: false, duration: this.audio.duration});
    };
    previousAudio = ()=>{
        this.audio.pause();
        this.props.previous();
        this.setState({played: false, duration: this.audio.duration});
    };
    startTimeReading = ()=>{
        this.timeTrigger = setInterval(()=>this.setState({currentTime: this.audio.currentTime}), 1000);
    }
    stopTimeReading = ()=>{
        clearInterval(this.timeTrigger);
    }
    formatTime = (time) => {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        return min + ':' + ((sec<10) ? ('0' + sec) : sec);
      }
    componentDidMount() {

        this.audio.addEventListener('ended', this.setState(()=>{
            return {played: false};
        }));

    }
    componentWillUnmount(){
        this.audio.removeEventListener('ended', this.setState(()=>{
            return {played: false};
        }));
    }

    shouldComponentUpdate(nextProps, nextState){
        const urlCompoared = nextProps.url.localeCompare(this.props.url);
        if( urlCompoared != 0 ){
            this.audio.pause();
            delete this.audio;
            this.audio = new Audio(nextProps.url);
        }
        
        if( urlCompoared != 0 || 
        this.state.played != nextState.played || 
        this.state.currentTime != nextState.currentTime ||
        this.state.duration != nextState.duration
        )
        {
            return true;
        }
        else {
            return false;
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.url.localeCompare(this.props.url) != 0 ){
            this.audio.addEventListener('ended', this.setState(()=>{
                return {played: false};
            }));
        }
    }
    
    render(){

        console.log('render22');
        return (
            <div className={style.AudioContainer}>
                <div className={style.AudioButtonControl}>
                    <div className={style.Previose} onClick={()=>{this.previousAudio()}}>previose</div>
                    <div className={style.PlayPause} 
                    onClick={()=>{this.switchPlay()}}>
                        {!this.state.played? "Play" : "Pause"}
                    </div>
                    <div className={style.Next} onClick={()=>{this.nextAudio()}}>next</div>
                    <div className={style.currentTime}>{this.formatTime(this.state.currentTime)}</div>
                    <div className={style.duration}>{this.formatTime(this.state.duration)}</div>
                </div>
            </div>
        );
    }
    
}

export default AudioController;
