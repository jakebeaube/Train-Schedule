
 // Initialize Firebase
var config = {
  apiKey: "AIzaSyBidt0FQ6UBmLSWexYRNIsIZYEo1sklTRQ",
  authDomain: "train-b9ca0.firebaseapp.com",
  databaseURL: "https://train-b9ca0.firebaseio.com",
  projectId: "train-b9ca0",
  storageBucket: "train-b9ca0.appspot.com",
  messagingSenderId: "471096755144"
};
firebase.initializeApp(config);

var database = firebase.database();
//$(document).on('click', '.delete', deletetrain);
$(document).ready(function(){

	$("#submit").on("click", function(){
		event.preventDefault();

		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var firstTrain = moment($("#trainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
		var frequency = $("#frequencyInput").val().trim();


		var trainInfo = {
			name: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency
		};
		//uploads to database
		database.ref().push(trainInfo);
		//logs in console
		console.log(trainInfo.name);
		console.log(trainInfo.destination);
		console.log(trainInfo.firstTrain);
		console.log(trainInfo.frequency);

		//clear all text boxes
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

		return false;
	});

	// Creates firebase event for adding trains to database and a new row in html

	database.ref().on("child_added", function(childSnapshot, prevChildKey){
		// stores everything in a variable
		var trainName = childSnapshot.val().name;
		var destination = childSnapshot.val().destination;
		var firstTrain = childSnapshot.val().firstTrain;
		var frequency = childSnapshot.val().frequency;

		// Tells user when next train arrives
		var timeDifference = moment().diff(moment.unix(firstTrain), "minutes");
		var minutesAway = frequency - (timeDifference % frequency);
		var nextTrain = moment().add(minutesAway, "minutes").format('HH:mm');
		var correctedTrain = trainName.replace(/ /g, '');

		// Adds train data to table
		$("#trainTable > tbody").append("<tr id =" + correctedTrain + "><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td><td>" + "<button class="+ "delete btn-xs data-name=" + correctedTrain + ">delete</button>" + "</td></tr>");

	});

		setInterval(date, 1000);

		function date(){
		// displays current time at top of page
			$("#todaydate").html(moment(new Date()).format('LTS'));

		}

		//function deletetrain(){
		//var trainId = $(this).attr('data-name');
	
		//$('#'+ trainId).empty();
	//}

	


});

