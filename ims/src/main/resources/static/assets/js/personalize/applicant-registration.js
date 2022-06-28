$().ready(function() {
    materialKit.initFormExtendedDatetimepickers();

      function validateEmail($email) {
          var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailReg.test( $email );
        }

    $(document).on("click", "#submitProfile", function() {

        var validationForm = $('#APPLICANT_FORM');
        validationForm.validate();

        $("#submitProfile").prop("disabled", true);


        if (validationForm.valid()) {
            var email = $("#EMAIL").val();
            var username = $("#USERNAME").val();
              if(!validateEmail($("#EMAIL").val())){
                  $.alert({
                        title: '<label class="text-warning">Warning!</label>',
                        content: 'Invalid Email Address',
                        type:'red',
                          buttons:{
                              cancel: function(){
                                 $("#submitProfile").prop("disabled", false);
                              }
                          }
                    });
            }
            else if($("#AGE").val() < 16){
                  $.alert({
                        title: '<label class="text-warning">Warning!</label>',
                        content: 'You must above 16 years old',
                        type:'red',
                            buttons: {
                                close: function() {
                                    $("#submitProfile").prop("disabled", false);
                                }
                            }
                    });
            }
            else if ($("#PASSWORD").val().length < 8) {
                $.alert({
                    title: '<label class="text-warning">Failed!</label>',
                    content: 'Your password is too short!',
                    type: 'red',
                     buttons: {
                         close: function() {
                            console.log('test');
                             $("#submitProfile").prop("disabled", false);
                         }
                     }
                })

            } else {
                $.ajax({
                    url: "check-email",
                    data: {
                        email: email
                    },
                    type: "GET",
                    dataType: "text",
                    success: function(data) {
                        if (data === "false") {
                            $.dialog({
                                title: '<label class="text-warning">Failed!</label>',
                                content: "Your chosen email is already used!",
                                type: 'red',
                            })
                            $("#submitProfile").prop("disabled", false);
                            $(".btn-previous").click();
                            $("#EMAIL").focus();
                        } else {
                            $.ajax({
                                url: "check-username",
                                data: {
                                    username: username
                                },
                                type: "GET",
                                dataType: "text",
                                success: function(data) {
                                    if (data === "false") {
                                        $.dialog({
                                            title: '<label class="text-warning">Failed!</label>',
                                            content: 'Your chosen username is already used!',
                                            type: 'red'
                                        })
                                        $("#submitProfile").prop("disabled", false);
                                        $("#USERNAME").focus();
                                    } else {
                                        $("#submitProfile").html('Processing...');
                                        var form = $("#APPLICANT_FORM")[0];
                                        var data = new FormData(form);
                                        $.ajax({
                                            url: "register-applicant",
                                            enctype: 'multipart/form-data',
                                            data: data,
                                            cache: false,
                                            contentType: false,
                                            processData: false,
                                            type: 'POST',
                                            timeout: 1000000,
                                            success: function(response) {
                                                $.alert({
                                                    title: '<label class="text-success">Success!</label>',
                                                    content: "Congratulations! You are now registered!",
                                                    type: 'purple',
                                                    buttons:{
                                                        close: function(){
                                                            window.location.href = "/PublicAccessPortal";
                                                        }
                                                    }

                                                })
                                                $("#submitProfile").prop("disabled", false);
                                                $("#APPLICANT_FORM")[0].reset();

                                            },
                                            error: function(jqXHR, textStatus, errorThrown) {
                                                $("#submitProfile").prop("disabled", false);
                                                $("#submitProfile").html('SUBMIT');
                                                $.dialog({
                                                    title: '<label class="text-warning">Failed!</label>',
                                                    content: "Can't process your application. Please try again.",
                                                    type: 'red',
                                                })

                                            }
                                        });
                                    }
                                }
                            });

                            /* $("#image").each(function(){
                                 var myFile = $(this)[0].files[0];
                                    console.log(myFile);
                                    if($(myFile).length > 0){

                                         var formData = new FormData();
                                        formData.append('ACCOUNT_ID', data);
                                        formData.append('REQUIREMENTS', 'DISPLAY_PHOTO');
                                        formData.append('TYPE', 'DISPLAY_PHOTO');
                                        formData.append('STATUS', 1);
                                        formData.append("FILE", myFile);
                                        formData.append('DIR', '../../REQUIREMENTS/'+myFile.name);

                                        $.ajax({
                                            url: 'upload-requirements-directory',
                                            data: formData,
                                            cache: false,
                                            contentType: false,
                                            processData: false,
                                            type: 'POST',
                                            timeout:1000000,
                                            success: function(){
                                                console.log('Successfully Saved');
                                            },error : function(){
                                                console.log('Failed to Save');
                                            }
                                        });
                                    }


                            });*/
                        }
                    }
                });
            }

        } else {
            $("#submitProfile").prop("disabled", false);
        }
    });
});
    var maxDate = new Date();
    jQuery('#BIRTH_DATE').datetimepicker({
        format: 'MM/DD/YYYY',
         maxDate: maxDate,
             icons: {
                 time: "fa fa-clock-o",
                 date: "fa fa-calendar",
                 up: "fa fa-arrow-up",
                 down: "fa fa-arrow-down",
                 previous: "fa fa-chevron-left",
                 next: "fa fa-chevron-right",
                 today: "fa fa-clock-o",
                 clear: "fa fa-trash-o"
             }
    });



 $('#BIRTH_DATE').datetimepicker().on('dp.change', function (event) {
        var birth_date = new Date($("#BIRTH_DATE").val());
        var today = new Date();

        var age = Math.floor((today-birth_date) / (365.25 * 24 * 60 * 60 * 1000));
       // console.log(age);
        $("#AGE").val(age).change();
});
    $("input[type=file]").on("change", function(){
        var size = 0;
         size = $(this)[0].files[0].size;
           //console.log(size);
           if(size > 1000000){
              $.alert({
                       title: '<label class="text-warning">Warning!</label>',
                       content: 'Image File is too big',
                       type:'red',
                           buttons: {
                               close: function() {
                               console.log('sample');
                               //$("#REMOVE").trigger('click');
                               }
                           }
                  });
           }
    });


function withCrime() {
    // Get the checkbox
    var checkBox = document.getElementById("ACCUSED_CRIME");
    // Get the output text
    var text = document.getElementById("STATE_OFFENSE");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        text.setAttribute("required", "required");
        text.style.display = "block";
    } else {
        text.style.display = "none";
        text.removeAttribute("required");
    }
}