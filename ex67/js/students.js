var studentData = [];
var sortAscending = true; 

function load_student_fromxml(xmlPath) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status == 200 || this.status == 0)) {
            var xmlText = this.responseText;
            parseXMLString(xmlText);
        }
    };
    xhttp.open("GET", xmlPath, true);
    xhttp.send();
}

function parseXMLString(xmlText) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlText, "text/xml");
    var students = xmlDoc.getElementsByTagName("student");
    studentData = []; 
    for (var i = 0; i < students.length; i++) {
        var id = students[i].getElementsByTagName("id")[0].childNodes[0].nodeValue.trim();
        var name = students[i].getElementsByTagName("name")[0].childNodes[0].nodeValue.trim();
        var birthday = students[i].getElementsByTagName("birthday")[0].childNodes[0].nodeValue.trim();
        var gender = students[i].getElementsByTagName("gender")[0].childNodes[0].nodeValue.trim();
        studentData.push({ id: id, name: name, birthday: birthday, gender: gender });
    }
    renderTable();
}

function renderTable() {
    var tbody = document.getElementById("tableBody");
    tbody.innerHTML = ""; 

    for (var i = 0; i < studentData.length; i++) {
        var student = studentData[i];
        var tr = document.createElement("tr");

        tr.onclick = (function(st) {
            return function() {
                showDetails(st);
            };
        })(student);
        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.birthday}</td>
            <td>${student.gender}</td>
        `;
        tbody.appendChild(tr);
    }
}
function showDetails(student) {
    document.getElementById("detailPage").style.display = "block";
    document.getElementById("detId").innerText = student.id;
    document.getElementById("detName").innerText = student.name;
    document.getElementById("detDob").innerText = student.birthday;
    document.getElementById("detGender").innerText = student.gender;
}
function sortTable(columnIndex) {
    var keys = ["id", "name", "birthday", "gender"];
    var keyToSort = keys[columnIndex];

    studentData.sort(function(a, b) {
        var valA = a[keyToSort].toLowerCase();
        var valB = b[keyToSort].toLowerCase();

        if (valA < valB) return sortAscending ? -1 : 1;
        if (valA > valB) return sortAscending ? 1 : -1;
        return 0;
    });
    sortAscending = !sortAscending; 
    renderTable();
}
