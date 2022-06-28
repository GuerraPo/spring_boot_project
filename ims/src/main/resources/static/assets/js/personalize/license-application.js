$().ready(function(){
    materialKit.initFormExtendedDatetimepickers();

    var code = [];
    var type = [];
    var canvasUrl = "";
    var canUrl = "";
    var draft = false;
    var y = 0;
    var draw;
    var signatureImage = false;
    var confirm = 0;
    // Getting Applicant's Basic Information
    $.ajax({
        url : "get-applicant-info",
        type : "GET",
        dataType : "text",
        success : function(data){
            var info = JSON.parse(data);

            $("#LAST_NAME").val(info.lastName);
            $("#FIRST_NAME").val(info.firstName);
            $("#MIDDLE_NAME").val(info.middleName);
            $("#NICKNAME").val(info.nickName);
            var addresses = info.address;
            $.each(addresses , function(index, address) {
                if(address.type === 1){
                    $("#HOME_ADDRESS").val(address.address);
                }
                else if(address.type === 2){
                    $("#OFFICE_ADDRESS").val(address.address);
                }
            });
            $("#BIRTH_DATE").val(info.birthDate);
            $("#PLACE_OF_BIRTH").val(info.birthPlace);
            $("#CITIZENSHIP").val(info.citizenship);
            $("#CIVIL_STATUS").val(info.civilStatus);
            $("#AGE").val(info.age);

            $("#HEIGHT").val(info.height);
            $("#WEIGHT").val(info.weight);
            $("#GENDER").val(info.gender);

            if(info.accusedCrime === "YES"){
                $("#ACCUSED_CRIME").prop( "checked", true );
                var text = document.getElementById("STATE_OFFENSE");
                text.style.display = "block";
                $("#STATE_OFFENSE").val(info.stateOffense);
            }

            var contacts = info.contacts;
            $.each(contacts , function(index, contact) {
                if(contact.type === "1"){
                    $("#HOME_CONTACT").val(contact.telephone);
                }
                else if(contact.type === "2"){
                    $("#OFFICE_CONTACT").val(contact.telephone);
                }
            });
        }
    });


    $(document).on("change", "#roles", function(){
        $("#medicalDiv").hide();
        $("#documentaryDiv").hide();
        $(".appended-documentary").remove();
        $(".appended-medical").remove();
        var role = $("#roles").val();
       // console.log(role);
                $.ajax({
                    url: "get-medical-requirements",
                    data:{
                        role: role
                    },
                    type : "GET",
                    dataType : "text",
                    success: function(data){
                     var medRequirements = JSON.parse(data);
                     //console.log(medRequirements.length);

                     if(medRequirements.length > 0){
                      $("#medicalDiv").show();
                     }
                     $.each(medRequirements , function(index, app) {
                      // console.log(app.code);
                        $("#medical-requirements").append(
                        "<div class='col-md-12 appended-medical'>"+
                        "<strong>'"+app.description+"'</strong>"+
                        "<div class='form-group form-file-upload'>"+
                        "<input type='file' id='"+app.code+"' class='medicalReq' accept='image/png, image/jpeg, image/jpg'>"+
                        "<div class='input-group'>"+
                        "<input type='text' readonly='' class='form-control file' placeholder='Attachment'>"+
                        "</div>"+
                        "</div>"+
                        "</div>"
                        );
                     });

                    }
                });

        $.ajax({
            url: "get-documentary-requirements",
            data:{
                role: role
            },
            type : "GET",
            dataType : "text",
            success: function(data){
             var docRequirements = JSON.parse(data);
            // console.log(docRequirements.length);

             if(docRequirements.length > 0){
              $("#documentaryDiv").show();
             }
             $.each(docRequirements , function(index, app) {
                //console.log(app.code);
                 //code.push(app.code);
                 type.push(app.type);
                $("#documentary-requirements").append(
                "<div class='col-md-12 appended-documentary'>"+
                "<label class='form-label'>'"+app.description+"'</label>"+
                "<div class='form-group form-file-upload'>"+
                "<input type='file' id='"+app.code+"' class='documentaryReq' accept='image/png, image/jpeg, image/jpg'>"+
                "<div class='input-group'>"+
                "<input type='text' readonly='' class='form-control file' placeholder='Attachment'>"+
                "</div>"+
                "</div>"+
                "</div>"
                );
             });

            }
        });

    });

    $("#SAVE_APPLICATION").on("click", function(){
        $("#vSAVE_AS_DRAFT").val("YES");
         // console.log($("#vAPPLICATION_TYPE").val());
        var obj;
        var validationForm=$('#LICENSE_APPLICATION_FORM');
        validationForm.validate();

        $("#SAVE_APPLICATION").prop("disabled", true);
        $("#SUBMIT_APPLICATION").prop("disabled", true);
                if($("#DIVISIONS").val() === "" || $("#sports").val() === "" || $("#roles").val() === ""){

                        draft= true;

                    }else{
                        $('.documentaryReq').each(function(){
                        var myFile = $(this)[0].files[0];
                            if($(myFile).length > 0){
                                y += 1;
                            }
                        });

                    }
                        if(y == code.length){
                            draft = false;
                        }else{
                            draft = true;
                        }
            //console.log(canvasUrl);
            if($("#DIVISIONS").val() == ""){
               $(".label").each(function(i){

                    if($(this).val() == ""){
                    var label = $(this).first().siblings('.label-control').text();
                    //console.log(label);
//                       $(this).siblings('.label-control').text(label+' is required');
                       $(this).siblings('.label-control').css('color','red');
    //                   $(this).css('background-image','linear-gradient(red,red),linear-gradient(red,red)');
                        setTimeout(function(){
                            $("#SAVE_APPLICATION").prop("disabled", false);
                            $("#SUBMIT_APPLICATION").prop("disabled", false);
                            }, 2000);

                    }
                });
            }else{
                 if(validationForm.valid()){
                        var form = $("#LICENSE_APPLICATION_FORM")[0];
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
                                            dataType: 'text',
                                            beforeSend: function(){
                                                obj =  $.dialog({
                                                    title: '<label class="text-success">Loading Please Wait!</label>',
                                                    content: '<img src="/PublicAccessPortal/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                                                    type:'purple',
                                                    closeIcon: false,
                                                    backgroundDismiss: false
                                                })

                                            },
                                            complete: function(){
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
                                             //console.log(data);
                                             //draft = data.draft;
                                            if(canvasUrl == ""){
                                             $("#signature").each(function(){
                                                var myFile = $(this)[0].files[0];
                                                    //console.log(myFile);
                                                    if($(myFile).length > 0){

                                                         var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', 'SIG');
                                                        formData.append('TYPE', 'SIGNATORY');
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
                                                                console.log('Successfully Saved Signature');
                                                            },error : function(){
                                                                console.log('Failed to Save');
                                                            }
                                                        });
                                                    }
                                                     });
                                            }else{

                                                var formData = new FormData();
                                               formData.append('ACCOUNT_ID', data);
                                               formData.append('REQUIREMENTS', 'SIG');
                                               formData.append('TYPE', 'SIGNATORY');
                                               formData.append('STATUS', 1);
                                               formData.append("FILE", canvasUrl);
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
                                                       console.log('Successfully Saved Signature');
                                                   },error : function(){
                                                       console.log('Failed to Save');
                                                   }
                                               });
                                            }



                                            $("#image").each(function(){
                                                 var myFile = $(this)[0].files[0];
                                                    //console.log(myFile);
                                                    if($(myFile).length > 0){

                                                         var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', 'DISPLAY_PHOTO');
                                                        formData.append('TYPE', 'DISPLAY_PHOTO');
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
                                                                console.log('Successfully Saved');
                                                            },error : function(){
                                                                console.log('Failed to Save');
                                                            }
                                                        });
                                                    }


                                            });

                                                $("#contractUpload").each(function(){

                                                    var myFile = $(this)[0].files[0];
                                                   // console.log(myFile);
                                                    if($(myFile).length > 0){

                                                         var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', 'REQUEST_LETTER');
                                                        formData.append('TYPE', 'REQUEST_LETTER');
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
                                                                console.log('Successfully Saved');
                                                            },error : function(){
                                                                console.log('Failed to Save');
                                                            }
                                                        });
                                                    }

                                                });
                                                $('.documentaryReq').each(function(){
                                                    var myFile = $(this)[0].files[0];

                                                    if($(myFile).length == 0){
                                                        console.log('Empty Field');

                                                    }else{
                                                       // console.log(myFile);
                                                        var formData = new FormData();
                                                            formData.append('ACCOUNT_ID', data);
                                                            formData.append('REQUIREMENTS', $(this).attr("id"));
                                                            formData.append('TYPE', 'DOCUMENTARY');
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
                                                      $('.medicalReq').each(function(){
                                                         var myFile = $(this)[0].files[0];

                                                         if($(myFile).length == 0){
                                                             console.log('Empty Field');

                                                         }else{
                                                            // console.log(myFile);
                                                             var formData = new FormData();
                                                                 formData.append('ACCOUNT_ID', data);
                                                                 formData.append('REQUIREMENTS', $(this).attr("id"));
                                                                 formData.append('TYPE', 'Medical');
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

                                                });

                                            },
                                            error : function(jqXHR, textStatus, errorThrown) {
                                                console.log(errorThrown);
                                            }
                                        });
                                    }
                                },cancel: function(){
                                    $("#SUBMIT_APPLICATION").prop("disabled", false);
                                    $("#SAVE_APPLICATION").prop("disabled", false);
                                }
                            }
                        })
                    }
                    else{
                         $("#SUBMIT_APPLICATION").prop("disabled", false);
                         $("#SAVE_APPLICATION").prop("disabled", false);
                    }

            }






                // console.log(y);
                 //console.log(code);
    });

    $("#SUBMIT_APPLICATION").on("click", function(){
//    console.log(signatureImage);
//    console.log(canvasUrl);
        $("#vSAVE_AS_DRAFT").val("NO");

        //console.log($("#vSAVE_AS_DRAFT").val());
        var obj;
        var validationForm=$('#LICENSE_APPLICATION_FORM');
        validationForm.validate();

        $("#SUBMIT_APPLICATION").prop("disabled", true);
        $("#SAVE_APPLICATION").prop("disabled", true);
            //console.log(canvasUrl);

      if($("#FIRST_NAME").val().trim() == "" || $("#LAST_NAME").val().trim() == "" ||
        $("#HOME_ADDRESS").val().trim() == "" || $("#BIRTH_DATE").val().trim() == "" ||
        $("#CITIZENSHIP").val().trim() == "" || $("#GENDER").val().trim() == "" ||
        $("#DIVISIONS").val() == "" || $("#roles").val() == "" || $("#sports").val() == "" || $("#image").val() == "" || $('#CLUB').val().trim() == ""){

        if($('#CLUB').val().trim() == ""){
            var label = $('#CLUB').first().siblings('.label-control').text();
           //$('#CLUB').siblings('.label-control').text(label+' is required');
           $('#CLUB').siblings('.label-control').css('color','red');
           $('#CLUB').css('background-image','linear-gradient(red,red),linear-gradient(red,red)');
        }
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
//        for(x = 0; x > canvasUrl.length; x++){
//           console.log(canvasUrl[x]);
//        }
//        console.log(canvasUrl['size']);
//        console.log(canvasUrl[1]);
//        console.log($("#signature").val())
                if(signatureImage == false && canvasUrl == ""){

                    $("#signatureModal").modal("show");
                        $('#signatureModal').on('hidden.bs.modal', function () {
                            //console.log('sample');

                               $("#SUBMIT_APPLICATION").prop("disabled", false);
                               $("#SAVE_APPLICATION").prop("disabled", false);
                        });

                }else{

//                   if($("#DIVISION").val() === "" || $("#sports").val() === "" || $("#roles").val() === ""){
//
//                        draft= true;
//
//                    }else{
//                        $('.documentaryReq').each(function(){
//                        var myFile = $(this)[0].files[0];
//                            if($(myFile).length > 0){
//                                y += 1;
//                            }
//                        });
//
//                    }
//                        if(y == code.length){
//                            draft = false;
//                        }else{
//                            draft = true;
//                        }
//                         console.log(y);
//                         console.log(code);

                if(validationForm.valid()){
                    var form = $("#LICENSE_APPLICATION_FORM")[0];
                    var data = new FormData(form);
                    $.confirm({
                        title:'<label class="text-warning">Confirm!</label>',
                        content: "I HEREBY CERTIFY that the foregoing information and data together"+
                        "with the attached papers are true and correct. Should this application be approved,"+
                        "I bind myself to unhold and comply with the provision of the law govering the sports"+
                        "or games and the rules and regulation promulgated thereunder, and all resolution adopted"+
                        "or which may hereunder be adopted by the Board",
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
                                        dataType: 'text',
                                        beforeSend: function(){
                                            obj =  $.dialog({
                                                title: '<label class="text-success">Loading Please Wait!</label>',
                                                content: '<img src="/PublicAccessPortal/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                                                type:'purple',
                                                closeIcon: false,
                                                backgroundDismiss: false
                                            })

                                        },
                                        complete: function(){
                                          obj.close();
//                                          if(draft == true){
//                                                $.dialog({
//                                                    title:'<label class="text-success">Success!</label>',
//                                                    content: 'Successfully Saved<br>Your application Saved as Draft',
//                                                    type: 'purple',
//                                                    buttons: {
//
//                                                    },
//                                                    close: function(){
//                                                        window.location.href = '/PublicAccessPortal/applications';
//                                                    }
//                                                })
//
//                                          }else{
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
//                                          }

                                        },
                                        success : function (data){
                                         //console.log(data);
                                         //draft = data.draft;
                                        if(canvasUrl == ""){
                                         $("#signature").each(function(){
                                            var myFile = $(this)[0].files[0];
                                                //console.log(myFile);
                                                if($(myFile).length > 0){

                                                     var formData = new FormData();
                                                    formData.append('ACCOUNT_ID', data);
                                                    formData.append('REQUIREMENTS', 'SIG');
                                                    formData.append('TYPE', 'SIGNATORY');
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
                                                            console.log('Successfully Saved Signature');
                                                        },error : function(){
                                                            console.log('Failed to Save');
                                                        }
                                                    });
                                                }
                                                 });
                                        }else{

                                            var formData = new FormData();
                                           formData.append('ACCOUNT_ID', data);
                                           formData.append('REQUIREMENTS', 'SIG');
                                           formData.append('TYPE', 'SIGNATORY');
                                           formData.append('STATUS', 1);
                                           formData.append("FILE", canvasUrl);
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
                                                   console.log('Successfully Saved Signature');
                                               },error : function(){
                                                   console.log('Failed to Save');
                                               }
                                           });
                                        }



                                        $("#image").each(function(){
                                             var myFile = $(this)[0].files[0];
                                                //console.log(myFile);
                                                if($(myFile).length > 0){

                                                     var formData = new FormData();
                                                    formData.append('ACCOUNT_ID', data);
                                                    formData.append('REQUIREMENTS', 'DISPLAY_PHOTO');
                                                    formData.append('TYPE', 'DISPLAY_PHOTO');
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
                                                            console.log('Successfully Saved');
                                                        },error : function(){
                                                            console.log('Failed to Save');
                                                        }
                                                    });
                                                }


                                        });

                                            $("#contractUpload").each(function(){

                                                var myFile = $(this)[0].files[0];
                                               // console.log(myFile);
                                                if($(myFile).length > 0){

                                                     var formData = new FormData();
                                                    formData.append('ACCOUNT_ID', data);
                                                    formData.append('REQUIREMENTS', 'REQUEST_LETTER');
                                                    formData.append('TYPE', 'REQUEST_LETTER');
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
                                                            console.log('Successfully Saved');
                                                        },error : function(){
                                                            console.log('Failed to Save');
                                                        }
                                                    });
                                                }

                                            });
                                            $('.documentaryReq').each(function(){
                                                var myFile = $(this)[0].files[0];

                                                if($(myFile).length == 0){
                                                    console.log('Empty Field');

                                                }else{
                                                   // console.log(myFile);
                                                    var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', $(this).attr("id"));
                                                        formData.append('TYPE', 'DOCUMENTARY');
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
                                                  $('.medicalReq').each(function(){
                                                     var myFile = $(this)[0].files[0];

                                                     if($(myFile).length == 0){
                                                         console.log('Empty Field');

                                                     }else{
                                                        // console.log(myFile);
                                                         var formData = new FormData();
                                                             formData.append('ACCOUNT_ID', data);
                                                             formData.append('REQUIREMENTS', $(this).attr("id"));
                                                             formData.append('TYPE', 'Medical');
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

                                            });

                                        },
                                        error : function(jqXHR, textStatus, errorThrown) {
                                            console.log(errorThrown);
                                        }
                                    });
                                }
                            },cancel: function(){
                                $("#SUBMIT_APPLICATION").prop("disabled", false);
                                $("#SAVE_APPLICATION").prop("disabled", false);
                            }
                        }
                    })
                }
                else{
                    $("#SUBMIT_APPLICATION").prop("disabled", false);
                    $("#SAVE_APPLICATION").prop("disabled", false);
                }
                }
        }


    });

    // draw signature
    $(document).on("click", "#uploadButton", function(){
        draw = 0;
        $("#drawSignature").hide();
        $("#uploadSignature").show();
        $("#drawButton").show();
        $("#uploadButton").hide();
        $("#sig-clearBtn").hide();
    });
    $(document).on("click", "#drawButton", function(){
         draw = 1;
        $("#drawSignature").show();
        $("#uploadSignature").hide();
        $("#sig-clearBtn").show();
        $("#drawButton").hide();
        $("#uploadButton").show();
    });

      window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      var canvas = document.getElementById("sig-canvas");
      var ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 2;

      var drawing = false;
      var mousePos = {
        x: 0,
        y: 0
      };
      var lastPos = mousePos;

      canvas.addEventListener("mousedown", function(e) {
        drawing = true;
        lastPos = getMousePos(canvas, e);
      }, false);

      canvas.addEventListener("mouseup", function(e) {
        drawing = false;
      }, false);

      canvas.addEventListener("mousemove", function(e) {
        mousePos = getMousePos(canvas, e);
      }, false);

      // Add touch event support for mobile
      canvas.addEventListener("touchstart", function(e) {

      }, false);

      canvas.addEventListener("touchmove", function(e) {
        var touch = e.touches[0];
        var me = new MouseEvent("mousemove", {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
      }, false);

      canvas.addEventListener("touchstart", function(e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var me = new MouseEvent("mousedown", {
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
      }, false);

      canvas.addEventListener("touchend", function(e) {
        var me = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(me);
      }, false);

      function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
          x: mouseEvent.clientX - rect.left,
          y: mouseEvent.clientY - rect.top
        }
      }

      function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
          x: touchEvent.touches[0].clientX - rect.left,
          y: touchEvent.touches[0].clientY - rect.top
        }
      }

      function renderCanvas() {
        if (drawing) {
          ctx.moveTo(lastPos.x, lastPos.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
          lastPos = mousePos;
        }
      }

      // Prevent scrolling when touching the canvas
      document.body.addEventListener("touchstart", function(e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, { passive: false });
      document.body.addEventListener("touchend", function(e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, { passive: false });
      document.body.addEventListener("touchmove", function(e) {
        if (e.target == canvas) {
          e.preventDefault();
        }
      }, { passive: false });

      (function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
      })();

      function clearCanvas() {
        canvas.width = canvas.width;
      }

      // Set up the UI
      var sigText = document.getElementById("sig-dataUrl");
      var sigImage = document.getElementById("sig-image");
      var clearBtn = document.getElementById("sig-clearBtn");
      var submitBtn = document.getElementById("sig-submitBtn");
      clearBtn.addEventListener("click", function(e) {
        clearCanvas();
          mousePos = {
                x: 0,
                y: 0
              };
        lastPos = mousePos;
       // console.log(lastPos);
      }, false);

      $('#signatureModal').on('hidden.bs.modal', function () {
      if(lastPos.x > 0 || lastPos.y > 0){
          if(draw == 1){
        canUrl = canvas.toDataURL();
        var blobBin = atob(canUrl.split(',')[1]);
        var array = [];
        for(var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }

         blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
         canvasUrl = new File([blob], "Signatory.png", {type: 'image/png'});
                //console.log(canvasUrl);
        }
      }


      });

      $("#signature").change(function(){
            var signature = $("#signature").prop('files');
            //console.log(signature.length);
            if(signature.length > 0){
                signatureImage = true;
            }else{
                signatureImage = false;
            }
      });

      $(document).on("click", "#uploadButton", function(){
        canUrl = canvas.toDataURL();
        draw = 0;
          mousePos = {
                x: 0,
                y: 0
              };
        lastPos = mousePos;
          $("#previewImage").attr("src", canUrl);
      });

    $("input[type=file]").on("change", function(){
        var size = 0;
         size = $(this)[0].files[0].size;
           //console.log(size);
           if(size > 1000000){
              $.alert({
                       title: '<label class="text-warning">Warning!</label>',
                       content: 'File is too big',
                       type:'red',
                           buttons: {
                               close: function() {
                               //console.log('sample');
                               //$("#REMOVE").trigger('click');
                               }
                           }
                  });
           }
    });
//    for(var p = 0; p < fileTest.length; p++){
//    console.log(fileTest[p]);
//    }
        $(document).on("change", ".documentaryReq", function(){
            var size = $(this)[0].files[0].size;
               //console.log(size);
               if(size > 1000000){
                  $.alert({
                           title: '<label class="text-warning">Warning!</label>',
                           content: 'File is too big',
                           type:'red',
                               buttons: {
                                   close: function() {
                                   }
                               }
                      });
               }
        });

});

