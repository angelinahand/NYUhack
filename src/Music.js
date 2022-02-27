import React, { Component } from "react";
import {Howl} from "howler";
import ReactHowler from 'react-howler';
import MusicBtn from "./MusicBtn";
import PauseButton from "./PauseButton";
import './App.css';
import {useState} from "react";


// const audioClips =[
// {sound: "http://www.musica-ferrum.com/downloads/easybeans/A%20Dream%20of%20Summer.mp3"}
// ]

// class Music extends Component{

//     soundPlay = (src) =>{
//         const sound = new Howl({
//             src,
//             html5: true
//         })
//         sound.play();
//     }

//     RenderButtonSound = () =>{
//         return audioClips.map((soundObj, index)=>{
//             return(
//                 <MusicBtn key={index} onClick={() => this.soundPlay(soundObj.sound)}/>
//             );
//         })
//     }

//     render(){
//     return(
//         <div className="music">
//             {this.RenderButtonSound()}
//             <h2 className="songDec">A Dream Of Summer</h2>
//         </div>
//     );}


// }

// export default Music;

function Music() {

    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="music">
            <ReactHowler 
                src="http://www.musica-ferrum.com/downloads/easybeans/A%20Dream%20of%20Summer.mp3"
                loop={true}
                playing={isPlaying}
            />
            {isPlaying ? <PauseButton className="musicPause" onClick={() => setIsPlaying(!isPlaying)}/> : <MusicBtn onClick={() => setIsPlaying(!isPlaying)}/>}
           <h2 className="songDec">A Dream Of Summer</h2>
        </div>
    )
}

export default Music
