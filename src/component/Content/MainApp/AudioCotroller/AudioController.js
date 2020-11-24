import { faLessThanEqual, faSortNumericUpAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Component } from 'react';
import style from './AudioController.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons' 
import DownloadMusic from '../../../../img/AudioControllerIcons/DownloadMusique.png'; 
import Heart from '../../../../img/AudioControllerIcons/heart.png';
import HeartFull from '../../../../img/AudioControllerIcons/heart-full.png';
import Repeat from '../../../../img/AudioControllerIcons/repeat.svg';
import Volume from '../../../../img/AudioControllerIcons/volume.svg';
import logoMusiSearch from '../../../../img/logo.png';
class AudioController extends Component {
    constructor(props){
        super(props);
        this.state = {
            played: false,
            volume: 0.5,
            currentTime: 0,
        };
        this.audio = new Audio(props.url);
        this.audio.preload = "metadata";
        this.audio.volume = this.state.volume;
        this.timeTrigger = null;
        this.fullScreenVerrou = React.createRef();
        this.progressBar = React.createRef();
        this.durationTimer = React.createRef();
        this.currentTimeTimer = React.createRef();
        this.progressBarVolume = React.createRef();
        this.VolumeVerrou = React.createRef();
        this.fullProgressBarPurcent = 0;
        this.fullProgressBarPurcentVolume = 0;
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
        this.setState(()=>{
            return {played: false};
        });
        this.props.next();
        this.progressBar.current.firstElementChild.style.width = 0;
        this.currentTimeTimer.current.innerHTML = this.formatTime(0);
    }
    previousAudio = () => {
        if(this.audio.currentTime < 3) {
            this.props.previous();
        }
        this.audio.pause();
        this.audio.currentTime = 0;
        this.progressBar.current.firstElementChild.style.width = "0%";
        this.currentTimeTimer.current.innerHTML = this.formatTime(0);
        this.setState(()=>{
            return {played: false};
        });
        
    }

    startTimeReading = () => {
        this.timeTrigger = setInterval(()=>{
            if(this.currentTimeTimer.current != null)
                this.currentTimeTimer.current.innerHTML = this.formatTime(this.audio.currentTime);
            this.fullProgressBarPurcent = (this.audio.currentTime * 100 / this.audio.duration) ;
            if(this.currentTimeTimer.current != null)
                this.progressBar.current.firstElementChild.style.width = this.fullProgressBarPurcent + "%";
        }, 100);
    }
    stopTimeReading = () => {
        clearInterval(this.timeTrigger);
    }
    formatTime = (time) => {
        if (isNaN(time))
            return '--:--';
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        return min + ':' + ((sec<10) ? ('0' + sec) : sec);
    }


        /* DRAG AND DROP LOGIC */
    progressUpdate = (e) => {
        let progressBarWidth = this.progressBar.current.clientWidth;
        if (e.type === "touchstart" || e.type === "touchmove")
            this.fullProgressBarPurcent  = (((e.touches[0].clientX - this.progressBar.current.offsetLeft - 3)*100) / progressBarWidth);
        else 
            this.fullProgressBarPurcent = (((e.clientX - this.progressBar.current.offsetLeft - 3)*100) / progressBarWidth);
        this.progressBar.current.firstElementChild.style.width = this.fullProgressBarPurcent > 0 ? (this.fullProgressBarPurcent + "%") : "0" ;
    }
    dragStart = (e) => {
        this.stopTimeReading();
        this.progressUpdate(e);
        this.audio.pause();
        this.audio.currentTime = (this.audio.duration * this.fullProgressBarPurcent) / 100;
        this.currentTimeTimer.current.innerHTML = this.formatTime(this.audio.currentTime);
        this.fullScreenVerrou.current.style.display = "block";
        this.active = true;
    }
    drag = (e) => {
        if(this.active) {
            this.progressUpdate(e);
            this.currentTimeTimer.current.innerHTML = this.formatTime(this.audio.currentTime);
            this.audio.currentTime = (this.audio.duration * this.fullProgressBarPurcent) / 100;
        }
    }
    dragEnd = (e) => {
        this.active = false;
        this.fullScreenVerrou.current.style.display = "none";
        this.audio.currentTime = (this.audio.duration * this.fullProgressBarPurcent) / 100;
        this.currentTimeTimer.current.innerHTML = this.formatTime(this.audio.currentTime);
        if(this.state.played) {
            this.audio.play();
            this.startTimeReading();
        }
    }
    /*Volume Logic */
    
