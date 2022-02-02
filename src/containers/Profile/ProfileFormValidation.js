
const validateProfileForm = (fields, applyCheck = false) => {
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

    /*if (!fields["profile_image"] || fields["profile_image"].trim() === '') {
        formIsValid = false;
        errors["profile_image"] = "*Please upload image file ";
    }*/
    if(fields["profile_image"]){
        if (!fields["profile_image"].match(/\.(jpg|jpeg|png|gif)$/)) {
            formIsValid = false;
            errors["profile_image"] = "*Please upload image file ";
            console.log('wrong file')
        }
    }
    
    
    
    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateProfileForm;