$().ready(function(){
    materialKit.initFormExtendedDatetimepickers();
    $("#permitType").val("P");

    var PERMIT_SPORTS;
    var PERMIT_CLUB;

    $.ajax({
        url : "get-applicant-info",
        type : "GET",
        dataType : "text",
        success : function(data){
            var info = JSON.parse(data);
            $("#LAST_NAME").val(info.lastName);
            $("#FIRST_NAME").val(info.firstName);
            $("#MIDDLE_NAME").val(info.middleName);
            $("#PNICKNAME").val(info.nickName);


        }
    });


$("#DIVISIONS").change(function() {
    $(".appended-application_type").remove();
    $(".appended-sports").remove();
    var division = $("#DIVISIONS").val();

    $("#sports").prop("disabled", false);
    $("#vAPPLICATION_TYPE").prop("disabled", false);
    $(".selectpicker[data-id='sports']").removeClass("disabled");

    $.ajax({
        url : "get-games",
        data : {
            classification : division
        },
        type : "GET",
        dataType : "text",
        success : function(data){
            var games = JSON.parse(data);
            $.each(games , function(index, game) {
                $("#sports").append("<option class='appended-sports' value='"+game.code+"'>"+game.name+"</option>");

            });
            if(PERMIT_SPORTS != "") {
                $("#sports").val(PERMIT_SPORTS).change();
            }

            $(".selectpicker").selectpicker("refresh");
        }
    });
        $.ajax({
            url : "/PublicAccessPortal/applications/get-permit-types",
            data : {
                division : division
            },
            type : "GET",
            dataType : "text",
            success : function(data){
                var application_types = JSON.parse(data);
                //console.log(application_types);
                $.each(application_types , function(index, application_type) {
                    $("#vAPPLICATION_TYPE").append("<option class='appended-application_type' value='"+application_type.id+"'>"+application_type.name+"</option>");

                });
                $(".selectpicker").selectpicker("refresh");
            }
        });
});

function newPermit() {
  var licenseField = document.getElementById("licenseField");
  licenseField.style.display = "none";
  $("#permitType").val("P");
}

function renewPermit() {
  var licenseField = document.getElementById("licenseField");
  licenseField.style.display = "block";

}
$("#SAVE_APPLICATION").on("click", function(){
    $("#vSAVE_AS_DRAFT").val("YES");




        $("#SAVE_APPLICATION").prop("disabled", true);
        $("#SUBMIT_APPLICATION").prop("disabled", true);
        if($("#DIVISIONS").val() == "PBOPG" || $("#DIVISIONS").val() == ""){
             if($("#PERMIT_SPORTS").val() == ""){

               $(".PBOPG_required_select_sports").each(function(i){
               var label = $(this).first().siblings('.label-control').text();
//                        $(this).siblings('.label-control').text(label +' is required');
                         $(this).siblings('.label-control').css('color','red');

                   });
              }
                if($("#vAPPLICATION_TYPE").val() == ""){
                 $(".vAPPLICATION_TYPE_SELECT").each(function(i){
                var label = $(this).first().siblings('.label-control').text();
//                         $(this).siblings('.label-control').text(label +' is required');
                          $(this).siblings('.label-control').css('color','red');
                 });
                }
              setTimeout(function(){
                      $("#SAVE_APPLICATION").prop("disabled", false);
                      $("#SUBMIT_APPLICATION").prop("disabled", false);
                      }, 2000);
            if($("#vAPPLICATION_TYPE").val() != "" && $("#sports").val() != ""){
              SUBMIT_FORM();
            }
    }else if($("#DIVISIONS").val() == "BOCSD"){
             if($("#sports").val() == ""){

               $(".BOCSD_required_select_sports").each(function(i){
               var label = $(this).first().siblings('.label-control').text();
//                        $(this).siblings('.label-control').text(label +' is required');
                         $(this).siblings('.label-control').css('color','red');
                   });

              }
              if($("#vAPPLICATION_TYPE").val() == ""){
               $(".vAPPLICATION_TYPE_SELECT").each(function(i){
              var label = $(this).first().siblings('.label-control').text();
        //                         $(this).siblings('.label-control').text(label +' is required');
                        $(this).siblings('.label-control').css('color','red');
               });
              }
          setTimeout(function(){
               $("#SAVE_APPLICATION").prop("disabled", false);
               $("#SUBMIT_APPLICATION").prop("disabled", false);
               }, 2000);
             if($("#vAPPLICATION_TYPE").val() != "" && $("#sports").val() != ""){
               SUBMIT_FORM();
             }
    }else if($("#DIVISIONS").val() == "HRBSD"){
                     if($("#sports").val() == ""){

                      $(".HRBSD_required_select_sports").each(function(i){
               var label = $(this).first().siblings('.label-control').text();
//                        $(this).siblings('.label-control').text(label +' is required');
                                $(this).siblings('.label-control').css('color','red');
                          });
                     }
                 if($("#vAPPLICATION_TYPE").val() == ""){
                  $(".vAPPLICATION_TYPE_SELECT").each(function(i){
                 var label = $(this).first().siblings('.label-control').text();
 //                         $(this).siblings('.label-control').text(label +' is required');
                           $(this).siblings('.label-control').css('color','red');
                  });
                 }
          setTimeout(function(){
                       $("#SAVE_APPLICATION").prop("disabled", false);
                       $("#SUBMIT_APPLICATION").prop("disabled", false);
                       }, 2000);
              if($("#vAPPLICATION_TYPE").val() != "" && $("#sports").val() != ""){
                SUBMIT_FORM();
              }
    }

});

function SUBMIT_FORM(){
       var validationForm=$('#PERMIT_APPLICATION_FORM');
        validationForm.validate();
   if(validationForm.valid()){
                 var form = $("#PERMIT_APPLICATION_FORM")[0];
                 var data = new FormData(form);
             $.confirm({
                 title:'<label class="text-warning">Confirm!</label>',
                 content: "Are you sure want to add this data?",
                 type: 'red',
                 buttons: {
                     confirm: {
                         btnClass: 'btn-purple',
                         action: function () {
                             $.ajax({
                                 url : "add-application",
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
                                     $.dialog({
                                            title:'<label class="text-success">Success!</label>',
                                            content: 'Successfully Saved',
                                            type: 'purple',
                                            buttons: {

                                            },
                                            close: function(){
                                                window.location.href = '/PublicAccessPortal/applications';
                                            }
                                        })
                                 },
                                 success : function (data){

                                     $("#OSCULAR_FILE").each(function(){

                                         var myFile = $(this)[0].files[0];

                                         if($(myFile).length == 0){
                                             console.log('Empty Field');

                                         }else{
                                             console.log(myFile);
                                             var formData = new FormData();
                                                 formData.append('ACCOUNT_ID', data);
                                                 formData.append('REQUIREMENTS', $(this).attr("id"));
                                                 formData.append('TYPE', 'OSCULAR_FILE');
                                                 formData.append('STATUS', 1);
                                                 formData.append("FILE", myFile);
                                                 formData.append('DIR', '../../REQUIREMENTS/');

                                             $.ajax({
                                                 url: 'upload-requirements-directory',
                                                 data: formData,
                                                 cache: false,
                                                 contentType: false,
                                                 processData: false,
                                                 type: 'POST',
                                                 timeout:1000000,
                                                 success: function(){
                                                     console.log('successfully saved');
                                                 }

                                             });
                                         }

                                     });

                                         $("#GOOGLE_MAP_FILE").each(function(){

                                             var myFile = $(this)[0].files[0];

                                             if($(myFile).length == 0){
                                                 console.log('Empty Field');

                                             }else{
                                                 console.log(myFile);
                                                 var formData = new FormData();
                                                     formData.append('ACCOUNT_ID', data);
                                                     formData.append('REQUIREMENTS', $(this).attr("id"));
                                                     formData.append('TYPE', 'GOOGLE_MAP_FILE');
                                                     formData.append('STATUS', 1);
                                                     formData.append("FILE", myFile);
                                                     formData.append('DIR', '../../REQUIREMENTS/');

                                                 $.ajax({
                                                     url: 'upload-requirements-directory',
                                                     data: formData,
                                                     cache: false,
                                                     contentType: false,
                                                     processData: false,
                                                     type: 'POST',
                                                     timeout:1000000,
                                                     success: function(){
                                                         console.log('successfully saved');
                                                     }

                                                 });
                                             }

                                         });

                                         $("#LETTER_FILE").each(function(){

                                         var myFile = $(this)[0].files[0];

                                         if($(myFile).length == 0){
                                             console.log('Empty Field');

                                         }else{
                                             console.log(myFile);
                                             var formData = new FormData();
                                                 formData.append('ACCOUNT_ID', data);
                                                 formData.append('REQUIREMENTS', $(this).attr("id"));
                                                 formData.append('TYPE', 'LETTER_FILE');
                                                 formData.append('STATUS', 1);
                                                 formData.append("FILE", myFile);
                                                 formData.append('DIR', '../../REQUIREMENTS/');

                                             $.ajax({
                                                 url: 'upload-requirements-directory',
                                                 data: formData,
                                                 cache: false,
                                                 contentType: false,
                                                 processData: false,
                                                 type: 'POST',
                                                 timeout:1000000,
                                                 success: function(){
                                                     console.log('successfully saved');
                                                 }

                                             });
                                         }

                                     });

                                 },
                                 error : function(jqXHR, textStatus, errorThrown) {
                                     console.log(errorThrown);
                                     $.dialog({
                                         title:'<label class="text-Warning">Failed!</label>',
                                         content: "Can't save your application!",
                                         type: 'orange'
                                     })
                                 }
                             });
                         }
                     },cancel: function(){
                         $("#SAVE_APPLICATION").prop("disabled", false);
                         $("#SUBMIT_APPLICATION").prop("disabled", false);
                     }
                 }
             })

             }
             else{
                 $("#SUBMIT_APPLICATION").prop("disabled", false);
                 $("#SAVE_APPLICATION").prop("disabled", false);
             }

}

$("#SUBMIT_APPLICATION").on("click", function(){
    $("#vSAVE_AS_DRAFT").val("NO");
    //console.log($("#vAPPLICATION_TYPE").val());
    var validationForm=$('#PERMIT_APPLICATION_FORM');
    validationForm.validate();

    $("#SUBMIT_APPLICATION").prop("disabled", true);
    $("#SAVE_APPLICATION").prop("disabled", true);

      //console.log($("#DIVISIONS").val());
    if($("#DIVISIONS").val() == "PBOPG" || $("#DIVISIONS").val() == ""){
          if($("#sports").val() == ""){

           $(".PBOPG_required_select_sports").each(function(i){
           var label = $(this).first().siblings('.label-control').text();
//                    $(this).siblings('.label-control').text(label +' is required');
                     $(this).siblings('.label-control').css('color','red');
               });
          }
                if($("#vAPPLICATION_TYPE").val() == ""){
                 $(".vAPPLICATION_TYPE_SELECT").each(function(i){
                var label = $(this).first().siblings('.label-control').text();
//                         $(this).siblings('.label-control').text(label +' is required');
                          $(this).siblings('.label-control').css('color','red');
                 });
                }
        if($("#LAST_NAME").val().trim()  == "" || $("#FIRST_NAME").val().trim()  == "" ||
        $("#EVENT_START").val() == "" || $("#EVENT_END").val() == "" || $("#EVENT").val() == "" ||
        $("#LOCATION").val().trim()  == "" || $("#sports").val().trim()  == "" || $("#CLUB").val().trim()  == ""){
               $(".PBOPG_required").each(function(i){
                    if($(this).val() == ""){
               var label = $(this).first().siblings('.label-control').text();
//                        $(this).siblings('.label-control').text(label +' is required');
                       $(this).siblings('.label-control').css('color','red');
                    $(this).css('background-image','linear-gradient(red,red),linear-gradient(red,red)');
                    }

                });
            $.alert({
                    title: '<label class="text-warning">Warning!</label>',
                    content: 'Please fill in required fields',
                    type:'red',
                        buttons: {
                            close: function() {
                                 $("#SUBMIT_APPLICATION").prop("disabled", false);
                                 $("#SAVE_APPLICATION").prop("disabled", false);
                            }
                        }
               });
             }else{
                     if(validationForm.valid()){
                        var form = $("#PERMIT_APPLICATION_FORM")[0];
                        var data = new FormData(form);
                    $.confirm({
                        title:'<label class="text-warning">Confirm!</label>',
                        content: "Are you sure want to add this data?",
                        type: 'red',
                        buttons: {
                            confirm: {
                                btnClass: 'btn-purple',
                                action: function () {
                                    $.ajax({
                                        url : "add-application",
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
                                            $.dialog({
                                                   title:'<label class="text-success">Success!</label>',
                                                   content: 'Successfully Saved',
                                                   type: 'purple',
                                                   buttons: {

                                                   },
                                                   close: function(){
                                                       window.location.href = '/PublicAccessPortal/applications';
                                                   }
                                               })
                                        },
                                        success : function (data){

                                            $("#OSCULAR_FILE").each(function(){

                                                var myFile = $(this)[0].files[0];

                                                if($(myFile).length == 0){
                                                    console.log('Empty Field');

                                                }else{
                                                    console.log(myFile);
                                                    var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', $(this).attr("id"));
                                                        formData.append('TYPE', 'OSCULAR_FILE');
                                                        formData.append('STATUS', 1);
                                                        formData.append("FILE", myFile);
                                                        formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: 'upload-requirements-directory',
                                                        data: formData,
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false,
                                                        type: 'POST',
                                                        timeout:1000000,
                                                        success: function(){
                                                            console.log('successfully saved');
                                                        }

                                                    });
                                                }

                                            });

                                                $("#GOOGLE_MAP_FILE").each(function(){

                                                    var myFile = $(this)[0].files[0];

                                                    if($(myFile).length == 0){
                                                        console.log('Empty Field');

                                                    }else{
                                                        console.log(myFile);
                                                        var formData = new FormData();
                                                            formData.append('ACCOUNT_ID', data);
                                                            formData.append('REQUIREMENTS', $(this).attr("id"));
                                                            formData.append('TYPE', 'GOOGLE_MAP_FILE');
                                                            formData.append('STATUS', 1);
                                                            formData.append("FILE", myFile);
                                                            formData.append('DIR', '../../REQUIREMENTS/');

                                                        $.ajax({
                                                            url: 'upload-requirements-directory',
                                                            data: formData,
                                                            cache: false,
                                                            contentType: false,
                                                            processData: false,
                                                            type: 'POST',
                                                            timeout:1000000,
                                                            success: function(){
                                                                console.log('successfully saved');
                                                            }

                                                        });
                                                    }

                                                });

                                                $("#LETTER_FILE").each(function(){

                                                var myFile = $(this)[0].files[0];

                                                if($(myFile).length == 0){
                                                    console.log('Empty Field');

                                                }else{
                                                    console.log(myFile);
                                                    var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', $(this).attr("id"));
                                                        formData.append('TYPE', 'LETTER_FILE');
                                                        formData.append('STATUS', 1);
                                                        formData.append("FILE", myFile);
                                                        formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: 'upload-requirements-directory',
                                                        data: formData,
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false,
                                                        type: 'POST',
                                                        timeout:1000000,
                                                        success: function(){
                                                            console.log('successfully saved');
                                                        }

                                                    });
                                                }

                                            });

                                        },
                                        error : function(jqXHR, textStatus, errorThrown) {
                                            console.log(errorThrown);
                                            $.dialog({
                                                title:'<label class="text-Warning">Failed!</label>',
                                                content: "Can't save your application!",
                                                type: 'orange'
                                            })
                                        }
                                    });
                                }
                            },cancel: function(){
                                $("#SAVE_APPLICATION").prop("disabled", false);
                                $("#SUBMIT_APPLICATION").prop("disabled", false);
                            }
                        }
                    })

                    }
                    else{
                        $("#SUBMIT_APPLICATION").prop("disabled", false);
                        $("#SAVE_APPLICATION").prop("disabled", false);
                    }
        }
    }else if($("#DIVISIONS").val() == "BOCSD"){
          if($("#sports").val() == ""){

           $(".BOCSD_required_select_sports").each(function(i){
           var label = $(this).first().siblings('.label-control').text();
//                    $(this).siblings('.label-control').text(label +' is required');
                     $(this).siblings('.label-control').css('color','red');
               });
          }
          if($("#vAPPLICATION_TYPE").val() == ""){
           $(".vAPPLICATION_TYPE_SELECT").each(function(i){
          var label = $(this).first().siblings('.label-control').text();
    //                         $(this).siblings('.label-control').text(label +' is required');
                    $(this).siblings('.label-control').css('color','red');
           });
          }
        if($("#LAST_NAME").val().trim()  == "" || $("#FIRST_NAME").val().trim()  == "" || $("#sports").val().trim()  == ""){
               $(".BOCSD_required").each(function(i){
                    if($(this).val() == ""){
               var label = $(this).first().siblings('.label-control').text();
//                        $(this).siblings('.label-control').text(label +' is required');
                       $(this).siblings('.label-control').css('color','red');
                     $(this).css('background-image','linear-gradient(red,red),linear-gradient(red,red)');
                }

                });
           $.alert({
                   title: '<label class="text-warning">Warning!</label>',
                   content: 'Please fill in required fields',
                   type:'red',
                       buttons: {
                           close: function() {
                                $("#SUBMIT_APPLICATION").prop("disabled", false);
                                $("#SAVE_APPLICATION").prop("disabled", false);
                           }
                       }
              });
        }else{
                     if(validationForm.valid()){
                        var form = $("#PERMIT_APPLICATION_FORM")[0];
                        var data = new FormData(form);
                    $.confirm({
                        title:'<label class="text-warning">Confirm!</label>',
                        content: "Are you sure want to add this data?",
                        type: 'red',
                        buttons: {
                            confirm: {
                                btnClass: 'btn-purple',
                                action: function () {
                                    $.ajax({
                                        url : "add-application",
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
                                            $.dialog({
                                                   title:'<label class="text-success">Success!</label>',
                                                   content: 'Successfully Saved',
                                                   type: 'purple',
                                                   buttons: {

                                                   },
                                                   close: function(){
                                                       window.location.href = '/PublicAccessPortal/applications';
                                                   }
                                               })
                                        },
                                        success : function (data){

                                            $("#OSCULAR_FILE").each(function(){

                                                var myFile = $(this)[0].files[0];

                                                if($(myFile).length == 0){
                                                    console.log('Empty Field');

                                                }else{
                                                    console.log(myFile);
                                                    var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', $(this).attr("id"));
                                                        formData.append('TYPE', 'OSCULAR_FILE');
                                                        formData.append('STATUS', 1);
                                                        formData.append("FILE", myFile);
                                                        formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: 'upload-requirements-directory',
                                                        data: formData,
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false,
                                                        type: 'POST',
                                                        timeout:1000000,
                                                        success: function(){
                                                            console.log('successfully saved');
                                                        }

                                                    });
                                                }

                                            });

                                                $("#GOOGLE_MAP_FILE").each(function(){

                                                    var myFile = $(this)[0].files[0];

                                                    if($(myFile).length == 0){
                                                        console.log('Empty Field');

                                                    }else{
                                                        console.log(myFile);
                                                        var formData = new FormData();
                                                            formData.append('ACCOUNT_ID', data);
                                                            formData.append('REQUIREMENTS', $(this).attr("id"));
                                                            formData.append('TYPE', 'GOOGLE_MAP_FILE');
                                                            formData.append('STATUS', 1);
                                                            formData.append("FILE", myFile);
                                                            formData.append('DIR', '../../REQUIREMENTS/');

                                                        $.ajax({
                                                            url: 'upload-requirements-directory',
                                                            data: formData,
                                                            cache: false,
                                                            contentType: false,
                                                            processData: false,
                                                            type: 'POST',
                                                            timeout:1000000,
                                                            success: function(){
                                                                console.log('successfully saved');
                                                            }

                                                        });
                                                    }

                                                });

                                                $("#LETTER_FILE").each(function(){

                                                var myFile = $(this)[0].files[0];

                                                if($(myFile).length == 0){
                                                    console.log('Empty Field');

                                                }else{
                                                    console.log(myFile);
                                                    var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', $(this).attr("id"));
                                                        formData.append('TYPE', 'LETTER_FILE');
                                                        formData.append('STATUS', 1);
                                                        formData.append("FILE", myFile);
                                                        formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: 'upload-requirements-directory',
                                                        data: formData,
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false,
                                                        type: 'POST',
                                                        timeout:1000000,
                                                        success: function(){
                                                            console.log('successfully saved');
                                                        }

                                                    });
                                                }

                                            });

                                        },
                                        error : function(jqXHR, textStatus, errorThrown) {
                                            console.log(errorThrown);
                                            $.dialog({
                                                title:'<label class="text-Warning">Failed!</label>',
                                                content: "Can't save your application!",
                                                type: 'orange'
                                            })
                                        }
                                    });
                                }
                            },cancel: function(){
                                $("#SAVE_APPLICATION").prop("disabled", false);
                                $("#SUBMIT_APPLICATION").prop("disabled", false);
                            }
                        }
                    })

                    }
                    else{
                        $("#SUBMIT_APPLICATION").prop("disabled", false);
                        $("#SAVE_APPLICATION").prop("disabled", false);
                    }
        }
        }else if($("#DIVISIONS").val() == "HRBSD"){
            if($("#sports").val() == ""){

             $(".HRBSD_required_select_sports").each(function(i){
               var label = $(this).first().siblings('.label-control').text();
//                        $(this).siblings('.label-control').text(label +' is required');
                       $(this).siblings('.label-control').css('color','red');
                 });
            }
                if($("#vAPPLICATION_TYPE").val() == ""){
                 $(".vAPPLICATION_TYPE_SELECT").each(function(i){
                var label = $(this).first().siblings('.label-control').text();
//                         $(this).siblings('.label-control').text(label +' is required');
                          $(this).siblings('.label-control').css('color','red');
                 });
                }

        if($("#LAST_NAME").val().trim()  == "" || $("#FIRST_NAME").val().trim()  == "" || $("#LOCATION").val().trim()  == "" || $("#sports").val().trim()  == "" || $("#CLUB").val().trim()  == ""){
               $(".HRBSD_required").each(function(i){
                    if($(this).val() == ""){
               var label = $(this).first().siblings('.label-control').text();
//                        $(this).siblings('.label-control').text(label +' is required');
                       $(this).siblings('.label-control').css('color','red');
                      $(this).css('background-image','linear-gradient(red,red),linear-gradient(red,red)');
                      }

                });

              $.alert({
                       title: '<label class="text-warning">Warning!</label>',
                       content: 'Please fill in required fields',
                       type:'red',
                           buttons: {
                               close: function() {
                                    $("#SUBMIT_APPLICATION").prop("disabled", false);
                                    $("#SAVE_APPLICATION").prop("disabled", false);
                               }
                           }
                  });

        }else{
                     if(validationForm.valid()){
                        var form = $("#PERMIT_APPLICATION_FORM")[0];
                        var data = new FormData(form);
                    $.confirm({
                        title:'<label class="text-warning">Confirm!</label>',
                        content: "Are you sure want to add this data?",
                        type: 'red',
                        buttons: {
                            confirm: {
                                btnClass: 'btn-purple',
                                action: function () {
                                    $.ajax({
                                        url : "add-application",
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
                                            $.dialog({
                                                   title:'<label class="text-success">Success!</label>',
                                                   content: 'Successfully Saved',
                                                   type: 'purple',
                                                   buttons: {

                                                   },
                                                   close: function(){
                                                       window.location.href = '/PublicAccessPortal/applications';
                                                   }
                                               })
                                        },
                                        success : function (data){

                                            $("#OSCULAR_FILE").each(function(){

                                                var myFile = $(this)[0].files[0];

                                                if($(myFile).length == 0){
                                                    console.log('Empty Field');

                                                }else{
                                                    console.log(myFile);
                                                    var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', $(this).attr("id"));
                                                        formData.append('TYPE', 'OSCULAR_FILE');
                                                        formData.append('STATUS', 1);
                                                        formData.append("FILE", myFile);
                                                        formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: 'upload-requirements-directory',
                                                        data: formData,
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false,
                                                        type: 'POST',
                                                        timeout:1000000,
                                                        success: function(){
                                                            console.log('successfully saved');
                                                        }

                                                    });
                                                }

                                            });

                                                $("#GOOGLE_MAP_FILE").each(function(){

                                                    var myFile = $(this)[0].files[0];

                                                    if($(myFile).length == 0){
                                                        console.log('Empty Field');

                                                    }else{
                                                        console.log(myFile);
                                                        var formData = new FormData();
                                                            formData.append('ACCOUNT_ID', data);
                                                            formData.append('REQUIREMENTS', $(this).attr("id"));
                                                            formData.append('TYPE', 'GOOGLE_MAP_FILE');
                                                            formData.append('STATUS', 1);
                                                            formData.append("FILE", myFile);
                                                            formData.append('DIR', '../../REQUIREMENTS/');

                                                        $.ajax({
                                                            url: 'upload-requirements-directory',
                                                            data: formData,
                                                            cache: false,
                                                            contentType: false,
                                                            processData: false,
                                                            type: 'POST',
                                                            timeout:1000000,
                                                            success: function(){
                                                                console.log('successfully saved');
                                                            }

                                                        });
                                                    }

                                                });

                                                $("#LETTER_FILE").each(function(){

                                                var myFile = $(this)[0].files[0];

                                                if($(myFile).length == 0){
                                                    console.log('Empty Field');

                                                }else{
                                                    console.log(myFile);
                                                    var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', $(this).attr("id"));
                                                        formData.append('TYPE', 'LETTER_FILE');
                                                        formData.append('STATUS', 1);
                                                        formData.append("FILE", myFile);
                                                        formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: 'upload-requirements-directory',
                                                        data: formData,
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false,
                                                        type: 'POST',
                                                        timeout:1000000,
                                                        success: function(){
                                                            console.log('successfully saved');
                                                        }

                                                    });
                                                }

                                            });

                                        },
                                        error : function(jqXHR, textStatus, errorThrown) {
                                            console.log(errorThrown);
                                            $.dialog({
                                                title:'<label class="text-Warning">Failed!</label>',
                                                content: "Can't save your application!",
                                                type: 'orange'
                                            })
                                        }
                                    });
                                }
                            },cancel: function(){
                                $("#SAVE_APPLICATION").prop("disabled", false);
                                $("#SUBMIT_APPLICATION").prop("disabled", false);
                            }
                        }
                    })

                    }
                    else{
                        $("#SUBMIT_APPLICATION").prop("disabled", false);
                        $("#SAVE_APPLICATION").prop("disabled", false);
                    }
        }
    }else{
         if(validationForm.valid()){
            var form = $("#PERMIT_APPLICATION_FORM")[0];
            var data = new FormData(form);
        $.confirm({
            title:'<label class="text-warning">Confirm!</label>',
            content: "Are you sure want to add this data?",
            type: 'red',
            buttons: {
                confirm: {
                    btnClass: 'btn-purple',
                    action: function () {
                        $.ajax({
                            url : "add-application",
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
                                $.dialog({
                                       title:'<label class="text-success">Success!</label>',
                                       content: 'Successfully Saved',
                                       type: 'purple',
                                       buttons: {

                                       },
                                       close: function(){
                                           window.location.href = '/PublicAccessPortal/applications';
                                       }
                                   })
                            },
                            success : function (data){

                                $("#OSCULAR_FILE").each(function(){

                                    var myFile = $(this)[0].files[0];

                                    if($(myFile).length == 0){
                                        console.log('Empty Field');

                                    }else{
                                        console.log(myFile);
                                        var formData = new FormData();
                                            formData.append('ACCOUNT_ID', data);
                                            formData.append('REQUIREMENTS', $(this).attr("id"));
                                            formData.append('TYPE', 'OSCULAR_FILE');
                                            formData.append('STATUS', 1);
                                            formData.append("FILE", myFile);
                                            formData.append('DIR', '../../REQUIREMENTS/');

                                        $.ajax({
                                            url: 'upload-requirements-directory',
                                            data: formData,
                                            cache: false,
                                            contentType: false,
                                            processData: false,
                                            type: 'POST',
                                            timeout:1000000,
                                            success: function(){
                                                console.log('successfully saved');
                                            }

                                        });
                                    }

                                });

                                    $("#GOOGLE_MAP_FILE").each(function(){

                                        var myFile = $(this)[0].files[0];

                                        if($(myFile).length == 0){
                                            console.log('Empty Field');

                                        }else{
                                            console.log(myFile);
                                            var formData = new FormData();
                                                formData.append('ACCOUNT_ID', data);
                                                formData.append('REQUIREMENTS', $(this).attr("id"));
                                                formData.append('TYPE', 'GOOGLE_MAP_FILE');
                                                formData.append('STATUS', 1);
                                                formData.append("FILE", myFile);
                                                formData.append('DIR', '../../REQUIREMENTS/');

                                            $.ajax({
                                                url: 'upload-requirements-directory',
                                                data: formData,
                                                cache: false,
                                                contentType: false,
                                                processData: false,
                                                type: 'POST',
                                                timeout:1000000,
                                                success: function(){
                                                    console.log('successfully saved');
                                                }

                                            });
                                        }

                                    });

                                    $("#LETTER_FILE").each(function(){

                                    var myFile = $(this)[0].files[0];

                                    if($(myFile).length == 0){
                                        console.log('Empty Field');

                                    }else{
                                        console.log(myFile);
                                        var formData = new FormData();
                                            formData.append('ACCOUNT_ID', data);
                                            formData.append('REQUIREMENTS', $(this).attr("id"));
                                            formData.append('TYPE', 'LETTER_FILE');
                                            formData.append('STATUS', 1);
                                            formData.append("FILE", myFile);
                                            formData.append('DIR', '../../REQUIREMENTS/');

                                        $.ajax({
                                            url: 'upload-requirements-directory',
                                            data: formData,
                                            cache: false,
                                            contentType: false,
                                            processData: false,
                                            type: 'POST',
                                            timeout:1000000,
                                            success: function(){
                                                console.log('successfully saved');
                                            }

                                        });
                                    }

                                });

                            },
                            error : function(jqXHR, textStatus, errorThrown) {
                                console.log(errorThrown);
                                $.dialog({
                                    title:'<label class="text-Warning">Failed!</label>',
                                    content: "Can't save your application!",
                                    type: 'orange'
                                })
                            }
                        });
                    }
                },cancel: function(){
                    $("#SAVE_APPLICATION").prop("disabled", false);
                    $("#SUBMIT_APPLICATION").prop("disabled", false);
                }
            }
        })

        }
        else{
            $("#SUBMIT_APPLICATION").prop("disabled", false);
            $("#SAVE_APPLICATION").prop("disabled", false);
        }
    }
});

