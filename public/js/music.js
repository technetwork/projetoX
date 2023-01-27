var audio = document.querySelector("audio");
var indexMusica = 0;


function playAudio() {

    audio.volume = 0.3;
    
    let buttonPlay = document.querySelector(".bx-play-circle");
    let buttonPause = document.querySelector(".bx-pause-circle");
    
    if (audio.paused) 
    {
        audio.play();
        buttonPlay.classList.remove("bx-play-circle");
        buttonPlay.classList.add("bx-pause-circle");

    } 
    else 
    {
        audio.pause()
        buttonPause.classList.remove("bx-pause-circle");
        buttonPause.classList.add("bx-play-circle");
    }

}


audio.addEventListener("timeupdate", sliderUpdate)

function sliderUpdate() {

    let slider = document.querySelector(".slider");
    slider.style.width = Math.floor((audio.currentTime / audio.duration) * 100) + '%';

    if (audio.currentTime == audio.duration) 
    {
        document.querySelector(".next").click();
    }

}


document.querySelector(".prev").addEventListener("click", () => {
    indexMusica--;

    if (indexMusica < 0) 
    {
        indexMusica = music_list.length - 1;
    }

    musicRender(indexMusica);
    playAudio();
})

document.querySelector(".next").addEventListener("click", () => {
    indexMusica++;

    if (indexMusica > music_list.length - 1) 
    {
        indexMusica = 0;
    }

    musicRender(indexMusica);
    playAudio();
})

document.querySelector(".full-mute").addEventListener("click", () => {

    let volumeFull = document.querySelector(".bx-volume-full");
    let volumeMute = document.querySelector(".bx-volume-mute");

    
    if (audio.muted) 
    {
        audio.muted = false
        volumeMute.classList.remove("bx-volume-mute");
        volumeMute.classList.add("bx-volume-full");
    } 
    else 
    {
        audio.muted = true
        volumeFull.classList.remove("bx-volume-full");
        volumeFull.classList.add("bx-volume-mute");
        
    }

})

function musicRender(index) {
    
    audio.setAttribute("src", music_list[index].music);

    audio.addEventListener("loadeddata", () => {
        document.querySelector("#track-title").innerText = music_list[index].name;
        document.querySelector("#track-artist").innerText = music_list[index].artist;
        document.querySelector(".cover").src = music_list[index].img;
    });

    saveMusicCache(music_list[index].name, music_list[index].artist, music_list[index].img, music_list[index].music);

}

function saveMusicCache(name, artist, img, music) {

    localStorage.setItem("name", name);
    localStorage.setItem("artist", artist);
    localStorage.setItem("img", img);
    localStorage.setItem("music", music);

}


function restoreMusic() {

    // Verifica se tem alguma musica em cache, caso tenha, ela será reproduzida. 
    
    if (localStorage.getItem("name")) 
    {
        document.querySelector("#track-title").innerText = localStorage.getItem("name");
        document.querySelector("#track-artist").innerText = localStorage.getItem("artist");
        document.querySelector(".cover").src = localStorage.getItem("img");
        audio.setAttribute("src", localStorage.getItem("music"));
    }

}

window.onload = restoreMusic;