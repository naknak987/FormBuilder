function setupTitle(titleEL) {
    var popup = document.getElementById("set-element");
    popup.innerHTML = ""
        + '<div class="row justify-content-md-center">'
        + ' <div class="col-8">'
        + '     <div class="close" onclick="ClosePopup(\'' + titleEL.id + '\')"></div>'
        + '     <h4>Your Title Text</h4>'
        + '     <br>'
        + '     <input type="text" class="form-control" id="titleText">'
        + '     <br>'
        + '     <button class="btn btn-primary form-control" onclick="setTitleText(\'' + titleEL.id + '\')">Set Title</button>'
        + ' </div>'
        + '</div>';
    popup.classList.toggle("show");
}

function setTitleText(titleID) {
    document.getElementById(titleID).innerHTML = document.getElementById('titleText').value;
    document.getElementById("set-element").classList.toggle("show");
}

function setupTextBlock(textBlockEL) {
    var popup = document.getElementById("set-element");
    popup.innerHTML = ""
        + '<div class="row justify-content-md-center">'
        + ' <div class="col-8">'
        + '     <div class="close" onclick="ClosePopup(\'' + textBlockEL.id + '\')"></div>'
        + '     <h4>Your Text</h4>'
        + '     <br>'
        + '     <textarea class="form-control" id="text-blockText"></textarea>'
        + '     <br>'
        + '     <button class="btn btn-primary form-control" onclick="setTextBlock(\'' + textBlockEL.id + '\')">Set Text Block</button>'
        + ' </div>'
        + '</div>';
    popup.classList.toggle("show");
}

function setTextBlock(textID) {
    document.getElementById(textID).innerText = document.getElementById('text-blockText').value;
    document.getElementById("set-element").classList.toggle("show");
}

function setupLabel(labelEl) {
    var popup = document.getElementById("set-element");
    popup.innerHTML = ""
        + '<div class="row justify-content-md-center">'
        + ' <div class="col-8">'
        + '     <div class="close" onclick="ClosePopup(\'' + labelEl.id + '\')"></div>'
        + '     <h4>Enter your label text below.</h4>'
        + '     <br>'
        + '     <br>'
        + '     <input type="text" id="text-label" class="form-control">'
        + '     <br>'
        + '     <button class="btn btn-primary form-control" onclick="setLabel(\'' + labelEl.id + '\')">Set Label</button>'
        + ' </div>'
        + '</div>';
    popup.classList.toggle("show");
}

function setLabel(labelID) {
    document.getElementById(labelID).innerHTML = document.getElementById('text-label').value;
    document.getElementById("set-element").classList.toggle("show");
}

function setupTextBox(textboxEl)
{
    textboxDef[textBoxCNT] = {'name':textboxEl.name,'type':'string','size':200};
}

function setupCheckbox(checkboxEl) {
    var popup = document.getElementById("set-element");
    popup.innerHTML = ""
        + '<div class="row justify-content-md-center">'
        + ' <div class="col-8">'
        + '     <div class="close" onclick="ClosePopup(\'' + checkboxEl.id + '\')"></div>'
        + '     <h4>Set the text for your checkbox item</h4>'
        + '     <br>'
        + '     <input type="text" id="text-checkbox" class="form-control">'
        + '     <br>'
        + '     <button class="btn btn-primary form-control" onclick="setCheckbox(\'' + checkboxEl.id + '\')">Set Checkbox Text</button>'
        + ' </div>'
        + '</div>';
    popup.classList.toggle("show");
}

function setCheckbox(checkboxID) {
    var checkBoxText = document.getElementById('text-checkbox').value;
    document.getElementById(checkboxID).innerHTML = ""
        + ' <input type="checkbox" name="' + checkboxID + '" value="' + checkBoxText + '">' + checkBoxText;
    document.getElementById("set-element").classList.toggle("show");
    checkboxDef[checkboxCNT] = {'name':checkboxID,'type':'unsignedTinyInteger','size':3};
}

