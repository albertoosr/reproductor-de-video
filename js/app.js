// Reporducción de video
init();

function init(){
    var video = document.getElementById('video');
    var playlist = document.getElementById('playlist');
    var list = playlist.getElementsByTagName('a');
    // video.volume = 0.19;
    video.play();

    //cambar de video
    for(var lists in list){
        var link = list[lists];
        if(typeof link === "function" || typeof link === "number") continue;
        link.addEventListener('click', function(e){
            e.preventDefault();
            var videos = this.getAttribute('href');
            run(videos, video, this);
        });
    }

    // agregamos evento para reporoducir la siguinte video en la lista
    //si el video es el ultimo, se produce el primer video otra vez

    video.addEventListener('ended', function(e){
        for(var lists in list){
            var link = list[lists];
            var nextVideo = parseInt(lists) + 1;
            if(typeof link === "function" || typeof link === "number") continue;
            if(!this.src) this.src = list[0];
            if(lists == (list.length - 1)) nextVideo = 0;
                console.log(nextVideo);
                if(link.getAttribute('href') === this.src){
                    var nextLink = list[nextVideo];
                    run(nextLink.getAttribute('href'), video, nextLink);
                    break;
                }
        }
    });
}

function run(videos, video, link){
    var parent = link.parentElement;
    // quitar el ative de todo los elementos de la lista
    var items = parent.parentElement.getElementsByTagName('li');
    for(var item in items) {
        if(items[item].classList)
        items[item].classList.remove("active");
    }
    // agregamos active otro elemento
    parent.classList.add("active");

    //tocar la canción
    video.src = videos;
    video.load();
    video.play();
}