$("#DIVISIONS").change(function() {
    switch ($("#DIVISIONS").val()){
        case "PBOPG":
        case "HRBSD":
            $(".BOCSD").hide();
            break;
        case "BOCSD":
            $(".BOCSD").show();
            $('#PROMOTION_CONTRACT').val("NO")
            $('#GAB_DENIED').val("NO");
            break;

    }
    $(".appended-sports").remove();
    var division = $("#DIVISIONS").val();

    $("#sports").prop("disabled", false);
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
                $("#sports").append("<option class='appended-sports' value='"+game.code+"' id='SPORTS'>"+game.name+"</option>");

            });
            $(".selectpicker").selectpicker("refresh");
        }
    });
});

$("#sports").change(function() {
    $(".appended-roles").remove();
    var sport = $("#sports").val();

    $("#roles").prop("disabled", false);
    $(".selectpicker[data-id='roles']").removeClass("disabled");

    $("#roles").val("default");
    $("#roles").selectpicker("refresh");
    $("#roles").empty();
    $.ajax({
        url : "get-game-roles",
        data : {
            code : sport
        },
        type : "GET",
        dataType : "text",
        success : function(data){
            var roles = JSON.parse(data);
            $.each(roles , function(index, role) {
                $("#roles").append("<option class='appended-roles' value='"+role.code+"' id='ROLES'>"+role.name+"</option>");
            });
            $(".selectpicker").selectpicker("refresh");
        }
    });
});
$("#SEARCH").on("click", function(){
    var licenseNumber = $("#LICENSE_NUMBER").val();
    var obj;
    $.confirm({
        title: '<label class="text-warning">Confirm!</label>',
        content: 'Are you sure want to search this license number?',
        type: 'red',
        buttons:{
            confirm:{
                    btnClass: 'btn-purple',
                    action: function(){
                        $.ajax({
                            url: 'search-license-application',
                            data: {
                                licenseNumber: licenseNumber
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
                            success: function (data){

                            var application = JSON.parse(data);
                            //console.log(application);

                                $("#FIRST_NAME").val(application.vFIRST_NAME);
                                $("#MIDDLE_NAME").val(application.vMIDDLE_NAME);
                                $("#LAST_NAME").val(application.vLAST_NAME);
                                $("#NICKNAME").val(application.vNICK_NAME);
                                $("#HOME_ADDRESS").val(application.vHOME_ADDRESS);
                                $("#OFFICE_ADDRESS").val(application.vOFFICE_ADDRESS);
                                $("#BIRTH_DATE").val(application.vBIRTH_DATE);
                                $("#PLACE_OF_BIRTH").val(application.vBIRTH_PLACE);
                                $("#CITIZENSHIP").val(application.vCITIZENSHIP);
                                $("#CIVIL_STATUS").val(application.vCIVILSTATUS);
                                $("#AGE").val(application.vAGE);

                                $("#HEIGHT").val(application.vHEIGHT);
                                $("#WEIGHT").val(application.vWEIGHT);
                                $("#GENDER").val(application.vGENDER);
                                $("#CLUB").val(application.vCLUB);
                                $("#GENDER").val(application.vGENDER);

                                if(application.vACCUSED_CRIME === "YES"){
                                    $("#ACCUSED_CRIME").prop( "checked", true );
                                    var text = document.getElementById("STATE_OFFENSE");
                                    text.style.display = "block";
                                    $("#STATE_OFFENSE").val(application.vSTATE_OFFENSE);
                                }

                                    $("#HOME_CONTACT").val(application.vTELEPHONE_HOME);
                                    $("#OFFICE_CONTACT").val(application.vTELEPHONE_OFFICE);

                                $("#DIVISIONS").val(application.vDIVISION).change();
                                if(application.vDIVISION == null){
                                    $('#sports').attr('disabled', true);
                                    $('#roles').attr('disabled', true);
                                }
                                if(application.vACCUSED_CRIME === "YES"){
                                    $("#ACCUSED_CRIME").prop( "checked", true );
                                    var text = document.getElementById("STATE_OFFENSE");
                                    text.style.display = "block";
                                    $("#STATE_OFFENSE").val(application.vSTATE_OFFENSE);
                                }

                                $("#HOME_CONTACT").val(application.vTELEPHONE_HOME);
                                $("#OFFICE_CONTACT").val(application.vTELEPHONE_OFFICE);


                                if($("#DIVISIONS").val() == "BOCSD"){
                                    $(".BOCSD").show();
                                    $("#EDUC_BACKGROUND").val(application.vEDUCATION_BACKGROUND).change();

                                    if(application.vPROMOTION_CONTRACT === "YES"){
                                        $("#CONTRACT").prop( "checked", true ).change();
                                        var text = document.getElementById("CONTRACT_DIV");
                                        text.style.display = "block";
                                        $("#PROMOTION_CONTRACT").val(application.vPROMOTION_CONTRACT);

                                    }else{
                                        $("#CONTRACT").prop( "checked", false ).change();
                                    }
                                    if(application.vGAB_DENIED == "YES"){
                                        $("#DENIED").prop( "checked", true ).change();
                                        var text = document.getElementById("STATE_OFFENSE");
                                        text.style.display = "block";
                                        $("#GAB_DENIED").val(application.vGAB_DENIED);

                                    }else{
                                        $("#DENIED").prop( "checked", false ).change();
                                    }
                                }else{
                                    $(".BOCSD").hide();

                                    $("#CONTRACT").prop( "checked", false ).change();
                                    $("#DENIED").prop( "checked", false ).change();
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
    })
});


$(document).on('change', '#CONTRACT',function(){
    var inputFile2 = document.getElementById("inputFile2");
    if(this.checked){
        $('#CONTRACT_DIV').show();
        $('#PROMOTION_CONTRACT').val("YES");
    }else{
        $('#CONTRACT_DIV').hide();
        $('#PROMOTION_CONTRACT').val("NO");

    }
});
$(document).on('change', '#DENIED', function(){
    if(this.checked){
        $('#GAB_DENIED').val("YES");

    }else{
        $('#GAB_DENIED').val("NO");

    }
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
