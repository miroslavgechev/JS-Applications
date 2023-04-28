export function checkFieldsValidity(data){

    let isFormValid = true;

    const makeInput = document.querySelector('#new-make');
    const modelInput = document.querySelector('#new-model');
    const yearInput = document.querySelector('#new-year');
    const descriptionInput = document.querySelector('#new-description');
    const priceInput = document.querySelector('#new-price');
    const imageInput = document.querySelector('#new-image');

    data.make.length >= 4 ? appendClass(makeInput, true) : appendClass(makeInput, false);
    data.model.length >= 4 ? appendClass(modelInput, true) : appendClass(modelInput, false);
    (Number(data.year) >= 1950 && Number(data.year) <= 2050) ? appendClass(yearInput, true) : appendClass(yearInput, false);
    data.description.length >= 10 ? appendClass(descriptionInput, true) : appendClass(descriptionInput, false);
    (Number(data.price) >= 0 && data.price !== '') ? appendClass(priceInput, true) : appendClass(priceInput, false);
    data.img.length > 0 ? appendClass(imageInput, true) : appendClass(imageInput, false);

    return isFormValid

    function appendClass(element, isValid) {
        if (isValid) {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
        } else {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
            isFormValid = false;
        };
    }
}