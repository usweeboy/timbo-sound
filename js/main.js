// Загрузка песни, обложки и ее названия
let audioPlayer = document.querySelector('#audio_player');
let coverMusic = document.querySelector('#cover_music');
let titleSong = document.querySelector('#player_title');
let singerPlayer = document.querySelector('#player_singer');

let musicIndex = 1;

window.addEventListener('load', () => {
  loadingSong(musicIndex)
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

volumeMute.addEventListener('click', () => {
  volumeMute.style.display = 'none'
  volumeHight.style.display = 'block'
  audioPlayer.volume = 0
})

volumeHight.addEventListener('click', () => {
  volumeMute.style.display = 'block'
  volumeHight.style.display = 'none'
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

// Музыкальный блок (Рекомендации)
let mainTag = document.querySelector("#music-block-references")

for (let i = 0; i < musicList.length; i++) {
  let sectionTag = `
        <section class="music_block_audio" section-index="${i + 1}">
          <div class="music_block_audio_one">
            <div class="music_block_cover">
              <img src="img/covers/${musicList[i].img}.jpg" alt="" class="music_cover" id="cover_music">
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

  mainTag.insertAdjacentHTML('beforeend', sectionTag);

  let sectionMusicDuration = mainTag.querySelector(`#${musicList[i].src}`);
  let sectionMusicTag = mainTag.querySelector(`.${musicList[i].src}`);

  sectionMusicTag.addEventListener('loadeddata', () => {
    let audioDuration = sectionMusicTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    };
    sectionMusicDuration.innerHTML = `${totalMin}:${totalSec}`;
  });
};

let allSectionTags = mainTag.querySelectorAll('section');
function playingNow() {
  for (let j = 0; j < allSectionTags.length; j++) {

    let musicWaves = allSectionTags[j].querySelector('#music_waves');

    if(allSectionTags[j].classList.contains('music_playing')){
      allSectionTags[j].classList.remove('music_playing');
      musicWaves.style.display = 'none'
    };

    if (allSectionTags[j].getAttribute('section-index') == musicIndex){
      allSectionTags[j].classList.add('music_playing');
      musicWaves.style.display = 'flex'
    };
  
    allSectionTags[j].setAttribute('onclick','clicked(this)');
  }
}

function clicked(element){
  let getSectionIndex = element.getAttribute('section-index');
  musicIndex = getSectionIndex;
  loadingSong(musicIndex)
  playAudio();    
  playingNow();
};




