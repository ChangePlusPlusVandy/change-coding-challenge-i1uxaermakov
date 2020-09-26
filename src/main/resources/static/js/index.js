
let firstChoiceClicked = false
let secondChoiceClicked = false

document.getElementById("answer1").addEventListener("click", makeAGuessAndCheckCorrectness)
document.getElementById("answer2").addEventListener("click", makeAGuessAndCheckCorrectness)



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
            let tweetJSON = json;
            console.log(tweetJSON, json);
            console.log(tweetJSON.text)
            document.getElementById("placeForTweetText").innerHTML = tweetJSON.text;
            const tweetId = document.getElementById("tweetPage").tweetLongId = tweetJSON.id;
            document.getElementById("answer1").innerHTML = username1;

            document.getElementById("answer2").innerHTML = username2;


            document.getElementById("initialPage").hidden = true;
            document.getElementById("tweetPage").hidden = false;
        })
        .catch(function (error) {
            console.warn('Something went wrong.', error);
        })
}






const makeAGuessAndCheckCorrectness = function() {

    //determine what button was clicked


    const tweetId = document.getElementById("tweetPage").tweetLongId;
    console.log("tweetId"+tweetId)

    fetch('/MakeAGuess', {
        method: 'POST',
        body: 'usernameChosen=' + usernameChosen + '&tweetId=' + tweetLongId,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json())
        .then(json => {
            let isGuessCorrect = json;
            if(isGuessCorrect) {
                document.getElementById("correct").hidden = false;
            }
            else {
                document.getElementById("incorrect").hidden = false;
            }
        })
        .catch(function (error) {
        console.warn('Something went wrong.', error);
    });

}



const playAgain = function() {
    fetch('/playAnotherRound', {
        method: 'GET',
        body: '',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            let newTweetJSON = json;
            document.getElementById("placeForTweetText").innerHTML = newTweetJSON.text;

            document.getElementById("tweetPage").hidden = true;
            document.getElementById("correct").hidden = true;
            document.getElementById("incorrect").hidden = true;
            document.getElementById("statistics").hidden = false;
        })
        .catch(function (error) {
        console.warn('Something went wrong.', error);
    });

x

}





const showStatistics = function() {
    fetch('/statistics', {
        method: 'GET',
        body: 'usernameChosen=' + usernameChosen,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json()) // expecting a json response
        .then(json => {
            let statistics = json;
            document.getElementById("placeForStatistics").innerHTML =
                "You made " + statistics.correctAttempts + " correct guesses out of " +
                statistics.incorrectAttempts + " attempts!";

            document.getElementById("tweetPage").hidden = true;
            document.getElementById("correct").hidden = true;
            document.getElementById("incorrect").hidden = true;
            document.getElementById("statistics").hidden = false;
        })
        .catch(function (error) {
        console.warn('Something went wrong.', error);
    });


}