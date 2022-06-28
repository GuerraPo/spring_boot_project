function newPermit() {
    var licenseField = document.getElementById("licenseField");
    licenseField.style.display = "none";
    $("#permitType").val("P");
}

function renewPermit() {
    var licenseField = document.getElementById("licenseField");
    licenseField.style.display = "block";
    $("#permitType").val("P");
}
