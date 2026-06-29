// Q2: Hiển thị ngày giờ chạy liên tục
setInterval(function() {
    var d = new Date();
    document.getElementById("datetime-display").innerHTML = "Current Date & Time: " + d.toLocaleString();
}, 1000);

// Hàm điều hướng Part B (DOM Manipulation)
function showSection(sectionId) {
    // Ẩn tất cả các div con trong part-B
    var sections = document.getElementById("part-B").children;
    for(var i=0; i < sections.length; i++) {
        sections[i].classList.add("hidden");
    }
    // Hiện section được chọn
    document.getElementById(sectionId).classList.remove("hidden");
}

// Hàm render giao diện sản phẩm (Q5)
function renderProducts(productList) {
    var html = `
        <input type="text" id="search-keyword" placeholder="Search name/category...">
        <button onclick="searchProducts()">Search</button>
        <table border='1' width='100%'>
            <tr><th>Image</th><th>Name</th><th>Price</th><th>Action</th></tr>`;
            
    for (var i = 0; i < productList.length; i++) {
        var p = productList[i];
        html += `<tr>
            <td><img src="${p.image}" width="50"></td>
            <td>${p.name} (${p.category})</td>
            <td>${p.price}</td>
            <td><button onclick="addToCart('${p.id}', '${p.name}', ${p.price})">Buy</button></td>
        </tr>`;
    }
    html += "</table>";
    document.getElementById("products").innerHTML = html;
}

// Hàm tìm kiếm sản phẩm (Q6)
function searchProducts() {
    var keyword = document.getElementById("search-keyword").value.toLowerCase();
    var filtered = allProducts.filter(function(p) {
        return p.name.toLowerCase().indexOf(keyword) > -1 || 
               p.category.toLowerCase().indexOf(keyword) > -1;
    });
    renderProducts(filtered);
}
function addToCart(id, name, price) {
    // Đọc giỏ hàng hiện tại từ Local Storage
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.push({id: id, name: name, price: price});
    // Lưu lại vào Local Storage
    localStorage.setItem('myCart', JSON.stringify(cart));
    alert("Added to cart!");
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    let html = "<table border='1'><tr><th>Name</th><th>Price</th></tr>";
    let total = 0;
    for(let i=0; i<cart.length; i++) {
        html += `<tr><td>${cart[i].name}</td><td>${cart[i].price}</td></tr>`;
        total += cart[i].price;
    }
    html += `<tr><td><b>Total</b></td><td><b>${total}</b></td></tr></table>`;
    document.getElementById("cart-content").innerHTML = html;
    showSection('my-cart');
}

// Q8: Đăng nhập
function doLogin() {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    
    // Gọi AJAX file JSON để đối chiếu user/pass
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://tranduythanh.com/webmaterials/ecommerce-sample.json", true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var users = data.users; // Giả sử JSON có mảng users
            var loggedInUser = users.find(u => u.username == user && u.password == pass);
            
            if(loggedInUser) {
                localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
                alert("Login successful!");
            } else {
                alert("Wrong username or password");
            }
        }
    }
}

// Q9: Hiển thị My Info
function showMyInfo() {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if(!user) { alert("Please login first!"); return; }
    
    document.getElementById("my-info").innerHTML = `
        <h2>My Information</h2>
        <p>Name: ${user.fullName}</p>
        <p>Role: ${user.position}</p>`;
    showSection('my-info');
}

// Q10: Phân quyền Administrator
function showAdmin() {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if(user && user.position === "Sales Manager") {
        document.getElementById("admin").innerHTML = "<h2>Admin Dashboard</h2><p>List of orders and sales...</p>";
        showSection('admin');
    } else {
        alert("Access Denied! You must be a Sales Manager.");
    }
}

// ================= CHỨC NĂNG: VNEXPRESS RSS =================

function showRSS() {
    var output = document.getElementById("external-api");
    output.innerHTML = '<h2>VnExpress Business News</h2><p>Đang tải tin tức RSS...</p>';
    showSection('external-api');

    var xhr = new XMLHttpRequest();
    var url = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://vnexpress.net/rss/kinh-doanh.rss");

    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status === 200) {
            try {
                var response = JSON.parse(xhr.responseText);
                if (response && response.contents) {
                    renderRssFromText(response.contents);
                } else {
                    throw new Error('Empty contents from proxy');
                }
            } catch (e) {
                console.error('RSS parse error:', e);
                output.innerHTML = '<p style="color: red;">Lỗi khi phân tích RSS VnExpress. Vui lòng thử lại sau.</p>';
            }
        } else {
            console.error('RSS proxy HTTP error:', xhr.status, xhr.statusText);
            output.innerHTML = '<p style="color: red;">Không thể tải RSS VnExpress (code: ' + xhr.status + '). Vui lòng thử lại sau.</p>';
        }
    };
    xhr.onerror = function() {
        output.innerHTML = '<p style="color: red;">Lỗi kết nối RSS VnExpress. Vui lòng thử lại sau.</p>';
    };
    xhr.send();
}

function renderRssFromText(xmlText) {
    // Làm sạch chuỗi XML: Loại bỏ BOM (Byte Order Mark) và khoảng trắng thừa ở đầu/cuối chuỗi
    xmlText = xmlText.trim().replace(/^\uFEFF/, '');
    
    var parser = new DOMParser();
    // Phân tích cú pháp chuỗi sạch sang tài liệu XML trực quan
    var xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    // Kiểm tra lỗi phân tích cú pháp nghiêm ngặt của trình duyệt
    var parserErrors = xmlDoc.getElementsByTagName("parsererror");
    if (parserErrors.length > 0) {
        document.getElementById("external-api").innerHTML = '<p style="color: red;">Định dạng XML của VnExpress bị thay đổi, không thể phân tích dữ liệu.</p>';
        return;
    }

    var items = xmlDoc.getElementsByTagName("item");
    var html = "<h2>VnExpress Business News</h2><ul style='padding-left: 18px;'>";

    // Giới hạn hiển thị tối đa 15 bài tin để tránh làm tràn bố cục Part B
    var maxItems = Math.min(items.length, 15);

    for (var i = 0; i < maxItems; i++) {
        var titleEl = items[i].getElementsByTagName("title")[0];
        var linkEl = items[i].getElementsByTagName("link")[0];
        
        // Trích xuất nội dung văn bản bên trong các thẻ tag
        var title = titleEl ? titleEl.textContent.trim() : 'No title';
        var link = linkEl ? linkEl.textContent.trim() : '#';
        
        // Thêm thuộc tính bảo mật rel="noopener" khi mở liên kết ở tab mới
        html += `<li style='margin-bottom: 10px;'>
                    <a href="${link}" target="_blank" rel="noopener" style='text-decoration:none; color:#1a0dab; font-size: 16px; font-weight: 500;'>${title}</a>
                 </li>`;
    }
    
    if (items.length === 0) {
        html += '<li>No business news available at this time.</li>';
    }
    html += "</ul>";
    
    document.getElementById("external-api").innerHTML = html;
}