    VolumeProgressUpdate = (e) => {
        let position = this.progressBarVolume.current.getBoundingClientRect();
        const raport = position.bottom - position.top;
        let postionRaport = -(e.clientY - position.bottom);
        if (postionRaport <= 0) {
            this.fullProgressBarPurcentVolume = 0;
        } else if (postionRaport >= position.top){
            this.fullProgressBarPurcentVolume = 100;
        } else {
            this.fullProgressBarPurcentVolume = postionRaport * 100 / raport;
        }
        this.progressBarVolume.current.firstElementChild.style.width = this.fullProgressBarPurcentVolume >100 ? "100%" : this.fullProgressBarPurcentVolume + "%";
        this.audio.volume = this.fullProgressBarPurcentVolume / 100 > 1? 1: this.fullProgressBarPurcentVolume / 100;
        this.setState(()=>{
            return {volume: this.audio.volume};
        });
    }
    dragStartVolume = (e) => {
       this.VolumeVerrou.current.style.display = "block";
       this.VolumeProgressUpdate(e);
        this.active = true;
    }
    dragVolume = (e) => {
        if(this.active) {
            
        console.log('position: ' + e.clientY + " offsetBottom: " + this.progressBar.current.offsetTop);
            this.VolumeProgressUpdate(e);
         }
    }
    dragEndVolume = (e) => {
        this.active = false;
        this.VolumeVerrou.current.style.display = "none";
    }
        /* DRAG AND DROP LOGIC */

