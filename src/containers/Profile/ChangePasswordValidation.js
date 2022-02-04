
const validateUserForm = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;
   
    if (!fields["old_password"] || fields["old_password"].trim() === '') {
        formIsValid = false;
        errors["old_password"] = "*Please enter your old password.";
    }

    if (!fields["password"] || fields["password"].trim() === '') {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
    }
    
   
    if (!fields["confirm_password"] || fields["confirm_password"].trim() === '') {
        formIsValid = false;
        errors["confirm_password"] = "*Please enter confirm password.";
    }

    if (fields["confirm_password"] !== fields["password"]) {
            formIsValid = false;
            errors["password"] = "*The password and confirm password do not match.";
            errors["confirm_password"] = "*The password and confirm password do not match.";
    }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateUserForm;