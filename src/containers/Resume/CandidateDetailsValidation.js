
const ManualResumeValidation = (fields) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["name"] || fields["name"].trim() === '') {
        formIsValid = false;
        errors["name"] = "*Please enter your name.";
    }

    if (!fields["email"] || fields["email"].trim() === '') {
        formIsValid = false;
        errors["email"] = "*Please enter your email.";
    }

    if (typeof fields["email"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email.";
        }
    }

    if (!fields["phone"] || fields["phone"].trim() === '') {
        formIsValid = false;
        errors["phone"] = "*Please enter your phone.";
    }

    if (!fields["skills"] || fields["skills"].trim() === '') {
        formIsValid = false;
        errors["skills"] = "*Please enter your skills.";
    }

    if (!fields["place"] || fields["place"].trim() === '') {
        formIsValid = false;
        errors["place"] = "*Please enter your City.";
    }

    if (!fields["workExperience"] || fields["workExperience"].trim() === '') {
        formIsValid = false;
        errors["workExperience"] = "*Please enter Company Name.";
    }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default ManualResumeValidation;