/* ----------- */
/* MEDIAPLAYER */
/* ----------- */

const VIDEO = document.querySelector('.video');
const PROGRESS = document.querySelector('.progress');
const START_BUTTON = document.querySelector('#play');
const STOP_BUTTON = document.querySelector('#stop');
const SOUND_BUTTON = document.querySelector('#sound');
const VOLUME = document.querySelector('#volume');
const MEDIAPLAYER = document.querySelector('.player');
const FULLSCREEN_BUTTON = document.querySelector('#fullscreen');
const LOOP_BUTTON = document.querySelector('#loop');
const MOTION = document.querySelector('#motion');
const MOTION_MENU = document.querySelector('.motion-menu');
const MOTION_BUTTONS = document.querySelectorAll('.speed-buttons');
const TIME = document.querySelector('.time');

/* ----- */
/* TIMER */
/* ----- */

class Timer {
    constructor() {
        this.currentTime = '00:00';
        this.durationTime = '00:00';
        this._draw();
    };

    update = (current, duration) => {
        this.currentTime = this._calculate(current);
        this.durationTime = this._calculate(duration);
        this._draw();
    };

    _draw = () => {
        TIME.innerText = `${this.currentTime} / ${this.durationTime}`;
    };

    _calculate = (time) => {
        let seconds = Math.floor(time);
        let minutes = 0;

        if (seconds >= 60) {
            minutes = Math.floor(seconds / 60);
            seconds = seconds - (minutes * 60);
        };

        minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
        seconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;

        return `${minutes}:${seconds}`;
    };
};

/* ------ */
/* PLAYER */
/* ------ */

let timer = new Timer();

VIDEO.addEventListener('timeupdate', () => {
    PROGRESS.value = 100 * VIDEO.currentTime / VIDEO.duration;
    timer.update(VIDEO.currentTime, VIDEO.duration);

    if (!VIDEO.loop) {
        if (VIDEO.currentTime === VIDEO.duration) {
            setPlay();
        };
    };
});

PROGRESS.addEventListener('click', () => {
    let width = PROGRESS.offsetWidth;
    let offset = event.offsetX;

    PROGRESS.value = 100 * offset / width;
    VIDEO.currentTime = VIDEO.duration * offset / width;
});

/**/

setPlay = () => {
    START_BUTTON.classList.remove('control_pause');
    START_BUTTON.classList.add('control_play');
};

setPause = () => {
    START_BUTTON.classList.remove('control_play');
    START_BUTTON.classList.add('control_pause');
};

swapPlayPause = () => {
    if (START_BUTTON.classList.contains('control_play')) {
        setPause();
    } else if (START_BUTTON.classList.contains('control_pause')) {
        setPlay();
    };
};

START_BUTTON.addEventListener('click', () => {
    swapPlayPause();

    if (VIDEO.paused) {
        VIDEO.play();
    } else {
        VIDEO.pause();
    };
});

/**/

STOP_BUTTON.addEventListener('click', () => {
    VIDEO.pause();
    VIDEO.currentTime = 0;
    setPlay();
});

SOUND_BUTTON.addEventListener('click', () => {
    if (VIDEO.muted) {
        SOUND_BUTTON.classList.remove('control_sound-muted');
        SOUND_BUTTON.classList.add('control_sound');
        VIDEO.muted = false;
    } else {
        SOUND_BUTTON.classList.remove('control_sound');
        SOUND_BUTTON.classList.add('control_sound-muted');
        VIDEO.muted = true;
    };
});

VOLUME.addEventListener('input', () => {
    let volume = VOLUME.value;
    VIDEO.volume = volume / 100;
});

FULLSCREEN.addEventListener('click', () => {
    if (FULLSCREEN_BUTTON.classList.contains('control_fullscreen')) {
        FULLSCREEN_BUTTON.classList.remove('control_fullscreen');
        FULLSCREEN_BUTTON.classList.add('control_fullscreen-exit');
        MEDIAPLAYER.requestFullscreen();
    } else if (FULLSCREEN_BUTTON.classList.contains('control_fullscreen-exit')) {
        FULLSCREEN_BUTTON.classList.remove('control_fullscreen-exit');
        FULLSCREEN_BUTTON.classList.add('control_fullscreen');
        document.exitFullscreen();
    };
});

LOOP_BUTTON.addEventListener('click', () => {
    if (VIDEO.hasAttribute('loop')) {
        VIDEO.removeAttribute('loop', '');
    } else {
        VIDEO.setAttribute('loop', '');
    };
});

MOTION.addEventListener('click', () => {
    if (MOTION_MENU.classList.contains('hidden')) {
        MOTION_MENU.classList.remove('hidden');
    } else {
        MOTION_MENU.classList.add('hidden');
    };
});

MOTION_BUTTONS.forEach((item) => {
    item.addEventListener('click', () => {
        let speed = item.getAttribute('speed');

        VIDEO.play();
        VIDEO.playbackRate = speed;
    });
});

