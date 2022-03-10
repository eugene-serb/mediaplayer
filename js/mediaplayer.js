/* ----------- */
/* MEDIAPLAYER */
/* ----------- */

document.querySelector('#play').onclick = play;
document.querySelector('#pause').onclick = pause;
document.querySelector('#stop').onclick = stop;
document.querySelector('#speed-up').onclick = speedUp;
document.querySelector('#speed-down').onclick = speedDown;
document.querySelector('#speed-normal').onclick = speedNormal;
document.querySelector('#volume').oninput = videoVolume;

const VIDEO = document.querySelector('.mediaplayer');
const PROGRESS = document.querySelector('.progress');

VIDEO.ontimeupdate = progressUpdate;
PROGRESS.onclick = videoRewind;

function play() {
    VIDEO.play();
};

function pause() {
    VIDEO.pause();
};

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

