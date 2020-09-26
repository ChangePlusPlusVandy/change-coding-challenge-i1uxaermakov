

let currentTweetOnPage;




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
            document.getElementById("answer1").addEventListener("click", onClickFunctionForButton1)
            document.getElementById("answer2").innerHTML = username2;
            document.getElementById("answer2").addEventListener("click", onClickFunctionForButton2)

            document.getElementById("initialPage").style.display = "none";
            document.getElementById("tweetPage").style.display = "initial";

        })
        .catch(function (error) {
            console.warn('Something went wrong.', error);
        })
}





let firstChoiceClicked = false
let secondChoiceClicked = false

const onClickFunctionForButton1 = async function() {
    firstChoiceClicked = true;
    makeAGuessAndCheckCorrectness();
}

const onClickFunctionForButton2 = function() {
    secondChoiceClicked = true;
    makeAGuessAndCheckCorrectness();
}



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

