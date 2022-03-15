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

/**/

VIDEO.ontimeupdate = () => {
    PROGRESS.value = 100 * VIDEO.currentTime / VIDEO.duration;
};

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

/**/

document.querySelector('#speed-up').onclick = speedUp;
document.querySelector('#speed-down').onclick = speedDown;
document.querySelector('#speed-normal').onclick = speedNormal;

function speedUp() {
    VIDEO.play()
    VIDEO.playbackRate = 1.5;
};

function speedDown() {
    VIDEO.play()
    VIDEO.playbackRate = 0.5;
};

function speedNormal() {
    VIDEO.play()
    VIDEO.playbackRate = 1;
};