         /* Life cycle methodes */
         componentDidMount() {
            this.progressBarVolume.current.firstElementChild.style.width = this.state.volume * 100 + "%";
            this.audio.addEventListener('loadedmetadata', ()=>{
                console.log('eventHandler : ' + this.audio.duration);
                this.durationTimer.current.innerHTML = this.formatTime(this.audio.duration);
            });
            this.audio.addEventListener('ended', ()=>{
                console.log('endeed:componentDidMount');
                this.setState(()=>{
                    return {played: false, currentTime: 0};
                });
                this.stopTimeReading();
                this.currentTimeTimer.current.innerHTML = this.formatTime(0);
                this.progressBar.current.firstElementChild.style.width = "0";
            });
            this.progressBar.current.addEventListener("touchstart", this.dragStart, false);
            this.progressBar.current.addEventListener("touchend", this.dragEnd, false);
            this.progressBar.current.addEventListener("touchmove", this.drag, false);
            this.progressBar.current.addEventListener("mousedown", this.dragStart, false);
            this.progressBar.current.addEventListener("mouseup", this.dragEnd, false);
            this.progressBar.current.addEventListener("mousemove", this.drag, false);
            
            this.fullScreenVerrou.current.addEventListener("touchend", this.dragEnd, false);
            this.fullScreenVerrou.current.addEventListener("touchmove", this.drag, false);
            this.fullScreenVerrou.current.addEventListener("mousemove", this.drag, false);
            this.fullScreenVerrou.current.addEventListener("mouseup", this.dragEnd, false);
            
            this.progressBarVolume.current.addEventListener("touchstart", this.dragStartVolume, false);
            this.progressBarVolume.current.addEventListener("touchend", this.dragEndVolume, false);
            this.progressBarVolume.current.addEventListener("touchmove", this.dragVolume, false);
            this.progressBarVolume.current.addEventListener("mousedown", this.dragStartVolume, false);
            this.progressBarVolume.current.addEventListener("mouseup", this.dragEndVolume, false);
            this.progressBarVolume.current.addEventListener("mousemove", this.dragVolume, false);

            this.VolumeVerrou.current.addEventListener("touchend", this.dragEndVolume, false);
            this.VolumeVerrou.current.addEventListener("touchmove", this.dragVolume, false);
            this.VolumeVerrou.current.addEventListener("mousemove", this.dragVolume, false);
            this.VolumeVerrou.current.addEventListener("mouseup", this.dragEndVolume, false);
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
            this.fullScreenVerrou.current.removeEventListener("mousemove", this.drag, false);
            this.fullScreenVerrou.current.removeEventListener("mouseup", this.dragEnd, false);
        }
        shouldComponentUpdate(nextProps, nextState){
            if (this.props.id != nextProps.id) {
                this.audio.pause();
                delete this.audio;
                this.audio = new Audio(nextProps.url);
                this.audio.preload = "metadara";
                this.audio.volume = this.state.volume;
                this.audio.addEventListener('loadedmetadata', ()=>{
                    console.log('eventHandler : ' + this.audio.duration);
                    this.durationTimer.current.innerHTML = this.formatTime(this.audio.duration);
                });
                this.audio.addEventListener('ended', ()=>{
                    this.setState(()=>{
                        return {played: false, currentTime: 0};
                    });
                    this.stopTimeReading();
                    this.currentTimeTimer.current.innerHTML = this.formatTime(0);
                    this.progressBar.current.firstElementChild.style.width = "0";
                });
                console.log('should :' + this.audio.preload );
                return true;
            } else if (this.props.played != nextState.played){
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
                <div className={style.MusicInfoContainer}>
                    <div className={style.MusicInfo}>
                        <img src={this.props.img} alt="photoMusic"/>
                        <div className={style.MusicInfoText}>
                            <div className={style.TitleMusic}>{this.props.title}</div>
                            <div className={style.Artist}>{this.props.artist}</div>
                        </div>
                    </div>
                </div>

                <div className={style.AudioControllerMain}>
                    <div className={style.AudioButtonControlContainer}>

                        <div className={style.AudioButtonFavoritDownload}>
                            <div className={style.Download}><img src={DownloadMusic} alt="DownloadMusic"/></div>
                            <div className={style.Favorit}><img src={Heart} alt="favoritSong"/></div>
                        </div>

                        <div className={style.AudioButtonControl}>
                            <div className={style.Previose} 
                                onClick={()=>{this.previousAudio()}}><FontAwesomeIcon icon={faStepBackward}/></div>
                            <div className={style.PlayPause} 
                                onClick={()=>{this.switchPlay()}}><FontAwesomeIcon icon={!this.state.played? faPlay : faPause} /></div>
                            <div className={style.Next} 
                                onClick={()=>{this.nextAudio()}}><FontAwesomeIcon icon={faStepForward}/></div>
                        </div>

                        <div className={style.AudioButtonRepeatVolume}>
                            <div className={style.Repeat}><img src={Repeat} alt="Reapeat"/></div>
                            <div className={style.VolumeVerrou} ref={this.VolumeVerrou}></div>
                            <div className={style.AudioProgressVolume}>
                                <div className={style.AudioProgressBarVolume} ref={this.progressBarVolume}>
                                    <div className={style.AudioProgressBarFullVolume}></div>
                                    <div className={style.Pin}></div>
                                </div>
                            </div>
                            <div className={style.Volume}><img src={Volume} alt="Volume"/></div>
                        </div>

                    </div>
                    <div className={style.Timers}>
                        <div className={style.currentTime} ref={this.currentTimeTimer}>{this.formatTime(this.audio.currentTime)}</div>
                        <div className={style.duration} ref={this.durationTimer}>{this.formatTime(this.audio.duration)}</div>
                    </div>

                    <div className={style.FullScreenVerrou} ref={this.fullScreenVerrou}></div>

                    <div className={style.AudioProgress}>
                        <div className={style.AudioProgressBar} ref={this.progressBar}>
                            <div className={style.AudioProgressBarFull}></div>
                            <div className={style.Pin}></div>
                        </div>
                    </div>
                </div>
                <div className={style.AudioControllerLogo}>
                    <img src={logoMusiSearch} alt="logo"/>
                </div>
            </div>

        );
    }
    
}

export default AudioController;
