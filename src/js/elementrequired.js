/**
 * These functions are required for certain form elements to work correctly.
 */
// Select Box
function trigger(list) {
    document.getElementById(list).classList.toggle('show');
}

function selected(selected, button, items) {
    document.getElementById(button).innerHTML = selected.innerHTML + '<span class="chevron bottom"></span>';
    trigger(items);
}


$(function () {
    $('#datepicker').datetimepicker({
        format: 'L'
    });
});
$(function () {
    $('#timepicker').datetimepicker({
        format: 'LT'
    });
});