function setupRadioButton(radioEl) {
    var popup = document.getElementById("set-element");
    popup.innerHTML = ""
        + '<div class="row justify-content-md-center">'
        + ' <div class="col-12">'
        + '     <div class="close" onclick="ClosePopup(\'' + radioEl.id + '\')"></div>'
        + '     <h4>Setup Radio Button</h4>'
        + '     <br>'
        + '     <label for="text-radioButton">Button Text/Value</label>'
        + '     <input type="text" id="text-radioButton" class="form-control">'
        + '     <br>'
        + '     <label for="name-radioButton">Name</label>'
        + '     <input type="text" id="name-radioButton" class="form-control">'
        + '     <br>'
        + '     <p class="justify-content-md-start">The button text/value will be beside the radio button. The name of the button will not be seen.'
        + '     As an example, if two radio buttons have the same name, you may only select one of them.<br>The button names are case sensitive.'
        + '     "Question1" is not they same as "question1"</p>'
        + '     <br>'
        + '     <h6>Example Buttons: Both Named "Bob"</h6>'
        + '     <input type="radio" name="Bob" value="I\'m Bob">I\'m Bob<br>'
        + '     <input type="radio" name="Bob" value="I\'m also Bob">I\'m also Bob'
        + '     <br><br>'
        + '     <button class="btn btn-primary form-control" onclick="setRadioButton(\'' + radioEl.id + '\')">Set Radio Text</button>'
        + ' </div>'
        + '</div>';
    popup.classList.toggle("show");
}

function setRadioButton(radioID) {
    var radioButtonText = document.getElementById('text-radioButton').value;
    var radioButtonName = document.getElementById('name-radioButton').value;
    document.getElementById(radioID).innerHTML = ""
        + ' <input type="radio" name="' + radioButtonName +'" value="' + radioButtonText + '">' + radioButtonText;
    document.getElementById("set-element").classList.toggle("show");
    radiobuttonDef[radiobuttonCNT] = {'name':radioButtonName,'type':'string','size':200};
}

function setupBlankSpace(blankEl) {
    var popup = document.getElementById('set-element');
    popup.innerHTML = ""
    + '<div class="row justify-content-md-center">'
    + ' <div class="col-12">'
    + '     <div class="close" onclick="ClosePopup(\'' + blankEL.id + '\')"></div>'
    + '     <h4>Setup Blank Space</h4>'
    + '     <br>'
    + '     <p>This would be the height of the blank space in points. Kinda like how fonts are measured. (ex. 12 point font)<p>'
    + '     <br>'
    + '     <select id="size-BlankSpace" class="form-control">'
    + '         <option value="8pt">8 pt</option>'
    + '         <option value="18pt">18 pt</option>'
    + '         <option value="26pt">26 pt</option>'
    + '         <option value="30pt">30 pt</option>'
    + '         <option value="40pt">40 pt</option>'
    + '         <option value="50pt">50 pt</option>'
    + '     </select>'
    + '     </br><br>'
    + '     <button class="btn btn-primary form-control" onclick="setBlankSpace(\'' + blankEl.id + '\')">Set Blank Space</button>'
    + ' </div>'
    + '</div>';
    popup.classList.toggle("show");
}

function setBlankSpace(blankID) {
    var blankSpace = document.getElementById(blankID);
    blankSpace.innerHTML = "";
    blankSpace.style.height = document.getElementById("size-BlankSpace").value;
    document.getElementById("set-element").classList.toggle("show"); 
}

function setupSelectBox(selectContainer) {
    selectboxDef[selectboxCNT] = {'containerID':selectContainer.id,'type':'string','size':200};
    var selectBTN = selectContainer.children[0];
    var selector = selectContainer.children[1];
    selectBTN.id = selectBTN.id + selectboxCNT;
    selector.id = selector.id + selectboxCNT;
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
    selectBTN.onclick = function() { trigger(selector.id); };

    var popup = document.getElementById('set-element');
    popup.innerHTML = ""
    + '<div class="row justify-content-md-center">'
    + ' <div class="col-12">'
    + '     <div class="close" onclick="ClosePopup(\'' + selectContainer.id + '\')"></div>'
    + '     <h4>Setup Select Box and Options</h4>'
    + '     <br>'
    + '     <label for="selectName">Initial Text<br>This is what initially shows up in the select box, you can consider it the default value.'
    + '     If you would like it to be accepted, check the box below.</label>'
    + '     <br>'
    + '     <input type="checkbox" id="allowdefault">Allow default value to be selectable.</input>'
    + '     <br>'
    + '     <input type="text" id="selectName" class="form-control">'
    + '     <br>'
    + '     <button class="btn btn-primary form-control" onclick="setSelectBoxName(\'' + selectBTN.id + '\', \'' + selector.id + '\')">Set Default Value</button>'
    + ' </div>'
    + '</div>';
    popup.classList.toggle("show");
}

