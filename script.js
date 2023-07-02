console.log("welcome,you can check your progress here")

let songindex=0;
let audioElement=new Audio("songs/1.mp3");
let masterPlay=document.getElementById("masterPlay");
let mastersongname=document.getElementById("mastersongname");
let progressbar=document.getElementById("progressbar");
let gif=document.getElementById("gif");
let songitem=Array.from(document.getElementsByClassName("songitem"));
let songItemPlay=document.getElementsByClassName("songItemPlay");
let song=[
    {songname: "Baby", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songname: "King_of_disco", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songname: "Danza-Kuduro", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songname: "Despacito", filepath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songname: "Imagine_Dragons_-_Demons", filepath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songname: "Into Your Arms", filepath: "songs/6.mp3", coverpath: "covers/6.jpg"},
    {songname: "Love Me Like You Do", filepath: "songs/7.mp3", coverpath: "covers/7.jpg"},
    {songname: "Love-Story---Taylor-Swift-", filepath: "songs/8.mp3", coverpath: "covers/8.jpg"},
    {songname: "Eeniee Meenie", filepath: "songs/9.mp3", coverpath: "covers/10.jpg"},
]

songitem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=song[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText=song[i].songname;
})

masterPlay.addEventListener("click",()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        songItemPlay[songindex].classList.add('fa-pause-circle');
        songItemPlay[songindex].classList.remove('fa-play-circle');
        gif.style.opacity=1
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        songItemPlay[songindex].classList.add('fa-play-circle');
        songItemPlay[songindex].classList.remove('fa-pause-circle');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener("timeupdate",()=>{
    progress=parseFloat((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value=progress;
})

progressbar.addEventListener("change",()=>{
    audioElement.currentTime=(progressbar.value*audioElement.duration)/100;
})

const makeAllPlay=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlay()
        if(audioElement.paused){
            songindex=parseInt(e.target.id);
            mastersongname.innerText=song[songindex].songname;
            audioElement.src=`songs/${songindex+1}.mp3`;
            audioElement.play();
            audioElement.currentTime=0;
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            masterPlay.classList.remove("fa-play-circle")
            masterPlay.classList.add("fa-pause-circle")
            gif.style.opacity=1
        }
        else{
            audioElement.pause();
            masterPlay.classList.add("fa-play-circle")
            masterPlay.classList.remove("fa-pause-circle")
            gif.style.opacity=0;
        }
    })
})

document.getElementById("next").addEventListener("click",()=>{
    if(songindex>=8){
        songItemPlay[songindex].classList.add('fa-play-circle');
        songindex=0;
    }
    else{
        songindex+=1
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    mastersongname.innerText=song[songindex].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    songItemPlay[songindex].classList.remove('fa-play-circle');
    songItemPlay[songindex].classList.add('fa-pause-circle');
    songItemPlay[songindex-1].classList.add('fa-play-circle');
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songindex<=0){
        songItemPlay[songindex].classList.add('fa-play-circle');
        songindex=8;
        console.log("songindex:", songindex)
    }
    else{
        songindex-=1;
        console.log("songindex:", songindex)
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText = song[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add("fa-pause-circle");
    masterPlay.classList.add('fa-pause-circle');
    songItemPlay[songindex].classList.remove('fa-play-circle');
    songItemPlay[songindex].classList.add('fa-pause-circle');
    songItemPlay[songindex+1].classList.add('fa-play-circle');
})
