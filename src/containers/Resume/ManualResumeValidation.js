
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

    if (!fields["dob"] || fields["dob"].trim() === '') {
        formIsValid = false;
        errors["dob"] = "*Please enter Date Of Birth.";
    }

    // if (!fields["location"] || fields["location"].trim() === '') {
    //     formIsValid = false;
    //     errors["location"] = "*Please enter Place/Location.";
    // }

    if (!fields["exp"] || fields["exp"].trim() === '') {
        formIsValid = false;
        errors["exp"] = "*Please enter Experience.";
    }

    if (!fields["designation"] || fields["designation"].trim() === '') {
        formIsValid = false;
        errors["designation"] = "*Please enter Designation.";
    }

    if (!fields["current_ctc"] || fields["current_ctc"].trim() === '') {
        formIsValid = false;
        errors["current_ctc"] = "*Please enter Current CTC.";
    }

    // if (!fields["expected_ctc"] || fields["expected_ctc"].trim() === '') {
    //     formIsValid = false;
    //     errors["expected_ctc"] = "*Please enter Expected CTC.";
    // }

    // if (!fields["resume_label"] || fields["resume_label"].trim() === '') {
    //     formIsValid = false;
    //     errors["resume_label"] = "*Please enter Resume Label.";
    // }
    
    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default ManualResumeValidation;