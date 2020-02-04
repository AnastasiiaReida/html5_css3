/// <reference path="validator.ts" />

interface UserData{
    [key:string]:string;
};
// определение правил проверки объекта
let config = {
    firstName: "required",
    password: "required",
    tel: "number",
    email: "email"
};


let form: HTMLFormElement = document.getElementsByTagName('form')[0];
form.addEventListener('submit', function (e) {
    e.preventDefault();

    let allInputs = form.getElementsByTagName('input');
    let userData:UserData = {};
    for (let i = 0; i < allInputs.length; i++) {
        userData[allInputs[i].name] = allInputs[i].value;
    };

    let validator = new Validation.Validator(config);
    let result: Validation.ValidationResult = validator.validate(userData);
    console.log(result);
    // если хотим выводить ошибки в форму то добавить вот этот кусок кода
    // let errors = document.getElementsByClassName('error')[0] as HTMLDivElement;
    // errors.innerHTML = '';
    // if(!result.valid){
    //     const ul = document.createElement('ul');
    
    //     for(let i=0; i< result.errors.length; i++){
    //         const li = document.createElement('li');
    //         li.innerHTML = result.errors[i];
    //         ul.appendChild(li);
    //     }
    //     errors.appendChild(ul);
    // }
    
});




