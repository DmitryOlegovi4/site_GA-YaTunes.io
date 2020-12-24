import {addZero} from "./supScript.js";

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioBtnPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playList = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[trackIndex];

        audioHeader.textContent = track.toUpperCase();
        audioImg.src = `./audio/${track}.jpg`;
        audioPlayer.src = `./audio/${track}.mp3`;

        if(isPlayed){
            audioPlayer.pause();
        } else{
            audioPlayer.play();
        }
    }
    const prevTrack = () => {
        if(trackIndex !== 0){
            trackIndex--;
        }else{
            trackIndex = playList.length - 1;
        }
        loadTrack();
    }
    const nextTrack = () => {
        if(trackIndex === playList.length - 1){
            trackIndex = 0;
        }else{
            trackIndex++;
        }
        loadTrack();
    }

    audioNavigation.addEventListener('click', e => {
        const target = e.target;
        if(target.classList.contains('audio-button__play')){
            audio.classList.toggle('play');
            audioBtnPlay.classList.toggle('fa-play');
            audioBtnPlay.classList.toggle('fa-pause');
            audioHeader.textContent = playList[trackIndex].toUpperCase();

            if(audioPlayer.paused){
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        }
        if(target.classList.contains('audio-button__prev')){
            prevTrack();
        }
        if(target.classList.contains('audio-button__next')){
            nextTrack();
        }
    })
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    })

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = currentTime / duration * 100 ;

        audioProgressTiming.style.width = progress + '%';

        let minutePassed = Math.floor(currentTime / 60) || '0';
        let secondsPassed = Math.floor(currentTime % 60) || '0';
        let minuteTotal = Math.floor(duration / 60) || '0';
        let secondsTotal = Math.floor(duration % 60) || '0';
        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    })
    audioProgress.addEventListener('click', e => {
        const x = e.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = x / allWidth * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    })

    const playerBtn = document.querySelectorAll('.player-btn');
    playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
        audioPlayer.pause();
        })
    );

}