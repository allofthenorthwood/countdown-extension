var blastoff = "06-24-2016";

var count = document.getElementById('count');
var now = moment();
var then = moment(blastoff, "MM-DD-YYYY");

count.innerText = then.diff(now, "days") + 1;