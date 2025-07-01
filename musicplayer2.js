// let playlist = document.getElementById('playlist');
// let tracks = playlist.getElementsByTagName('li');

let tracks = document.querySelectorAll("li");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let volume = document.getElementById("volume-controller");
let songstatus = document.getElementById("songStatus");

let audio = new Audio();
let currentIndex = 0;

const loadTrack = (index) => {
  audio.src = tracks[index].getAttribute("data-src");
};

const playTrack = () => {
  audio.play();
  // playBtn.classList.add('hide')
  // pauseBtn.classList.remove('hide')     =>   //method 1

  playBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
};

const pauseTrack = () => {
  audio.pause();
  // playBtn.classList.remove('hide')
  // pauseBtn.classList.add('hide')       =>  //method 1

  playBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
};

const nextTrack = () => {
  if (currentIndex === tracks.length - 1) {
    currentIndex = 0; //try putting 3 instead of track.length-1
  } else {
    currentIndex = currentIndex + 1;
  }
  loadTrack(currentIndex);
  playTrack();
};

const prevTrack = () => {
  currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentIndex);
  playTrack();
};

//here we convert track into array to use forEach
Array.from(tracks).forEach((track, index) => {
  track.addEventListener("click", () => {
    currentIndex = index;
    loadTrack(currentIndex);
    playTrack();
  });
});

loadTrack(currentIndex);

//for dynamic volume control
const updateVolume = () => {
  audio.volume = volume.value;
};

//for dynamic progress bar
audio.addEventListener("timeupdate", () => {
  let progress = (audio.currentTime / audio.duration) * 100;
  songstatus.style.width = `${progress}%`;
});
