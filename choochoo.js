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
