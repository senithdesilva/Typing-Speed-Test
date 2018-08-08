const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}


// Random word generator 
// Word List
var randomWorkGenerator = [
    "We use cookies to offer you a better browsing experience, analyze site traffic, and personalize content. Read about how we use cookies and how you can control them by visiting our Cookie Settings page. If you continue to use this site, you consent to our use of cookies.",
    "is man much begin cause vowel he final always cut mark what machine rule that next few friend took.", 
    "Within the text of most pages, there are usually a large number of hypertext links to other pages within the wiki.", 
    "Critics of publicly editable wiki systems argue that these systems could be easily tampered with by malicious individuals or even by well-meaning but unskilled users who introduce errors into the content.", 
    "Cybernetics is applicable when a system being analyzed incorporates a closed signaling loop.", 
    "Studies in cybernetics provide a means for examining the design and function of any system, including social systems such as business management and organizational learning, including for the purpose of making them more efficient and effective."
];

// Random Selection from word list
function randomSentence() {
    var randomWord = Math.floor(Math.random() * (randomWorkGenerator.length));
    document.getElementById("random-sentence").innerHTML = randomWorkGenerator[randomWord];
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    var originText = document.getElementById("random-sentence").innerHTML;
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnterdLength);
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);



