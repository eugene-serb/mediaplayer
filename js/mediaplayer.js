/* ----------- */
/* MEDIAPLAYER */
/* ----------- */

'use strict'

class Timer {
    constructor(container) {
        this.container = container;
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
        this.container.innerText = `${this.currentTime} / ${this.durationTime}`;
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

class Mediaplyer {
    constructor() {
        this.#configurations();
        this.#DOMs();
        this.#eventListeners();

        this.timer = new Timer(this.$TIME);
    };

    swapPlayPause = () => {
        if (this.$BUTTON_START.classList.contains('control_play')) {
            this.setPause();
        } else if (this.$BUTTON_START.classList.contains('control_pause')) {
            this.setPlay();
        };
    };
    setPlay = () => {
        this.$BUTTON_START.classList.remove('control_pause');
        this.$BUTTON_START.classList.add('control_play');
    };
    setPause = () => {
        this.$BUTTON_START.classList.remove('control_play');
        this.$BUTTON_START.classList.add('control_pause');
    };
    setFullscreen = () => {
        this.$BUTTON_FULLSCREEN.classList.remove('control_fullscreen-exit');
        this.$BUTTON_FULLSCREEN.classList.add('control_fullscreen');
    };
    unsetFullscreen = () => {
        this.$BUTTON_FULLSCREEN.classList.remove('control_fullscreen');
        this.$BUTTON_FULLSCREEN.classList.add('control_fullscreen-exit');
    };

    #configurations = () => {
    };
    #DOMs = () => {
        this.$MEDIAPLAYER = document.querySelector('.mediaplayer');
        this.$VIDEO = document.querySelector('.video');
        this.$PROGRESS = document.querySelector('.progress');
        this.$VOLUME = document.getElementById('volume');
        this.$TIME = document.querySelector('.time');

        this.$BUTTON_START = document.getElementById('play');
        this.$BUTTON_STOP = document.getElementById('stop');
        this.$BUTTON_SOUND = document.getElementById('sound');
        this.$BUTTON_FULLSCREEN = document.getElementById('fullscreen');
        this.$BUTTON_LOOP = document.getElementById('loop');

        this.$BUTTON_MOTION = document.getElementById('motion');
        this.$BUTTONS_MOTION = document.querySelectorAll('.speed-buttons');
        this.$MENU_MOTION = document.querySelector('.motion-menu');
    };
    #eventListeners = () => {
        this.$VIDEO.addEventListener('timeupdate', () => {
            this.$PROGRESS.value = 100 * this.$VIDEO.currentTime / this.$VIDEO.duration;
            this.timer.update(this.$VIDEO.currentTime, this.$VIDEO.duration);

            if (this.$VIDEO.loop === false) {
                if (this.$VIDEO.currentTime === this.$VIDEO.duration) {
                    this.setPlay();
                };
            };
        });
        this.$PROGRESS.addEventListener('click', (event) => {
            let width = this.$PROGRESS.offsetWidth;
            let offset = event.offsetX;

            this.$PROGRESS.value = 100 * (offset / width);
            this.$VIDEO.currentTime = this.$VIDEO.duration * (offset / width);
        });
        this.$VOLUME.addEventListener('input', () => {
            this.$VIDEO.volume = this.$VOLUME.value / 100;
        });
        this.$BUTTON_START.addEventListener('click', () => {
            this.swapPlayPause();

            if (this.$VIDEO.paused === true) {
                this.$VIDEO.play();
            } else {
                this.$VIDEO.pause();
            };
        });
        this.$BUTTON_STOP.addEventListener('click', () => {
            this.$VIDEO.pause();
            this.$VIDEO.currentTime = 0;
            this.setPlay();
        });
        this.$BUTTON_SOUND.addEventListener('click', () => {
            if (this.$VIDEO.muted === true) {
                this.$BUTTON_SOUND.classList.remove('control_sound-muted');
                this.$BUTTON_SOUND.classList.add('control_sound');
                this.$VIDEO.muted = false;
            } else {
                this.$BUTTON_SOUND.classList.remove('control_sound');
                this.$BUTTON_SOUND.classList.add('control_sound-muted');
                this.$VIDEO.muted = true;
            };
        });
        this.$BUTTON_LOOP.addEventListener('click', () => {
            if (this.$VIDEO.hasAttribute('loop')) {
                this.$VIDEO.removeAttribute('loop', '');
            } else {
                this.$VIDEO.setAttribute('loop', '');
            };
        });
        this.$BUTTON_MOTION.addEventListener('click', () => {
            if (this.$MENU_MOTION.classList.contains('hidden')) {
                this.$MENU_MOTION.classList.remove('hidden');
            } else {
                this.$MENU_MOTION.classList.add('hidden');
            };
        });
        this.$BUTTONS_MOTION.forEach((item) => {
            item.addEventListener('click', () => {
                this.$VIDEO.playbackRate = item.getAttribute('speed');
            });
        });
        this.$BUTTON_FULLSCREEN.addEventListener('click', () => {
            if (document.fullscreen === true) {
                document.exitFullscreen();
            } else {
                this.$MEDIAPLAYER.requestFullscreen();
            };
        });
        window.addEventListener('fullscreenchange', () => {
            if (document.fullscreen === true) {
                this.unsetFullscreen();
            } else {
                this.setFullscreen();
            };
        });
    };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const MEDIAPLAYER = new Mediaplyer();

