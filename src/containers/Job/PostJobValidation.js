
const validateSkillsForm = (fields, applyCheck = false) => {
    let errorFields = {};
    let formIsValid = true;

    if (!fields["jobTitle"] || fields["jobTitle"].trim() === '') {
        formIsValid = false;
        errorFields["jobTitle"] = "*Please enter job Title.";
    }else{
        errorFields["jobTitle"] = "";
    }

    if (!fields["exp"] || fields["exp"].trim() === '') {
        formIsValid = false;
        errorFields["exp"] = "*Please enter required experience.";
    }else{
        errorFields["exp"] = "";
    }

    if (!fields["highlights"] || fields["highlights"].trim() === '') {
        formIsValid = false;
        errorFields["highlights"] = "*Please enter job highlights.";
    }else{
        errorFields["highlights"] = "";
    }

    if (!fields["opening"] || fields["opening"].trim() === '') {
        formIsValid = false;
        errorFields["opening"] = "*Please enter job openings.";
    }else{
        errorFields["opening"] = "";
    }

    if (!fields["location"] || fields["location"].trim() === '') {
        formIsValid = false;
        errorFields["location"] = "*Please enter location.";
    }else{
        errorFields["location"] = "";
    }

    if (!fields["salary"] || fields["salary"].trim() === '') {
        formIsValid = false;
        errorFields["salary"] = "*Please enter salary.";
    }else{
        errorFields["salary"] = "";
    }

    if (!fields["keySkills"] || fields["keySkills"].trim() === '') {
        formIsValid = false;
        errorFields["keySkills"] = "*Please enter key skills.";
    }else{
        errorFields["keySkills"] = "";
    }

    if (!fields["otherSkills"] || fields["otherSkills"].trim() === '') {
        formIsValid = false;
        errorFields["otherSkills"] = "*Please enter other skills.";
    }else{
        errorFields["otherSkills"] = "";
    }

    if (!fields["jd"] || fields["jd"].trim() === '') {
        formIsValid = false;
        errorFields["jd"] = "*Please enter job description.";
    }else{
        errorFields["jd"] = "";
    }

    if (!fields["industryType"] || fields["industryType"].trim() === '') {
        formIsValid = false;
        errorFields["industryType"] = "*Please enter industry type.";
    }else{
        errorFields["industryType"] = "";
    }

    if (!fields["functionalArea"] || fields["functionalArea"].trim() === '') {
        formIsValid = false;
        errorFields["functionalArea"] = "*Please enter functional area.";
    }else{
        errorFields["functionalArea"] = "";
    }

    if (!fields["role"] || fields["role"].trim() === '') {
        formIsValid = false;
        errorFields["role"] = "*Please enter role.";
    }else{
        errorFields["role"] = "";
    }

    if (!fields["empType"] || fields["empType"].trim() === '') {
        formIsValid = false;
        errorFields["empType"] = "*Please enter employee type.";
    }else{
        errorFields["empType"] = "";
    }

    if (!fields["education"] || fields["education"].trim() === '') {
        formIsValid = false;
        errorFields["education"] = "*Please enter education.";
    }else{
        errorFields["education"] = "";
    }

    if (!fields["recruitDetails"] || fields["recruitDetails"].trim() === '') {
        formIsValid = false;
        errorFields["recruitDetails"] = "*Please enter recruiter details.";
    }else{
        errorFields["recruitDetails"] = "";
    }

    if (!fields["companyName"] || fields["companyName"].trim() === '') {
        formIsValid = false;
        errorFields["companyName"] = "*Please enter company name.";
    }else{
        errorFields["companyName"] = "";
    }

    if (!fields["companyWebsite"] || fields["companyWebsite"].trim() === '') {
        formIsValid = false;
        errorFields["companyWebsite"] = "*Please enter company website.";
    }else{
        errorFields["companyWebsite"] = "";
    }

    if (!fields["companyDetails"] || fields["companyDetails"].trim() === '') {
        formIsValid = false;
        errorFields["companyDetails"] = "*Please enter company details.";
    }else{
        errorFields["companyDetails"] = "";
    }

    

    return {
        errorFields : errorFields,
        formIsValid : formIsValid
    };
}

export default validateSkillsForm;