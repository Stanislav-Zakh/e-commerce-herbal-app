document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('productForm');
    window['populateForm'] = function (item) {
        var id = item.getAttribute('data-id');
        var name = item.getAttribute('data-name');
        var description = item.getAttribute('data-description');
        var unitPrice = item.getAttribute('data-unitprice');
        var imageURL = item.getAttribute('data-imageurl');
        var unitsInStock = item.getAttribute('data-unitsinstock');
        var categoryId = item.getAttribute('data-categoryid');
        form.querySelector('#id').value = id || '';
        form.querySelector('#name').value = name || '';
        form.querySelector('#description').value = description || '';
        form.querySelector('#unit_price').value = unitPrice || '';
        form.querySelector('#image_url').value = imageURL || '';
        form.querySelector('#units_in_stock').value = unitsInStock || '';
        form.querySelector('#category').value = categoryId || '';
    };
    window['reset'] = function () {
        form.querySelector('#id').value = '';
        form.querySelector('#name').value = '';
        form.querySelector('#description').value = '';
        form.querySelector('#unit_price').value = '';
        form.querySelector('#image_url').value = '';
        form.querySelector('#units_in_stock').value = '';
        form.querySelector('#category').value = '';
    };
});
