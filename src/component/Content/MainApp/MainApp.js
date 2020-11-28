import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserFriends, faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react'
import AudioController from './AudioCotroller/AudioController'
import style from './MainApp.module.css';
import LogoSimple from '../../../img/logoSimple.png';
import addMusicIcoon from '../../../img/AudioControllerIcons/musicalNote.png';
class MainApp extends Component {
    state={
        audios: [
            {
                id:"id-m-1",
                title:"music1",
                url:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3",
                img:"https://instagram.fcdg1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120845218_150086493444404_1330499283871454531_n.jpg?_nc_ht=instagram.fcdg1-1.fna.fbcdn.net&_nc_ohc=3JtXpoXt_wIAX8oeKjg&oh=d76f59e1260bb45d3873ad71e9523367&oe=5FC97CCF",
                artist:"SHE",
                favorit: false,
            },
            {
                id:"id-m-2",
                title:"music - 2",
                url:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3",
                img:"https://scontent-cdg2-1.cdninstagram.com/v/t51.2885-19/s150x150/118765716_321715292439166_5290411710901697183_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_ohc=_YARY42drU0AX_IkZNu&tp=1&oh=019b1c0fa02eb828f833ae4f5159f757&oe=5FE43488",
                artist:"bahae-eddine zaouch",
                favorit: true,
            },
            {
                id:"id-m-3",
                title:"music - 3",
                url:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20rockstar%20ft.%2021%20Savage%20(1).mp3",
                img:"https://instagram.fcdg1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120845218_150086493444404_1330499283871454531_n.jpg?_nc_ht=instagram.fcdg1-1.fna.fbcdn.net&_nc_ohc=3JtXpoXt_wIAX8oeKjg&oh=d76f59e1260bb45d3873ad71e9523367&oe=5FC97CCF",
                artist:"Rania - Ainar",
                favorit: true,
            },
        ],
        current: 0,
    }
    next = ()=>{
        this.setState((previousState)=>{
            if( previousState.current < previousState.audios.length - 1){
                return {current: previousState.current + 1};
            } else {
                return {current: 0};
            }
        });
    };
    previous = ()=>{
        this.setState((previousState)=>{
            if( previousState.current > 0 ){
                return {current: previousState.current - 1};
            } else {
                return {current: 0};
            }
        });
    };
    favorit = () =>{
        const tabAudio = [...this.state.audios];
        const cloneObject = {...this.state.audios[this.state.current]};
        cloneObject.favorit = !cloneObject.favorit;
        tabAudio[this.state.current] = cloneObject;
        this.setState({audios: tabAudio});
    }
    render() {
        console.log('render - 1');
        console.log('url1: ' + this.state.audios[this.state.current].url);
        return (
            <div className={style.MainAppContainer}>
                <div className={style.MainAppHeader}>
                    <div className={style.MainAppHeaderContainer}>
                        <div className={style.Header}>
                            <div className={style.triggerMenu}>
                                <FontAwesomeIcon className={style.Icon} icon={faBars}/>
                            </div>
                            <div className={style.logo}>
                                <img src={LogoSimple} alt="menu"/>
                            </div>
                            <div className={style.triggrtFrinds}>
                                <FontAwesomeIcon className={style.Icon} icon={faUserFriends}/>
                            </div>
                        </div>
                        <div className={style.searchField}>
                            <form>
                                <input type="text"/><FontAwesomeIcon icon={faSearch} className={style.searchIcon}/>
                            </form>
                        </div>
                        <div className={style.titlesContainer}>
                            <div className={style.newPostButton}><img src={addMusicIcoon} /> &nbsp; Musique</div>
                            <div className={style.titlesPost}>
                                <h3 className={style.titlePost}>Titre</h3>
                                <h3 className={style.titlePost}>Musicien</h3>
                                <h3 className={style.titlePost}>Instrument</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.MainAppBody}>
                    <div className={style.item}></div>
                    <div className={style.item}></div>
                    <div className={style.item}></div>
                </div>
                <AudioController 
                id = {this.state.audios[this.state.current].id}
                title={this.state.audios[this.state.current].title} 
                url={this.state.audios[this.state.current].url} 
                img={this.state.audios[this.state.current].img} 
                artist={this.state.audios[this.state.current].artist}
                favorit={this.state.audios[this.state.current].favorit}
                next = {this.next}
                previous = {this.previous}
                setFavorit = {this.favorit}
                />
            </div>
        )
    }
}
export default MainApp;