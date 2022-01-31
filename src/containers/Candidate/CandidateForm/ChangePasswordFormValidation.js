
const validateUserForm = (fields) => {
    let errors = {};
    let formIsValid = true;

    /* condition for update form */
    if (!fields["oldPassword"] || fields["oldPassword"].trim() === '') {
        formIsValid = false;
        errors["oldPassword"] = "*Please enter your old password.";
    }

    if (!fields["password"] || fields["password"].trim() === '') {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
    }

    if (!fields["confirmPassword"] || fields["confirmPassword"].trim() === '') {
        formIsValid = false;
        errors["confirmPassword"] = "*Please enter confirm password.";
    }

    if (typeof fields["confirmPassword"] !== "undefined") {
        if (fields["confirmPassword"] !== fields["password"]) {
            formIsValid = false;
            errors["confirmPassword"] = "*The password and confirm password do not match.";
        }
    }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateUserForm;