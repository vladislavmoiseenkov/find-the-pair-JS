var Game = {
    SMALL: 6,
    MEDIUM: 8,
    LARGE: 10,
    EXTRA_LARGE: 12,

    stepCounter: 0,

    area: [],
    openCellArea: [],

    startGame: false,
    pause: false,

    minutesEl: document.getElementById('minutes'),
    secondsEl: document.getElementById('seconds'),
    millisecondsEl: document.getElementById('milliseconds'),
    stepsEl: document.getElementById('steps'),
    playPauseBTN: document.getElementById('play-pause'),

    timerId: 0,
    milliseconds: 0,
    seconds: 0,
    minutes: 0,

    size: null,
    openCellCounter: 0,
    checkCountEmptyCellId: null,

    icons: [
        'fa-telegram',
        'fa-paper-plane',
        'fa-puzzle-piece',
        'fa-truck',
        'fa-wifi',
        'fa-wrench',
        'fa-signal',
        'fa-space-shuttle',
        'fa-btc',
        'fa-eur',
        'fa-usd',
        'fa-youtube-play',
        'fa-css3',
        'fa-html5',
        'fa-instagram',
        'fa-jsfiddle',
        'fa-linkedin',
        'fa-vk',
        'fa-car',
        'fa-bomb',
        'fa-camera',
        'fa-rss',
        'fa-hashtag',
        'fa-pinterest',
        'fa-opera',
        'fa-stack-overflow',
        'fa-skype',
        'fa-vine',
        'fa-twitter',
        'fa-whatsapp',
        'fa-windows',
        'fa-soundcloud',
        'fa-google-plus',
        'fa-git-square',
        'fa-free-code-camp',
        'fa-cc-visa',
        'fa-chrome',
        'fa-apple',
        'fa-android',
        'fa-amazon',
        'fa-500px',
        'fa-fort-awesome',
        'fa-bicycle',
        'fa-thumbs-o-up',
        'fa-video-camera',
        'fa-television',
        'fa-address-book-o',
        'fa-bell',
        'fa-battery-quarter',
        'fa-bolt',
        'fa-bomb',
        'fa-anchor',
        'fa-code',
        'fa-cogs',
        'fa-coffee',
        'fa-credit-card',
        'fa-cube',
        'fa-database',
        'fa-diamond',
        'fa-line-chart',
        'fa-laptop',
        'fa-picture-o',
        'fa-map-marker',
        'fa-puzzle-piece',
        'fa-refresh',
        'fa-reply',
        'fa-star',
        'fa-podcast',
        'fa-trash',
        'fa-toggle-on',
        'fa-university',
        'fa-snowflake-o'
    ],

    container: document.getElementById('container'),

    generateArea: function () {
        this.size = +this.getAreaSize();

        switch (this.size) {
            case this.SMALL:
                this.renderAreaView(this.SMALL);
                break;
            case this.MEDIUM:
                this.renderAreaView(this.MEDIUM);
                break;
            case this.LARGE:
                this.renderAreaView(this.LARGE);
                break;
            case this.EXTRA_LARGE:
                this.renderAreaView(this.EXTRA_LARGE);
                break;
            default:
                this.renderAreaView(this.SMALL);
                this.size = this.SMALL;
                break;
        }

    },

    setIcons: function () {
        function randomValue( min, max ) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return Math.abs(rand);
        }

        var self = this;
        var positionsArray = [];
        var counter = 0, iconCounter = 0;

        for( var i = 0; i < +this.size; i++ ) {
            for( var j = 0; j < this.size; j++ ) {
                positionsArray[counter] = {
                    x: i,
                    y: j
                };
                counter++;
            }
        }

        var count = 0;
        while (positionsArray.length > 0) {

            var position = randomValue(0, positionsArray.length - 1);

            var flexElement = document.querySelector('.flex-element[data-row="' + positionsArray[position].x + '"][data-col="' + positionsArray[position].y + '"]' );
            var icon = document.createElement('i');

            icon.className = 'fa fa-2x ' +  this.icons[iconCounter];

            self.area[ positionsArray[position].x ][ positionsArray[position].y ].value = this.icons[iconCounter];
            self.area[positionsArray[position].x][positionsArray[position].y].isOpen = true;

            flexElement.appendChild(icon);
            positionsArray.splice(position, 1);

            if (count % 2 !== 0) {
                iconCounter++;
            }

            count++;
        }
    },

    startTimer: function() {
        var self = this;
        clearInterval(this.timerId);
        this.timerId = setInterval(function () {
            self.milliseconds++;

            if (self.milliseconds > 99) {
                self.seconds++;
                self.secondsEl.innerHTML = "0" + self.seconds;
                self.milliseconds = 0;
            }

            if (self.seconds > 9){
                self.secondsEl.innerHTML = self.seconds;
            }

            if(self.seconds > 59) {
                self.minutes++;
                self.minutesEl.innerHTML = '0' + self.minutes;
                self.seconds = 0;
                self.secondsEl.innerHTML = '0' + 0;
            }

            if(self.minutes > 9) {
                self.minutesEl.innerHTML = self.minutes;
            }
        }, 10);
    },

    stopTimer: function () {
        clearInterval(this.timerId);
    },

    renderAreaView: function( size ) {
        var _size = +size;

        var _area = document.createElement('div');
        _area.setAttribute('id', 'area');

        for( var i = 0; i < _size; i++ ) {
            this.area[i] = [];
            var flexContainer = document.createElement('div');
            flexContainer.className = 'flex-container';
            for( var j = 0; j < _size; j++ ) {
                this.area[i][j] = {
                    isOpen: false,
                    isChecked: false
                };

                var flexElement = document.createElement('div');
                var wrapper = document.createElement('div');
                wrapper.className = 'wrapper open';
                flexElement.appendChild(wrapper);

                flexElement.className = 'flex-element';
                flexElement.setAttribute('data-row', '' + i + '');
                flexElement.setAttribute('data-col', '' + j + '');
                flexContainer.appendChild( flexElement );
            }
            _area.appendChild( flexContainer );
        }
        this.container.appendChild(_area);
    },

    playPause: function () {
        if(this.startGame) {
            this.pause = !this.pause;

            var playEl = document.createElement('i'),
                pauseEl = document.createElement('i');

            playEl.className = 'fa fa-play fa-2x';
            pauseEl.className = 'fa fa-pause fa-2x';

            if(this.pause === true) {
                while(this.playPauseBTN.children[0]) {
                    this.playPauseBTN.removeChild(this.playPauseBTN.children[0]);
                }
                this.playPauseBTN.appendChild(playEl);
                this.stopTimer();
            } else if(this.pause === false) {
                while(this.playPauseBTN.children[0]) {
                    this.playPauseBTN.removeChild(this.playPauseBTN.children[0]);
                }
                this.playPauseBTN.appendChild(pauseEl);
                this.startTimer();
            }
        }
    },

    delegateEvents: function () {
        var self = this;
        for( var i = 0; i < this.size * this.size; i++ ) {
            document.getElementsByClassName('flex-element')[i].addEventListener('click', function () {
                var x = this.getAttribute('data-row'),
                    y = this.getAttribute('data-col');

                self.openCell(x, y);
            });
        }

        this.playPauseBTN.addEventListener('click', function () {
            self.playPause();
        });
    },

    closeAll: function() {
        for(var i = 0; i < this.size; i++) {
            for(var j = 0; j < this.size; j++) {
                if(this.area[i][j].isChecked !== true) {
                    this.area[i][j].isOpen = false;
                    var classes = document.querySelector('.flex-element[data-row="' + i + '"][data-col="' + j + '"]').childNodes[0].className.split(' ');
                    for(var k = 0; k < classes.length; k++) {
                        if(classes[k] === 'open' ) {
                            classes.splice(k, 1);
                        }
                    }
                    document.querySelector('.flex-element[data-row="' + i + '"][data-col="' + j + '"]').childNodes[0].className = classes.join(' ');
                }
            }
        }
    },

    openCell: function(x, y) {
        if(!this.startGame) {
            this.startGame = true;
            this.startTimer();
        }

        if(!this.pause) {
            if( !this.checkCountEmptyCellId ) {
                var flexElement = document.querySelector('.flex-element[data-row="' + x + '"][data-col="' + y + '"]');
                var wrapperClasses = flexElement.childNodes[0].className.split(' ');
                var count = 0;

                for( var i = 0; i < wrapperClasses.length; i++ ) {
                    if( wrapperClasses[i] === 'open' ) {
                        count++;
                    }
                }

                if( count === 0 ) {
                    wrapperClasses.push('open');
                    document.querySelector('.flex-element[data-row="' + x + '"][data-col="' + y + '"]').childNodes[0].className = wrapperClasses.join(' ');
                    this.area[x][y].isOpen = true;
                    this.checkCountEmptyCell();
                }
            }
        }
    },

    checkCountEmptyCell: function () {
        var self = this;

        this.openCellArea.splice(0, 2);

        for( var i = 0; i < this.size; i++ ) {
            for( var j = 0; j < this.size; j++ ) {
                if( this.area[i][j].isOpen && !this.area[i][j].isChecked ) {
                    this.openCellCounter++;
                    this.openCellArea.push({
                        value: self.area[i][j].value,
                        x: i,
                        y: j
                    });
                }
            }
        }

        if( this.openCellCounter > 1 ) {
            this.stepCounter++;
            this.stepsEl.innerHTML = this.stepCounter;

            if( this.openCellArea[0].value === this.openCellArea[1].value ) {
                this.area[this.openCellArea[0].x][this.openCellArea[0].y].isChecked = true;
                this.area[this.openCellArea[1].x][this.openCellArea[1].y].isChecked = true;

                var firstCell = document.querySelector('.flex-element[data-row="' + this.openCellArea[0].x + '"][data-col="' + this.openCellArea[0].y + '"]');
                var secondCell = document.querySelector('.flex-element[data-row="' + this.openCellArea[1].x + '"][data-col="' + this.openCellArea[1].y + '"]');
                setTimeout(function () {
                    firstCell.className = firstCell.className + ' checked';
                    secondCell.className = secondCell.className + ' checked';
                }, 1000);


                this.openCellCounter = 0;
                this.openCellArea.splice(0, 2);

                this.checkWin();
            } else {
                this.checkCountEmptyCellId = setTimeout(function () {
                    self.closeAll();
                    self.openCellCounter = 0;
                    self.checkCountEmptyCellId = null;
                }, 1000);
            }
        }
    },

    checkWin:function () {
        var counterCheckedCell = 0;
        for(var i = 0; i < this.size; i++) {
            for(var j = 0; j < this.size; j++) {
                if(this.area[i][j].isChecked) {
                    counterCheckedCell++;
                }
            }
        }

        if(counterCheckedCell === this.size * this.size) {
            this.stopTimer();
            var score = this.countUpScore();
            alert('You win! Score ' + score);
            this.saveResult(score);
        }
    },

    countUpScore: function() {
        var ratio;
        switch (this.size) {
            case this.MEDIUM:
                ratio = 2;
                break;
            case this.LARGE:
                ratio = 4;
                break;
            case this.EXTRA_LARGE:
                ratio = 6;
                break;
            default:
                ratio = 1;
                break;
        }
        return Math.round((this.size * this.size) * 10000 * ratio / ((this.minutes * 60 + this.seconds) * this.stepCounter));
    },

    saveResult: function(score) {
        var self = this;
        var name = prompt('Введите имя', '');
        var user = {
            name: name,
            score: score,
            time: self.minutes + ':' + self.seconds
        };

        switch (this.size) {
            case this.SMALL:
                if(localStorage.scoreSmallArea) {
                    localStorage.scoreSmallArea = localStorage.scoreSmallArea + JSON.stringify(user) + ';';
                } else {
                    localStorage.scoreSmallArea = JSON.stringify(user) + ';';
                }
                break;
            case this.MEDIUM:
                if(localStorage.scoreMediumArea) {
                    localStorage.scoreMediumArea = localStorage.scoreMediumArea + JSON.stringify(user) + ';';
                } else {
                    localStorage.scoreMediumArea = JSON.stringify(user) + ';';
                }
                break;
            case this.LARGE:
                if(localStorage.scoreLargeArea) {
                    localStorage.scoreLargeArea = localStorage.scoreLargeArea + JSON.stringify(user) + ';';
                } else {
                    localStorage.scoreLargeArea = JSON.stringify(user) + ';';
                }
                break;
            case this.EXTRA_LARGE:
                if(localStorage.scoreExtraLargeArea) {
                    localStorage.scoreExtraLargeArea = localStorage.scoreExtraLargeArea + JSON.stringify(user) + ';';
                } else {
                    localStorage.scoreExtraLargeArea = JSON.stringify(user) + ';';
                }
                break;
            default:
                break;
        }
    },

    getAreaSize: function () {
        return prompt('Укажите размер поля! ( 6, 8, 10, 12 )', '6');
    },

    start: function () {
        var self = this;
        this.playPauseBTN.innerHTML = '<i class="fa fa-pause fa-2x" aria-hidden="true"></i>';
        this.generateArea();
        this.setIcons();
        setTimeout(function () {
            self.closeAll();
        }, 3000);
        this.delegateEvents();
    }
};

Game.start();