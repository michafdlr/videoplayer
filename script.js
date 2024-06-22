const player = document.getElementById('player')
const video = document.getElementById('video')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const currentTime = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const playbackRate = document.querySelector('.player-speed')
const fullscreenBtn = document.querySelector('.fullscreen')
const fullscreenIcon = document.getElementById('fullscreen-icon')

// Play & Pause ----------------------------------- //
const showPlayIcon = () => {
  playBtn.setAttribute('class', 'fas fa-play')
  playBtn.title = 'Play'
}

const playPause = () => {
  if (video.paused) {
    video.play()
    playBtn.setAttribute('class', 'fas fa-pause')
    playBtn.title = 'Pause'
  } else {
    video.pause()
    showPlayIcon()
  }
}

playBtn.addEventListener('click', playPause)
video.addEventListener('click', playPause)
video.addEventListener('ended', showPlayIcon)



// Progress Bar ---------------------------------- //
const setProgressBar = () => {
  progressBar.style.width = `${video.currentTime / video.duration * 100}%`
}

const getTimeFormat = (input) => {
  const minutes = Math.floor(input/60)
  const seconds = Math.floor(input%60)
  if (minutes < 10 && seconds < 10) {
    return `0${minutes}:0${seconds}`
  } else if (minutes < 10) {
    return `0${minutes}:${seconds}`
  }
  return `${minutes}:${seconds}`
}

const setDuration = () => {
  duration.textContent = getTimeFormat(video.duration)
}

const setCurrentTime = () => {
  currentTime.textContent = getTimeFormat(video.currentTime) + ' / '
}


video.addEventListener('canplay', () => {
  setProgressBar();
  setDuration();
})
video.addEventListener('timeupdate', () => {
  setProgressBar();
  setCurrentTime();
})


const setProgress = (event) => {
  video.currentTime = video.duration * event.offsetX / progressRange.offsetWidth
}

progressRange.addEventListener('click', setProgress)

// Volume Controls --------------------------- //
let lastVolume = 1.0

const setVolume = (event) => {
  lastVolume = event.offsetX / volumeRange.offsetWidth
  if (lastVolume<0.1) {
    lastVolume = 0
  }
  if (lastVolume > 0.9) {
    lastVolume = 1
  }
  video.volume = lastVolume
  volumeBar.style.width = `${lastVolume * 100}%`
}

const setVolumeIcon = () => {
  if (video.volume === 0) {
    volumeIcon.setAttribute("class", 'fas fa-volume-mute')
    volumeIcon.setAttribute('title', 'Unmute')
  } else if (video.volume < 0.5 && video.volume > 0) {
    volumeIcon.setAttribute("class", 'fas fa-volume-down')
    volumeIcon.setAttribute('title', 'Mute')
  } else {
    volumeIcon.setAttribute("class", 'fas fa-volume-up')
    volumeIcon.setAttribute('title', 'Mute')
  }
}

volumeRange.addEventListener('click', setVolume)

video.addEventListener('volumechange', setVolumeIcon)

volumeIcon.addEventListener('click', () => {
  if (video.volume === 0) {
    video.volume = lastVolume
    volumeBar.style.width = `${lastVolume * 100}%`
  } else {
    video.volume = 0
    volumeBar.style.width = '0%'
  }
})

// Change Playback Speed -------------------- //

playbackRate.addEventListener('change', (event) => {
  video.playbackRate = event.target.value
})



// Fullscreen ------------------------------- //

let fullscreen = false;

const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  fullscreenIcon.setAttribute('class', 'fas fa-compress')
  video.classList.add('video-fullscreen')
}

/* Close fullscreen */
const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  fullscreenIcon.setAttribute('class', 'fas fa-expand')
  video.classList.remove('video-fullscreen')
}

const toggleFullscreen = () => {
  if (!fullscreen) {
    openFullscreen(player)
  } else {
    closeFullscreen()
  }
  fullscreen = !fullscreen
}

// const toggleFullscreen = () => {
//   if (document.fullscreenElement) {
//     document.exitFullscreen();
//     fullscreenIcon.setAttribute('class', 'fas fa-expand')
//   } else {
//     player.requestFullscreen();
//     fullscreenIcon.setAttribute('class', 'fas fa-compress')
//     }
// }

fullscreenBtn.addEventListener('click', toggleFullscreen)
