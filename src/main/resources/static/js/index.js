

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
            document.getElementById("placeForTweetText").innerHTML = currentTweetOnPage.text;
            document.getElementById("answer1").innerHTML = username1;
            document.getElementById("answer1").addEventListener("click", onClickFunctionForButton1)
            document.getElementById("answer2").innerHTML = username2;
            document.getElementById("answer2").addEventListener("click", onClickFunctionForButton2)

            document.getElementById("initialPage").hidden = true;
            document.getElementById("tweetPage").hidden = false;
        })
        .catch(function (error) {
            console.warn('Something went wrong.', error);
        })
}


let firstChoiceClicked = false
let secondChoiceClicked = false

const onClickFunctionForButton1 = function() {
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

    let usernameChosen;

    //determine what button was clicked
    if(firstChoiceClicked) {
        usernameChosen = username1;
        firstChoiceClicked = false;
    }
    else {
        usernameChosen = username2;
        secondChoiceClicked = false;
    }

    if(usernameChosen == currentTweetOnPage.user.screenName) {
        document.getElementById("correct").hidden = false;
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
        document.getElementById("incorrect").hidden = false;
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
    fetch('/playAnotherRound', {
        method: 'GET',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            currentTweetOnPage = json;
            document.getElementById("placeForTweetText").innerHTML = currentTweetOnPage.text;

            document.getElementById("tweetPage").hidden = false;
            document.getElementById("correct").hidden = true;
            document.getElementById("incorrect").hidden = true;
            document.getElementById("statistics").hidden = true;
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

            document.getElementById("tweetPage").hidden = true;
            document.getElementById("correct").hidden = true;
            document.getElementById("incorrect").hidden = true;
            document.getElementById("statistics").hidden = false;
        })
        .catch(function (error) {
        console.warn('Something went wrong.', error);
    });


}