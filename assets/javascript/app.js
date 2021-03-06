$(document).ready(function () {
	console.log("-----------------Page Load------------------");


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

	// 3rd Question Object
	var q3 = {
		question: "In Mario Kart, what color is the shell that goes straight for the leader?",
		a1: "Red",
		a2: "Green",
		a3: "Yellow",
		a4: "Blue",
		image: '<img class="guessImg" src="assets/images/blueshell.png" alt="Mario Kart Blue Shell">'
	};
	// Adding question to questions array
	questions[questions.length] = q3;

	// 4th Question Object
	var q4 = {
		question: "Who hails from the planet K-2L and wears a Power Suit?",
		a1: "Adam Malkovich",
		a2: "Metroid",
		a3: "Chozo",
		a4: "Samus Aran",
		image: '<img class="guessImg" src="assets/images/samus.jpg" alt="Samus Aran">'
	};
	// Adding question to questions array
	questions[questions.length] = q4;

	// 5th Question Object
	var q5 = {
		question: "In the Tekken series, who is the old dude with grey hair that looks like wings?",
		a1: "Jin Kazama",
		a2: "Yoshimitsu",
		a3: "Claudio Serafino",
		a4: "Heihachi Mishima",
		image: '<img class="guessImg" src="assets/images/Heihachi-Mishima.png" alt="Heihachi Mishima">'
	};
	// Adding question to questions array
	questions[questions.length] = q5;

	// 6th Question Object
	var q6 = {
		question: "Beginning in Tekken 3, who is the main fighter specializing in Capoeira?",
		a1: "Katarina Alves",
		a2: "Tiger Jackson",
		a3: "Christie Monteiro",
		a4: "Eddy Gordo",
		image: '<img class="guessImg" src="assets/images/eddy-gordo.jpg" alt="Eddy Gordo">'
	};
	// Adding question to questions array
	questions[questions.length] = q6;

	// 7th Question Object
	var q7 = {
		question: "What is the name of Princess Zelda's secret identity in Ocarina of Time?",
		a1: "Navi",
		a2: "Link",
		a3: "Impa",
		a4: "Sheik",
		image: '<img class="guessImg" src="assets/images/sheik.jpg" alt="Sheik">'
	};
	// Adding question to questions array
	questions[questions.length] = q7;

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
	var randQuestionInd = shuffledQuestions[questionsAsked];
	// Then select the question property of that question object
	var randQuestion = randQuestionInd.question;
	var answerImage = randQuestionInd.image;
	var heartsArea = '<div class="col-xs-12 blur"></div><div class="col-xs-10"><h3 id="timerArea"></h3></div><div class="col-xs-2"><h3 id="hearts"></h3></div>';
	var questionArea = '<h2 id="questionArea">Question: </h2><br><h3 id="randQuestion">' + randQuestion + '</h3>';
	var fullHearts = 3;
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

			// console.log("Time Up!");
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
		if (questionsAsked === questions.length && emptyHearts < 3) {
			nextQTimer = setTimeout(function () {
				winner();
			}, 5000);
		} else if (emptyHearts >= 3) {
			nextQTimer = setTimeout(function () {
				loser();
			}, 5000);
		} else {
			nextQTimer = setTimeout(function () {
				nextQuestion();
			}, 5000);
		}
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
				winner();
			}, 5000);
		} else {
			nextQTimer = setTimeout(function () {
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
				loser();
			}, 5000);
		} else if (questionsAsked === questions.length) {
			nextQTimer = setTimeout(function () {
				winner();
			}, 5000);
		} else {
			nextQTimer = setTimeout(function () {
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
		randQuestionInd = shuffledQuestions[questionsAsked];
		randQuestion = randQuestionInd.question;
		answers = [randQuestionInd.a1, randQuestionInd.a2, randQuestionInd.a3, randQuestionInd.a4];
		correctAnswer = randQuestionInd.a4;
		randAnswers = shuffle(answers);
		answerImage = randQuestionInd.image;
		$("#questionArea").show();
		$("#questionArea").html("Question:");
		$("#randQuestion").show();
		$("#randQuestion").html(randQuestion);
		$("#answerArea").html('');
		addAnswerBtns();
		// console.log(questions);
		// console.log(randQuestionInd);
		// console.log(randQuestion);
		// console.log("Questions asked: " + questionsAsked);
		// console.log("The correct answer is: " + correctAnswer);
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
		// console.log("The correct answer is: " + correctAnswer);
		$("#startArea").on("click", ".answerBtn", guess);
		questionsAsked++;
		run();
	}


	$("#startArea").html(startArea);
	$("#actionArea").html(startButton);
	$("#startBtn").click(startBtn);

	// What happens when the game is reset
	function reset() {
		
		fullHearts = 3;
		emptyHearts = 0;

		timer = 31;
		questionsAsked = 0;
		rights = 0;
		wrongs = 0;
		unanswered = 0;

		// Need to reinitialize these variables so I can get different questions each time, as well as the right question to match the answers.
		shuffledQuestions = shuffle(questions);
		randQuestionInd = shuffledQuestions[questionsAsked];
		randQuestion = randQuestionInd.question;
		answers = [randQuestionInd.a1, randQuestionInd.a2, randQuestionInd.a3, randQuestionInd.a4];
		correctAnswer = randQuestionInd.a4;
		randAnswers = shuffle(answers);
		answerImage = randQuestionInd.image;
		questionArea = '<h2 id="questionArea">Question: </h2><br><h3 id="randQuestion">' + randQuestion + '</h3>';

		$("#startArea").html(startArea);
		$("#actionArea").html(startButton);
		$("#startBtn").click(startBtn);

		// So I can see if randomization of questions is working
		console.log("~*~*~*~*~*~*~*~*~*~*Reset Load~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~");
		// console.log(questions);
		// console.log(randQuestionInd);
		// console.log(randQuestion);
		// console.log("Questions asked: " + questionsAsked);


		$("#questionArea").show();
		$("#randQuestion").show();
	}


});

