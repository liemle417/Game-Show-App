const buttons = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;

const overlay = document.getElementById('overlay');

const btnStart = document.querySelector('.btn__reset');
const tries = document.querySelectorAll('img');

const header = document.querySelector('.title');
const h3 = document.querySelector('.paragraph');

const phrases = [
    {
        name: 'Counting Stars',
        hint1: "OneRepublic",
        hint2: "I couldn't lie, couldn't lie, couldn't lie",
        hint3: "Old, but I'm not that old. Young, but I'm not that bold.",
        hint4: '"Lately, I\'ve been, I\'ve been losing sleep."\'That is the first sentence of the lyrics\'',
        hint5: 'Take that money. Watch it burn. Sink in the river. The lessons I learned',
    },

    {
        name: 'Someone You Loved',
        hint1: "Lewis Capaldi",
        hint2: "Number 1 on the UK Singles Chart for 7 consecutive weeks",
        hint3: "I'm going under and this time I fear there's no one to save me",
        hint4: "I'm going under and this time I fear there's no one to turn to",
        hint5: 'Now, I need somebody to know. Somebody to heal. Somebody to have',
    },

    {
        name: 'Running Up That Hill',
        hint1: "Kate Bush",
        hint2: "A Deal With God",
        hint3: "It doesn't hurt me. Do you want to feel how it feels?",
        hint4: "It has been played in Stranger Things Season 4.",
        hint5: 'If I only could, I\'d make a deal with God. And I\'d get him to swap our places',
    },

    {
        name: 'Save Your Tears',
        hint1: "The Weeknd",
        hint2: "The Second Remix, a collaboration with American singer Ariana Grande",
        hint3: "I saw you dancing in a crowded room",
        hint4: "You look so happy when I'm not with you",
        hint5: 'A single teardrop falling from your eye',
    },

    {
        name: 'Close To You',
        hint1: "The Long to Be",
        hint2: "Karen Carpenter",
        hint3: "Why do birds suddenly appear?",
        hint4: "Every time you are near?",
        hint5: 'Why do stars fall down from the sky?',
    },

    {
        name: 'Happy New Year',
        hint1: "ABBA",
        hint2: "1980",
        hint3: "No more champagne. And the fireworks are through",
        hint4: "May we all have our hopes, our will to try. If we don't we might as well lay down and die",
        hint5: 'May we all have a vision now and then. Of a world where every neighbour is a friend',
    },

    {
        name: 'Since U Been Gone',
        hint1: "Kelly Clarkson",
        hint2: "2004",
        hint3: "Here's the thing. We started out friends. It was cool, but it was all pretend",
        hint4: "You're dedicated, you took the time. Wasn't long 'til I called you mine",
        hint5: 'You had your chance, you blew it. Out of sight, out of mind',
    },
];

//Create a random phrase
let randomNum = Math.floor(Math.random()*phrases.length);

let words = phrases[randomNum]['name'].split('');
let song = phrases[randomNum]['name'];
let firstHint = phrases[randomNum]['hint1'];
let secondHint = phrases[randomNum]['hint2'];
let thirdHint = phrases[randomNum]['hint3'];
let fourthHint = phrases[randomNum]['hint4'];
let fifthHint = phrases[randomNum]['hint5'];

// console.log(words);
// console.log(song);
// console.log(firstHint);
// console.log(secondHint);
// console.log(thirdHint);
// console.log(fourthHint);
// console.log(fifthHint);

btnStart.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'none';
});

h3.innerHTML = `<h4>Hint 1: ${firstHint}</h4>`;



//Add that random phrase to the screen. 
//Create li element
function addPhrase (words) {
    for(let i = 0; i < words.length; i++ ){
    const li = document.createElement('li'); // Creating list letters
    li.textContent = words[i];       // Set the text content = each letter of the random phrase
    phrase.firstElementChild.appendChild(li); // Append the randomphrase as the first li Element
    if( words[i] === " " ) {   // If the index or chosen letter is a space
        li.className = 'space'; //Change class name to space
        } else {
        li.className = 'letter' // Change class to letter 
        }
    }
}

addPhrase(words);

function verifyChar (button){
    let char = document.querySelectorAll('li'); //Array of LI elements
    let foundChar = null; 
    for (let i = 0; i < char.length; i++){ 
         if(char[i].textContent.toUpperCase() === button.textContent.toUpperCase()){ //Compares the chosen letter to whatever the button says
            char[i].className = 'show letter'; // Gives the chosen letter the class name of show
            char[i].style.transition ='all 1s'; //add transitions
            foundChar += char[i].textContent;
         }
    }
    return foundChar;
};


function winning (){
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');


    if (letter.length === show.length){
        if (missed === 0) {
            overlay.className = 'win';
            h3.textContent = `You won! And you still have 5 guesses`;
            overlay.style.transition = "all 3s";
            overlay.style.display = 'flex';
            btnStart.textContent = 'Again?';
            btnStart.addEventListener('click', (e) => {
                e.preventDefault();
                location.reload();
            });
        }  else{
            overlay.className = 'win';
            h3.textContent = `You won!`;
            overlay.style.transition = "all 3s";
            overlay.style.display = 'flex';
            btnStart.textContent = 'Again?';
            btnStart.addEventListener('click', (e) => {
                e.preventDefault();
                location.reload();
            });
        }    
    } else if (missed === 5 ){
        overlay.className = 'lose';
        header.textContent = `You lose!!! And the song was '${song}'`;
        overlay.style.transition = "all 3s";
        overlay.style.display = 'flex';
        btnStart.textContent = 'You lose! Try Again?'
        btnStart.addEventListener('click', (e) => {
            e.preventDefault();
            location.reload();
        });
     }   
};



buttons.addEventListener('click', (e) => { 
    const button = e.target;
    if (button.tagName === 'BUTTON'){    
        button.className = "chosen"; //adds class of chosen if button is clicked
    } if (button.className === 'chosen'){
        button.disabled = "true"; //disables button if it has been selected
        let letterFound = verifyChar(button); 
        if (letterFound === null){
            missed += 1;
            tries[tries.length-missed].src = "images/lostHeart.png"; // removes the hearts
            
            //If the user lose 1 heart, trigger another hint
            //This code can be improved by using a loop.
            if(tries.length-missed === 4){
                h3.innerHTML = `<h4>Hint 2: ${secondHint}</h4>`;
            }

            if(tries.length-missed === 3){
                h3.innerHTML = `<h4>Hint 3: ${thirdHint}</h4>`;
            }

            if(tries.length-missed === 2){
                h3.innerHTML = `<h4>Hint 4: ${fourthHint}</h4>`;
            }

            if(tries.length-missed === 1){
                h3.innerHTML = `<h4>Last Hint: ${fifthHint}</h4>`;
            }

        }
        winning();
    }  
});

//INSTANTLY GAME OVER WHEN RIGHT CLICK OR CTRL + C
//Create a function called "LOSE"
function loseAlert(){
    overlay.className = 'lose';
    h3.innerHTML = `CHEATER!!!!<br>Right click to search or Copy will make you lose!!!`;
    overlay.style.transition = "all 3s";
    overlay.style.display = 'flex';
    btnStart.textContent = 'You lose! Try Again?';
    btnStart.addEventListener('click', (e) => {
        e.preventDefault();
        location.reload();
    })
}

//INSTANTLY GAME OVER WHEN RIGHT CLICK OR CTRL + C
h3.addEventListener('contextmenu', (e) =>{
    loseAlert();
});

h3.addEventListener('copy', (e) =>{
    loseAlert();
});