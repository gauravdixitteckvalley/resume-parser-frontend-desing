
const validateUserForm = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["username"] || fields["username"].trim() === '') {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
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

    if (!fields["first_name"] || fields["first_name"].trim() === '') {
        formIsValid = false;
        errors["first_name"] = "*Please enter your first name.";
    }

    if (!fields["last_name"] || fields["last_name"].trim() === '') {
        formIsValid = false;
        errors["last_name"] = "*Please enter your last name.";
    }

    /* condition for update form */
    if(applyCheck) {
        if (!fields["password"] || fields["password"].trim() === '') {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
    
        if (!fields["confirm_password"] || fields["confirm_password"].trim() === '') {
            formIsValid = false;
            errors["confirm_password"] = "*Please enter confirm password.";
        }
    
        if (typeof fields["confirm_password"] !== "undefined") {
            if (fields["confirm_password"] !== fields["password"]) {
                formIsValid = false;
                errors["confirm_password"] = "*The password and confirm password do not match.";
            }
        }
    }

    if (!fields["user_role"] || fields["user_role"].trim() === '') {
        formIsValid = false;
        errors["user_role"] = "*Please select role.";
    }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateUserForm;