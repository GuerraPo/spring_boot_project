$().ready(function(){
    materialKit.initFormExtendedDatetimepickers();
    $("#submitProfile").click(function(event){
       event.preventDefault();
       if($(".user-profile-form").valid()){
            submitProfile();
       }
    });
 });

 function submitProfile(){
     var obj;
     var pageUrl = $(location).attr("href");
     var form = $(".user-profile-form")[0];
     var data = new FormData(form);
     $("#submitProfile").prop("disabled", true);

     var validationForm=$('.user-profile-form');
     validationForm.validate();

     if(validationForm.valid()){

    $.confirm({
        title:'<label class="text-warning">Confirm!</label>',
        content: "Are you sure want to add this data?",
        type: 'red',
        buttons: {
            confirm:{
                btnClass: 'btn-purple',
                action: function(){
                    $.ajax({
                        url : "update-profile",
                        enctype: 'multipart/form-data',
                        data : data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'POST',
                        timeout:1000000,
                        beforeSend: function(){
                            obj =  $.dialog({
                                title: '<label class="text-success">Loading Please Wait!</label>',
                                content: '<img src="/PublicAccessPortal/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                                type:'purple',
                                closeIcon: false,
                                backgroundDismiss: false
                            })

                        },complete: function(){
                            obj.close();
                        },
                        success : function (response){
                            console.log(response);
                            $("#submitProfile").prop("disabled", false);
                            $(".user-profile-form")[0].reset();
                            $.dialog({
                                title:'<label class="text-success">Success!</label>',
                                content: 'Successfully Added',
                                type: 'purple',
                                buttons: {

                                },
                                close: function(){
                                    window.location.href = pageUrl;
                                }
                            })

                        },
                        error : function(jqXHR, textStatus, errorThrown) {
                            $("#submitProfile").prop("disabled", false);
                            $.dialog({
                                title:'<label class="text-Warning">Failed!</label>',
                                content: "Can't save your application!",
                                type: 'orange'
                            })
                            console.log(jqXHR);
                        }
                    });
                }
            },cancel: function(){
                $("#submitProfile").prop("disabled", false);
            }
        }
    })

     }else{
        $("#submitProfile").prop("disabled", false);
     }

 }