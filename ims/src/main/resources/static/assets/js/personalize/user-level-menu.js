$().ready(function(){

    $('#datatable').DataTable({
        "order": []
    });
        var table = $("#datatable").DataTable();

         $.ajax({
                url : "get-user-level",
                type : "GET",
                dataType : "text",
                success : function(data){
                    var apps = JSON.parse(data);
                    console.log(apps);
                    $.each(apps , function(index, app) {
                        table.row.add([
                            app.Id,
                            app.menuName,
                            "<div class='dropdown'>" +
                            "<button href='#pablo' class='dropdown-toggle btn btn-default' data-toggle='dropdown' aria-expanded='false'><i class='material-icons'>settings</i> <b class='caret'></b>" +
                            "<div class='ripple-container'></div>" +
                            "</button>" +
                            "<ul class='dropdown-menu dropdown-menu-right'>" +
                            "<li><a data-toggle='modal'  data-id='"+app.id+"' id='updateUserMenu' class='' data-target='#updateUserMenu'>Update</a></li>" +
                            "<li><a href='#' data-id='"+app.id+"' id='deleteUserMenu'>Delete </a></li>" +
                            "</ul>" +
                            "</div>"
                        ]).draw(false);
                    });
                }

         });

         $(document).on("click", "#deleteUserMenu", function(){

                var id = $(this).attr("data-id");

                $.confirm({
                    title: '<label class="text-warning">Warning!</label>',
                    content: 'Are you sure to delete this?',
                    type: 'red',
                    buttons:{
                        confirm:{
                            btnClass: 'purple',
                            action: function(){
                                $.ajax({
                                    url: 'user-menu-delete',
                                    data:{
                                        id: id
                                    },
                                    dataType: 'text',
                                    type: 'get',
                                    success: function(response){
                                        $.dialog({
                                        title:'<label class="text-success">Success!</label>',
                                        content: 'Successfully Deleted',
                                        type: 'purple',
                                          buttons: {

                                          },
                                          close: function(){
                                              window.location.href = '/PublicAccessPortal/user-level-menu';
                                          }

                                        })
                                    }, error: function(){
                                           $.dialog({
                                              title:'<label class="text-Warning">Failed!</label>',
                                              content: "Can't Delete The data!",
                                              type: 'orange'
                                          })

                                    }

                                })
                            }
                        }, cancel: function(){


                        }

                    }

                })

         });

         $(document).on("click", "#updateUserMenu", function(){

                var id = $(this).attr("data-id");

            $.ajax({
                url: 'get-user-menu',
                dataType: 'text',
                type: 'GET',
                data: {
                    id: id
                },
                success: function(data){
                    var app = JSON.parse(data);

                    $("#id").val(app.id);
                    $("#menuName").val(app.menuName);

                }

            })

         });

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
                                                    content: 'Successfully Updated',
                                                    type: 'purple',
                                                      buttons: {

                                                      },
                                                      close: function(){
                                                          window.location.href = '/PublicAccessPortaluser-level';
                                                      }

                                              })

                                          },error : function(jqXHR, textStatus, errorThrown) {
                                               //console.log(errorThrown);
                                             $.dialog({
                                                 title:'<label class="text-Warning">Failed!</label>',
                                                 content: "Can't Update The Data!",
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