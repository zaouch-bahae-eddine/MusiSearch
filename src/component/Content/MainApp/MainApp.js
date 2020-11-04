import React, { Component } from 'react'
import AudioController from './AudioCotroller/AudioController'
class MainApp extends Component {
    state={
        audios: [
            {
                id:"id-m-1",
                title:"Darck Silence",
                url:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3",
                img:"https://instagram.fcdg1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120845218_150086493444404_1330499283871454531_n.jpg?_nc_ht=instagram.fcdg1-1.fna.fbcdn.net&_nc_ohc=3JtXpoXt_wIAX8oeKjg&oh=d76f59e1260bb45d3873ad71e9523367&oe=5FC97CCF",
                artist:"bahae-eddine zaouch",
                albom:"albom: tyarra",
            },
            {
                id:"id-m-2",
                title:"Darck Silence",
                url:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3",
                img:"https://instagram.fcdg1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120845218_150086493444404_1330499283871454531_n.jpg?_nc_ht=instagram.fcdg1-1.fna.fbcdn.net&_nc_ohc=3JtXpoXt_wIAX8oeKjg&oh=d76f59e1260bb45d3873ad71e9523367&oe=5FC97CCF",
                artist:"bahae-eddine zaouch",
                albom:"albom: tyarra",
            },
            {
                id:"id-m-1",
                title:"Darck Silence",
                url:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3",
                img:"https://instagram.fcdg1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/120845218_150086493444404_1330499283871454531_n.jpg?_nc_ht=instagram.fcdg1-1.fna.fbcdn.net&_nc_ohc=3JtXpoXt_wIAX8oeKjg&oh=d76f59e1260bb45d3873ad71e9523367&oe=5FC97CCF",
                artist:"bahae-eddine zaouch",
                albom:"albom: tyarra",
            },
        ],
        play: false,
    }
    toggelPlay = ()=>{
        this.setState((preState)=>{
            return {play: !preState.play}
        });
    }
    render() {
        return (
            <div>
                <AudioController 
                title={this.state.audios[0].title} 
                urlMusic={this.state.audios[0].url} 
                imgMusic={this.state.audios[0].title} 
                artist={this.state.audios[0].url} 
                albom={this.state.audios[0].albom}
                toggelPlay = {this.toggelPlay}
                play = {this.state.play}
                />
            </div>
        )
    }
}
export default MainApp;