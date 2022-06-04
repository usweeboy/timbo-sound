// Загрузка радио, обложка и ее название.
let radioPlayer = document.querySelector('#radio_player');
let coverRadio = document.querySelector('#cover_radio');
let titleRadioPlayer = document.querySelector('#player_radio_title');

let radioIndex = 1;

window.addEventListener('load', () => {
  loadingRadio(radioIndex);
})

function loadingRadio(indexNumb) {
  titleRadioPlayer.innerHTML = radioList[indexNumb - 1].name;
  coverRadio.src = `img/covers/${radioList[indexNumb - 1].img}.jpg`;
  radioPlayer.src = `${radioList[indexNumb - 1].src}`;
  playingRadioNow();
}

// Кнопки, функции: воспроизвести, пауза, следущующее и предыдущее радио.
let playRadioBtn = document.querySelector('#play_radio_btn');
let pauseRadioBtn = document.querySelector('#pause_radio_btn');
let nextRadioBtn = document.querySelector('#next_radio_btn');
let prevRadioBtn = document.querySelector('#prev_radio_btn');

playRadioBtn.addEventListener('click', playRadio);
pauseRadioBtn.addEventListener('click', pauseRadio);
nextRadioBtn.addEventListener('click', nextRadio);
prevRadioBtn.addEventListener('click', prevRadio);

let isRadioPlaying = false;

radioPlayer.onplaying = () => {
  isRadioPlaying = true;
};

radioPlayer.onpause = () => {
  isRadioPlaying = false;
};

function playRadio() {
  radioPlayer.play()
  playRadioBtn.style.display = 'none'
  pauseRadioBtn.style.display = 'block'
  playingRadioNow();
}

function pauseRadio() {
  radioPlayer.pause()
  playRadioBtn.style.display = 'block'
  pauseRadioBtn.style.display = 'none'
  playingRadioNow();
}

function nextRadio() {
  radioIndex++;
  radioIndex > radioList.length ? radioIndex = 1 : radioIndex = radioIndex;
  loadingRadio(radioIndex);
  playRadio();
  playingRadioNow();
}

function prevRadio() {
  radioIndex--;
  radioIndex < 1 ? radioIndex = radioList.length : radioIndex = radioIndex;
  loadingRadio(radioIndex);
  playRadio();
  playingRadioNow();
}

// Изменение громкости
let radioMute = document.querySelector('#radio_mute');
let radioHight = document.querySelector('#radio_hight');

radioHight.addEventListener('click', () => {
  radioHight.style.display = 'none'
  radioMute.style.display = 'block'
  radioPlayer.volume = 0
})

radioMute.addEventListener('click', () => {
  radioMute.style.display = 'none'
  radioHight.style.display = 'block'
  radioPlayer.volume = 1
})

// Музыкальный блок (Радио)
const radioTag = document.querySelector('#content_radio');

for (let k = 0; k < radioList.length; k++) {
  let sectionRadioTag = `
        <section class="radio_row" radio-index="${k + 1}">
          <div class="radio_content">
            <div class="radio_row_cover">
              <div class="radio_cover">
                <img src="img/covers/${radioList[k].img}.jpg" alt="" id="radio_music">
              </div>
              <div class="radio_row_waves" id="radio_waves">
                <span class="radio_row_waves_stroke"></span>
                <span class="radio_row_waves_stroke"></span>
                <span class="radio_row_waves_stroke"></span>
              </div>
              <div class="radio_row_btns">
                <img src="img/icons/play.svg" alt="" id="radio_row_play_btn" class="radio_row_play">
                <img src="img/icons/pause.svg" alt="" id="radio_row_pause_btn" class="radio_row_pause">
              </div>
            </div>
            <div class="radio_row_info">
              <div class="radio_row_title">${radioList[k].name}</div>
            </div>
          </div>
          <audio preload="none" src="${radioList[k].src}" id="${radioList[k].indexSrc}"</audio>
        </section>`

  radioTag.insertAdjacentHTML('beforeend', sectionRadioTag);
};

let allSectionRadioTags = radioTag.querySelectorAll('section');
function playingRadioNow() {
  for (let l = 0; l < allSectionRadioTags.length; l++) {

    let radioWaves = allSectionRadioTags[l].querySelector('#radio_waves');

    if(allSectionRadioTags[l].classList.contains('music_playing')){
      allSectionRadioTags[l].classList.remove('music_playing');
      radioWaves.style.display = 'none'
    };

    if (allSectionRadioTags[l].getAttribute('radio-index') == radioIndex){
      allSectionRadioTags[l].classList.add('music_playing');
      radioWaves.style.display = 'flex'
    };
  
    allSectionRadioTags[l].setAttribute('onclick','clickedRadio(this)');
  }
}

function clickedRadio(element){
  let getSectionRadioIndex = element.getAttribute('radio-index');
  radioIndex = getSectionRadioIndex;
  loadingRadio(radioIndex)
  playRadio();    
  playingRadioNow();
};
