//Potential Hash ideas
//---------------------
//Key ~ 1: A, 2: A#/Bb,3: B,4: C,5: C#/Db, 
//      6: D, 7: D#/Eb, 8: E, 9: F, 10: F#/Gb
//      11: G, 12:G3/Ab
//
//BPM ~ 70-180 are the acceptable ranges 
//
//pattern selector: Right now stored in the code
//                  But can potentially be midi
//                  or stored in a ref file
//

//Defne kick sound
const kick = new Tone.MembraneSynth().toDestination();
//Define play button
const playButton = document.getElementById("play-btn");
const stopButton = document.getElementById("stop-btn");

//Define kick options

const kick1 = [
    { time: '0:0' },
    { time: '0:1:2' },
    { time: '0:2' },
    { time: '0:3' },
    { time: '1:0:2'},
    { time: '1:1' },
    { time: '1:2' }
  ];
  
  const kick2 = [
    { time: '0:0' },
    { time: '0:1:2' },
    { time: '0:3' },
    { time: '1:0'},
    { time: '1:0:2' },
    { time: '1:2:2' }
  ];

  const kick3 = [
    { time: '0:0 ' },
    { time: '0:0:3' },
    { time: '0:1:2' },
    { time: '0:2:2'},
    { time: '1:0' },
    { time: '1:0:1' },
    { time: '1:0:3' },
    { time: '1:1:2' },
    { time: '1:2:2' }
  ]; 


  //Kick Select
  kicks = [kick1, kick2, kick3]
  const kickSelected = kicks[Math.floor(Math.random() * kicks.length)]

  console.log(kickSelected);

  //Define gernerator
  const kickPart = new Tone.Part(function(time) {
    kick.triggerAttackRelease('A#1', '4n', time)
  }, kickSelected).start(0);

//Sets BPM and initiates kick pattern in loop
function kickLoop(){
    Tone.Transport.bpm.value = 160;
    Tone.Transport.scheduleRepeat(kickPart, '8n')
    Tone.Transport.start();
}



playButton.addEventListener('click', () => {

    kickLoop();
});


stopButton.addEventListener('click', () => {

    Tone.Transport.stop();
});