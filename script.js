// [] - create a list
// {} - create a dictionary that stores data in key-value pairs

const database = [
    {
        question : "When was Roblox created?",
        options : ["2006", "2007", "2008", "2009"],
        answer : "2006"
    },

    {
        question : "What was Roblox's original name?",
        options : ["Trendy Blocks", "Xtra Blocks", "Super Blox", "Dyna Blocks"],
        answer : "Dyna Blocks"
    },

    {
        question : "Which two people invented Roblox?",
        options : ["Tim Cook and Steve Jobs", "David Baszucki and Erik Cassel", "Bill Gates and Paul Allen", "Tim Cook and Bill Gates"],
        answer : "David Baszucki and Erik Cassel"
    },

    {
        question : "What was the two names of the in-game currency last time?",
        options : ["Roquid and Vix", "Robux and Tax", "Robux and Tix", "Rolux and Rotax"],
        answer : "Robux and Tix"
    },

    {
        question : "How many hats can a character wear at once in Roblox?",
        options : ["1", "2", "3", "4"],
        answer : "3"
    },

    {
        question : "Which of these is a real thing?",
        options : ["Ridiculous Builders Club", "Outrageous Builders Club", "Preposterous Builders Club", "Ludricrous Builders Club"],
        answer : "Outrageous Builders Club"
    },

    {
        question : "What programming language is used for Roblox Studio?",
        options : [".html", "JavaScript", "Lua", "Python"],
        answer : "Lua"
    },

    {
        question : "In Roblox, what does BC stand for?",
        options : ["Be Cruel", "Building Club", "Builders Club", "Best Coders"],
        answer : "Builders Club"
    },

    {

        question : "Who is the 1 billionth player on Roblox?",
        options : ["Coolboy1772", "djmfjbpwe2", "Azoo5573", "Nicholas77"],
        answer : "Azoo5573"
    },

        {

        question : "What was the first game to reach 1 Billion visits?",
        options : ["MeepCity", "Adopt Me!", "Blox Fruits", "Brookhaven"],
        answer : "MeepCity"
    }
]


const startButton = document.getElementById("start-btn")
const timerText = document.getElementById("timer-text")
const questionLabel = document.getElementById("question")
const optionBox = document.getElementById("option-box")
const ProgressBarFill = document.getElementById("fill");
const ScoreLabel = document.getElementById("score-label")
const FeedbackLabel = document.getElementById("feedback-label")


const dropdown = document.getElementById("bgm")
const musicbtn = document.getElementById("music")
let CurrentSong = null
let IsMusicPlaying = false
musicbtn.textContent = "🔇 Music: Off"


dropdown.addEventListener("change", () => {
    let SelectedSong = dropdown.value

    // stop and reset prev. song if any
    if(CurrentSong)
    {
        CurrentSong.pause()
        CurrentSong.currentTime = 0
    }

    CurrentSong = new Audio(SelectedSong)
    CurrentSong.loop = true
    CurrentSong.volume = 0.45
    CurrentSong.play()
    IsMusicPlaying = true
    musicbtn.textContent = "🔊 Music: On"
})


musicbtn.addEventListener("click", () => {
    if(IsMusicPlaying)
    {
        CurrentSong.pause()
        musicbtn.textContent = "🔇 Music: Off"
        IsMusicPlaying = false
    } else
    {
        CurrentSong.play()
        musicbtn.textContent = "🔊 Music: On"
        IsMusicPlaying = true
    }
})







let questionNumber = 0
let score = 0

startButton.addEventListener("click", StartQuiz);

function StartQuiz()
{
    startButton.style.display = 'none'
    FeedbackLabel.textContent = ""
    LoadQuestion()
}

function LoadQuestion()
{
    if(questionNumber < database.length)
    {
        // reset the timer
        timerText.textContent = 5

        FeedbackLabel.textContent = ""

        // update progress bar
        ProgressBarFill.style.width = `${ ( (questionNumber + 1) / database.length ) * 100 }%`


        // load a question from the database
        const currentQuestionSet = database[questionNumber]
        questionLabel.textContent = currentQuestionSet.question


        // remove previous option buttons
        optionBox.innerHTML = '';


        // build 4 option buttons
        currentQuestionSet.options.forEach((item) => {
            const button = document.createElement('button')
            button.textContent = item;
            button.classList.add('option-btn')
            optionBox.appendChild(button)

            button.addEventListener('click', () => {
                DisableAllOptionButtons()
                CheckAnswer(item)
                // item = option we just selected
            })
        })

        // turn on the timer
        timer = setInterval(() => {
            // reduce timer text by 1
            timerText.textContent = parseInt(timerText.textContent) - 1

            // check if the time has run out
            if(parseInt(timerText.textContent) === 0)
            {
                DisableAllOptionButtons()
                CheckAnswer(null)
            }
        }, 1000) 
    } else
    {
        EndQuiz()
    }
}

function DisableAllOptionButtons()
{
    // batch select all option buttons
    const AllOptionButtons = document.querySelectorAll('.option-btn')

    AllOptionButtons.forEach(button => {
        button.disabled = true
    })
}

function CheckAnswer(item)
{
    clearInterval(timer)

    // identify the actual answer key
    const answer = database[questionNumber].answer;

    if(item === answer)
    {
        score = score + 1
        FeedbackLabel.textContent = "Great job! Keep it up!"
    } else if (item === null)
    {
        FeedbackLabel.textContent = "Times up... "
    } else
    {
        FeedbackLabel.textContent = "We all make mistakes, as long as we learn from them!"
    }

    ScoreLabel.textContent = `You scored ${score} point(s)`

    // hold for 2 seconds
    setTimeout(() => {
        questionNumber = questionNumber + 1
        LoadQuestion()
    }, 2000);
}

function EndQuiz()
{
    clearInterval(timer) // reset timer
    questionLabel.textContent = "The quiz has ended!"
    optionBox.style.display = 'none';

    if(score >= 8)
    {
    FeedbackLabel.textContent = "🔥 🏁🏁🏁 🔥"
    timerText.textContent = "🤩"
} else 
  {
        FeedbackLabel.textContent = "WhAt WaS tHaT lOuSy EfFoRt?"
    timerText.textContent = "😒"
  }
}
