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
 
  kickPart.loop = true;


//SnarePart
const snareReverb = new Tone.Freeverb().toDestination();
snareReverb.dampening = 100;

var snareEq = new Tone.EQ3(-4, 6, 2);

const snare = new Tone.MembraneSynth({
  pitchDecay : 0.05 ,
  octaves : 10 ,
  oscillator : {
  type : 'square'
  } ,
  envelope : {
  attack : 0.001 ,
  decay : 0.04 ,
  sustain : 0.01 ,
  release : 1.4 ,
  attackCurve : 'exponential'
  }
}).chain(snareReverb, snareEq).toDestination();

const snare1 = [
  { time: '0:1' },
  { time: '0:3' },
  { time: '1:1' },
  { time: '1:3' }
];  

const snare2 = [
  { time: '0:0:3' },
  { time: '0:1:2' },
  { time: '0:3:0' }
];  

const snare3 = [
  { time: '0:0:0' },
  { time: '0:0:2' },
  { time: '0:1:0' },
  { time: '0:3:0' },
];  

var snares = [snare1, snare2, snare3]

const snarePart = new Tone.Part(function(time) {
  snare.triggerAttackRelease('A#1', '4n', time)
}, snares[Math.floor(Math.random() * snares.length)]).start(0);

snarePart.loop = true;
//Arp
const arpReverb = new Tone.Freeverb().toDestination();
arpReverb.dampening = 1000;

var arpEq = new Tone.EQ3(-2, -6, 0);

const arpSynth = new Tone.Synth({
  pitchDecay: 0.008,
  octaves: 2,
  envelope: {
    attack: 0.0006,
    decay: 0.8,
    sustain: 0
  }
}).chain(arpReverb, arpEq).toDestination();

var arpNotes1 = ["A#4", "B3", "C#4", "A#4"];
var arpNotes2 = ["F4", "A#4", "C#4", "A#4"];
var arpNotes3 = ["D#4", "B3", "A#4", "G#4"];

const arps = [arpNotes1, arpNotes2, arpNotes3]

const arpPart = new Tone.Sequence(((time, pitch) => {
  arpSynth.triggerAttack(pitch, time, Math.random()*0.1 + 0.1);
}), arps[Math.floor(Math.random() * arps.length)] , "8n").start(0);


playButton.addEventListener('click', () => {

    //kickLoop();
    //synth.triggerAttackRelease("A#4", 0.25, '4n');
    // const congaPart = new Tone.Sequence(((time, pitch) => {
		// 	conga.triggerAttack(pitch, time, Math.random()*0.5 + 0.5);
		// }), ["G3", "C4", "C4", "C4"], "4n").start(0);

    // Tone.Transport.bpm.value = 115;
    
    // Tone.Transport.start();
    //synthLoop();


		Tone.Transport.bpm.value = 150;

    Tone.Transport.start();
    
});


stopButton.addEventListener('click', () => {

    Tone.Transport.stop();
});