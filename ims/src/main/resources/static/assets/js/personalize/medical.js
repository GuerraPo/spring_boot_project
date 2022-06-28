$().ready(function(){
        $('#datatable').DataTable({
            "order": []
        });

/*        $.ajax({
            url: 'get-medical',
            dataType: 'text',
            type: 'GET',
            success:function(data){
               var apps = JSON.parse(data);
                $.each(apps , function(index, app) {
                    table.row.add([
                        app.accountId,
                        app.sports,
                        app.role,
                        app.club,
                        app.appType,
                        app.status,
                        "<div class='dropdown'>" +
                        "<button href='#pablo' class='dropdown-toggle btn btn-default' data-toggle='dropdown' aria-expanded='false'><i class='material-icons'>settings</i> <b class='caret'></b>" +
                        "<div class='ripple-container'></div>" +
                        "</button>" +
                        "<ul class='dropdown-menu dropdown-menu-right'>" +
                        "<li><a data-toggle='modal'  data-id='"+app.accountId+"' id='"+application_id+"' class='"+app.accountId+"' data-target='"+application_type+"'>Edit</a></li>" +
                        "<li><a data-toggle='modal'  data-id='"+app.accountId+"' id='licensePayment' data-target='#paymentModal'>Payment</a></li>" +
                        "<li><a href='#pablo'>Print License</a></li>" +
                        "</ul>" +
                        "</div>"
                    ]).draw(false);

                })

            }
        });*/

 /*       $(document).on("click", "#SUBMIT_MEDICAL", function(){

            var validationForm = $("#MEDICAL_FORM");
            validationForm.validate();

             $("#SUBMIT_MEDICAL").prop("disabled", true);

            if(validationForm.valid()){
                var form = $("#MEDICAL_FORM");
                var data = new FormData(form);

                $.ajax({
                    url: 'add-medical',
                    data : data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    timeout:1000000,
                    beforeSend: function(){
                        obj =  $.dialog({
                            title: '<label class="text-success">Loading Please Wait!</label>',
                            content: '<img src="/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                            type:'purple',
                            closeIcon: false,
                            backgroundDismiss: false
                        })

                    },complete: function(){
                        obj.close();
                    },
                      success : function (response){
                          $.dialog({
                              title:'<label class="text-success">Success!</label>',
                              content: 'Successfully Added',
                              type: 'purple',
                              buttons: {

                              },
                              close: function(){
                                  window.location.href = '/applications';
                              }
                          })
                      },
                      error : function(jqXHR, textStatus, errorThrown) {
                          console.log(errorThrown);
                          $.dialog({
                              title:'<label class="text-Warning">Failed!</label>',
                              content: "Can't save your application!",
                              type: 'orange'
                          })
                      }

                })
            }else{
                $("#SUBMIT_MEDICAL").prop("disabled", false);

            }
        });*/

 /*       $(document).on("click", "#SaveEditMedical", function(){
            var obj;
                var validationForm = $("#MEDICAL_FORM");
                 validationForm.validate();

                 if(validationForm.validate()){
                 $.confirm({
                    title: '<label class="text-warning">Warning!</label>',
                    content: 'Are you sure want to Save this Changed?',
                    type: 'red',
                    buttons: {
                        confirm: {
                           btnClass: 'btn-purple',
                           action: function(){
                                $.ajax({
                                    url: 'update-medical',
                                    data: data,
                                    cache: false,
                                    contentType: false,
                                    processData: false,
                                    type: 'POST',
                                    timeout:1000000,
                                    success: function(){
                                        $.dialog({
                                            title:'<label class="text-success">Success!</label>',
                                            content: 'Successfully Updated',
                                            type: 'purple',
                                            buttons: {

                                            },
                                            close: function(){
                                                location.reload();
                                            }
                                        })
                                    },
                                     error : function(jqXHR, textStatus, errorThrown) {
                                         console.log(errorThrown);
                                         $.dialog({
                                             title:'<label class="text-Warning">Failed!</label>',
                                             content: "Can't update your application!",
                                             type: 'orange'
                                         })
                                     }

                                })
                           }
                        }, cancel: function(){

                        }
                    }
                 })
                 }

        });*/

});