$("#DIVISIONS").change(function() {
    switch($("#DIVISIONS").val()){
        case "PBOPG":
            $(".BOCSD").hide();
            $(".HRBSD").hide();
            $(".PBOPG").show();
            $(".appended-hrbsd").remove();
            $("#CLUB").append('<option class="appended-pbopg" value="Team 1">Team 1</option>');
            $("#CLUB").append('<option class="appended-pbopg" value="Team 2">Team 2</option>');
            $("#CLUB").append('<option class="appended-pbopg" value="Team 3">Team 3</option>');
            $(".selectpicker").selectpicker("refresh");
            if(PERMIT_CLUB != null){
                $("#CLUB").val(PERMIT_CLUB).change();
            }
            break;
        case  "BOCSD":
            $(".PBOPG").hide();
            $(".HRBSD").hide();
            $(".BOCSD").show();
            $(".appended-hrbsd").remove();
            $(".appended-pbopg").remove();
            //console.log($("#DIVISIONS").val());
            break;
        case "HRBSD":
            $(".PBOPG").hide();
            $(".BOCSD").hide();
            $(".HRBSD").show();
            $(".appended-pbopg").remove();
            $("#CLUB").append('<option class="appended-hrbsd" value="PRCI">PRCI</option>');
            $("#CLUB").append('<option class="appended-hrbsd" value="MJCI">MJCI</option>');
            $("#CLUB").append('<option class="appended-hrbsd" value="MMTCI">MMTCI</option>');
            $(".selectpicker").selectpicker("refresh");
            if(PERMIT_CLUB != null){
                $("#CLUB").val(PERMIT_CLUB).change();
            }
           // console.log($("#CLUB").val());
            break;
    }
});

