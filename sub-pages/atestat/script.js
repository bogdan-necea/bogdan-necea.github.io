let popupState = false;
const btn = {
    pause: document.getElementById('btn-pause'),
    play: document.getElementById('btn-play'),
    close: document.getElementById('btn-close'),
    cancel: document.getElementById('btn-cancel'),
    ok: document.getElementById('btn-ok'),
    min_max: document.getElementById('btn-min-max')
}

const popup = {
    pause: document.getElementById('pop-pause'),
    close: document.getElementById('pop-close')
}
/*
>>> go back to main menu
*/
btn.close.addEventListener('click', () => {
    popup.close.classList.toggle('hidden');
});

btn.cancel.addEventListener('click', () => {
    popup.close.classList.toggle('hidden');
});

/*
>>> toggle fullscreen mode
*/
btn.min_max.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        btn.min_max.src = "../res/min.png";

    } else {
        document.exitFullscreen();
        btn.min_max.src = "../res/max.png";
    }
});

const tiles=document.querySelectorAll('.tile');

tiles.forEach(tile=>{
    const cover=tile.getElementsByClassName('cover')[0];
    tile.addEventListener('mouseover',()=>{
        cover.src=cover.getAttribute('data-a-src');
    });
    tile.addEventListener('mouseout',()=>{
        cover.src=cover.getAttribute('data-src');
    });
})