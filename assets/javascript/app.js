$(document).ready(function () {

	// Initial variable values
	var startButton = "<button class='btn btn-kelly btn-lg btn-block' id='startBtn'>Start</button>";
	var startArea = '<div class="col-xs-12 blur"></div><div class="col-xs-4"></div><div class="col-xs-4" id="actionArea"></div><div class="col-xs-4"></div>';

	// An Array to contain the questions from the question objects defined below
	var questions = [];

	// 0th Question Object
	var q0 = {
		question: "What was the first video game released to the public?",
		a1: "Pong",
		a2: "Tennis for Two",
		a3: "Zork",
		a4: "Computer Space"
	};
	// Adding question to questions array
	questions[questions.length] = q0;

	// 1st Question Object
	var q1 = {
		question: "Who is the main villain in Super Mario Bros.?",
		a1: "Ganon",
		a2: "Wario",
		a3: "Kamek",
		a4: "Bowser"
	};
	// Adding question to questions array
	questions[questions.length] = q1;


	// How to randomly select a question from the array of questions -- May eventually try to use the Knuth Shuffle to get a random question, too.
	// First get the indictator of the random question
	var randQuestionInd = questions[Math.floor(Math.random() * questions.length)];
	// Then select the question property of that question object
	var randQuestion = randQuestionInd.question;
	var heartsArea = '<div class="col-xs-12 blur"></div><div class="col-xs-10"></div><div class="col-xs-2"><h3 id="hearts"></h3></div>';
	var questionArea = '<h2 id="questionArea">Question: </h2><br><h3 id="randQuestion">' + randQuestion + '</h3>';
	var fullHearts = 0;
	var emptyHearts = 0;
	var answers = [randQuestionInd.a1, randQuestionInd.a2, randQuestionInd.a3, randQuestionInd.a4];
	var answerArea = '<ul id="answerArea"></ul>';
	var correctAnswer = randQuestionInd.a4;
	var resetButton = "<button class='btn btn-kelly btn-lg' id='resetBtn'>Try again?</button>";

	// The Fisher-Yates (aka Knuth) Shuffle algorithm - found here: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	// and here: https://bost.ocks.org/mike/shuffle/
	// and here: http://sedition.com/perl/javascript-fy.html
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	// Using the Knuth shuffle to randomize the answers
	var randAnswers = shuffle(answers);

	// A function to add answer buttons to the page
	function addAnswerBtns() {
		for (let k = 0; k < randAnswers.length; k++) {
			$("#answerArea").append('<button class="btn btn-kelly answerBtn"><li>' + randAnswers[k] + '</li></button>');
			console.log(randAnswers[k]);
		}
	}

	// Function to determine what happens when an answer button is clicked
	function guess() {
		var guessClick = $(this).text();
		console.log(guessClick + " was clicked");
		if (guessClick === correctAnswer) {
			correctGuess();
		} else {
			incorrectGuess();
		}
	}

	function correctGuess() {
		console.log("Correct!");
		countHearts();
	}

	function incorrectGuess() {
		console.log("You suck.");
		fullHearts--;
		emptyHearts++;
		countHearts();
	}

	function loser() {
		console.log("You LOSE!!!!")
		$("#answerArea").html("<h2>GAME OVER</h2>" + resetButton);
		$("#questionArea").hide();
		$("#randQuestion").hide();
		$("#startArea").off("click", ".answerBtn");
		$("#resetBtn").click(reset);
	}


	// Function to count hearts and add them to the page
	function countHearts() {
		$("#hearts").html("");
		for (let i = 0; i < fullHearts; i++) {
			$("#hearts").append('#');
		}
		for (let j = 0; j < emptyHearts; j++) {
			$("#hearts").append('*');
		}
		if (emptyHearts >= 3) {
			loser();
		}
	}



	// What happens when the start button is clicked:
	function startBtn() {
		// console.log("Start button clicked!");
		$("#startArea").html(heartsArea);
		$("#startArea").append(questionArea);
		countHearts();
		// console.log(randAnswers);
		$("#startArea").append(answerArea);
		addAnswerBtns();
		console.log("The correct answer is: " + correctAnswer);
		$("#startArea").on("click", ".answerBtn", guess);
	}


	reset();

	// What happens when the game is reset
	function reset() {
		$("#startArea").html(startArea);
		$("#actionArea").html(startButton);
		$("#startBtn").click(startBtn);
		fullHearts = 3;
		emptyHearts = 0;

		$("#questionArea").show();
		$("#randQuestion").show();
	}


});

