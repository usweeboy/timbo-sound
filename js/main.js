// Загрузка песни, обложка и ее название.
let audioPlayer = document.querySelector('#audio_player');
let coverMusic = document.querySelector('#cover_music');
let titleSong = document.querySelector('#player_music_title');
let singerPlayer = document.querySelector('#player_music_artist');

let musicIndex = 1;

window.addEventListener('load', () => {
  loadingSong(musicIndex);
})

function loadingSong(indexNumb) {
  titleSong.innerHTML = musicList[indexNumb - 1].name;
  singerPlayer.innerHTML = musicList[indexNumb - 1].artist;
  coverMusic.src = `img/covers/${musicList[indexNumb - 1].img}.jpg`;
  audioPlayer.src = `audio/${musicList[indexNumb - 1].src}.mp3`;
  playingNow();
}

// Кнопки, функции: воспроизвести, пауза, следущующая и предыдущая песня.
let playBtn = document.querySelector('#play_btn');
let pauseBtn = document.querySelector('#pause_btn');
let nextBtn = document.querySelector('#next_btn');
let prevBtn = document.querySelector('#prev_btn');

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);
nextBtn.addEventListener('click', nextAudio);
prevBtn.addEventListener('click', prevAudio);

function playAudio() {
  audioPlayer.play()
  playBtn.style.display = 'none'
  pauseBtn.style.display = 'block'
  playingNow();
}

function pauseAudio() {
  audioPlayer.pause()
  playBtn.style.display = 'block'
  pauseBtn.style.display = 'none'
  playingNow();
}

function nextAudio() {
  musicIndex++;
  musicIndex > musicList.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadingSong(musicIndex);
  playAudio();
  playingNow();
}

function prevAudio() {
  musicIndex--;
  musicIndex < 1 ? musicIndex = musicList.length : musicIndex = musicIndex;
  loadingSong(musicIndex);
  playAudio();
  playingNow();
}

// Прогресс бар и прогресс времени.
let progressContainer = document.querySelector('#progress_music_container')
let progressBar = document.querySelector('#progress_music_bar')

audioPlayer.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  let musicCurrentTime = document.querySelector('#current_time')

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerHTML = `${currentMin}:${currentSec}`
})

progressContainer.addEventListener('click', (e) => {
  let progressWidthval = progressContainer.clientWidth;
  let clickedOffsetX = e.offsetX;
  let musicDuration = audioPlayer.duration;

  audioPlayer.currentTime = (clickedOffsetX / progressWidthval) * musicDuration;
})

// Автопроигрывание
audioPlayer.addEventListener('ended', nextAudio)

// Изменение громкости
let musicHight = document.querySelector('#music_hight');
let musicMute = document.querySelector('#music_mute');

musicHight.addEventListener('click', () => {
  musicHight.style.display = 'none'
  musicMute.style.display = 'block'
  audioPlayer.volume = 0;
});

musicMute.addEventListener('click', () => {
  musicMute.style.display = 'none'
  musicHight.style.display = 'block'
  audioPlayer.volume = 1;
});

// Добавление в избранное
let addBtn = document.querySelector('#add_btn')
let deleteBtn = document.querySelector('#delete_btn')

addBtn.addEventListener('click', () => {
  addBtn.style.display = 'none'
  deleteBtn.style.display = 'block'
})

deleteBtn.addEventListener('click', () => {
  addBtn.style.display = 'block'
  deleteBtn.style.display = 'none'
})

// // Музыкальный блок (Главная)
const mainTag = document.querySelector("#content_main");

for (let i = 0; i < musicList.length; i++) {
  let sectionMainTag = `<section class="audio_row" audio-index="${i + 1}">
                          <div class="audio_row_content_one">
                            <div class="audio_row_cover">
                              <div class="audio_cover">
                                <img src="img/covers/${musicList[i].img}.jpg" alt="" id="cover_music">
                              </div>
                              <div class="audio_row_waves" id="audio_waves">
                                <span class="audio_row_waves_stroke"></span>
                                <span class="audio_row_waves_stroke"></span>
                                <span class="audio_row_waves_stroke"></span>
                              </div>
                              <div class="audio_row_btns">
                                <img src="img/icons/play.svg" alt="" id="audio_row_play_btn" class="audio_row_play">
                                <img src="img/icons/pause.svg" alt="" id="audio_row_pause_btn" class="audio_row_pause">
                              </div>
                            </div>
                            <div class="audio_row_info">
                              <div class="musical_row_title">${musicList[i].name}</div>
                              <div class="musical_row_artist">${musicList[i].artist}</div>
                            </div>
                          </div>
                          <audio src="audio/${musicList[i].src}.mp3" class="${musicList[i].src}"></audio>
                          <div class="audio_row_content_two">
                            <div class="audio_row_adding">
                              <img src="img/icons/add-outline.svg">
                            </div>
                            <div class="audio_row_duration">
                              <p id="${musicList[i].src}">3:20</p>
                            </div>
                          </div>
                        </section>`

  mainTag.insertAdjacentHTML('beforeend', sectionMainTag);

  let sectionMainMusicDuration = mainTag.querySelector(`#${musicList[i].src}`);
  let sectionMainMusicTag = mainTag.querySelector(`.${musicList[i].src}`);

  sectionMainMusicTag.addEventListener('loadeddata', () => {
    let audioDuration = sectionMainMusicTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    };
    sectionMainMusicDuration.innerHTML = `${totalMin}:${totalSec}`;
  });
};

