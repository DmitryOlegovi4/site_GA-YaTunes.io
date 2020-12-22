export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoBtnPlay = document.querySelector('.video-button__play');
    const videoBtnStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');

    const toggleIcon = () => {
        if(videoPlayer.paused){
            videoBtnPlay.classList.remove('fa-pause');
            videoBtnPlay.classList.add('fa-play');
        } else {
            videoBtnPlay.classList.add('fa-pause');
            videoBtnPlay.classList.remove('fa-play');
        }
    }
    const togglePlay = () => {
        if(videoPlayer.paused){
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }
    const stopPlay = () => {
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
    }
    const addZero = n => n < 10 ? '0' + n : n;

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
    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        videoPlayer.currentTime = value * duration / 100;
    })
}