 // $(document).ready(function(){
 var config = {
    apiKey: "AIzaSyASOBNXF2kyLrnFN11VRMBcWqbJ32WS080",
    authDomain: "train-scheduler-cae9d.firebaseapp.com",
    databaseURL: "https://train-scheduler-cae9d.firebaseio.com",
    projectId: "train-scheduler-cae9d",
    storageBucket: "",
    messagingSenderId: "543261079588"
  };

 firebase.initializeApp(config);

  // var database = firebase.database();

  // var dataRef = new Firebase("https://am-traintimes.firebaseio.com/");

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";


  $("#addTrain").on("click",function() {
  	trainName = $('#trainName').val().trim();
  	destination = $('#destination').val().trim();
  	firstTrain = $('#firstTrain').val().trim();
  	frequency = $('#frequency').val().trim();

  	firebase.database().ref().push({
  		trainName:trainName,
  		destination:destination,
  		firstTrain:firstTrain,
  		frequency:frequency,
  		timeAdded: firebase.database.ServerValue.TIMESTAMP

  		})
 		
  		$('.form-control').val('');
  		return false;
  });

  	firebase.database().ref().on('child_added',function(childSnapshot){

  		console.log(childSnapshot.val());


  	var trainName = childSnapshot.val().trainName;
  	var destination = childSnapshot.val().destination;
  	var firstTrain = childSnapshot.val().firstTrain;
  	var frequency = childSnapshot.val().frequency;

  		console.log(trainName);
  		console.log(destination);
  		console.log(firstTrain);
  		console.log(frequency);

  	$('#trainName').html(childSnapshot.val().trainName);
  	$('#destination').html(childSnapshot.val().destination);
  	$('#firstTrain').html(childSnapshot.val().firstTrain);
  	$('frequency').html(childSnapshot.val().frequency);

  

  	// var freq = parseInt(freq);

  	
  	var firstTimeConverted = moment(firstTrain,'HH:mm').subtract(1,'years');
  		console.log(firstTimeConverted);

  	var currentTime = moment();
  		console.log('CURRENT TIME: ' + moment(currentTime).format ('HH:mm'));

  	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  		console.log('DIFFERENCE IN TIME: ' + diffTime);

  	// var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
  	// var tDifference = moment()diff(moment(tConverted), 'minutes');

  		// console.log('DIFFERENCE IN TIME: ' + tDifference);
  	
  	var tRemainder = diffTime % frequency ;
  		console.log('TIME REMAINING: ' + tRemainder);

  	var minutesAway = frequency - tRemainder;
  		console.log('MINUTES UNTIL NEXT TRAIN: ' + minutesAway) ;

  	var nextTrain = moment().add(minutesAway, 'minutes');
  		console.log('ARRIVAL TIME: ' + moment(nextTrain).format('HH:mm A'));

  	var nextArrival = moment(nextTrain).format('HH:mm');

  // $('#currentTime').text(currentTime);

  // $('#trainTable > tbody').append(
  // 		"<tr><td id= 'nameDisplay'>" + childSnapshot.val().trainName + 
  // 		"</td><td id= 'destDisplay'>" + childSnapshot.val().destination +
  // 		"</td><td id= 'freqDisplay'>" + childSnapshot.val().frequency +
  // 		"</td><td id= 'nextDisplay'>" + moment(nextTrain).format('HH:mm') + 		
  // 		"</td><td id= 'awayDisplay'>" + minutesAway + ' minutes until arrival' + "</td></tr>");

  $('#trainTable > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival +
  	"</td><td>" + minutesAway + "</td></tr>");
},

	function(errorObject){
		console.log("Try again: " + errorObject.code)
	})
// })































