$(document).ready(function () {

	// Initial variable values
	var startButton = "<button class='btn btn-success btn-lg btn-block' id='startBtn'>Start</button>";
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
	questions[questions.length] = q0.question;

	// 1st Question Object
	var q1 = {
		question:"Who is the main villain in Super Mario Bros.?",
		a1: "Ganon",
		a2: "Wario",
		a3: "Kamek",
		a4: "Bowser"
	};
	// Adding question to questions array
	questions[questions.length] = q1.question;

	
	// How to randomly select a question from the array of questions
	var randQuestion = questions[Math.floor(Math.random() * questions.length)];
	var questionArea = '<div class="col-xs-12 blur"></div><div class="col-xs-10"></div><div class="col-xs-2"><h3 id="hearts"></h3></div><h2>Question: </h2><br><h3>' + randQuestion + '</h3>';
	var fullHearts = 0;
	var emptyHearts = 0;
	// var answers = $(randQuestion).a1;
	var answerArea = '<ul id="#answerArea"></ul>';
	

	// What happens when the start button is clicked:
	function startBtn () {
		console.log("Start button clicked!");
		$("#startArea").html(questionArea);
		for (let i = 0; i < fullHearts; i++) {
			$("#hearts").append('#');
		}
		for (let j = 0; j < emptyHearts; j++) {
			$("#hearts").append('*');
		}
		
	}

	// What happens when the game is reset
	function reset() {
		$("#startArea").html(startArea);
		$("#actionArea").html(startButton);
		$("#startBtn").click(startBtn);
		fullHearts = 3;
		emptyHearts = 0;
	}

	reset();



});