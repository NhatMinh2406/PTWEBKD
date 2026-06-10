function initBirthdayDropdowns() {
    var selDay = document.getElementById("selDay");
    var selMonth = document.getElementById("selMonth");
    var selYear = document.getElementById("selYear");
    
    // populate days (1-31)
    for (var i = 1; i <= 31; i++) {
        var val = i < 10 ? "0" + i : i;
        selDay.options[selDay.options.length] = new Option(val, val);
    }
    
    // populate months (1-12)
    for (var i = 1; i <= 12; i++) {
        var val = i < 10 ? "0" + i : i;
        selMonth.options[selMonth.options.length] = new Option(val, val);
    }
    
    // populate years (1970-current year)
    var currentYear = new Date().getFullYear();
    for (var i = 1970; i <= currentYear; i++) {
        selYear.options[selYear.options.length] = new Option(i, i);
    }
}

function handleRegister() {
    var nameInput = document.getElementById("txtName");
    var emailInput = document.getElementById("txtEmail");
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    
    if (name === "") {
        alert("Name cannot be left blank!");
        nameInput.focus();
        return;
    }
    
    var day = document.getElementById("selDay").value;
    var month = document.getElementById("selMonth").value;
    var year = document.getElementById("selYear").value;
    var birthday = day + "/" + month + "/" + year;
    
    var gender = document.querySelector('input[name="gender"]:checked').value;
    
    var favCheckboxes = document.querySelectorAll('input[name="favorite"]:checked');
    var hobbies = [];
    for (var i = 0; i < favCheckboxes.length; i++) {
        hobbies.push(favCheckboxes[i].value);
    }
    var hobbiesStr = hobbies.join(", ");
    
    var color = document.querySelector('input[name="favColor"]:checked').value;
    
    var tableBody = document.getElementById("memberTable").getElementsByTagName("tbody")[0];
    var newRow = tableBody.insertRow();
    
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = email;
    newRow.insertCell(2).innerText = gender;
    newRow.insertCell(3).innerText = birthday;
    newRow.insertCell(4).innerText = hobbiesStr;
    newRow.insertCell(5).innerText = color;
    
    addHoverToRow(newRow);
    handleReset();
}

function handleReset() {
    document.getElementById("regForm").reset();
    document.getElementById("txtName").focus();
}

function applyTableHoverEvents() {
    var rows = document.getElementById("memberTable").getElementsByTagName("tbody")[0].rows;
    for (var i = 0; i < rows.length; i++) {
        addHoverToRow(rows[i]);
    }
}

function addHoverToRow(row) {
    var cells = row.cells;
    
    row.addEventListener("mouseover", function() {
        for (var j = 0; j < cells.length; j++) {
            cells[j].style.backgroundColor = "yellow";
        }
    });
    
    row.addEventListener("mouseout", function() {
        for (var j = 0; j < cells.length; j++) {
            cells[j].style.backgroundColor = "white";
        }
    });
}

// initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    initBirthdayDropdowns();
    document.getElementById("btnSignUp").addEventListener("click", handleRegister);
    document.getElementById("btnReset").addEventListener("click", handleReset);
    applyTableHoverEvents();
});