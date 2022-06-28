$().ready(function(){

         function validateEmail($email) {
          var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailReg.test( $email );
        }

    $(document).on("click", "#SUBMIT_FACILITIES_APPLICATION", function(){

          $("#SUBMIT_FACILITIES_APPLICATION").prop("disabled", true);

            if($("#LABORATORY_NAME").val().trim() == "" || $("#LOCATION").val().trim() == "" || $("#MOBILE_NUMBER").val().trim() == "" || $("#TELEPHONE_NUMBER").val().trim() == "" || $("#EMAIL").val().trim() == ""){

                $.alert({
                    title: '<label class="text-warning">Warning!</label>',
                    content: 'Empty field',
                    type:'red',
                    buttons:{
                        close: function(){
                           $("#SUBMIT_FACILITIES_APPLICATION").prop("disabled", false);
                        }
                    }
                });

            }else if (!validateEmail($("#EMAIL").val())){
                  $.alert({
                        title: '<label class="text-warning">Warning!</label>',
                        content: 'Invalid Email Address',
                        type:'red',
                          buttons:{
                              close: function(){
                                 $("#SUBMIT_FACILITIES_APPLICATION").prop("disabled", false);
                              }
                          }
                    });
            }else{


            var validationForm=$('#FACILITIES_APPLICATION_FORM');
            validationForm.validate();



           if(validationForm.validate()){
                      var form = $("#FACILITIES_APPLICATION_FORM")[0];
                       var data = new FormData(form);

                    $.confirm({
                        title: '<label class="text-warning">Confirm!</label>',
                        content: 'Are you sure what to save this Facility?',
                        type: 'red',
                        buttons:{
                            confirm:{
                                btnClass: 'purple',
                                action: function(){
                                    $.ajax({
                                        url: "medical/add-laboratory",
                                        data: data,
                                        cache: false,
                                        contentType: false,
                                        processData: false,
                                        type: 'POST',
                                        timeout:1000000,
                                        success: function(response){
                                             $.dialog({
                                                    title:'<label class="text-success">Success!</label>',
                                                    content: 'Successfully Saved',
                                                    type: 'purple',
                                                      buttons: {

                                                      },
                                                      close: function(){
                                                          window.location.href = '/PublicAccessPortal/medical-facilities';
                                                      }

                                                  })
                                        },error : function(jqXHR, textStatus, errorThrown) {
                                             console.log(errorThrown);
                                         $.dialog({
                                             title:'<label class="text-Warning">Failed!</label>',
                                             content: "Can't Saved your application!",
                                             type: 'orange'
                                         })
                                     }
                                    });
                                }
                            }, cancel: function(){
                                $("#SUBMIT_FACILITIES_APPLICATION").prop("disabled", false);
                            }
                        }
                    })
           }else{

                $("#SUBMIT_FACILITIES_APPLICATION").prop("disabled", false);

           }
         }
    });
});