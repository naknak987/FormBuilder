var titleCNT = 0; 
var textCNT = 0;
var labelCNT = 0;
var textBoxCNT = 0;
var textboxDef = {};
var blankSpaceCNT = 0;
var checkboxCNT = 0;
var checkboxDef = {};
var radiobuttonCNT = 0;
var radiobuttonDef = {};
var selectboxCNT = 0;
var selectboxDef = {};
var textareaCNT = 0;
var textareaDef = {};
var datepickerCNT = 0;
var datepickerDef = {};
var timepickerCNT = 0;
var timepickerDef = {};
var attachmentCNT = 0;
var attachmentDef = {};
var row = '<div class="row" style="width:100%;margin-bottom:6px;" id="rowNum" ondrop="rowDrop(event, this)" ondragover="allowDrop(event)" ondragenter="this.style.padding=\'1px 24px 24px 1px\'" ondragleave="this.style.padding=\'1px 12px 12px 1px\'"></div>';
var col = '<div class="col" style="height:100%;" id="colNum" ondrop="colDrop(event, this)" ondragover="allowDrop(event)" ondragenter="this.style.padding=\'1px 24px 24px 1px\'" ondragleave="this.style.padding=\'1px 12px 12px 1px\'"></div>';
var rowCNT = 0;
var colCNT = 0;

var elements = [
    'title',
    'text-block',
    'label',
    'text-box',
    'blank-space',
    'checkbox',
    'radiobutton',
    'selectbox-container',
    'textarea',
    'datepickerCon',
    'timepickerCon',
    'attachmentCon',
];

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, el) {
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    ev.target.insertAdjacentHTML('beforeend', row);
    var newRow = document.getElementById('rowNum');
    rowCNT += 1;
    newRow.id = newRow.id + rowCNT;

    newRow.insertAdjacentHTML('beforeend', col);
    var newCol = document.getElementById('colNum');
    colCNT += 1;
    newCol.id = newCol.id + colCNT;

    if (elements.indexOf(data) != -1) {
        var ClonedEl = document.getElementById(data).cloneNode(true);
    } else {
        var ClonedEl = document.getElementById(data);
    }
    insert(newCol, ClonedEl);
}

function rowDrop(ev, el) {
    el.style.padding = '1px 12px 12px 1px';
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    ev.target.insertAdjacentHTML('beforeend', col);
    var newCol = document.getElementById('colNum');
    colCNT += 1;
    newCol.id = newCol.id + colCNT;

    if (elements.indexOf(data) != -1) {
        var ClonedEl = document.getElementById(data).cloneNode(true);
    } else {
        var ClonedEl = document.getElementById(data);
    }
    insert(newCol, ClonedEl);
}

function colDrop(ev, el) {
    el.style.padding = '1px 12px 12px 1px';
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var dataEl = ev.target;
    while (dataEl.id.substring(0,3) != 'col'){
        dataEl = dataEl.parentNode;
    }

    if (elements.indexOf(data) != -1) {
        var ClonedEl = document.getElementById(data).cloneNode(true);
    } else {
        var ClonedEl = document.getElementById(data);
    }
    insert(dataEl, ClonedEl);
}

function deleteElement(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    parentEl = document.getElementById(data).parentNode;
    if (elements.indexOf(data) == -1) { 
        parentEl.removeChild(document.getElementById(data));
        while ((parentEl.childElementCount == 0) && (parentEl.id != 'form-area')) {
            var CurrentEl = parentEl;
            parentEl = parentEl.parentNode;
            CurrentEl.remove();
        }
    }
}

