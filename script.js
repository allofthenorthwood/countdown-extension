
chrome.storage.sync.get({
    countdownDate: new Date(),
}, function(items) {
    var count = document.getElementById('count');
    var now = moment();
    var then = moment(items.countdownDate, "X");

    count.innerText = then.diff(now, "days") + 1;
});