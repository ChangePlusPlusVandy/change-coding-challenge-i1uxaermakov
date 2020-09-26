
// global variable that holds information about the tween the user is playing with right now
let currentTweetOnPage;



// The method used to start the game: send the two usernames to backend and
// obtain the first tweet to play with
const startGame = function() {
    const username1 = document.getElementById("username1").value;
    const username2 = document.getElementById("username2").value;

    fetch('/startGame', {
        method: 'POST',
        body: 'username1=' + username1 + '&username2=' + username2,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            currentTweetOnPage = json;
            console.log(currentTweetOnPage, json);
            console.log(currentTweetOnPage.text)
            document.getElementById("placeForTweetText").innerHTML = "\"" + currentTweetOnPage.text + "\"";
            document.getElementById("answer1").innerHTML = username1;
            document.getElementById("answer2").innerHTML = username2;

            document.getElementById("initialPage").style.display = "none";
            document.getElementById("tweetPage").style.display = "initial";

        })
        .catch(function (error) {
            console.warn('Something went wrong.', error);
        })
}



// Variables used to identify what option the user chose
let firstChoiceClicked = false
let secondChoiceClicked = false


// Methods used to update the variables above with the purpose of identification of the option the user chose
document.getElementById("answer1").addEventListener("click",  function() {
    firstChoiceClicked = true;
    makeAGuessAndCheckCorrectness();
})

document.getElementById("answer2").addEventListener("click", function() {
    secondChoiceClicked = true;
    makeAGuessAndCheckCorrectness();
})


// This method is called every time the user makes a guess. It shows whether
// the user was correct in their guess and prompts to either continue playing or end the game
const makeAGuessAndCheckCorrectness = function() {
    const username1 = document.getElementById("username1").value;
    const username2 = document.getElementById("username2").value;

    let usernameChosen, usernameNotChosen;

    //determine what button was clicked
    if(firstChoiceClicked) {
        usernameChosen = username1;
        usernameNotChosen = username2;
        firstChoiceClicked = false;
    }
    else {
        usernameChosen = username2;
        usernameNotChosen = username1;
        secondChoiceClicked = false;
    }
    document.getElementById("choices").style.display = "none";

    // checking if user's guess was correct
    if(usernameChosen == currentTweetOnPage.user.screenName) {
        document.getElementById("correct").style.display = "initial";
        document.getElementById("correctMessage").innerHTML = "Correct! It was a post by @" + usernameChosen;
        fetch('/lastGuessWasCorrect', {
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).catch(function (error) {
                console.warn('Something went wrong.', error);
        })
    }
    else {
        document.getElementById("incorrect").style.display = "initial";
        document.getElementById("incorrectMessage").innerHTML = "Sorry, incorrect! It was a post by @" + usernameNotChosen;
        fetch('/lastGuessWasIncorrect', {
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        }).catch(function (error) {
            console.warn('Something went wrong.', error);
        })
    }

}


// The method used to obtain a new tweet and update the data in case the user wants to continue playing
const playAgain = function() {
    document.getElementById("incorrect").style.display = "none";
    document.getElementById("correct").style.display = "none";
    document.getElementById("choices").style.display = "initial";

    fetch('/playAnotherRound', {
        method: 'GET',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            currentTweetOnPage = json;
            document.getElementById("placeForTweetText").innerHTML = currentTweetOnPage.text;

        })
        .catch(function (error) {
        console.warn('Something went wrong.', error);
    });



}




// The method used to display final statistics about the game session
const showStatistics = function() {

    fetch('/statistics', {
        method: 'GET',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            let statistics = json;
            console.log(statistics)
            document.getElementById("placeForStatistics").innerHTML =
                "You made " + statistics.correctAttempts + " correct guesses out of " +
                statistics.overallAttempts + " attempts!";

            document.getElementById("tweetPage").style.display = "none";
            document.getElementById("incorrect").style.display = "none";
            document.getElementById("correct").style.display = "none";
            document.getElementById("statistics").style.display = "initial";

        })
        .catch(function (error) {
        console.warn('Something went wrong.', error);
    });

}

