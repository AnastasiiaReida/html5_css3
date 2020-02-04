var Validation;
(function (Validation) {
    var RequiresValidator = /** @class */ (function () {
        function RequiresValidator() {
            this.message = "Обязательное значение";
        }
        RequiresValidator.prototype.validate = function (value) {
            return value === "";
        };
        ;
        return RequiresValidator;
    }());
    Validation.RequiresValidator = RequiresValidator;
    var NumberValidator = /** @class */ (function () {
        function NumberValidator() {
            this.message = "Значение должно быть числом";
        }
        NumberValidator.prototype.validate = function (value) {
            return !/\d+/.test(value);
        };
        return NumberValidator;
    }());
    Validation.NumberValidator = NumberValidator;
    ;
    var EmailValidators = /** @class */ (function () {
        function EmailValidators() {
            this.message = "Значение должно быть email адресом";
        }
        EmailValidators.prototype.validate = function (value) {
            return !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(value);
        };
        return EmailValidators;
    }());
    Validation.EmailValidators = EmailValidators;
    ;
})(Validation || (Validation = {}));
/// <reference path="validator-strategies.ts" />
var Validation;
(function (Validation) {
    var ValidatorSelector = /** @class */ (function () {
        function ValidatorSelector() {
        }
        ValidatorSelector.initialize = function () {
            ValidatorSelector.validators["required"] = new Validation.RequiresValidator();
            ValidatorSelector.validators["number"] = new Validation.NumberValidator();
            ValidatorSelector.validators["email"] = new Validation.EmailValidators();
            ValidatorSelector.initialize = function () { }; // для избежания повторной инициализации
        };
        ValidatorSelector.select = function (name) {
            var validator = ValidatorSelector.validators[name];
            if (validator) {
                return validator;
            }
            else {
                throw new Error("Не найден валидатор " + name);
            }
        };
        ValidatorSelector.validators = {};
        return ValidatorSelector;
    }());
    Validation.ValidatorSelector = ValidatorSelector;
})(Validation || (Validation = {}));
/// <reference path="validator-selector.ts" />
var Validation;
(function (Validation) {
    var Validator = /** @class */ (function () {
        function Validator(config) {
            this.config = config;
            Validation.ValidatorSelector.initialize();
        }
        Validator.prototype.validate = function (data) {
            var messages = [];
            for (var propertyName in data) {
                if (data.hasOwnProperty(propertyName)) {
                    var validatorName = this.config[propertyName];
                    if (!validatorName) {
                        continue;
                    }
                    var validator = Validation.ValidatorSelector.select(validatorName);
                    var invalid = validator.validate(data[propertyName]);
                    if (invalid) {
                        var message = "Не правильное значение для " + propertyName + ", " + validator.message;
                        messages.push(message);
                    }
                }
            }
            return {
                valid: messages.length == 0,
                errors: messages
            };
        };
        return Validator;
    }());
    Validation.Validator = Validator;
    ;
})(Validation || (Validation = {}));
/// <reference path="validator.ts" />
;
// определение правил проверки объекта
var config = {
    firstName: "required",
    password: "required",
    tel: "number",
    email: "email"
};
var form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var allInputs = form.getElementsByTagName('input');
    var userData = {};
    for (var i = 0; i < allInputs.length; i++) {
        userData[allInputs[i].name] = allInputs[i].value;
    }
    ;
    var validator = new Validation.Validator(config);
    var result = validator.validate(userData);
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
