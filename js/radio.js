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
  radioPlayer.muted = true;
  radioPlayer.play();
  radioPlayer.muted = false;
  radioPlayer.play()
  playRadioBtn.style.display = 'none'
  pauseRadioBtn.style.display = 'block'
  coverRadio.className = 'player_radio_cover_rotation'
  playingRadioNow();
}

function pauseRadio() {
  radioPlayer.muted = true;
  radioPlayer.pause();
  radioPlayer.muted = false;
  radioPlayer.pause()
  playRadioBtn.style.display = 'block'
  pauseRadioBtn.style.display = 'none'
  coverRadio.className = 'player_radio_cover'
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
let radioMute = document.querySelector('#radio-mute');
let radioHight = document.querySelector('#radio-hight');

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
const radioTag = document.querySelector('#music-content-radio');

for (let k = 0; k < radioList.length; k++) {
  let sectionRadioTag = `
        <section class="radio_block" radio-index="${k + 1}">
          <div class="radio_content">
            <div class="radio_block_cover">
              <div class="radio_cover">
                <img src="img/covers/${radioList[k].img}.jpg" alt="" id="radio_music">
              </div>
              <div class="radio_block_waves" id="radio_waves">
                <span class="radio_block_waves_stroke"></span>
                <span class="radio_block_waves_stroke"></span>
                <span class="radio_block_waves_stroke"></span>
              </div>
              <div class="radio_block_btns">
                <img src="img/icons/play.svg" alt="" id="radio_block_play_btn" class="radio_block_play">
                <img src="img/icons/pause.svg" alt="" id="radio_block_pause_btn" class="radio_block_pause">
              </div>
            </div>
            <div class="radio_block_info">
              <div class="radio_block_title">${radioList[k].name}</div>
              <div class="radio_block_info_playing" id="radio_playing">Сейчас играет</div>
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
    let radioPlaying = allSectionRadioTags[l].querySelector('#radio_playing');

    if(allSectionRadioTags[l].classList.contains('music_playing')){
      allSectionRadioTags[l].classList.remove('music_playing');
      radioWaves.style.display = 'none'
      radioPlaying.style.display = 'none'
    };

    if (allSectionRadioTags[l].getAttribute('radio-index') == radioIndex){
      allSectionRadioTags[l].classList.add('music_playing');
      radioWaves.style.display = 'flex'
      radioPlaying.style.display = 'block'
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
