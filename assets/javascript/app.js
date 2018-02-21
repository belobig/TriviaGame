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
		a4: "Computer Space",
		image: '<img class="guessImg" src="assets/images/computer-space.jpg" alt="Computer Space game">'
	};
	// Adding question to questions array
	questions[questions.length] = q0;

	// 1st Question Object
	var q1 = {
		question: "Who is the main villain in Super Mario Bros.?",
		a1: "Ganon",
		a2: "Wario",
		a3: "Kamek",
		a4: "Bowser",
		image: '<img class="guessImg" src="assets/images/bowser-small.png" alt="Bowser">'
	};
	// Adding question to questions array
	questions[questions.length] = q1;

	// 2nd Question Object
	var q2 = {
		question: "In the original The Legend of Zelda, who was the main boss?",
		a1: "Ganondorf",
		a2: "Bowser",
		a3: "Majora",
		a4: "Ganon",
		image: '<img class="guessImg" src="assets/images/ganon.png" alt="Ganon">'
	};
	// Adding question to questions array
	questions[questions.length] = q2;

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

	//variables for end game tally
	var questionsAsked = 0;
	var rights = 0;
	var wrongs = 0;
	var unanswered = 0;
	var qAskedLabel;
	var rightsLabel;
	var wrongsLabel;
	var unansLabel;

	//variables for timers
	var timer = 31;
	var intervalId;
	var nextQTimer;

	// How to randomly select a question from the array of questions using the Knuth shuffle
	// First shuffle the questions array
	var shuffledQuestions = shuffle(questions);
	// then get the indicator of the selected question
	var randQuestionInd = shuffledQuestions[0];
	// Then select the question property of that question object
	var randQuestion = randQuestionInd.question;
	var answerImage = randQuestionInd.image;
	var heartsArea = '<div class="col-xs-12 blur"></div><div class="col-xs-10"><h3 id="timerArea"></h3></div><div class="col-xs-2"><h3 id="hearts"></h3></div>';
	var questionArea = '<h2 id="questionArea">Question: </h2><br><h3 id="randQuestion">' + randQuestion + '</h3>';
	var fullHearts = 0;
	var emptyHearts = 0;
	var answers = [randQuestionInd.a1, randQuestionInd.a2, randQuestionInd.a3, randQuestionInd.a4];
	var answerArea = '<ul id="answerArea"></ul>';
	var correctAnswer = randQuestionInd.a4;
	var resetButton = "<button class='btn btn-kelly btn-lg' id='resetBtn'>Try again?</button>";

	// Using the Knuth shuffle to randomize the answers
	var randAnswers = shuffle(answers);

	// Main timer functions
	function run() {
		clearInterval(intervalId);
		intervalId = setInterval(decrement, 1000);
	}

	function decrement() {

		timer--;

		$("#timerArea").html("Time: " + timer);

		if (timer === 0) {

			stop();
			timer = 31;

			console.log("Time Up!");
			timeUp();
		}
	}

	function stop() {

		clearInterval(intervalId);
	}



	function timeUp() {
		$("#answerArea").html("<h3>" + correctAnswer + "</h3>" + answerImage);
		$("#questionArea").html("Time UP!");
		$("#randQuestion").html("The correct answer was:");
		fullHearts--;
		emptyHearts++;
		unanswered++;
		countHearts();
		nextQTimer = setTimeout(function () {
			// console.log("5s timeout from TimeUp");
			nextQuestion();
		}, 5000);
	}


	// A function to add answer buttons to the page
	function addAnswerBtns() {
		for (let k = 0; k < randAnswers.length; k++) {
			$("#answerArea").append('<button class="btn btn-kelly answerBtn"><li>' + randAnswers[k] + '</li></button>');
			// console.log(randAnswers[k]);
		}
	}

	// Function to determine what happens when an answer button is clicked
	function guess() {
		var guessClick = $(this).text();
		// console.log(guessClick + " was clicked");

		if (guessClick === correctAnswer) {
			correctGuess();
		} else {
			incorrectGuess();
		}
	}

	function correctGuess() {
		// console.log("Correct!");
		stop();
		$("#answerArea").html("<h2>Correct!</h2>" + answerImage);
		$("#questionArea").hide();
		$("#randQuestion").hide();
		rights++;
		countHearts();
		if (questionsAsked === questions.length) {
			nextQTimer = setTimeout(function () {
				// console.log("5s timeout from correctGuess");
				winner();
			}, 5000);
		} else {
			nextQTimer = setTimeout(function () {
				// console.log("5s timeout from correctGuess");
				nextQuestion();
			}, 5000);
		}
	}

	function incorrectGuess() {
		// console.log("You suck.");
		stop();
		$("#answerArea").html("<h3>" + correctAnswer + "</h3>" + answerImage);
		$("#questionArea").html("Wrong.");
		$("#randQuestion").html("The correct answer was:");
		fullHearts--;
		emptyHearts++;
		wrongs++;
		countHearts();
		if (emptyHearts >= 3) {
			nextQTimer = setTimeout(function () {
				// console.log("5s timeout from incorrectGuess");
				loser();
			}, 5000);
		} else {
			nextQTimer = setTimeout(function () {
				// console.log("5s timeout from incorrectGuess");
				nextQuestion();
			}, 5000);
		}
	}

	function loser() {
		console.log("You LOSE!!!!");
		clearTimeout(nextQTimer);
		nextQTimer = null;
		stop();
		qAskedLabel = "<h3>Questions Asked: " + questionsAsked + "</h3>";
		rightsLabel = "<h3>Correct Answers: " + rights + "</h3>";
		wrongsLabel = "<h3>Wrong Answers: " + wrongs + "</h3>";
		unansLabel = "<h3>Unanswered: " + unanswered + "</h3>";

		$("#answerArea").html("<h2>GAME OVER</h2>" + qAskedLabel + rightsLabel + wrongsLabel + unansLabel + resetButton);
		$("#questionArea").hide();
		$("#randQuestion").hide();
		$("#startArea").off("click", ".answerBtn");
		$("#resetBtn").click(reset);
	}

	function winner() {
		console.log("You WIN!!!!");
		clearTimeout(nextQTimer);
		nextQTimer = null;
		stop();
		qAskedLabel = "<h3>Questions Asked: " + questionsAsked + "</h3>";
		rightsLabel = "<h3>Correct Answers: " + rights + "</h3>";
		wrongsLabel = "<h3>Wrong Answers: " + wrongs + "</h3>";
		unansLabel = "<h3>Unanswered: " + unanswered + "</h3>";

		$("#answerArea").html("<h2>YOU WIN!</h2>" + qAskedLabel + rightsLabel + wrongsLabel + unansLabel + resetButton);
		$("#questionArea").hide();
		$("#randQuestion").hide();
		$("#startArea").off("click", ".answerBtn");
		$("#resetBtn").click(reset);
	}

	function nextQuestion() {
		for (let m = 0; m < shuffledQuestions.length; m++) {
			randQuestionInd = shuffledQuestions[m];
		}
		randQuestion = randQuestionInd.question;
		answers = [randQuestionInd.a1, randQuestionInd.a2, randQuestionInd.a3, randQuestionInd.a4];
		correctAnswer = randQuestionInd.a4;
		randAnswers = shuffle(answers);
		answerImage = randQuestionInd.image;
		// console.log(randQuestionInd);
		$("#questionArea").show();
		$("#questionArea").html("Question:");
		$("#randQuestion").show();
		$("#randQuestion").html(randQuestion);
		$("#answerArea").html('');
		// for (let n = 0; n < randAnswers.length; n++) {
		// 	$("#answerArea").append('<button class="btn btn-kelly answerBtn"><li>' + randAnswers[n] + '</li></button>');
		// 	console.log(randAnswers[n]);
		// }
		addAnswerBtns();
		console.log("The correct answer is: " + correctAnswer);
		timer = 31;
		questionsAsked++;
		run();
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

	}



	// What happens when the start button is clicked:
	function startBtn() {
		// console.log(shuffledQuestions);
		$("#startArea").html(heartsArea);
		$("#startArea").append(questionArea);
		countHearts();
		// console.log(randAnswers);
		$("#startArea").append(answerArea);
		addAnswerBtns();
		console.log("The correct answer is: " + correctAnswer);
		$("#startArea").on("click", ".answerBtn", guess);
		questionsAsked++;
		run();
	}


	

	// What happens when the game is reset
	function reset() {
		$("#startArea").html(startArea);
		$("#actionArea").html(startButton);
		$("#startBtn").click(startBtn);
		fullHearts = 3;
		emptyHearts = 0;

		timer = 31;
		questionsAsked = 0;
		rights = 0;
		wrongs = 0;
		unanswered = 0;

		// Trying to figure out the right way to reinitialize these variables so I can get different questions each time.
		randQuestionInd = shuffledQuestions[0];
		answers = [randQuestionInd.a1, randQuestionInd.a2, randQuestionInd.a3, randQuestionInd.a4];
		correctAnswer = randQuestionInd.a4;
		randAnswers = shuffle(answers);
		answerImage = randQuestionInd.image;

		// So I can see if randomization of questions is working
		console.log(questions);
		console.log(shuffledQuestions);
		console.log(randQuestionInd);

		// Setting all these variables to null just breaks things.
		// randQuestion = null;
		// answers = null;
		// correctAnswer = null;
		// randAnswers = null;
		// answerImage = null;

		$("#questionArea").show();
		$("#randQuestion").show();
	}


	reset();


});

