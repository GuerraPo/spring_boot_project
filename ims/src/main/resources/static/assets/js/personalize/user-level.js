$().ready(function(){
var role_name;

$('#datatable').DataTable({
    "order": []
});

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    var table = $("#datatable").DataTable();
    var loading;
     $.ajax({
            url : "web-user/get-users",
            type : "GET",
            dataType : "text",
            beforeSend: function(){
                loading =  $.dialog({
                    title: '<label class="text-success">Loading Please Wait!</label>',
                    content: '<img src="/PublicAccessPortal/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                    type:'purple',
                    closeIcon: false,
                    backgroundDismiss: false
                })

            },
            success : function(data){
                loading.close();
                var apps = JSON.parse(data);
                //console.log(apps);
                $.each(apps , function(index, app) {
                 $.each(app.roles, function(index, roleName){
                     //console.log(roleName.roleName);
                    table.row.add([
                        app.username,
                        roleName.roleName,
                        app.email,
                        "<div class='dropdown'>" +
                        "<button href='#pablo' class='dropdown-toggle btn btn-default' data-toggle='dropdown' aria-expanded='false'><i class='material-icons'>settings</i> <b class='caret'></b>" +
                        "<div class='ripple-container'></div>" +
                        "</button>" +
                        "<ul class='dropdown-menu dropdown-menu-right'>" +
                        "<li><a data-toggle='modal'  data-id='"+app.id+"' id='getUserLevel' class='' data-target='#updateUserLevel' style='cursor: pointer;'>Update</a></li>" +
                        "<li><a data-id='"+app.id+"' data-status='1' id='userStatus' style='cursor: pointer;'>Deactivate</a></li>" +
                        "</ul>" +
                        "</div>"
                    ]).draw(false);
                });
                if(apps.status == 1){
                    $("#userStatus").text("Activate");
                }
                 });
            }

     });

     $(document).on("click", "#userStatus", function(){

        var id = $(this).attr('data-id');
        var status = $(this).attr('data-status');

        console.log(status);
        console.log(id);
        $.confirm({
            title: '<label class="text-warning">Warning!</label>',
            content: 'Are you sure to Deactivate this?',
            type: 'red',
            buttons:{
                confirm:{
                    class: 'btnPurple',
                    action: function(){
                        $.ajax({
                            url: 'web-user/web-user-status',
                            data:{
                                id: id,
                                status: status
                            },
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
                                         window.location.href = '/PublicAccessPortal/web-user';
                                     }

                             })
                            },error: function(){
                                  $.dialog({
                                       title:'<label class="text-warning">Warning!</label>',
                                       content: 'Failed Update',
                                       type: 'purple',
                                         buttons: {

                                         },
                                         close: function(){
                                             window.location.href = '/PublicAccessPortal/web-user';
                                         }

                                 })
                            }
                        });

                    }
                },
                cancel: function(){

                }
            }
        });

     });

    $(document).on("click", "#getUserLevel", function(){
            var id = $(this).attr('data-id');
        $(".appended-roles").remove();
        $.ajax({
            url: 'web-user/get-user',
           type: 'GET',
           dataType: 'text',
           data: {
               id : id
           },
           success:function(data){
                var app = JSON.parse(data);

                  //console.log(app);
                $("#id").val(app.id);
                $("#image").attr("src", "/PublicAccessPortal/assets/img"+app.photosImagePath);
                $("#USERNAME").val(app.username);
                $("#EMAIL").val(app.email);
                $("#PASSWORD").val(app.password);
                $("#CONFIRM_PASSWORD").val(app.password);
                $("#STATUS").val(app.status).change();
                $.each(app.roles, function(index, roleName){
                    role_name = roleName.roleId;
                });
                $.ajax({
                    url: 'web-user/get-user-roles',
                    type: 'GET',
                    dataType: 'text',
                    success: function(data){
                        var role = JSON.parse(data);

                         $.each(role , function(index, roles) {
                           //  console.log(roles.roleName);
                         $("#ROLE").append("<option class='appended-roles' id='roleName' value='"+roles.roleId+"'>"+roles.roleName+"</option>");
                    });
                        $("#ROLE").val(role_name).change();
                        console.log(role_name);
                    $(".selectpicker").selectpicker("refresh");

                  }
                });



           },error : function(jqXHR, textStatus, errorThrown) {
                //console.log(errorThrown);
              $.dialog({
                  title:'<label class="text-Warning">Failed!</label>',
                  content: "Can't Get user Information!",
                  type: 'orange'
              })
          }

        })
    });
        $(document).on("click", "#SUBMIT_APPLICATION", function(){

          var validationForm=$('#USER_LEVEL_FORM');
              validationForm.validate();

               $("#SUBMIT_APPLICATION").prop("disabled", true);

                if (!validateEmail($("#EMAIL").val())) {
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

               } else if ($("#USERNAME").val().trim() == "" || $("#ROLE").val().trim() == "") {
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

                } else {

                 if(validationForm.validate()){
                    var form = $("#USER_LEVEL_FORM")[0];
                    var data = new FormData(form);

                       $.confirm({
                           title: '<label class="text-warning">Warning!</label>',
                           content: 'Are you sure to save this user level?',
                           type: 'red',
                           buttons: {
                               confirm:{
                                   btnClass: 'purple',
                                   action: function(){
                                       $.ajax({
                                           url: 'web-user/add-web-user',
                                           data: data,
                                           cache: false,
                                           contentType: false,
                                           processData: false,
                                           type: 'POST',
                                           timeout:1000000,
                                           success:function(response){
                                               $.dialog({
                                                   title:'<label class="text-success">Success!</label>',
                                                   content: 'Successfully Update',
                                                   type: 'purple',
                                                     buttons: {

                                                     },
                                                     close: function(){
                                                         window.location.href = '/PublicAccessPortal/web-user';
                                                     }

                                             })

                                           },error : function(jqXHR, textStatus, errorThrown) {
                                               //console.log(errorThrown);
                                             $.dialog({
                                                 title:'<label class="text-Warning">Failed!</label>',
                                                 content: "Can't Update your application!",
                                                 type: 'orange'
                                             })
                                         }
                                       });
                                   }
                               }, cancel: function(){
                                   $("#SUBMIT_APPLICATION").prop("disabled", false);
                                }
                           }

                       })
                 }else{
                 $("#SUBMIT_APPLICATION").prop("disabled", false);

                 }
               }
        });

        $(document).on("click", "#userLevelDelete", function(){

            var id = $(this).attr("data-id");

            $.confirm({
                title: '<label class="text-warning">Warning!</label>',
                content: 'Are you sure you want to delete this?',
                type: 'red',
                buttons:{
                    confirm:{
                        btnClass: 'purple',
                        action: function(){
                            $.ajax({
                                url: 'delete-user-level',
                                data:{
                                    id: id
                                },
                                dataType: 'text',
                                type: 'GET',
                                success: function(response){
                                 $.dialog({
                                   title:'<label class="text-success">Success!</label>',
                                   content: 'Successfully Update',
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
                                           content: "Can't Update your application!",
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

});