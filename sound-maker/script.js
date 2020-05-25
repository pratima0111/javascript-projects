window.addEventListener('load', ()=>{

    const sounds = document.querySelectorAll('.sound');
    const pads = document.querySelectorAll('.pads div');
    const visual = document. querySelector('.visual');
   
    const colors = [
        '#60d394',
        '#d36060',
        '#c060d3',
        '#d3d160',
        '#6860d3',
        '#60b3d3'
    ];
    // console.log(sounds);

    //let's get going with the sound here
    pads.forEach((pad, index)=>{      //index is the sound index
        pad.addEventListener('click', function(){
            sounds[index].currentTime = 0;      //when we click again n again it will start the sound from the beginning instead of just playing it whole
            sounds[index].play();
            createBubbles(index);           
        });


    });


    //create a function that makes bubbles
    const createBubbles=(index) => {
        const bubble = document.createElement('div');
        visual.appendChild(bubble);
        bubble.style.backgroundColor = colors[index];
        bubble.style.animation ='jump 1s ease';


        //jump is the animation name
        //1 second is the time after which the animation starts
        // ease - Specifies an animation with a slow start, then fast, then end slowly (this is default)

        bubble.addEventListener('animationend', function(){
            visual.removeChild(this);
        })
    };
});


