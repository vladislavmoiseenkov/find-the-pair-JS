function renderScoreTable(size) {
    if(!size) {
        size = 36;
    }
    
    var area;

    if(+size === 36) {
        if(localStorage.scoreSmallArea !== undefined) {
            area = localStorage.scoreSmallArea.split(';');
        } else {
            area = 0;
        }
    } else if(+size === 64) {
        if(localStorage.scoreMediumArea) {
            area = localStorage.scoreMediumArea.split(';');
        } else {
            area = 0;
        }
    } else if(+size === 100) {
        if(localStorage.scoreLargeArea) {
            area = localStorage.scoreLargeArea.split(';');
        } else {
            area = 0;
        }
    } else if(+size === 144) {
        if(localStorage.scoreExtraLargeArea) {
            area = localStorage.scoreExtraLargeArea.split(';');
        } else {
            area = 0;
        }
    }

    var areaEl = document.getElementById('size' + size);
    var array = [];
    var tableBody = document.getElementById('table-body');

    while(areaEl.firstChild) {
        areaEl.removeChild(areaEl.firstChild);
    }

    for(var k = 0; k < tableBody.children.length; k++) {
        tableBody.children[k].style.display = 'none';
    }

    for(var i = 0; i < area.length; i++) {
        if(area[i] !== '') {
            array.push(JSON.parse(area[i]));
        } else {
            area.splice(i, 1);
        }
    }

    array.sort(function (a, b) {
        if(a.score < b.score) {
            return 1;
        }
        if(a.score > b.score) {
            return -1;
        }
        return 0;
    });

    document.getElementById('size'+size).style.display = 'block';

    for(var j = 0; j < array.length; j++) {
        var tableRow = document.createElement('div'),
            nameEl = document.createElement('div'),
            scoreEl = document.createElement('div'),
            timeEl = document.createElement('div');

        tableRow.className = 'table-row';

        nameEl.innerHTML = array[j].name;
        scoreEl.innerHTML = array[j].score;
        timeEl.innerHTML = array[j].time;

        tableRow.appendChild(nameEl);
        tableRow.appendChild(scoreEl);
        tableRow.appendChild(timeEl);

        areaEl.appendChild(tableRow);
    }
}

renderScoreTable();