function setSelectBoxName(selectBtnId, selectorId) {
    btnEl = document.getElementById(selectBtnId);
    selectboxDef[selectboxCNT]['name'] = document.getElementById('selectName').value;
    btnEl.innerHTML = selectboxDef[selectboxCNT]['name'] + '<span class="chevron bottom"></span>';
    if (document.getElementById('allowdefault').checked) {
        selectboxDef[selectboxCNT]['allowdefault'] = true;
    } else {
        selectboxDef[selectboxCNT]['allowdefault'] = false;
    }
    var popup = document.getElementById('set-element');
    popup.classList.toggle("show");
    popup.innerHTML = ""
    + '<div class="row justify-content-md-center">'
    + ' <div class="col-12">'
    + '     <div class="close" onclick="ClosePopup(\'' + btnEl.parentNode.id + '\')"></div>'
    + '     <h4>Option Value</h4>'
    + '     <br>'
    + '     <label for="selectOption">What value would you like your option to hold.</label>'
    + '     <input type="text" id="selectOption" class="form-control">'
    + '     <br>'
    + '     <div class="row">'
    + '         <div class="col-4 offset-2">'
    + '             <button class="btn btn-primary form-control" onclick="setSelectOption(\'' + selectorId + '\')">Set Option and Add Another Option</button>'
    + '         </div>'
    + '         <div class="col-4">'
    + '             <button class="btn btn-primary form-control" onclick="setSelectOption(\'' + selectorId + '\', false)">Set Option and Finish</button>'
    + '         </div>'
    + '     </div>'
    + ' </div>'
    + '</div>';
    popup.classList.toggle("show");
}

function setSelectOption(selectorId, addAnother = true) {
    var option = document.getElementById('selectOption');
    var selector = document.getElementById(selectorId);
    var newOption = document.createElement('div');
    newOption.classList.add('option');
    newOption.onclick = function(){ selected(this, 'selectbox-button' + selectboxCNT, 'selectbox' + selectboxCNT); };
    newOption.innerHTML = option.value;
    selector.appendChild(newOption);
    option.value = "";
    if (addAnother == false) {
        var popup = document.getElementById('set-element');
        popup.classList.toggle("show");
    }
}

function setupTextArea(textAreaEl)
{
    textAreaEl[textareaCNT] = {'name':textAreaEl.name,'type':'text','size':65535};
}

function setupDatePicker(datepickerConEl) {
    var datepickerEl = datepickerConEl.children[0];
    datepickerEl.value = '';
    datepickerEl.dataset.target = datepickerEl.dataset.target + datepickerCNT;
    datepickerEl.id = datepickerEl.id + datepickerCNT;

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = '$(function () { $(\'#datepicker' + datepickerCNT + '\').datetimepicker({ format: \'L\' }); });';
    datepickerConEl.appendChild(script);

    datepickerDef[datepickerCNT] = {'name':datepickerEl.id,'type':'date'};
}

function setupTimePicker(timepickerConEl) {
    var timepickerEl = timepickerConEl.children[0];
    timepickerEl.value = '';
    timepickerEl.dataset.target = timepickerEl.dataset.target + timepickerCNT;
    timepickerEl.id = timepickerEl.id + timepickerCNT;

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = '$(function () { $(\'#timepicker' + timepickerCNT + '\').datetimepicker({ format: \'LT\' }); });';
    timepickerConEl.appendChild(script);

    timepickerDef[timepickerCNT] = {'name':timepickerEl.id, 'type':'time'};
}

function setupAttachment(attachmentConEl) {
    var attachmentEl = attachmentConEl.children[0];
    var attachmentLabel = attachmentConEl.children[1];

    attachmentEl.id = attachmentEl.id + attachmentCNT;
    attachmentLabel.id = attachmentLabel.id + attachmentCNT;
    attachmentLabel.htmlFor = attachmentEl.id;
    attachmentEl.value = '';
    
    attachmentEl.onchange = function(){document.getElementById(attachmentLabel.id).innerHTML = this.value.split("\\").pop();};

    attachmentDef[attachmentCNT] = {'name':'file', 'type':'data'}
}