function insert(parEl, chiEl) {
    switch (chiEl.id) {
        case 'title':
            titleCNT += 1;
            chiEl.id = chiEl.id + titleCNT;
            setupTitle(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'text-block': 
            textCNT += 1;
            chiEl.id = chiEl.id + textCNT;
            setupTextBlock(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'label':
            labelCNT += 1;
            chiEl.id = chiEl.id + labelCNT;
            setupLabel(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'text-box':
            textBoxCNT += 1;
            chiEl.name = chiEl.name + '-' + textBoxCNT;
            chiEl.id = chiEl.id + textBoxCNT;
            setupTextBox(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'blank-space':
            blankSpaceCNT += 1;
            chiEl.id = chiEl.id + blankSpaceCNT;
            setupBlankSpace(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'checkbox':
            checkboxCNT += 1;
            chiEl.name = chiEl.name + '-' + checkboxCNT;
            chiEl.id = chiEl.id + checkboxCNT;
            setupCheckbox(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'radiobutton':
            radiobuttonCNT += 1;
            chiEl.name = chiEl.name + '_' + radiobuttonCNT;
            chiEl.id = chiEl.id + radiobuttonCNT;
            setupRadioButton(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'selectbox-container':
            selectboxCNT += 1;
            chiEl.id = chiEl.id + selectboxCNT;
            setupSelectBox(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'textarea':
            textareaCNT += 1;
            chiEl.id = chiEl.id + textareaCNT;
            setupTextArea(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'datepickerCon':
            datepickerCNT += 1;
            chiEl.id = chiEl.id + datepickerCNT;
            setupDatePicker(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'timepickerCon':
            timepickerCNT += 1;
            chiEl.id = chiEl.id + timepickerCNT;
            setupTimePicker(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'attachmentCon':
            attachmentCNT += 1;
            chiEl.id = chiEl.id + attachmentCNT;
            setupAttachment(chiEl);
            parEl.appendChild(chiEl);
        default:
            parentEl = chiEl.parentNode;
            parEl.appendChild(chiEl);
            while ((parentEl.childElementCount == 0) && (parentEl.id != 'form-area')) {
                var CurrentEl = parentEl;
                parentEl = parentEl.parentNode;
                CurrentEl.remove();
            }
            break;
    }
}

function ClosePopup(CurrentEl) {
    var parEl = document.getElementById(CurrentEl).parentElement;
    document.getElementById(CurrentEl).remove();
    if (parEl.childElementCount == 0) {
        var parParEl = parEl.parentElement;
        parEl.remove();
        if (parParEl.childElementCount == 0) {
            parParEl.remove();
        }
    }
    document.getElementById('set-element').classList.toggle("show");
}

function ExportForm() {
    var formHTML = document.getElementById('form-area').innerHTML;
    while (formHTML.includes(' draggable="true"'))
    {
        formHTML = formHTML.replace(' draggable="true"', '');
    }
    while (formHTML.includes(' ondragstart="drag(event)"'))
    {
        formHTML = formHTML.replace(' ondragstart="drag(event)"', '');
    }
    while (formHTML.includes(' ondrop="rowDrop(event, this)" ondragover="allowDrop(event)"'))
    {
        formHTML = formHTML.replace(' ondrop="rowDrop(event, this)" ondragover="allowDrop(event)"', '');
    }
    while (formHTML.includes(' ondrop="colDrop(event, this)" ondragover="allowDrop(event)"'))
    {
        formHTML = formHTML.replace(' ondrop="colDrop(event, this)" ondragover="allowDrop(event)"', '');
    }
    while (formHTML.includes(' ondragenter="this.style.padding=\'1px 24px 24px 1px\'"'))
    {
        formHTML = formHTML.replace(' ondragenter="this.style.padding=\'1px 24px 24px 1px\'"', '');
    }
    while (formHTML.includes(' ondragleave="this.style.padding=\'1px 12px 12px 1px\'"'))
    {
        formHTML = formHTML.replace(' ondragleave="this.style.padding=\'1px 12px 12px 1px\'"', '');
    }
    while (formHTML.includes(' style="height:100%;"'))
    {
        formHTML = formHTML.replace(' style="height:100%;"', '');
    }
    var formName = document.getElementById('form-name').value;
    var popup = document.getElementById('Errors');
    if (formName == '') {
        popup.innerHTML = "Please name your form first!";
        popup.classList.toggle("show");
        popup.scrollIntoView(true);
        setTimeout(function(){ 
            popup.classList.toggle("show"); 
            popup.click();
        }, 4000);
    } else if (formHTML == '') {
        popup.innerHTML = "Did you build a form?";
        popup.classList.toggle("show");
        popup.scrollIntoView(true);
        setTimeout(function(){ 
            popup.classList.toggle("show"); 
            popup.click();
        }, 4000); 
    } else {
        var retVal = {
            'name':formName,
            'html':formHTML,
            'definition':{
                'textbox':textboxDef,
                'checkbox':checkboxDef,
                'radiobutton':radiobuttonDef,
                'selectbox':selectboxDef,
                'dates':datepickerDef,
                'times':timepickerDef,
                'attachments':attachmentDef,
            }
        };
        return JSON.stringify(retVal);
    }
    return false;
}
