/* ----------- */
/* MEDIAPLAYER */
/* ----------- */

const VIDEO = document.querySelector('.video');
const PROGRESS = document.querySelector('.progress');
const START = document.querySelector('#play');
const STOP = document.querySelector('#stop');
const SOUND = document.querySelector('#sound');
const VOLUME = document.querySelector('#volume');
const MEDIAPLAYER = document.querySelector('.player');
const FULLSCREEN = document.querySelector('#fullscreen');
const LOOP = document.querySelector('#loop');
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
});

PROGRESS.addEventListener('click', () => {
    let width = PROGRESS.offsetWidth;
    let offset = event.offsetX;

    PROGRESS.value = 100 * offset / width;

    VIDEO.pause();
    VIDEO.currentTime = VIDEO.duration * offset / width;
    VIDEO.play();
});

START.addEventListener('click', () => {
    if (START.classList.contains('control_play')) {
        START.classList.remove('control_play');
        START.classList.add('control_pause');
        VIDEO.play();
    } else if (START.classList.contains('control_pause')) {
        START.classList.remove('control_pause');
        START.classList.add('control_play');
        VIDEO.pause();
    };
});

STOP.addEventListener('click', () => {
    VIDEO.pause();
    VIDEO.currentTime = 0;
});

SOUND.addEventListener('click', () => {
    if (VIDEO.muted) {
        SOUND.classList.remove('control_sound-muted');
        SOUND.classList.add('control_sound');
        VIDEO.muted = false;
    } else {
        SOUND.classList.remove('control_sound');
        SOUND.classList.add('control_sound-muted');
        VIDEO.muted = true;
    };
});

VOLUME.addEventListener('input', () => {
    let volume = VOLUME.value;
    VIDEO.volume = volume / 100;
});

FULLSCREEN.addEventListener('click', () => {
    if (FULLSCREEN.classList.contains('control_fullscreen')) {
        FULLSCREEN.classList.remove('control_fullscreen');
        FULLSCREEN.classList.add('control_fullscreen-exit');
        MEDIAPLAYER.requestFullscreen();
    } else if (FULLSCREEN.classList.contains('control_fullscreen-exit')) {
        FULLSCREEN.classList.remove('control_fullscreen-exit');
        FULLSCREEN.classList.add('control_fullscreen');
        document.exitFullscreen();
    };
});

LOOP.addEventListener('click', () => {
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

