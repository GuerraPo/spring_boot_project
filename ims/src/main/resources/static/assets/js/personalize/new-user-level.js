$().ready(function() {

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    /*       $.ajax({
               url: '/web-user/get-user-roles',
               dataType: 'text',
               type: 'GET',
               success: function(data){
                   var app = JSON.parse(data);
                   console.log(app);
                   $.each(app, function(index, roles){
                   $("#ROLES").append('<option class="append-role" value="'+roles.name+'">"'+roles.name+'"</option>');

                   })

               }

           });*/

    $(document).on("click", "#SUBMIT_APPLICATION", function() {

        var validationForm = $('#USER_LEVEL_FORM');
        validationForm.validate();

        $("#SUBMIT_APPLICATION").prop("disabled", true);

        if ($("#PASSWORD").val() != $("#CONFIRM_PASSWORD").val()) {
            $.alert({
                title: '<label class="text-warning">Warning!</label>',
                content: 'Password not match',
                type: 'red',
                buttons: {
                    close: function() {
                        $("#SUBMIT_APPLICATION").prop("disabled", false);
                    }
                }
            });

        } else if (!validateEmail($("#EMAIL").val())) {
            $.alert({
                title: '<label class="text-warning">Warning!</label>',
                content: 'Invalid Email Address',
                type: 'red',
                buttons: {
                    close: function() {
                        $("#SUBMIT_APPLICATION").prop("disabled", false);
                    }
                }
            });

        } else if ($("#USERNAME").val().trim() == "" || $("#PASSWORD").val().trim() == "" || $("#ROLE").val().trim() == "") {
            $.alert({
                title: '<label class="text-warning">Warning!</label>',
                content: 'Empty Field',
                type: 'red',
                buttons: {
                    close: function() {
                        $("#SUBMIT_APPLICATION").prop("disabled", false);
                    }
                }
            });

        } else if ($("#PASSWORD").val().length < 8) {
            $.alert({
                title: '<label class="text-warning">Warning!</label>',
                content: 'Your password is too short',
                type: 'red',
                buttons: {
                    close: function() {
                        $("#SUBMIT_APPLICATION").prop("disabled", false);
                    }
                }
            });

        } else {

            if (validationForm.validate()) {

                var email = $("#EMAIL").val();
                var username = $("#USERNAME").val();


                $.confirm({
                    title: '<label class="text-warning">Warning!</label>',
                    content: 'Are you sure to save this web user?',
                    type: 'red',
                    buttons: {
                        confirm: {
                            btnClass: 'purple',
                            action: function() {

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
                                            $("#SUBMIT_APPLICATION").prop("disabled", false);

                                        } else {
                                            $.ajax({
                                                url: "check-username",
                                                data: {
                                                    username: username
                                                },
                                                type: "GET",
                                                dataType: "text",
                                                success: function(data) {
                                                    if (data == "false") {
                                                        $.dialog({
                                                            title: '<label class="text-warning">Failed!</label>',
                                                            content: 'Your chosen username is already used!',
                                                            type: 'red'
                                                        })
                                                        $("#submitProfile").prop("disabled", false);
                                                        $("#USERNAME").focus();
                                                        $("#SUBMIT_APPLICATION").prop("disabled", false);

                                                    } else {
                                                        $("#submitProfile").html('Processing...');
                                                        var form = $("#USER_LEVEL_FORM")[0];
                                                        var data = new FormData(form);
                                                        $.ajax({
                                                            url: 'web-user/add-web-user',
                                                            enctype: 'multipart/form-data',
                                                            data: data,
                                                            cache: false,
                                                            contentType: false,
                                                            processData: false,
                                                            type: 'POST',
                                                            timeout: 1000000,
                                                            success: function(response) {
                                                                $.dialog({
                                                                    title: '<label class="text-success">Success!</label>',
                                                                    content: 'Successfully Saved',
                                                                    type: 'purple',
                                                                    buttons: {

                                                                    },
                                                                    close: function() {
                                                                        window.location.href = '/PublicAccessPortal/web-user';
                                                                    }

                                                                })

                                                            },
                                                            error: function(jqXHR, textStatus, errorThrown) {
                                                                //console.log(errorThrown);
                                                                $.dialog({
                                                                    title: '<label class="text-Warning">Failed!</label>',
                                                                    content: "Can't Save your application!",
                                                                    type: 'orange'
                                                                })
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        },
                        cancel: function() {
                            $("#SUBMIT_APPLICATION").prop("disabled", false);
                        }
                    }
                })
            } else {
                $("#SUBMIT_APPLICATION").prop("disabled", false);
            }
        }
    });
});