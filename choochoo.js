var firebaseConfig = {
    apiKey: "AIzaSyDx1h0vVmxW0sD-hiGxPgq7xtfqTWKfksc",
    authDomain: "train-activity-923a8.firebaseapp.com",
    databaseURL: "https://train-activity-923a8.firebaseio.com",
    projectId: "train-activity-923a8",
    storageBucket: "train-activity-923a8.appspot.com",
    messagingSenderId: "767746655006",
    appId: "1:767746655006:web:f8c8958f449b597266ff0f",
    measurementId: "G-WHYREPBKXT"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

$("button").on("click", function (event) {
    event.preventDefault();
    // Grabbed values from text-boxes
    var name = $("#train-name").val().trim();
    var destination = $("#train-des").val().trim();
    var firstTime = $("#train-first").val().trim();
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var frequency = $("#train-min").val().trim();
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("LT");
    // Code for "Setting values in the database"
    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        nextTrain: nextTrain,
        tRemainder: tRemainder,
        diffTime: diffTime,
        tMinutesTillTrain: tMinutesTillTrain
    });
});
database.ref().on("child_added", function (snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTime);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().tRemainder);
    console.log(snapshot.val().nextTrain);
    console.log(snapshot.val().diffTime);
    console.log(snapshot.val().tRemainder);
    // Change the HTML to reflect
    // prev search
    var prevName = $("<td>").html(snapshot.val().name);
    var prevDes = $("<td>").html(snapshot.val().destination);
    var prevFreq = $("<td>").html(snapshot.val().frequency);
    var prevNext = $("<td>").html(snapshot.val().nextTrain);
    var prevMin = $("<td>").html(snapshot.val().tRemainder);
    var rowDis = $("<tr>").append(prevName, prevDes, prevFreq, prevNext, prevMin);
    $("#prev-train-section").append(rowDis);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
database.ref().limitToLast(1).on("child_added", function(snap){
    var prevName = $("<td>").html(snap.val().name);
    var prevDes = $("<td>").html(snap.val().destination);
    var prevFreq = $("<td>").html(snap.val().frequency);
    var prevNext = $("<td>").html(snap.val().nextTrain);
    var prevMin = $("<td>").html(snap.val().tRemainder);
    var rowDis = $("<tr>").append(prevName, prevDes, prevFreq, prevNext, prevMin);
    $("#train-recent").append(rowDis);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});