const validateNoticeForm = (fields) => {
    let errors = {};
    let formIsValid = true;

    // if (!fields["to"] || fields["to"].trim() === '') {
    //     formIsValid = false;
    //     errors["to"] = "*Please select user.";
    // }

    if (!fields["message"] || fields["message"].trim() === '') {
        formIsValid = false;
        errors["message"] = "*Please enter your message.";
    }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateNoticeForm;