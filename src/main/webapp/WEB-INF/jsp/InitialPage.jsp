<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Guess The Author Game</title>
    </head>

    <body>
        <div id="initialPage">
            <input type="text" id="username1">
            <input type="text" id="username2">
            <button onclick="startGame()">Start Playing!</button>
        </div>






        <div id="tweetPage" hidden>
            <p id="placeForTweetText"></p>
            <button id="answer1" name=""></button>
            <button id="answer2" name=""></button>

            <div id="resultsForThisTweet">
                <div id="correct" hidden>
                    <h2 >Correct!</h2>
                    <button onclick=""></button>
                </div>

                <div id="incorrect" hidden>
                    <h2>Sorry, incorrect!</h2>
                    <button onclick=""></button>
                </div>
            </div>
        </div>

        <div id="statistics" hidden>
            <p id="placeForStatistics"></p>
        </div>



        <script src="/js/index.js"></script>
    </body>



</html>