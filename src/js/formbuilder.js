var titleCNT = 0; 
var textCNT = 0;
var headingCNT = 0;
var labelCNT = 0;
var blankSpaceCNT = 0;
var questionBucketCNT = 0;
var textBoxCNT = 0;
var checkboxCNT = 0;
var radiobuttonCNT = 0;
var selectboxCNT = 0;
var textareaCNT = 0;
var datepickerCNT = 0;
var timepickerCNT = 0;
var attachmentCNT = 0;
var dispHelpers = false;
var row = '<div class="row" id="rowNum" ondrop="rowDrop(event, this)" ondragover="allowDrop(event)" ondragenter="this.style.padding=\'1px 24px 24px 1px\'" ondragleave="this.style.padding=\'1px 12px 12px 1px\'"></div>';
var emptyrow = '<div class="emptyrow" id="rowNum" ondrop="rowDrop(event, this)" ondragover="allowDrop(event)" ondragenter="this.style.padding=\'1px 24px 24px 1px\'" ondragleave="this.style.padding=\'1px 12px 12px 1px\'"></div>';
var col = '<div class="col" id="colNum" ondrop="colDrop(event, this)" ondragover="allowDrop(event)" ondragenter="this.style.padding=\'1px 24px 24px 1px\'" ondragleave="this.style.padding=\'1px 12px 12px 1px\'"></div>';
var emptycol = '<div class="emptycol" id="colNum" ondrop="colDrop(event, this)" ondragover="allowDrop(event)" ondragenter="this.style.padding=\'1px 24px 24px 1px\'" ondragleave="this.style.padding=\'1px 12px 12px 1px\'"></div>';
var rowCNT = 0;
var colCNT = 0;

var elements = [
    'title',
    'text-block',
    'heading',
    'label',
    'blank-space',
    'questionBucket',
];

var qElements = [
    'text-box',
    'checkbox',
    'radiobutton',
    'selectbox-container',
    'textarea',
    'datepickerCon',
    'timepickerCon',
    'attachmentCon',
];

function incrementRowNum() {
    var newRow = document.getElementById('rowNum');
    rowCNT += 1;
    newRow.id = newRow.id + rowCNT;
    if (dispHelpers === true) {
        if (newRow.classList.contains('emptyrow')) {
            newRow.classList.toggle('hideempty');
        } else {
            newRow.classList.toggle('nohelpers');
        }
    }
    return newRow;
}

function incrementColNum() {
    var newCol = document.getElementById('colNum');
    colCNT += 1;
    newCol.id = newCol.id + colCNT;
    if (dispHelpers === true) {
        if (newCol.classList.contains('emptycol')) {
            newCol.classList.toggle('hideempty');
        } else {
            newCol.classList.toggle('nohelpers');
        }
    }
    return newCol;
}

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

    if (qElements.indexOf(data) == -1) {
        ev.target.insertAdjacentHTML('beforeend', emptyrow);
        incrementRowNum();
    
        ev.target.insertAdjacentHTML('beforeend', row);
        var newRow = incrementRowNum();
    
        newRow.insertAdjacentHTML('beforeend', emptycol);
        incrementColNum();
    
        newRow.insertAdjacentHTML('beforeend', col);
        var newCol = incrementColNum();
    
        if (elements.indexOf(data) != -1) {
            var ClonedEl = document.getElementById(data).cloneNode(true);
        } else {
            var ClonedEl = document.getElementById(data);
        }
        insertPrimary(newCol, ClonedEl);
    }
}

function rowDrop(ev, el) {
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    
    if (qElements.indexOf(data) == -1) {
        if (el.classList.contains('emptyrow')) {
            el.insertAdjacentHTML('beforebegin', emptyrow);
            incrementRowNum();
            el.insertAdjacentHTML('afterend', emptyrow);
            incrementRowNum();
            el.classList.toggle('emptyrow');
            el.classList.toggle('row');
        }
        el.style.padding = '1px 12px 12px 1px';

        ev.target.insertAdjacentHTML('beforeend', emptycol);
        incrementColNum();
    
        ev.target.insertAdjacentHTML('beforeend', col);
        var newCol = incrementColNum();
    
        if (elements.indexOf(data) != -1) {
            var ClonedEl = document.getElementById(data).cloneNode(true);
        } else {
            var ClonedEl = document.getElementById(data);
        }
        insertPrimary(newCol, ClonedEl);
    }
}

