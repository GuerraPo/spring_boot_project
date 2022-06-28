$().ready(function(){

    $(document).on("click", "#SUBMIT_APPLICATION", function(){

     var validationForm=$('#USER_LEVEL_FORM');
          validationForm.validate();

           $("#SUBMIT_APPLICATION").prop("disabled", true);

        if($("#MENU_NAME").val().trim() == ""){
            $.alert({
                title: '<label class="text-warning">Warning!</label>',
                content: 'Empty field',
                type:'red'
            });

          }else{

         if(validationForm.validate()){
             var form = $("#USER_LEVEL_FORM")[0];
             var data = new FormData(form);

             $.confirm({
                title: '<label class="text-warning">Warning!</label>',
                content: 'Are you sure want to save this?',
                type: 'red',
                buttons:{
                    confirm:{
                        btnClass: 'purple',
                        action:function(){
                            $.ajax({
                                 url: 'user-level-menu-application',
                                 data: data,
                                 cache: false,
                                 contentType: false,
                                 processData: false,
                                 type: 'POST',
                                 timeout:1000000,
                                 success:function(data){
                                   $.dialog({
                                           title:'<label class="text-success">Success!</label>',
                                           content: 'Successfully Saved',
                                           type: 'purple',
                                             buttons: {

                                             },
                                             close: function(){
                                                 window.location.href = '/PublicAccessPortal/user-level';
                                             }

                                     })

                                 },error : function(jqXHR, textStatus, errorThrown) {
                                      //console.log(errorThrown);
                                    $.dialog({
                                        title:'<label class="text-Warning">Failed!</label>',
                                        content: "Can't Save your application!",
                                        type: 'orange'
                                    })
                                }
                            });
                        }
                    }, cancel: function(){

                    }
                }

             })
         }else{
               $("#SUBMIT_APPLICATION").prop("disabled", false);
         }
      }
    });
});