const body = document.querySelector("body");
const keys = document.querySelectorAll(".key");
const display = document.querySelector(".display");
const result = document.querySelector(".result");
const correctSentence = document.querySelector(".correctSentence");
const again = document.querySelector('.again');
const image = document.querySelector(".img");
const keyboard = document.querySelector(".keyboard");


const sentences = ["HELLO WORLD","DICTATOR","CARDIOLOGIST","FISH","HANG MAN"];
let word = "";
let guessWord ="";
let wrongCount  = 0 ;

function initialize(){
    console.log("calling initialize");
    const ind = Math.floor(Math.random()*sentences.length);
    word = sentences[ind];
    for(let i =0 ;i<word.length;i++){
        if(word[i]===" "){
            guessWord = guessWord +" ";
        }
        else{
            guessWord = guessWord + "-";
        }
    }
    display.innerText = guessWord;

}

// check whether key pressed right or wrong

function check(char,ele){
   const length = word.length;
   let wrong = true;
   let newString  = '';

   for(let  i=0 ;i <length;i++ )
   {
        if(word[i]===char){
            wrong  = false;
            newString += word[i];
        }
        else if(guessWord[i]!='-'){
            newString+=guessWord[i];
        }
        else{
            newString+='-';
        }
   }

    //if wrong
    //    add property to change color to red
    if(wrong){
        console.log("wrong");
        wrongCount++;
        // Loose
        if(wrongCount === 9){
            console.log("LOOSEE...");
            keyboard.style.display = "none";
            result.style.display = "block";
            correctSentence.innerText = `You Lose! Correct Sentence: ${word}`
            // body.removeEventListener("keydown",handleKeys);
        }

        image.src= `./s${wrongCount}.jpg`;
        ele.classList.add("wrong");
       

   }
   //if true   
   //    add property to change color to green
   else{
        guessWord =  newString;
        display.innerHTML  = guessWord
       //Win 
        if(guessWord===word){
            console.log("WINN...");
            keyboard.style.display = "none";
            result.style.display = "block";
            correctSentence.innerText = `That's Right! Correct Sentence: ${word}`;
            // body.removeEventListener("keydown",handleKeys);
        }
        ele.classList.add("right");
   }

}

function handleKeys(event){
    // you have win
    if(wrongCount===9 || guessWord===word){
        if(event.keyCode === 13){
            window.location.reload();
        }
    }
    
    if(wrongCount<9 && guessWord!=word && event.keyCode >= 65 && event.keyCode <= 90){
        const keyPressed =  event.code;
        const charPressed = keyPressed[keyPressed.length-1];
       
        let ind  = -1;
        for(let i =0 ;i<keys.length;i++){
            if(keys[i].innerText === charPressed){
                ind  = i;
            }
        }
        check(charPressed,keys[ind]);
    }
}

function handleclick(event,i){
    let ele = keys[i];
    const charPressed  = keys[i].innerText;
    console.log(ele);
    console.log(charPressed);
    check(charPressed,ele);
}

// Adding listeners
body.addEventListener("keydown",handleKeys);

for(let i =0 ;i<keys.length;i++){
    keys[i].addEventListener("click",(event)=>{event.stopPropagation();handleclick(event,i)});
}

again.addEventListener("click",()=>{
    window.location.reload();
})

initialize();