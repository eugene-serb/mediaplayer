/* ----------- */
/* MEDIAPLAYER */
/* ----------- */

document.querySelector('#stop').onclick = stop;
document.querySelector('#speed-up').onclick = speedUp;
document.querySelector('#speed-down').onclick = speedDown;
document.querySelector('#speed-normal').onclick = speedNormal;
document.querySelector('#volume').oninput = videoVolume;

const VIDEO = document.querySelector('.video');
const PROGRESS = document.querySelector('.progress');

VIDEO.ontimeupdate = progressUpdate;
PROGRESS.onclick = videoRewind;

function stop() {
    VIDEO.pause();
    VIDEO.currentTime = 0;
};

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

function videoVolume() {
    let volume = this.value;
    VIDEO.volume = volume / 100;
};

function progressUpdate() {
    PROGRESS.value = 100 * VIDEO.currentTime / VIDEO.duration;
};

function videoRewind() {
    let width = this.offsetWidth;
    let offset = event.offsetX;

    this.value = 100 * offset / width;

    VIDEO.pause();
    VIDEO.currentTime = VIDEO.duration * offset / width;
    VIDEO.play();
};

/**/

const MEDIAPLAYER = document.querySelector('.player');
const FULLSCREEN = document.querySelector('#fullscreen');

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

const LOOP = document.querySelector('#loop');

LOOP.addEventListener('click', () => {
    if (VIDEO.hasAttribute('loop')) {
        VIDEO.removeAttribute('loop', '');
    } else {
        VIDEO.setAttribute('loop', '');
    }
});

const MOTION = document.querySelector('#motion');
const MOTION_MENU = document.querySelector('.motion-menu');

MOTION.addEventListener('click', () => {
    if (MOTION_MENU.classList.contains('hidden')) {
        MOTION_MENU.classList.remove('hidden');
    } else {
        MOTION_MENU.classList.add('hidden');
    }
});

const START = document.querySelector('#play');

START.addEventListener('click', () => {

    if (START.classList.contains('control_play')) {
        START.classList.remove('control_play');
        START.classList.add('control_pause');
        VIDEO.play();
    } else if (START.classList.contains('control_pause')) {
        START.classList.remove('control_pause');
        START.classList.add('control_play');
        VIDEO.pause();
    }
});

