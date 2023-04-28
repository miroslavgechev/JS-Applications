export function createSubmitHandler(section, callback){
    
    section.querySelector('form').addEventListener('submit', onSubmit);

    function onSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        callback(data, e);
    }

}