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
        };
        this.audio = new Audio(props.url);
        this.timeTrigger = null;
        this.progressBar = React.createRef();
        this.fullProgressBarPurcent = 0;
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
    nextAudio = () => {
        this.audio.pause();
        this.props.next();
        this.progressBar.current.firstElementChild.style.width = 0;
    }
    previousAudio = () => {
        this.audio.pause();
        this.props.previous();
        this.progressBar.current.firstElementChild.style.width = 0;
    }

    startTimeReading = () => {
        this.timeTrigger = setInterval(()=>{
            this.setState({currentTime: this.audio.currentTime});
        }, 1000);
    }
    stopTimeReading = () => {
        clearInterval(this.timeTrigger);
    }
    formatTime = (time) => {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        return min + ':' + ((sec<10) ? ('0' + sec) : sec);
    }


        /* DRAG AND DROP LOGIC */
    progressUpdate = (e) => {
        let progressBarWidth = this.progressBar.current.clientWidth;
        this.fullProgressBarPurcent = (((e.clientX - 15)*100) / progressBarWidth);
        this.progressBar.current.firstElementChild.style.width = this.fullProgressBarPurcent > 0 ? (this.fullProgressBarPurcent + "%") : "0" ;
    }
    timeByProgress = () => {
        return (this.audio.duration * this.fullProgressBarPurcent) / 100;
    }
    dragStart = (e) => {
        this.audio.pause();
        this.progressUpdate(e);
        this.active = true;
    }
    dragEnd = (e) => {
        this.active = false;
       // this.audio.currentTime = (this.audio.duration * this.fullProgressBarPurcent) / 100;

        this.setState((prevState)=>{
            return {currentTime: this.audio.currentTime};
        });
        if(this.state.played) {
            this.audio.play();
        }
    }
    drag = (e) => {
        if(this.active) {
            this.progressUpdate(e);
            this.setState(()=>{
                return {currentTime: this.timeByProgress()};
            });
        }
    }
        /* DRAG AND DROP LOGIC */

         /* Life cycle methodes */
         componentDidMount() {
            this.audio.preload = "metadata";
            this.audio.addEventListener('loadedmetadata', ()=>{
                console.log('eventHandler : ' + this.audio.duration);
                this.setState({duration: this.audio.duration});
            });
            this.audio.addEventListener('ended', ()=>{
                console.log('endeed:componentDidMount');
                this.setState(()=>{
                    return {played: false, currentTime: 0};
                });
                this.progressBar.current.firstElementChild.style.width = this.fullProgressBarPurcent;
            });
            this.progressBar.current.addEventListener("touchstart", this.dragStart, false);
            this.progressBar.current.addEventListener("touchend", this.dragEnd, false);
            this.progressBar.current.addEventListener("touchmove", this.drag, false);
            this.progressBar.current.addEventListener("mousedown", this.dragStart, false);
            this.progressBar.current.addEventListener("mouseup", this.dragEnd, false);
            this.progressBar.current.addEventListener("mousemove", this.drag, false);
        }
        componentWillUnmount() {
            console.log('unmount');
            this.audio.removeEventListener('loadedmetadata', ()=>{
                this.setState({duration: this.audio.duration});
            });
            this.audio.removeEventListener('ended', ()=>{
                console.log('endeed:componentWillUnmount');
                this.setState(()=>{
                    return {played: false, currentTime: 0};
                });
                this.fullProgressBarPurcent = 0;
                this.progressBar.current.firstElementChild.style.width = this.fullProgressBarPurcent;
            });
            this.progressBar.current.removeEventListener("touchstart", this.dragStart, false);
            this.progressBar.current.removeEventListener("touchend", this.dragEnd, false);
            this.progressBar.current.removeEventListener("touchmove", this.drag, false);
            this.progressBar.current.removeEventListener("mousedown", this.dragStart, false);
            this.progressBar.current.removeEventListener("mouseup", this.dragEnd, false);
            this.progressBar.current.removeEventListener("mousemove", this.drag, false);
        }
        shouldComponentUpdate(nextProps, nextState){
            if (this.props.id != nextProps.id) {
                this.audio.pause();
                this.audio = new Audio(nextProps.url);
                this.audio.preload = "metadara";
                console.log('should :' + this.audio.preload );
                return true;
            } else {
                return false;
            }
        }
            /* Life cycle methodes */
    render(){
        console.log('render - duration : ' + this.audio.duration);
        console.log('render - 2');
        console.log('url1: ' + this.props.url);
        return (
            <div className={style.AudioContainer}>
                <div className={style.AudioButtonControl}>
                    <div className={style.Previose} 
                        onClick={()=>{this.previousAudio()}}>previose</div>
                    <div className={style.PlayPause} 
                        onClick={()=>{this.switchPlay()}}>play</div>
                    <div className={style.Next} 
                        onClick={()=>{this.nextAudio()}}>next</div>
                    <div className={style.currentTime}>{this.formatTime(this.audio.currentTime)}</div>
                    <div className={style.duration}>{this.formatTime(this.audio.duration)}</div>
                </div>
                <div className={style.AudioProgress}>
                    <div className={style.AudioProgressBar} ref={this.progressBar}>
                        <div className={style.AudioProgressBarFull}></div>
                        <div className={style.Pin}></div>
                    </div>
                </div>
            </div>

        );
    }
    
}

export default AudioController;
