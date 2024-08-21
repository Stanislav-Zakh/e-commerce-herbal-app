document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('categoryForm');
    window['populateFormCategory'] = function (item) {
        var id = item.getAttribute('data-id');
        var name = item.getAttribute('data-name');
        form.querySelector('#id').value = id || '';
        form.querySelector('#name').value = name || '';
    };
    window['reset'] = function () {
        form.querySelector('#id').value = '';
        form.querySelector('#name').value = '';
    };
});