let allSectionMainTags = mainTag.querySelectorAll('section');
function playingNow() {
  for (let j = 0; j < allSectionMainTags.length; j++) {

    let audioWaves = allSectionMainTags[j].querySelector('#audio_waves');

    if(allSectionMainTags[j].classList.contains('music_playing')){
      allSectionMainTags[j].classList.remove('music_playing');
      audioWaves.style.display = 'none'
    };

    if (allSectionMainTags[j].getAttribute('audio-index') == musicIndex){
      allSectionMainTags[j].classList.add('music_playing');
      audioWaves.style.display = 'flex'
    };
  
    allSectionMainTags[j].setAttribute('onclick','clickedAudio(this)');
  }
}

function clickedAudio(element){
  let getSectionMainIndex = element.getAttribute('audio-index');
  musicIndex = getSectionMainIndex;
  loadingSong(musicIndex)
  playAudio();    
  playingNow();
};

// Поиск по музыке и радио.
document.querySelector('#input_search_music').oninput = function() {
  let val = this.value.trim();
  let musicItems = document.querySelectorAll('#content_main section');
  let radioItems = document.querySelectorAll('#content_radio section');
  if (val != ''){
    musicItems.forEach(function(elem){
      if (elem.innerText.search(RegExp(val,"gi")) == -1){
        elem.style.display = 'none';
      }
      else {
        elem.style.display = 'flex';
      }
    });
    radioItems.forEach(function(elem){
      if (elem.innerText.search(RegExp(val,"gi")) == -1){
        elem.style.display = 'none';
      }
      else {
        elem.style.display = 'flex';
      }
    });
  }
  else {
    musicItems.forEach(function(elem){
      elem.style.display = 'flex';
    });
    radioItems.forEach(function(elem){
      elem.style.display = 'flex';
    });
  }
}

document.querySelector('#input_content_search_music').oninput = function() {
  let val = this.value.trim();
  let musicItems = document.querySelectorAll('#content_main section');
  let radioItems = document.querySelectorAll('#content_radio section');
  if (val != ''){
    musicItems.forEach(function(elem){
      if (elem.innerText.search(RegExp(val,"gi")) == -1){
        elem.style.display = 'none';
      }
      else {
        elem.style.display = 'flex';
      }
    });
    radioItems.forEach(function(elem){
      if (elem.innerText.search(RegExp(val,"gi")) == -1){
        elem.style.display = 'none';
      }
      else {
        elem.style.display = 'flex';
      }
    });
  }
  else {
    musicItems.forEach(function(elem){
      elem.style.display = 'flex';
    });
    radioItems.forEach(function(elem){
      elem.style.display = 'flex';
    });
  }
}

// let favoriteTag = document.querySelector('#music-content-favorite');

// Меню
let navMenu = document.querySelector('#navbar_menu');
let navMenuClose = document.querySelector('#navbar_menu_close');
let navMenuContent = document.querySelector('#navbar_menu_content');

navMenu.addEventListener('click', () => {
  navMenuClose.style.display = 'block';
  navMenu.style.display = 'none';
  navMenuContent.classList.add('navbar_menu_content_show')
})

navMenuClose.addEventListener('click', () => {
  navMenu.style.display = 'block';
  navMenuClose.style.display = 'none';
  navMenuContent.classList.remove('navbar_menu_content_show')
})

// Переходы между блоками
let playerMusic = document.querySelector('#player_music');
let playerRadio = document.querySelector('#player_radio');
let contentMainTitle = document.querySelector('#content_main_title');
let contentRadioTitle = document.querySelector('#content_radio_title');
let routerToMain = document.querySelector('#router_to_main');
let routerToRadio = document.querySelector('#router_to_radio');

routerToMain.addEventListener('click', () => {
  mainTag.style.display = 'flex'
  radioTag.style.display = 'none'
  playerMusic.style.display = 'block'
  playerRadio.style.display = 'none'
  contentMainTitle.style.display = 'block'
  contentRadioTitle.style.display = 'none'
  navMenu.style.display = 'block';
  navMenuClose.style.display = 'none';
  navMenuContent.classList.remove('navbar_menu_content_show')
  radioPlayer.pause()
})

routerToRadio.addEventListener('click', () => {
  radioTag.style.display = 'flex'
  mainTag.style.display = 'none'
  playerRadio.style.display = 'block'
  playerMusic.style.display = 'none'
  contentRadioTitle.style.display = 'block'
  contentMainTitle.style.display = 'none'
  navMenu.style.display = 'block';
  navMenuClose.style.display = 'none';
  navMenuContent.classList.remove('navbar_menu_content_show')
  audioPlayer.pause()
})


 



