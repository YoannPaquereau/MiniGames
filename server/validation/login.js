const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Adresse mail requise";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Adresse mail invalide";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Mot de passe requis";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};