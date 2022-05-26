// Загрузка песни, обложка и ее название.
let audioPlayer = document.querySelector('#audio_player');
let coverMusic = document.querySelector('#cover_music');
let titleSong = document.querySelector('#player_title');
let singerPlayer = document.querySelector('#player_artist');

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
  coverMusic.className = 'player_cover_rotation'
  playingNow();
}

function pauseAudio() {
  audioPlayer.pause()
  playBtn.style.display = 'block'
  pauseBtn.style.display = 'none'
  coverMusic.className = 'player_cover'
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
let progressContainer = document.querySelector('#progress_container')
let progressBar = document.querySelector('#progress_bar')

audioPlayer.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  let musicCurrentTime = document.querySelector('#current_time')
  let musicDurationTime = document.querySelector('#duration_time')

  audioPlayer.addEventListener('loadeddata', () => {
    let audioDuration = audioPlayer.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDurationTime.innerHTML = `${totalMin}:${totalSec}`
  })

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
let volumeMute = document.querySelector('#volume-mute');
let volumeHight = document.querySelector('#volume-hight');

volumeHight.addEventListener('click', () => {
  volumeHight.style.display = 'none'
  volumeMute.style.display = 'block'
  audioPlayer.volume = 0
})

volumeMute.addEventListener('click', () => {
  volumeMute.style.display = 'none'
  volumeHight.style.display = 'block'
  audioPlayer.volume = 1
})

// Добавление в избранное
let favorite = document.querySelector('#favorite')
let favoriteFilled = document.querySelector('#favorite-filled')

favorite.addEventListener('click', () => {
  favorite.style.display = 'none'
  favoriteFilled.style.display = 'block'
})

favoriteFilled.addEventListener('click', () => {
  favorite.style.display = 'block'
  favoriteFilled.style.display = 'none'
})

// Музыкальный блок (Меню)
let navMenu = document.querySelector('#navbar_menu');
let navMenuClose = document.querySelector('#navbar_menu_close');
let navMenuContent = document.querySelector('#navbar_menu_content');

navMenu.addEventListener('click', () => {
  navMenuClose.style.display = 'block';
  navMenu.style.display = 'none';
  navMenuContent.classList.add('music_navbar_menu_content_show')
})

navMenuClose.addEventListener('click', () => {
  navMenu.style.display = 'block';
  navMenuClose.style.display = 'none';
  navMenuContent.classList.remove('music_navbar_menu_content_show')
})

// Музыкальный блок (Главная)
const mainTag = document.querySelector("#music-content-main");

for (let i = 0; i < musicList.length; i++) {
  let sectionMainTag = `
        <section class="music_block_audio" audio-index="${i + 1}">
          <div class="music_block_audio_one">
            <div class="music_block_cover">
              <div class="music_cover">
                <img src="img/covers/${musicList[i].img}.jpg" alt="" id="cover_music">
              </div>
              <div class="music_block_waves" id="music_waves">
                <span class="music_block_waves_stroke"></span>
                <span class="music_block_waves_stroke"></span>
                <span class="music_block_waves_stroke"></span>
              </div>
              <div class="music_block_btns">
                <img src="img/icons/play.svg" alt="" id="music_block_play_btn" class="music_block_play_audio">
                <img src="img/icons/pause.svg" alt="" id="music_block_pause_btn" class="music_block_pause_audio">
              </div>
            </div>
            <div class="music_block_audio_info">
              <div class="musical_block_title">${musicList[i].name}</div>
              <div class="musical_block_artist">${musicList[i].artist}</div>
            </div>
          </div>
          <audio src="audio/${musicList[i].src}.mp3" class="${musicList[i].src}"></audio>
          <div class="music_block_audio_two">
            <div class="music_block_audio_duration">
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

    let musicWaves = allSectionMainTags[j].querySelector('#music_waves');

    if(allSectionMainTags[j].classList.contains('music_playing')){
      allSectionMainTags[j].classList.remove('music_playing');
      musicWaves.style.display = 'none'
    };

    if (allSectionMainTags[j].getAttribute('audio-index') == musicIndex){
      allSectionMainTags[j].classList.add('music_playing');
      musicWaves.style.display = 'flex'
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


// Переходы между блоками
let routerToMain = document.querySelector('#router_to_main');
let routerToRadio = document.querySelector('#router_to_radio');
let playerBlock = document.querySelector('#player_block');
let playerRadioBlock = document.querySelector('#player_radio_block');

routerToMain.addEventListener('click', () => {
  mainTag.style.display = 'block'
  radioTag.style.display = 'none'
  playerBlock.style.display = 'block'
  playerRadioBlock.style.display = 'none'
  navMenuContent.classList.remove('music_navbar_menu_content_show')
  navMenu.style.display = 'block';
  navMenuClose.style.display = 'none';
  pauseRadio();
})

routerToRadio.addEventListener('click', () => {
  radioTag.style.display = 'block'
  mainTag.style.display = 'none'
  playerRadioBlock.style.display = 'block'
  playerBlock.style.display = 'none'
  navMenuContent.classList.remove('music_navbar_menu_content_show')
  navMenu.style.display = 'block';
  navMenuClose.style.display = 'none';
  pauseAudio();
})



 



