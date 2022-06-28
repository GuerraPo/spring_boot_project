$().ready(function(){

    var dialog;
    $('#datatable').DataTable({
        "order": []
    });
        var table = $("#datatable").DataTable();
         $.ajax({
                url : "medical/get-laboratory-list",
                type : "GET",
                dataType : "text",
                beforeSend: function(){
                   dialog =  $.dialog({
                        title: '<label class="text-success">Loading Please Wait!</label>',
                        content: '<img src="/PublicAccessPortal/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                        type:'purple',
                        closeIcon: false,
                        backgroundDismiss: false
                    })
                },
                success : function(data){
                dialog.close();
                    var apps = JSON.parse(data);
                   // console.log(apps);
                    $.each(apps , function(index, app) {
                        table.row.add([
                            app.laboratoryName,
                            app.location,
                            app.email,
                            app.telephoneNum + " / " +app.mobileNum,
                            "<div class='dropdown'>" +
                            "<button href='#pablo' class='dropdown-toggle btn btn-default' data-toggle='dropdown' aria-expanded='false'><i class='material-icons'>settings</i> <b class='caret'></b>" +
                            "<div class='ripple-container'></div>" +
                            "</button>" +
                            "<ul class='dropdown-menu dropdown-menu-right'>" +
                            "<li><a data-toggle='modal'  data-id='"+app.id+"' id='getFacilities' class='' data-target='#updateFacilities'>Update</a></li>" +
                            "<li><a href='#' data-id='"+app.id+"' id='deleteLaboratory'>Delete </a></li>" +
                            "</ul>" +
                            "</div>"
                        ]).draw(false);
                    });
                }

         });

         $(document).on("click", "#deleteLaboratory", function(){

            id = $(this).attr("data-id");

            $.confirm({
                title: '<label class="text-warning">Warning!</label>',
                content: 'Are you sure want to delete this?',
                type: 'red',
                buttons: {
                    confirm: {
                        btnClass: 'purple',
                        text: 'Submit',
                        action: function(){
                            $.ajax({
                                url: 'medical/delete-laboratory',
                                data:{
                                    id: id
                                },
                                 type: 'GET',
                                 dataType: 'text',
                                 success: function(){
                                    $.dialog({
                                        title:'<label class="text-success">Success!</label>',
                                        content: 'Successfully Deleted',
                                        type: 'purple',
                                          buttons: {

                                          },
                                          close: function(){
                                              window.location.href = '/PublicAccessPortal/medical-facilities';
                                          }
                                      })

                                 },
                                 error : function(jqXHR, textStatus, errorThrown) {
                                      console.log(errorThrown);
                                  $.dialog({
                                      title:'<label class="text-Warning">Failed!</label>',
                                      content: "Can't Delete application!",
                                      type: 'orange'
                                  })
                              }

                            });

                        }
                    }, cancel: function(){

                 }
                }
            })
         });

         $(document).on("click", "#getFacilities", function(){

             var id = $(this).attr('data-id');

             $.ajax({
                url: 'medical/get-laboratory-details',
                data:{
                    id: id
                },
                dataType: 'text',
                type: 'GET',
                success: function(data){

                    var app = JSON.parse(data);
                    $("#id").val(app.id);
                    $("#LABORATORY_NAME").val(app.laboratoryName);
                    $("#LOCATION").val(app.location);
                    $("#EMAIL").val(app.email);
                    $("#MOBILE_NUMBER").val(app.mobileNum);
                    $("#TELEPHONE_NUMBER").val(app.telephoneNum);

                }, error: function () {
                     $('#updateModal').modal('hide');
                     $.dialog({
                         title: '<label class="text-Warning">Failed!</label>',
                         content: "Failed to Extract Application",
                         type: 'orange'
                     })
                 }

             });

        });

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
                                         content: "Can't Save your application!",
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


       function validateEmail($email) {
          var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailReg.test( $email );
        }
});