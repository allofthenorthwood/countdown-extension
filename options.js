// Saves options to chrome.storage
function save_options() {
    var inputValue = document.getElementById('date-input').value;
    var date = moment(inputValue, "MM-DD-YYYY").format("X");
    chrome.storage.sync.set({
        countdownDate: date,
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        countdownDate: new Date(),
    }, function(items) {
        var formattedDate = moment(items.countdownDate, "X").format('MM-DD-YYYY');
        document.getElementById('date-input').value = formattedDate;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);