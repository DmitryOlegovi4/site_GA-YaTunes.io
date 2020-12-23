export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');
    const audioVolume = document.querySelector('.audio-volume');
    const volumeOff = document.querySelector('.audio-volume-off');
    const volumeUp = document.querySelector('.audio-volume-up');
    let temp;

    const audio = new Audio();
    audio.type = 'audio/aac';
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
            radio.classList.add('play');
        }
    }
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }
    const changeVolume = () => {
        const value = audioVolume.value;
        audio.volume = value / 100;
    }
    const changeVolumeOff = () => {
        if (audio.volume !== 0) {
            temp = audio.volume;
            audio.volume = 0;
        } else {
            audio.volume = temp;
        }
    }
    const changeVolumeMax = () => {
        if (audio.volume !== 1) {
            temp = audio.volume;
            audio.volume = 1;
        } else {
            audio.volume = temp;
        }
    }

    radioNavigation.addEventListener('change', (e) => {
        radioStop.disabled = false;
        const target = e.target;
        const parent = target.closest('.radio-item');
        const title = parent.querySelector('.radio-name').textContent;
        const img = parent.querySelector('.radio-img').src;
        selectItem(parent);
        radioHeaderBig.textContent = title;
        radioCoverImg.src = img;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    })
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    })
    audioVolume.addEventListener('input', changeVolume);
    volumeOff.addEventListener('click', changeVolumeOff);
    volumeUp.addEventListener('click', changeVolumeMax);
    audio.addEventListener('volumechange', () => {
        audioVolume.value = audio.volume * 100;
    });

    changeVolume();
}
