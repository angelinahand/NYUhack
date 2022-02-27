import React, { Component } from "react";
import {Howl} from "howler";
import MusicBtn from "./MusicBtn";
import './App.css';


const audioClips =[
{sound: "http://www.musica-ferrum.com/downloads/easybeans/A%20Dream%20of%20Summer.mp3"}
]

class Music extends Component{

    soundPlay = (src) =>{
        const sound = new Howl({
            src,
            html5: true
        })
        sound.play();
    }

    RenderButtonSound = () =>{
        return audioClips.map((soundObj, index)=>{
            return(
                <MusicBtn key={index} onClick={() => this.soundPlay(soundObj.sound)}/>
            );
        })
    }

    render(){
    return(
        <div className="music">
            {this.RenderButtonSound()}
            <h2 className="songDec">A Dream Of Summer</h2>
        </div>
    );}


}

export default Music;