function colDrop(ev, el) {
    
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if (qElements.indexOf(data) == -1) {
        if (el.classList.contains('emptycol')) {
            var elBefore = el.previousSibling;
            if ((elBefore === null) || (elBefore.classList.contains('col'))) {
                el.insertAdjacentHTML('beforebegin', emptycol);
                incrementColNum();
            }
            var nextEl = el.nextSibling;
            if (nextEl !== null) {
                el.insertAdjacentHTML('afterend', emptycol);
                incrementColNum();
            }
            el.classList.toggle('emptycol');
            el.classList.toggle('col');
        }
        el.style.padding = '1px 12px 12px 1px';
        
        var dataEl = ev.target;
        while (dataEl.id.substring(0,3) != 'col'){
            dataEl = dataEl.parentNode;
        }

        if (elements.indexOf(data) != -1) {
            var ClonedEl = document.getElementById(data).cloneNode(true);
        } else {
            var ClonedEl = document.getElementById(data);
        }
        insertPrimary(dataEl, ClonedEl);
    }
    
}

function questionDrop(ev, el) {
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if (el.hasAttribute('data-type')){
        let elType = el.getAttribute('data-type');
        if (elType != data) {
            // not allowed, input types don't match
            return;
        } else if (elType != 'checkbox' && elType != 'radiobutton') {
            return;
        }
    } else {
        el.setAttribute('data-type', data);
    }

    if ((qElements.indexOf(data) != -1) && (el.getAttribute('data-edit') == 'true')) {
        var ClonedEl = document.getElementById(data).cloneNode(true);
        
        insertSecondary(el, ClonedEl);
    }
}

function deleteElementOnDrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    parentEl = document.getElementById(data).parentNode;
    if ((elements.indexOf(data) == -1) && (qElements.indexOf(data) == -1)) { 
        parentEl.removeChild(document.getElementById(data));
        while ((parentEl.childElementCount == 0) && (parentEl.id != 'form-area')) {
            var CurrentEl = parentEl;
            parentEl = parentEl.parentNode;
            if (CurrentEl.previousSibling !== null && (CurrentEl.previousSibling.classList.contains('emptycol') || CurrentEl.previousSibling.classList.contains('emptyrow'))) {
                CurrentEl.previousSibling.remove();
            }
            CurrentEl.remove();
        }
    }
}

