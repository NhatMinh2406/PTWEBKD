document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnAdd").addEventListener("click", addNode);
    document.getElementById("btnRemove").addEventListener("click", removeNode);
    document.getElementById("btnModify").addEventListener("click", modifyNode);
});

function addNode() {
    var content = document.getElementById("txtAddContent").value.trim();
    var posInput = document.getElementById("txtAddPos").value;
    var ul = document.getElementById("webNodeList");
    var listItems = ul.getElementsByTagName("li");

    if (content === "") {
        alert("Vui lòng nhập nội dung (Content)!");
        return;
    }

    var newLi = document.createElement("li");
    newLi.innerText = content;

    if (posInput === "") {
        ul.appendChild(newLi);
    } else {
        var position = parseInt(posInput);

        if (position < 1 || position > listItems.length + 1) {
            alert("Vui lòng nhập vị trí hợp lệ từ 1 đến " + (listItems.length + 1));
            return;
        }

        var targetNode = listItems[position - 1];

        if (targetNode) {
           
            ul.insertBefore(newLi, targetNode);
        } else {
          
            ul.appendChild(newLi);
        }
    }

    document.getElementById("txtAddContent").value = "";
    document.getElementById("txtAddPos").value = "";
}


function removeNode() {
    var posInput = document.getElementById("txtRemovePos").value;
    var ul = document.getElementById("webNodeList");
    var listItems = ul.getElementsByTagName("li");

    if (posInput === "") {
        alert("Vui lòng nhập vị trí (Position) cần xóa!");
        return;
    }
    var position = parseInt(posInput);

    var nodeToRemove = listItems[position - 1];
    

    ul.removeChild(nodeToRemove);


    document.getElementById("txtRemovePos").value = "";
}


function modifyNode() {
    var newContent = document.getElementById("txtModContent").value.trim();
    var posInput = document.getElementById("txtModPos").value;
    var ul = document.getElementById("webNodeList");
    var listItems = ul.getElementsByTagName("li");

    if (newContent === "") {
        alert("Vui lòng nhập nội dung mới (New Content)!");
        return;
    }
    if (posInput === "") {
        alert("Vui lòng nhập vị trí cần sửa!");
        return;
    }

    var position = parseInt(posInput);

    if (position < 1 || position > listItems.length) {
        alert("Vị trí không tồn tại! Hãy nhập từ 1 đến " + listItems.length);
        return;
    }


    var replacementLi = document.createElement("li");
    replacementLi.innerText = newContent;


    var oldNode = listItems[position - 1];

    ul.replaceChild(replacementLi, oldNode);


    document.getElementById("txtModContent").value = "";
    document.getElementById("txtModPos").value = "";
}