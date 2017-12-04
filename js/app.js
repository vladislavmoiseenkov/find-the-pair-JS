var Game = {
    SMALL: 6,
    MEDIUM: 8,
    LARGE: 10,
    EXTRA_LARGE: 12,
    stepCounter: 0,

    area: [],
    openCellArea: [],

    scoreSmall: 0 || localStorage.scoreSmall,
    scoreMedium: 0 || localStorage.scoreMedium,
    scoreLarge: 0 || localStorage.scoreLarge,
    scoreExtraLarge: 0 || localStorage.scoreExtraLarge,

    startGame: 0,

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

    stopWatch: function() {

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

    delegateEvents: function () {
        var self = this;
        for( var i = 0; i < this.size * this.size; i++ ) {
            document.getElementsByClassName('flex-element')[i].addEventListener('click', function () {
                var x = this.getAttribute('data-row'),
                    y = this.getAttribute('data-col');

                self.openCell(x, y);
            });
        }
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
                this.stepCounter++;
                this.checkCountEmptyCell();
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
        } else {

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
            alert('You win');
        }
    },

    getAreaSize: function () {
        return prompt('Укажите размер поля! ( 6, 8, 10, 12 )', '6');
    },

    start: function () {
        var self = this;
        this.generateArea();
        this.setIcons();
        setTimeout(function () {
            self.closeAll();
        }, 2000);
        this.delegateEvents();
    }
};

Game.start();