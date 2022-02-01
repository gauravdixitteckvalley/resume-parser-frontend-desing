
const validateUserForm = (fields) => {
    let errors = {};
    let formIsValid = true;

    /* condition for update form */
    if (!fields["name"] || fields["name"].trim() === '') {
        formIsValid = false;
        errors["name"] = "*Please select name.";
    }

    if (!fields["subject"] || fields["subject"].trim() === '') {
        formIsValid = false;
        errors["subject"] = "*Please enter your subject.";
    }

    if (!fields["message"] || fields["message"].trim() === '') {
        formIsValid = false;
        errors["message"] = "*Please enter your message.";
    }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateUserForm;