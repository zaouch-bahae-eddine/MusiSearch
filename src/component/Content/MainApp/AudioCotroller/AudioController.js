import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Component } from 'react';
import style from './AudioController.module.css';

class AudioController extends Component {

    audio = new Audio(this.props.url);
    state = {
        played: false,
        volume: 0.2,
    }
    toggelPlayed = ()=>{
        this.setState((prevState)=>{
            return {played: !prevState.played};
        })
    };
    switchPlay = () => {
        this.toggelPlayed();
        this.audio.paused? this.audio.play() : this.audio.pause();
    }
    nextAudio = ()=>{
        this.audio.pause();
        delete this.audio;
        this.audio = new Audio(this.props.url);
        this.props.next();
        this.setState({played: false});
    };
    previousAudio = ()=>{
        this.audio.pause();
        delete this.audio;
        this.audio = new Audio(this.props.url);
        this.props.previous();
        this.setState({played: false});
    };
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
        if(nextProps.url.localeCompare(this.props.url) != 0 || this.state.played != nextState.played ){
            return true;
        }
        else {
            console.log('not update');
            return false;
        }
    }
    componentDidUpdate(){
        this.audio.addEventListener('ended', this.setState(()=>{
            return {played: false};
        }));
    }
    render(){
        this.audio.volume = 0.01;
        return (
            <div className={style.AudioContainer}>
                <div className={style.AudioButtonControl}>
                    <div className={style.Previose} onClick={()=>{this.previousAudio();}}>previose</div>
                    <div className={style.PlayPause} 
                    onClick={()=>this.switchPlay()}>
                        {!this.state.played? "Play" : "Pause"}
                    </div>
                    <div className={style.Next} onClick={()=>this.nextAudio()}>next</div>
                    <div className={style.currentTime}>{this.audio.currentTime}</div>
                </div>
            </div>
        );
    }
    
}

export default AudioController;