function insertPrimary(parEl, chiEl) {
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
        case 'heading':
            headingCNT += 1;
            chiEl.id = chiEl.id + headingCNT;
            setupHeading(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'label':
            labelCNT += 1;
            chiEl.id = chiEl.id + labelCNT;
            setupLabel(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'blank-space':
            blankSpaceCNT += 1;
            chiEl.id = chiEl.id + blankSpaceCNT;
            setupBlankSpace(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'questionBucket':
            questionBucketCNT += 1;
            chiEl.id = chiEl.id + questionBucketCNT;
            setupQuestionBucket(chiEl);
            parEl.appendChild(chiEl);
            break;
        default:
            //deleteElement(parEl.id);

            parentEl = chiEl.parentNode;
            parEl.appendChild(chiEl);
            while ((parentEl.childElementCount == 0) && (parentEl.id != 'form-area')) {
                var CurrentEl = parentEl;
                parentEl = parentEl.parentNode;
                if (CurrentEl.previousSibling !== null && (CurrentEl.previousSibling.classList.contains('emptycol') || CurrentEl.previousSibling.classList.contains('emptyrow'))) {
                    CurrentEl.previousSibling.remove();
                }
                CurrentEl.remove();
            }
            break;
    }
}

function insertSecondary(parEl, chiEl) {
    switch (chiEl.id) {
        case 'text-box':
            textBoxCNT += 1;
            chiEl.name = chiEl.name + '-' + textBoxCNT;
            chiEl.id = chiEl.id + textBoxCNT;
            //setupTextBox(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'checkbox':
            setupCheckbox(chiEl);
            parEl.appendChild(chiEl);
            break;
        case 'radiobutton':
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
            deleteElement(parEl.id);
            break;
    }
}

function deleteElement(elID) {
    var CurrentEl =  document.getElementById(elID);
    while (CurrentEl.childElementCount == 0) {
        let parentEl = CurrentEl.parentElement;
        while (CurrentEl.previousSibling !== null && (CurrentEl.previousSibling.classList.contains('emptycol') || CurrentEl.previousSibling.classList.contains('emptyrow'))) {
            CurrentEl.previousSibling.remove();
        }
        CurrentEl.remove();
        CurrentEl = parentEl;
    }
}

function ClosePopup(CurrentEl) {
    var parEl = document.getElementById(CurrentEl).parentElement;
    document.getElementById(CurrentEl).remove();
    if (parEl.childElementCount == 0) {
        var parParEl = parEl.parentElement;
        if (parEl.previousSibling !== null && (parEl.previousSibling.classList.contains('emptycol') || parEl.previousSibling.classList.contains('emptyrow'))) {
            parEl.previousSibling.remove();
        }
        parEl.remove();
        if (parParEl.childElementCount == 0) {
            if (parParEl.previousSibling !== null && (parParEl.previousSibling.classList.contains('emptycol') || parParEl.previousSibling.classList.contains('emptyrow'))) {
                parParEl.previousSibling.remove();
            }
            parParEl.remove();
        }
    }
    document.getElementById('set-element').classList.toggle("show-me");
}

function hideHelpers() {
    let formAreaEl = document.getElementById('form-area');
    let emptyRows = formAreaEl.getElementsByClassName('emptyrow');
    for (let i = 0; i < emptyRows.length; i++) {
        emptyRows[i].classList.toggle('hideempty');
    }
    let emptyCols = formAreaEl.getElementsByClassName('emptycol');
    for (let i = 0; i < emptyCols.length; i++) {
        emptyCols[i].classList.toggle('hideempty');
    }
    let rowEls = formAreaEl.getElementsByClassName('row');
    for (let i = 0; i < rowEls.length; i++) {
        rowEls[i].classList.toggle('nohelpers');
    }
    let colEls = formAreaEl.getElementsByClassName('col');
    for (let i = 0; i < colEls.length; i++) {
        colEls[i].classList.toggle('nohelpers');
    }
    let qBucket = document.getElementsByClassName('questionBucket')
    for (let i = 0; i < qBucket.length; i++) {
        qBucket[i].classList.toggle('nohelpers');
    }
    let helperBTN = document.getElementById('helpers');
    if (helperBTN.innerText == "Hide Helpers") {
        helperBTN.innerText = "Show Helpers";
        dispHelpers = true;
    } else {
        helperBTN.innerText = "Hide Helpers";
        dispHelpers = false;
    }
}

function changeInputs(qID) {
    document.getElementById('form-area').classList.toggle('darken');
    document.getElementById('inputs').classList.toggle('show-me');
    document.getElementById('descriptors').classList.toggle('show-me');

    let qEl = document.getElementById(qID);
    qEl.classList.toggle('lighten');

    if (qEl.hasAttribute('data-edit') && qEl.getAttribute('data-edit') == 'false') {
        qEl.setAttribute('data-edit', 'true');
    } else if (qEl.hasAttribute('data-edit') && qEl.getAttribute('data-edit') == 'true') {
        qEl.setAttribute('data-edit', 'false');
    }
}

function addQButtons(El, Id) {
    var editS = document.createElement('span');
    editS.classList.add('pencil');
    editS.id = Id;

    var editA = document.createElement('a');
    editA.classList.add('qEdit');
    editA.setAttribute('onclick', 'editQuestion(event, \'' + editS.id + '\',  \'' + El.id + '\')');

    editA.appendChild(editS);
    El.appendChild(editA);
    return editA;
}

function addButtons(El, Id) {
    
    var editS = document.createElement('span');
    editS.classList.add('pencil');
    editS.id = Id;

    var editA = document.createElement('a');
    editA.classList.add('edit');
    editA.setAttribute('onclick', 'edit(event, \'' + El.id + '\')');

    editA.appendChild(editS);
    El.appendChild(editA);
}

function edit(event, elID) {
    event.stopPropagation();
    event.preventDefault();
    let El = document.getElementById(elID);
    
    if (El.id.indexOf('title') != -1) {
        setupTitle(El);
    }
    if (El.id.indexOf('heading') != -1) {
        setupHeading(El);
    }
    if (El.id.indexOf('label') != -1) {
        setupLabel(El);
    }
    if (El.id.indexOf('text-block') != -1) {
        setupTextBlock(El);
    }
    if (El.id.indexOf('questionText') != -1) {
        changeQuestionText(El);
    }
    if (El.id.indexOf('checkbox') != -1) {
        changeCheckBox(El);
    }
    if (El.id.indexOf('radiobutton') != -1) {
        changeRadioButton(El);
    }
    if (El.id.indexOf('selectbox') != -1) {
        changeSelectBox(El);
    }
}

function editQuestion(event, iconID, questionID) {
    event.stopPropagation();
    event.preventDefault();
    let iconEl = document.getElementById(iconID);

    changeInputs(questionID);
    iconEl.classList.toggle('pencil');
    iconEl.classList.toggle('check');
}

function ExportForm() {
    let formAreaEl = document.getElementById('form-area');
    let formName = document.getElementById('form-name').value;
    let popup = document.getElementById('Errors');
    if (formName == '') {
        popup.innerHTML = "Please name your form first!";
        popup.classList.toggle("show-me");
        popup.scrollIntoView(true);
        setTimeout(function(){ 
            popup.classList.toggle("show-me"); 
            popup.click();
        }, 4000);
    } else if (formAreaEl.innerHTML == '') {
        popup.innerHTML = "Did you build a form?";
        popup.classList.toggle("show-me");
        popup.scrollIntoView(true);
        setTimeout(function(){ 
            popup.classList.toggle("show-me"); 
            popup.click();
        }, 4000); 
    } else {
        let emptyRows = formAreaEl.getElementsByClassName('emptyrow');
        for (let i = 0; i < emptyRows.length;) {
            emptyRows[i].remove();
        }
        let emptyCols = formAreaEl.getElementsByClassName('emptycol');
        for (let i = 0; i < emptyCols.length;) {
            emptyCols[i].remove();
        }
        let rowEls = formAreaEl.getElementsByClassName('row');
        for (let i = 0; i < rowEls.length; i++) {
            rowEls[i].removeAttribute('ondrop');
            rowEls[i].removeAttribute('ondragover');
            rowEls[i].removeAttribute('ondragenter');
            rowEls[i].removeAttribute('ondragleave');
        }
        let colEls = formAreaEl.getElementsByClassName('col');
        for (let i = 0; i < colEls.length; i++) {
            colEls[i].removeAttribute('ondrop');
            colEls[i].removeAttribute('ondragover');
            colEls[i].removeAttribute('ondragenter');
            colEls[i].removeAttribute('ondragleave');
        }
        let qEls = formAreaEl.getElementsByClassName('questionBucket');
        for (let i = 0; i < qEls.length; i++) {
            qEls[i].removeAttribute('draggable');
            qEls[i].removeAttribute('ondragstart');
            qEls[i].removeAttribute('ondrop');
            qEls[i].removeAttribute('ondragover');
        }
        let definition = buildDefinition(qEls);
        let formHTML = formAreaEl.innerHTML;
        while (formHTML.includes(' draggable="true"'))
        {
            formHTML = formHTML.replace(' draggable="true"', '');
        }
        while (formHTML.includes(' ondragstart="drag(event)"'))
        {
            formHTML = formHTML.replace(' ondragstart="drag(event)"', '');
        }
        while (formHTML.includes('<i style="color:lightgray;">This space intentionally left blank!</i>'))
        {
            formHTML = formHTML.replace('<i style="color:lightgray;">This space intentionally left blank!</i>', '');
        }
        let retVal = {
            'name':formName,
            'html':formHTML,
            'definition':definition
        };
        return JSON.stringify(retVal);
    }
    return false;
}

function buildDefinition(qEls) {
    let textboxDef = [];
    let textareaDef = [];
    let radioDef = [];
    let checkDef = [];
    let selectDef = [];
    let dateDef = [];
    let timeDef = [];
    let fileDef = [];


    for (let q = 0; q < qEls.length; q++) {
        let qText = qEls[q].getElementsByClassName('questionText')[0].innerText;
        let textareas = qEls[q].getElementsByTagName('textarea');
        let inputs = qEls[q].getElementsByTagName('input');
        if (textareas.length != 0) {
            textareaDef.push({'name':qText, 'type':'string', 'size':2000})
        } else if (inputs.length != 0) {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].id.indexOf('selected-value') != -1) {
                    selectDef.push({'name':qText, 'type':'string', 'size':200});
                    break;
                } else if (inputs[i].getAttribute('type') == 'radio') {
                    radioDef.push({'name':qText, 'type':'string', 'size':200});
                    break;
                } else if (inputs[i].getAttribute('type') == 'checkbox') {
                    if (i == 0) {
                        checkDef.push({'question':qText});
                    }
                    checkDef.push({'name':inputs[i].getAttribute['name'], 'type':'boolean', 'size':1});
                } else if (inputs[i].getAttribute('type') == 'text') {
                    if (inputs[i].id.indexOf('text-box') != -1) {
                        textboxDef.push({'name':qText, 'type':'string', 'size':200});
                        break;
                    } else if (inputs[i].id.indexOf('datepicker') != -1) {
                        dateDef.push({'name':qText, 'type':'date'});
                        break;
                    } else if (inputs[i].id.indexOf('timepicker') != -1) {
                        timeDef.push({'name':qText, 'type':'time'});
                        break;
                    }
                } else if (inputs[i].getAttribute('type') == 'file') {
                    fileDef.push({'name':qText, 'type':'file'});
                    break;
                }
            }
        }
    }

    let retArr = {
        'textbox':textboxDef,
        'textarea':textareaDef,
        'radiobutton':radioDef,
        'checkbox':checkDef,
        'selectbox':selectDef,
        'date':dateDef,
        'time':timeDef,
        'file':fileDef
    };

    return retArr;
}
