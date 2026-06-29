// Products menu item: display ecommerce products from JSON
function showProducts() {
    showSection('products');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://tranduythanh.com/webmaterials/ecommerce-sample.json", true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var productData = data.products || {};
            var products = [];
            for (var id in productData) {
                if (productData.hasOwnProperty(id)) {
                    var item = productData[id];
                    item.id = id;
                    products.push(item);
                }
            }
            allProducts = products;
            renderProducts(allProducts);
        }
    }
}
