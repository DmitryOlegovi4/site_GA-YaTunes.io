import {addZero} from "./supScript.js";

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoBtnPlay = document.querySelector('.video-button__play');
    const videoBtnStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoFullscreen = document.querySelector('.video-fullscreen');
    const volumeOff = document.querySelector('.video-volume-off');
    const volumeUp = document.querySelector('.video-volume-up');
    let temp;

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoBtnPlay.classList.remove('fa-pause');
            videoBtnPlay.classList.add('fa-play');
        } else {
            videoBtnPlay.classList.add('fa-pause');
            videoBtnPlay.classList.remove('fa-play');
        }
    }
    const togglePlay = (e) => {
        e.preventDefault();
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
    const opacityVolume = () => {
        if (!videoPlayer.volume) {
            videoVolume.style.opacity = '0.5';
        } else {
            videoVolume.style.opacity = '1';
        }
    }
    const changeVolume = () => {
        videoPlayer.muted = false;
        const value = videoVolume.value;
        videoPlayer.volume = value / 100;
        opacityVolume();
    }
    const changeVolumeOff = () => {
        videoPlayer.muted = false;
        if (videoPlayer.volume !== 0) {
            temp = videoPlayer.volume;
            videoPlayer.volume = 0;
        } else {
            videoPlayer.volume = temp;
        }
        opacityVolume();
    }
    const changeVolumeMax = () => {
        videoPlayer.muted = false;
        if (videoPlayer.volume !== 1) {
            temp = videoPlayer.volume;
            videoPlayer.volume = 1;
        } else {
            videoPlayer.volume = temp;
        }
    }

    videoPlayer.addEventListener('click', togglePlay);
    videoBtnPlay.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);
    videoBtnStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;
        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);
        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);
        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
        videoProgress.value = (currentTime / duration) * 100;
    });
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        videoPlayer.currentTime = value * duration / 100;
    })
    videoVolume.addEventListener('input', changeVolume);
    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });
    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = videoPlayer.volume * 100;
        opacityVolume();
        if (videoPlayer.muted) {
            videoVolume.value = 0;
            videoVolume.style.opacity = '0.5';
        }
    });
    volumeOff.addEventListener('click', changeVolumeOff);
    volumeUp.addEventListener('click', changeVolumeMax);

    changeVolume();


    const playerBtn = document.querySelectorAll('.player-btn');
    playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
        videoPlayer.pause();
        })
    );

}

