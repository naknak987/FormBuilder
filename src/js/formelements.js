function setupTitle(titleEL) {
    var popup = document.getElementById("set-element");
    popup.innerHTML = ""
        + '<div class="row justify-content-md-center">'
        + ' <div class="col-md-8">'
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
        + ' <div class="col-md-8">'
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

function setupHeading(headingEl) {
    var popup = document.getElementById("set-element");
    popup.innerHTML = ""
        + '<div class="row justify-content-md-center">'
        + ' <div class="col-md-8">'
        + '     <div class="close" onclick="ClosePopup(\'' + headingEl.id + '\')"></div>'
        + '     <h4>Enter your heading text below.</h4>'
        + '     <br>'
        + '     <br>'
        + '     <input type="text" id="text-heading" class="form-control">'
        + '     <br>'
        + '     <button class="btn btn-primary form-control" onclick="setHeading(\'' + headingEl.id + '\')">Set Heading</button>'
        + ' </div>'
        + '</div>';
    popup.classList.toggle("show");
}

function setHeading(headingID) {
    document.getElementById(headingID).innerHTML = document.getElementById('text-heading').value;
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
        + ' <div class="col-md-12">'
        + '     <div class="close" onclick="ClosePopup(\'' + checkboxEl.id + '\')"></div>'
        + '     <h4>Setup Your Checkbox Item(s)</h4>'
        + '     <br>'
        + '     <p>If you enter a list of items sperated by semicolons, (;) we\'ll turn each list item into a checkbox.</p>'
        + '     <br>'
        + '     <input type="text" id="text-checkbox" class="form-control">'
        + '     <br>'
        + '     <button class="btn btn-primary form-control" onclick="setCheckbox(\'' + checkboxEl.id + '\')">Set Checkbox Text</button>'
        + ' </div>'
        + '</div>';
    popup.classList.toggle("show");
}

function setCheckbox(checkboxID) {
    var checkBoxText = document.getElementById('text-checkbox').value.split(';');
    var checkbox = document.getElementById(checkboxID); //.innerHTML = ' <input type="checkbox" name="' + checkboxID + '" value="' + checkBoxText + '">' + checkBoxText;
    var elParent = checkbox.parentNode;
    checkbox.remove();
    for (var i = 0; i < checkBoxText.length; i++) {
        if (checkBoxText[i] == '') {
            continue;
        }
        checkboxCNT+=1;
        var newDiv = document.createElement('div');
        newDiv.id = "checkbox" + checkboxCNT;
        newDiv.setAttribute('draggable', 'true');
        newDiv.setAttribute('ondragstart', 'drag(event)');
        checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "checkbox" + checkboxCNT;
        checkbox.value = checkBoxText[i].trim();
        var checkText = document.createTextNode(" " + checkBoxText[i].trim());
        newDiv.appendChild(checkbox);
        newDiv.appendChild(document.createElement('label').appendChild(checkText));
        elParent.appendChild(newDiv);
        checkboxDef[checkboxCNT] = {'name':'checkbox' + checkboxCNT,'type':'unsignedTinyInteger','size':3};
    }
    document.getElementById("set-element").classList.toggle("show");
}

function setupRadioButton(radioEl) {
    var popup = document.getElementById("set-element");
    popup.innerHTML = ""
        + '<div class="row justify-content-md-center">'
        + ' <div class="col-md-12">'
        + '     <div class="close" onclick="ClosePopup(\'' + radioEl.id + '\')"></div>'
        + '     <h4>Setup Radio Button</h4>'
        + '     <br>'
        + '     <p>If you enter a list of items sperated by semicolons, (;) we\'ll turn each list item into a radio button.<br>(Button Text/Value only)</p>'
        + '     <label for="text-radioButton">Button Text/Value</label>'
        + '     <input type="text" id="text-radioButton" class="form-control">'
        + '     <br>'
        + '     <label for="name-radioButton">Name</label>'
        + '     <input type="text" id="name-radioButton" class="form-control">'
        + '     <br>'
        + '     <p class="justify-content-md-start">The button text/value will be beside the radio button. The name of the button will not be seen.'
        + '     As an example, if two radio buttons have the same name, you may only select one of them.<br>The button names are case sensitive.'
        + '     "Question1" is not the same as "question1"</p>'
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
    var radioButtonText = document.getElementById('text-radioButton').value.split(';');
    var radioButtonName = document.getElementById('name-radioButton').value;
    var radioEl = document.getElementById(radioID); //.innerHTML = ' <input type="radio" name="' + radioButtonName +'" value="' + radioButtonText + '">' + radioButtonText;
    var radioElParent = radioEl.parentNode;
    radioEl.remove();
    for (var i = 0; i < radioButtonText.length; i++) {
        if (radioButtonText[i] == '') {
            continue;
        }
        radiobuttonCNT+=1;
        var newDiv = document.createElement('div');
        newDiv.id = "radiobutton" + radiobuttonCNT;
        newDiv.setAttribute('draggable', 'true');
        newDiv.setAttribute('ondragstart', 'drag(event)');
        radioEl = document.createElement('input');
        radioEl.type = 'radio';
        radioEl.name = radioButtonName;
        radioEl.value = radioButtonText[i].trim();
        var radioText = document.createTextNode(' ' + radioButtonText[i].trim());
        newDiv.appendChild(radioEl);
        newDiv.appendChild(document.createElement('label').appendChild(radioText));
        radioElParent.appendChild(newDiv);
        radiobuttonDef[radiobuttonCNT] = {'name':radioButtonName,'type':'string','size':200};
    }
    document.getElementById("set-element").classList.toggle("show");
}

function setupBlankSpace(blankEl) {
    var popup = document.getElementById('set-element');
    popup.innerHTML = ""
    + '<div class="row justify-content-md-center">'
    + ' <div class="col-md-12">'
    + '     <div class="close" onclick="ClosePopup(\'' + blankEl.id + '\')"></div>'
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
    blankSpace.innerHTML = '<i style="color:lightgray;">This space intentionally left blank!</i>';
    blankSpace.style.height = document.getElementById("size-BlankSpace").value;
    document.getElementById("set-element").classList.toggle("show"); 
}

var area1;
var area2;
var addBtn;
var optionCnt = 1;

function setupSelectBox(selectContainer) {
    var selectBTN = selectContainer.children[0];
    var selectInput = selectContainer.children[1];
    var selector = selectContainer.children[2];
    selectBTN.id = selectBTN.id + selectboxCNT;
    selectInput.id = selectInput.id + selectboxCNT;
    selectInput.setAttribute('name', selectInput.id);
    selectboxDef[selectboxCNT] = {'name':selectInput.name,'type':'string','size':200};
    selector.id = selector.id + selectboxCNT;
    while (selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
    selectBTN.removeAttribute('onclick');
    selectBTN.setAttribute('onclick', 'trigger(\'' + selector.id + '\')');

    var popup = document.getElementById('set-element');
    popup.innerHTML = ""
    + '<div class="row justify-content-md-center">'
    + ' <div class="col-md-12">'
    + '     <div class="close" onclick="ClosePopup(\'' + selectContainer.id + '\')"></div>'
    + '     <div class="row">'
    + '         <div class="col">'
    + '             <h4>Setup Select Box</h4>'
    + '             <label for="selectName">'
    + '                 The first text box will be the default value for your select box. All of the other boxes will be in the options dropdown, in the order they are added.'
    + '                 '
    + '             </label>'
    + '         </div>'
    + '     </div>'
    + '     <div class="row">'
    + '         <div class="col-md-6 pr-4">'
    + '             <div class="row mb-1">'
    + '                 <div class="col p-0">'
    + '                     <input type="text" id="selectName" class="form-control">'
    + '                 </div>'
    + '             </div>'
    + '             <div id="area-1">'
    + '                 <div class="row mb-1" id="addBtn">'
    + '                     <div class="col-md-1 col-1-cust p-0">'
    + '                         <button class="btn btn-primary" style="width:38px;height:38px" onclick="addOption()">+</button>'
    + '                     </div>'
    + '                 </div>'
    + '             </div>'
    + '         </div>'
    + '         <div class="col-md-6 pl-4">'
    + '             <div id="area-2">'
    + '                 <div class="row mb-1" id="option1">'
    + '                     <div class="col-md-11 col-11-cust p-0">'
    + '                         <input type="text" id="optionIn1" class="form-control">'
    + '                     </div>'
    + '                     <div class="col-md-1 col-1-cust p-0">'
    + '                         <button class="btn btn-primary form-control" style="width:38px;height:38px" onclick="deleteOption(\'option1\')">-</button>'
    + '                     </div>'
    + '                 </div>'
    + '             </div>'
    + '         </div>'
    + '     </div>'
    + '     <div class="row">'
    + '         <div class="col-sm-8 offset-sm-2 col-md-4 offset-md-4">'
    + '             <button class="btn btn-primary form-control" onclick="setSelectBox(\'' + selectBTN.id + '\', \'' + selector.id + '\')">Set Select Box</button>'
    + '             <br><br>'
    + '             <button class="btn btn-primary form-control" onclick="bulkInput(\'selectbox\', \'' + selector.id + '\')">Switch to Bulk Input</button>'
    + '         </div>'
    + '     </div>'
    + ' </div>'
    + '</div>'
    + '<div style="display: none;">'
    + '    <div class="row mb-1" id="option">'
    + '        <div class="col-md-11 col-11-cust p-0">'
    + '            <input type="text" id="optionIn" class="form-control">'
    + '        </div>'
    + '        <div class="col-md-11 col-1-cust p-0">'
    + '            <button class="btn btn-primary form-control" style="width:38px;height:38px" onclick="deleteOption()">-</button>'
    + '        </div>'
    + '    </div>'
    + '</div>';
    area1 = document.getElementById('area-1');
    area2 = document.getElementById('area-2');
    addBtn = document.getElementById('addBtn');
    optionCnt = 1;
    popup.classList.toggle("show");
}

function deleteOption(delEl) {
    if (delEl != 'option1') {
        document.getElementById(delEl).remove();
        if (area1.children.length > area2.children.length && addBtn.parentElement.id != 'area-2') {
            area2.appendChild(addBtn);
        } else if (area1.children.length < area2.children.length && addBtn.parentElement.id != 'area-1') {
            area1.appendChild(addBtn);
        }
    }
}

function addOption() {
    var option = document.getElementById('option').cloneNode(true);

    if (addBtn.parentElement.id == 'area-1') {
        option.id = option.id + (optionCnt += 1);
        option.children[0].children[0].id = option.children[0].children[0].id + optionCnt;
        option.children[1].children[0].setAttribute('onclick', 'deleteOption(\'option' + optionCnt + '\')');
        area1.appendChild(option);
        if (area1.children.length > area2.children.length) {
            area2.appendChild(addBtn);
        } else {
            area1.appendChild(addBtn);
        }
    } else {
        option.id = option.id + (optionCnt += 1);
        option.children[0].children[0].id = option.children[0].children[0].id + optionCnt;
        option.children[1].children[0].setAttribute('onclick', 'deleteOption(\'option' + optionCnt + '\')');
        area2.appendChild(option);
        if (area1.children.length < area2.children.length) {
            area1.appendChild(addBtn);
        } else {
            area2.appendChild(addBtn);
        }
    }
}

function setSelectBox(selectBtnId, selectorId) {
    btnEl = document.getElementById(selectBtnId);
    btnEl.innerHTML = document.getElementById('selectName').value + '<span class="chevron bottom"></span>';
    /* if (document.getElementById('allowdefault').checked) {
        selectboxDef[selectboxCNT]['allowdefault'] = true;
    } else {
        selectboxDef[selectboxCNT]['allowdefault'] = false;
    } */
    var selector = document.getElementById(selectorId);

    var popup = document.getElementById('set-element');
    var selectInputs = popup.getElementsByTagName("input");
    for (var i = 0; i < selectInputs.length; i++) {
        if (selectInputs[i].type.toLowerCase() == "text") {
            var newOption = document.createElement('div');
            newOption.classList.add('option');
            newOption.setAttribute('onclick', 'selected(this, \'selectbox-button' + selectboxCNT + '\', \'selected-value' + selectboxCNT + '\', \'selectbox' + selectboxCNT + '\')');
            newOption.innerHTML = selectInputs[i].value;
            selector.appendChild(newOption);
        }
    }
    popup.classList.toggle('show');
}

function setupTextArea(textAreaEl)
{
    textAreaEl.name = textAreaEl.name + textareaCNT;
    textAreaEl[textareaCNT] = {'name':textAreaEl.name,'type':'text','size':65535};
}

function setupDatePicker(datepickerConEl) {
    var datepickerEl = datepickerConEl.children[0];
    datepickerEl.value = '';
    datepickerEl.dataset.target = datepickerEl.dataset.target + datepickerCNT;
    datepickerEl.id = datepickerEl.id + datepickerCNT;
    datepickerEl.setAttribute('name', datepickerEl.id);

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = '$(function () { $(\'#datepicker' + datepickerCNT + '\').datetimepicker({ format: \'L\' }); });';
    datepickerConEl.appendChild(script);

    datepickerDef[datepickerCNT] = {'name':datepickerEl.name,'type':'date'};
}

function setupTimePicker(timepickerConEl) {
    var timepickerEl = timepickerConEl.children[0];
    timepickerEl.value = '';
    timepickerEl.dataset.target = timepickerEl.dataset.target + timepickerCNT;
    timepickerEl.id = timepickerEl.id + timepickerCNT;
    timepickerEl.setAttribute('name', timepickerEl.id);

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = '$(function () { $(\'#timepicker' + timepickerCNT + '\').datetimepicker({ format: \'LT\' }); });';
    timepickerConEl.appendChild(script);

    timepickerDef[timepickerCNT] = {'name':timepickerEl.name, 'type':'time'};
}

function setupAttachment(attachmentConEl) {
    var attachmentEl = attachmentConEl.children[0];
    var attachmentLabel = attachmentConEl.children[1];

    attachmentEl.id = attachmentEl.id + attachmentCNT;
    attachmentEl.setAttribute('name', attachmentEl.id);
    attachmentLabel.id = attachmentLabel.id + attachmentCNT;
    attachmentLabel.htmlFor = attachmentEl.id;
    attachmentEl.value = '';
    
    attachmentEl.setAttribute('onchange', 'document.getElementById(\'' + attachmentLabel.id + '\').innerHTML = this.value.split(\'\\\\\').pop();');

    attachmentDef[attachmentCNT] = {'name':attachmentEl.name, 'type':'data'}
}

function bulkInput(elType, elId) {
    var popup = document.getElementById('set-element');
    popup.innerHTML = ''
    + '<div class="row">'
    + ' <div class="col-md-12">'
    + '     <div class="close" onclick="ClosePopup(\'' + elId + '\')"></div>'
    + '     <h4>Bulk <span id="typeone"></span> Input</h4>'
    + '     <p>Enter a list of items, sperated by semicolons. (;) We\'ll turn each list item into <span id="typetwo"></span>.</p>'
    + '     <textarea id="bulkText" class="form-control"></textarea>'
    + '     <br><br>'
    + '     <button class="btn btn-primary form-control" onclick="processBulkInput(\'' + elType + '\', \'' + elId + '\')">Process Bulk Input</button>'
    + ' </div>'
    + '</div>';
    var el = document.getElementById(elId);
    switch (elType) {
        case "selectbox": {
            document.getElementById('typeone').innerText = "Dropdown"
            document.getElementById('typetwo').innerText = "a selectable item in the dropdown list"
            break;
        }
    }
}

function processBulkInput(elType, elId) {
    var bulkText = document.getElementById('bulkText');
    var bulkItems = bulkText.value.split(";")
    var el = document.getElementById(elId);
    switch (elType) {
        case "selectbox": {
            document.getElementById('selectbox-button' + selectboxCNT).innerHTML = bulkItems[0] + '<span class="chevron bottom"></span>';
            for(var i = 0; i < bulkItems.length; i++) {
                if (bulkItems[i] == '') {
                    continue;
                }
                var newOption = document.createElement('div');
                newOption.classList.add('option');
                newOption.setAttribute('onclick', 'selected(this, \'selectbox-button' + selectboxCNT + '\', \'selected-value' + selectboxCNT + '\', \'selectbox' + selectboxCNT + '\')');
                newOption.innerHTML = bulkItems[i].trim();
                el.appendChild(newOption);
            }
            break;
        }
    }
    document.getElementById('set-element').classList.toggle("show");
}