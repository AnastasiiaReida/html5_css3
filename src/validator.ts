/// <reference path="validator-selector.ts" />

namespace Validation {
    export class Validator {
        public config: any;

        constructor(config: any) {
            this.config = config;
            ValidatorSelector.initialize();
        }

        public validate(data: any): ValidationResult {
            let messages: string[] = [];

            for (let propertyName in data) {
                if (data.hasOwnProperty(propertyName)) {
                    let validatorName = this.config[propertyName];

                    if (!validatorName) {
                        continue;
                    }
                    
                    let validator = ValidatorSelector.select(validatorName);
                    let invalid = validator.validate(data[propertyName]);

                    if (invalid) {
                        let message = "Не правильное значение для " + propertyName + ", " + validator.message;
                        messages.push(message);
                    }
                }
            }

            return {
                valid: messages.length == 0,
                errors: messages
            };
        }
    };

    export interface ValidationResult {
        valid: boolean;
        errors: string[];
    }
}