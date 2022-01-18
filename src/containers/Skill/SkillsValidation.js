
const validateSkillsForm = (fields, applyCheck = false) => {
    let errors = {};
    let formIsValid = true;

    if (!fields["skills_name"] || fields["skills_name"].trim() === '') {
        formIsValid = false;
        errors["skills_name"] = "*Please enter your skill name.";
    }

    

    /* condition for update form */
    if(applyCheck) {
        if (!fields["skills_name"] || fields["skills_name"].trim() === '') {
            formIsValid = false;
            errors["skills_name"] = "*Please enter your skill name.";
        }
    
        
    }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateSkillsForm;