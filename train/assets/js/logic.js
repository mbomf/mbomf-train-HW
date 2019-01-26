/* global moment firebase */

$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyC0_sZHOurLqfmu7tR00iSYS88Eyw-AIHo",
    authDomain: "train-station-hw.firebaseapp.com",
    databaseURL: "https://train-station-hw.firebaseio.com",
    projectId: "train-station-hw",
    storageBucket: "train-station-hw.appspot.com",
    messagingSenderId: "697727367632"
  };
  firebase.initializeApp(config);
var database = firebase.database();

var myTimer = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    $("#current-time").text(d.toLocaleTimeString());
}

var frequency = 0; 
var firstTrain = 0;
// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("HH:mm");
  frequency = parseInt($("#frequency").val().trim());
  // console.log(typeof firstTrain);
  // Creates local "temporary" object for holding employee data
  console.log(firstTrain);
  console.log(typeof firstTrain);
  var firstTrainConverted = moment(firstTrain, "hh:mm");
  console.log(firstTrainConverted);
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log(diffTime);
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
   var minutesTillTrain = frequency - tRemainder;
  console.log(minutesTillTrain);
  // var nextTrain = firstTrainConverted.add(diffTime + minutesTillTrain).minutes();
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var nextTrain2 = moment().add(2, "minutes")
  console.log("num1" + nextTrain);
  console.log("num2" + nextTrain2);
  nextTrain = moment(nextTrain).format("HH:mm");
  console.log("num1" + nextTrain);
  
  
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    nextTrain: nextTrain,
    minutesTillTrain: minutesTillTrain
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Alert
  alert("Train successfully added");
 

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // console.log(childSnapshot.val());
  var tRow = $("<tr>");
  console.log("snapshot");
  // name: trainName,
  //   destination: destination,
  //   firstTrain: firstTrain,
  //   frequency: frequency,
  //   nextTrain: nextTrain,
  //   minutesTillTrain: minutesTillTrain
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;
  var nextTrain = childSnapshot.val().nextTrain;
  var minutesTillTrain = childSnapshot.val().minutesTillTrain;
  
  // Append the table row to the table body
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");

});
});
