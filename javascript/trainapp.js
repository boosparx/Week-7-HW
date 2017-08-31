  var config = {
    apiKey: "AIzaSyC1CKTDOKDXVu0etWisVy2Yd8nmjKBe3zY",
    authDomain: "sparxworx-51a5a.firebaseapp.com",
    databaseURL: "https://sparxworx-51a5a.firebaseio.com",
    projectId: "sparxworx-51a5a",
    storageBucket: "sparxworx-51a5a.appspot.com",
    messagingSenderId: "691309062100"
  };

firebase.initializeApp(config);

var database = firebase.database();
$('#addTrainBtn').on("click", function() {
  // take user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    
  database.ref().push(newTrain);
  console.log(newTrain.name);
  
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  
  return false;
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;

  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);
 
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + timeDiff);
  
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
 
  var minToTrain = frequency - timeRemainder;
 
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});























