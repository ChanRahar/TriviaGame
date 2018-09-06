$(document).ready(function () {
    var questions = [
        {
            question: "This anime follows the story of a young ninja and his dream to become the leader of his village",
            answers: ["Naruto", "One Piece", "Bleach", "My Hero Academia", "Death Note"],
            values: [true, false, false, false, false],
            picture: "assets/images/naruto.jpg",
        },
        {
            question: "This anime follows the story of a pirate and his journey to be the next Pirate King",
            answers: ["My Hero Academia", "Naruto", "Death Note", "One Piece", "Bleach"],
            values: [false, false, false, true, false],
            picture: "assets/images/onepiece.jpg",
        },
        {
            question: "This anime follows the adventure of a young man that has acquired the power of a Death God to help his friends",
            answers: ["One Piece", "Death Note", "Bleach", "My Hero Academia", "Naruto"],
            values: [false, false, true, false, false],
            picture: "assets/images/bleach.jpg",
        },
        {
            question: "This anime follows the adventure of a human that has acquired the a notebook that could kill people just by writing his or her name into the notebook while thinking of the person face",
            answers: ["Death Note", "One Piece", "My Hero Academia", "Bleach", "Naruto"],
            values: [true, false, false, false, false],
            picture: "assets/images/deathnote.jpg",
        },
        {
            question: "This anime follows the adventure of a young man that had no superpower in a world where everyone is born with superpower",
            answers: ["Bleach", "Naruto", "Death Note", "My Hero Academia", "One Piece"],
            values: [false, false, false, true, false],
            picture: "assets/images/boku_no_hero_academia.jpg",
        }]

    var correct = 0;
    var wrong = 0;
    var none = 0;
    var currentQuestion = 0;



    $("#start").on("click", function () {
        $("#start").text(questionDis);

    })



    function questionDis() {
        $("#start").remove();
        $("#content").empty();

        $("body").css("background-image", "url(assets/images/background1.jpg)");

        var questionDiv = $("<div>");
        questionDiv.attr("class", "question-Div");
        var timer = $("<h2>");
        timer.addClass("timeHold");
        var question = $("<h2>");

        $("#content").append(questionDiv);
        $(".question-Div").append(timer);
        $(".question-Div").append(question);

        var time = 15;
        timer.text(time);

        var countDown = setInterval(function () {
            time--;
            timer.text(time);

            if (time === 0) {
                clearInterval(countDown);
                none++;
                noAns();
                // alert("Timed out. Correct answer is " + answerFind);

            }
        }, 1000);

        question.html(questions[currentQuestion].question);

        for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
            var answers = $("<button>");
            answers.html(questions[currentQuestion].answers[i]);
            answers.addClass("answer-buttons");
            answers.attr("value", questions[currentQuestion].values[i]);
            answers.attr("id", "a" + i);
            answers.appendTo(questionDiv);
        };
        $(".answer-buttons").on("click", function () {

            if ($(this).attr("value") === "true") {
                correct++;
                clearInterval(countDown);
                rightAns();
                // alert("That is Right");

            } else if ($(this).attr("value") === "false") {
                wrong++;
                clearInterval(countDown);
                wrongAns();
                // alert("That is Wrong. Correct answer is " + answerFind);

            };
        });
    };

    function rightAns() {
        var showAns = setTimeout(questionDis, 5* 1000);
        $("body").css("background-image", "url(" + questions[currentQuestion].picture + ")");
        $("#content").empty();
        var answerDiv = $("<div>");
        var winAns = $("<h3>");
        answerDiv.appendTo("#content");
        winAns.appendTo(answerDiv);
        winAns.text("That is Right");

        if (currentQuestion === (questions.length - 1)) {
            clearTimeout(showAns);
            setTimeout(gameOver, 5* 1000);
        }
        currentQuestion++;
    }

    function wrongAns() {
        var showAns = setTimeout(questionDis, 5* 1000);
        $("body").css("background-image", "url(" + questions[currentQuestion].picture + ")");
        $("#content").empty();
        var answerDiv = $("<div>");
        var winAns = $("<h3>");
        answerDiv.appendTo("#content");
        winAns.appendTo(answerDiv);
        winAns.text("That is Incorrect. Correct answer is " + questions[currentQuestion].answers[questions[currentQuestion].values.indexOf(true)]);

        if (currentQuestion === (questions.length - 1)) {
            clearTimeout(showAns);
            setTimeout(gameOver, 5* 1000);
        }
        currentQuestion++;
    }

    function noAns() {
        var showAns = setTimeout(questionDis, 5* 1000);
        $("body").css("background-image", "url(" + questions[currentQuestion].picture + ")");
        $("#content").empty();
        var answerDiv = $("<div>");
        var winAns = $("<h3>");
        answerDiv.appendTo("#content");
        winAns.appendTo(answerDiv);
        winAns.text("TIME OUT. Correct answer is " + questions[currentQuestion].answers[questions[currentQuestion].values.indexOf(true)]);

        if (currentQuestion === (questions.length - 1)) {
            clearTimeout(showAns);
            setTimeout(gameOver, 5* 1000);
        }
        currentQuestion++;

    }


    function again() {
        $("#content").empty();
        correct = 0;
        wrong = 0;
        none = 0;
        currentQuestion = 0;
        questionDis();
    }

    function gameOver() {
        $("#content").empty();
        $("body").css("background-image", "url(assets/images/background1.jpg)");
        var scorecard = $("<div>");
        scorecard.attr("class", "question-Div");
        var totalCorrect = $("<h3>");
        var totalIncorrect = $("<h3>");
        var totalNone = $("<h3>");
        scorecard.appendTo($("#content"));
        totalCorrect.appendTo(scorecard);
        totalCorrect.html("Correct: " + correct);
        totalIncorrect.appendTo(scorecard);
        totalIncorrect.html("Wrong: " + wrong);
        totalNone.appendTo(scorecard);
        totalNone.html("Missed: " + none);


        var restart = $("<button>");
        restart.addClass("restart");
        restart.text("Restart?");
        $("#content").append(restart);

        var restartTime = setTimeout(again, 10 * 1000);

        $(".restart").click(function () {
            again();
            clearTimeout(restartTime);
        })
    }

})