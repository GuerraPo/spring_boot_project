function newLicense() {
  var licenseField = document.getElementById("licenseField");
  licenseField.style.display = "none";
  $("#licenseType").val("L");
}

function renewLicense() {
  var licenseField = document.getElementById("licenseField");
  licenseField.style.display = "block";
  $("#licenseType").val("L");
}

function withCrime() {
  // Get the checkbox
  var checkBox = document.getElementById("ACCUSED_CRIME");
  // Get the output text
  var text = document.getElementById("STATE_OFFENSE");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    text.setAttribute("required","required");
    text.style.display = "block";
  } else {
    text.style.display = "none";
    text.removeAttribute("required");
  }
}