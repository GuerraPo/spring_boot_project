$('#APPLICANT_FORM').validate({
    rules: {
        PASSWORD: "required",
        CONFIRM_PASSWORD: {
            equalTo: "#PASSWORD"
        }
    }
});

$('#PROFILE_FORM').validate({
    rules: {
        CONFIRM_PASSWORD: {
            equalTo: "#PASSWORD"
        }
    }
});