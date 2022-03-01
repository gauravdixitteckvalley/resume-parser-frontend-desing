
const validateCandidateForm = (formNumber,fields) => {
    //, applyCheck = false
    let errorFields = {};
    let formIsValid = true;
    //console.log(fields, "  error fields")
    if(formNumber=="form1"){
        if (!fields["firstName"] || fields["firstName"].trim() === '') {
            formIsValid = false;
            errorFields["firstName"] = "*Please enter your first name.";
        }else{
            errorFields["firstName"] = "";
        }

        if (!fields["lastName"] || fields["lastName"].trim() === '') {
            formIsValid = false;
            errorFields["lastName"] = "*Please enter your last name.";
        }else{
            errorFields["lastName"] = "";
        }

        if (!fields["address"] || fields["address"].trim() === '') {
            formIsValid = false;
            errorFields["address"] = "*Please enter your address.";
        }else{
            errorFields["address"] = "";
        }

        if (!fields["email"] || fields["email"].trim() === '') {
            formIsValid = false;
            errorFields["email"] = "*Please enter your email.";
        }else if (typeof fields["email"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errorFields["email"] = "*Please enter valid email.";
            }
        }else{
            errorFields["email"] = "";
        }
        
        if (!fields["country"] || fields["country"] === '') {
            formIsValid = false;
            errorFields["country"] = "*Please select country";
        }else{
            errorFields["country"] = "";
        }

        if (!fields["state"] || fields["state"] === '') {
            formIsValid = false;
            errorFields["state"] = "*Please select state.";
        }else{
            errorFields["state"] = "";
        }

        if (!fields["city"] || fields["city"].trim() === '') {
            formIsValid = false;
            errorFields["city"] = "*Please enter your city name.";
        }else{
            errorFields["city"] = "";
        }

        if (!fields["zip"] || fields["zip"].trim() === '') {
            formIsValid = false;
            errorFields["zip"] = "*Please enter your zip code.";
        }else if (fields["zip"].length != 6) {
            formIsValid = false;
            errorFields["zip"] = "*Please enter correct zip code.";
        }else{
            errorFields["zip"] = "";
        }

        if (!fields["phone"] || fields["phone"].trim() === '') {
            formIsValid = false;
            errorFields["phone"] = "*Please enter your phone number.";
        }
        else if (fields["phone"].length != 10) {
            formIsValid = false;
            errorFields["phone"] = "*Please enter correct phone number.";
        }else{
            errorFields["phone"] = "";
        }
    } 
    if(formNumber=="form4"){
        
    } 
    return {
        errorFields : errorFields,
        formIsValid : formIsValid
    };
}

export default validateCandidateForm;