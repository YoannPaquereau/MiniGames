const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.passwordOne = !isEmpty(data.passwordOne) ? data.passwordOne : "";
    data.passwordTwo = !isEmpty(data.passwordTwo) ? data.passwordTwo : "";

    if (Validator.isEmpty(data.username)) {
        errors.username = "Nom d'utilisateur requis";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Adresse mail requise";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Adresse mail invalide";
    }

    if (Validator.isEmpty(data.passwordTwo)) {
        errors.passwordOne = "Mot de passe requis";
    }

    if (Validator.isEmpty(data.passwordTwo)) {
        errors.passwordTwo = "Confirmation du mot de passe requise";
    }

    if (!Validator.isLength(data.passwordOne, { min: 6, max: 30 })) {
        errors.passwordOne = "Mot de passe minimum 6 caractères";
    }

    if (!Validator.equals(data.passwordOne, data.passwordTwo)) {
        errors.passwordTwo = "Mots de passe doivent être identiques";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};