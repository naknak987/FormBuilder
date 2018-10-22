/**
 * These functions are required for certain form elements to work correctly.
 */
// Select Box
function trigger(list, ev) {
    ev.stopPropagation();
    document.getElementById(list).classList.toggle('show-me');
}

function selected(selected, button, inputElId, items) {
    document.getElementById(button).innerHTML = selected.innerHTML + '<span class="chevron bottom"></span>';
    document.getElementById(inputElId).value = selected.innerHTML;
    //trigger(items);
    document.getElementById(items).classList.toggle('show-me');
}

$(document).click(function() {
    let all = document.getElementsByClassName('selector');
    for(let i = 0; i < all.length; i++) {
        if (all[i].classList.contains('show-me')) {
            all[i].classList.toggle('show-me');
        }
    }
})

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