$(document).on("click", "#SEARCH", function(){
    var PERMIT_NUMBER = $("#PERMIT_NUMBER").val();
    var obj;

    $.confirm({
        title: '<label class="text-warning">Confirm!</label>',
        content: 'Are you sure want to search this Permit number?',
        type: 'red',
        buttons:{
            confirm:{
                    btnClass: 'btn-purple',
                    action: function(){
                        $.ajax({
                            url: 'search-permit-application',
                            data: {
                                permitNumber : PERMIT_NUMBER
                            },
                            type: 'GET',
                            dataType: 'text',
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
                            success:function(data){
                                var application = JSON.parse(data);
                                //console.log(application);


                                PERMIT_SPORTS = application.vSPORTS;
                                PERMIT_CLUB = application.vCLUB;

                                $("#DIVISIONS").val(application.vDIVISIONS).change();
                                $("#FIRST_NAME").val(application.vFIRST_NAME);
                                $("#MIDDLE_NAME").val(application.vMIDDLE_NAME);
                                $("#LAST_NAME").val(application.vLAST_NAME);
                                $("#NICKNAME").val(application.vNICK_NAME);


                                if(application.vDIVISIONS == "PBOPG" || application.vDIVISIONS == null){
                                    $("#EVENT_START").val(application.vDATE_START).change();
                                    $("#EVENT_END").val(application.vDATE_END).change();
                                    $("#EVENT").val(application.vEVENT);
                                    $("#LOCATION").val(application.vLOCATION);
                                    $("#CLUB").val(application.vCLUB).change();

                                }else if(application.vDIVISIONS == "HRBSD"){

                                    $("#HOME_ADDRESS").val(application.vHOME_ADDRESS);
                                    $("#TELEPHONE").val(application.vTELEPHONE_HOME);
                                    $("#LOCATION").val(application.vLOCATION);
                                    $("#CLUB").val(application.vCLUB).change();

                                }else if(application.vDIVISIONS == "BOCSD"){

                                    $("#TV_COVERAGE").val(application.vTV_COVERAGE).change();
                                    $("#TICKETS").val(application.vTICKETS).change();
                                    $("#DATE_EVENT").val(application.vDATE_EVENT);
                                    $("#TIME_EVENT").val(application.vTIME_EVENT);
                                    $("#PLACE_EVENT").val(application.vPLACE_EVENT);

                                }
                                     $.dialog({
                                            title:'<label class="text-success">Success!</label>',
                                            content: 'Match Found!',
                                            type: 'purple'
                                        });
                            },
                            error : function(jqXHR, textStatus, errorThrown) {
                                console.log(errorThrown);
                                $.dialog({
                                    title:'<label class="text-Warning">Failed!</label>',
                                    content: jqXHR.responseText,
                                    type: 'orange'
                                })
                            }
                        });
                    }
            },cancel: function(){

            }
        }
    });
});
    $("input[type=file]").on("change", function(){
        var size = $(this)[0].files[0].size;
           //console.log(size);
           if(size > 1000000){
              $.alert({
                       title: '<label class="text-warning">Warning!</label>',
                       content: 'File is too big',
                       type:'red',
                           buttons: {
                               close: function() {
//                               console.log('sample');
//                               $("#REMOVE").trigger('click');
                               }
                           }
                  });
           }
    });

});
        var maxDate = new Date();
        jQuery('#EVENT_START').datetimepicker({
            format: 'MM/DD/YYYY',
             minDate: maxDate,
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
            var maxDate = new Date();
            jQuery('#EVENT_END').datetimepicker({
                format: 'MM/DD/YYYY',
                 minDate: maxDate.setDate(maxDate.getDate() + 1),
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
