$().ready(function(){
materialKit.initFormExtendedDatetimepickers();
    $('#datatable').DataTable({
        "order": []
    });

    var table = $("#datatable").DataTable();
    var sports_selected;
    var roles_selected;
    var application_type;
    var application_id;
    var PERMIT_SPORT;
    var dialog;
    var fileValue = [];
    var statusIndicator;
    var permitIndicator;
    var canvasUrl = "";
    var canUrl = "";
    var documentReqLength = 0;
    var medicalReqLength = 0;
    var y = 0;
    var draft = false;
    var d = new Date(),
        month = ('0'+(d.getMonth()+1)).slice(-2),
        year = d.getFullYear();

    var type = 0;
    var draw;
    var image;
    var signatureImage = false;
    var dir = [];
    var fileTEst = [];
    var signatureChange = false;
    var PERMIT_TYPE;
    $.ajax({
        url : "get-applications",
        type : "GET",
        dataType : "text",
        data : {
            month : month,
            year : year,
            applicationType : type
        },
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
            //console.log(apps);
            $.each(apps , function(index, app) {
            //console.log(app.role);
                if(app.typeCode == "L"){
                    application_type = "#updateLicenseModal"
                    application_id = "licenseUpdate";
                    application_view = "licenseview";
                   // console.log(app.appType);
                }else if(app.typeCode == "P"){
                    application_type = "#updatePermitModal"
                    application_id = "permitUpdate";
                    application_view = "permitView";
                }else if (app.typeCode == "I"){
                    application_type = "#updateReprintModal"
                    application_id = "reprintUpdate";
                    application_view = "reprintView";

                }
                if(app.status == "Draft"){
                  var  text = "Update";
                  var dataStatus = "update";
                }else{
                   var  text = "View";
                   var dataStatus = "view";
                }
                if(app.status == "Released"){
                     var style = ""
                }else{
                    var style = "display:none;"
                }
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
                    "<li><a data-toggle='modal'  data-id='"+app.accountId+"' id='"+application_id+"' class='"+app.accountId+"' data-target='"+application_type+"' data-status='"+dataStatus+"' >"+text+"</a></li>" +
                    /*"<li><a data-toggle='modal'  data-id='"+app.accountId+"' id='"+application_view+"'  data-target='"+application_type+"'>View</a></li>"+*/
//                    "<li><a data-toggle='modal'  data-id='"+app.accountId+"' id='licensePayment' data-target='#paymentModal'>Payment</a></li>" +
//                    "<li><a href='#' data-id='"+app.accountId+"' id='printApplications'>Print License</a></li>" +
                    "<li style='"+style+"'><a href='reprint-id-form/"+app.accountId+"' id='reprintID'>Reprint ID</a></li>" +
                    "</ul>" +
                    "</div>"
                ]).draw(false);

//                if(app.status == "Draft"){
//                    $("." + app.accountId).text("Update");
//                    $("."+ app.accountId).attr("data-status", "update");
//                }else{
//                   $("." + app.accountId).text("View");
//                   $("."+ app.accountId).attr("data-status", "view");
//                }
                //console.log(app.status);
            });
        }

    });
    $(document).on('click', '#reprintUpdate', function(){
            var ACCOUNT_ID = $(this).data("id");
            var status = $(this).attr('data-status');
             permitIndicator = false;
             statusIndicator = status;
                console.log(statusIndicator);
            if(statusIndicator == "view"){

             $("input").attr("readonly", "readonly");
             $(".selectpicker").attr("disabled", true);
             $("input[type=checkbox]").attr("disabled", true);

               $("#submitDivReprint").hide();

            }else{
                $("#submitDivReprint").show();
            $(".selectpicker").attr("disabled", false);

            }

        $.ajax({
             url: '/PublicAccessPortal/get-update-applications',
             data:{
                 ACCOUNT_ID :ACCOUNT_ID
             },
             type: 'GET',
             dataType: 'text',
               beforeSend: function(){
                   dialog =  $.dialog({
                        title: '<label class="text-success">Loading Please Wait!</label>',
                        content: '<img src="/PublicAccessPortal/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                        type:'purple',
                        closeIcon: false,
                        backgroundDismiss: false
                    })
                },
                complete: function(){
                    dialog.close();
                },
            success:function(data){
                var details = JSON.parse(data);

                $("#reprintTitle").html("For Application: <"+details.vID_FOR+">");
                $("#vLICENSE_NUMBER").val(details.vLICENSE_NUMBER);
                $("#vID_FOR").val(ACCOUNT_ID);
                $("#vACCOUNT_ID").val(ACCOUNT_ID);
                $("#vLAST_NAME").val(details.vLAST_NAME);
                $("#vFIRST_NAME").val(details.vFIRST_NAME);
                $("#vMIDDLE_NAME").val(details.vMIDDLE_NAME);
                $("#vSUFFIX").val(details.vSUFFIX);
                $("#vCITIZENSHIP").val(details.vCITIZENSHIP);
                $("#vGENDER").val(details.vGENDER);
                $("#vCIVILSTATUS").val(details.vCIVILSTATUS);
                $("#gender").val(details.vGENDER).change();
                $("#civilstatus").val(details.vCIVILSTATUS).change();
                $("#vREASONS_FOR_ID_REPRINT").val(details.vREASONS_FOR_ID_REPRINT).change();
                 birthdate = details.vBIRTH_DATE.split('/');
                 var year = birthdate[0];
                 var month = birthdate[1];
                 var day = birthdate[2];
                 var birthdate = month + "/" + day + "/" + year;
                 //console.log(birthdate);
                 $("#vBIRTH_DATE").val(birthdate);
                 $("#vHOME_ADDRESS").val(details.vHOME_ADDRESS);

                 if(details.vAVATAR == "assets/img/image_placeholder.jpg"){
                       $.ajax({
                            url : "/PublicAccessPortal/applications/get-display-photo",
                            data : {
                                account_id :details.vID_FOR
                            },
                            type : "GET",
                            dataType : "text",
                            success: function(data){
                                 var display_photo = JSON.parse(data);
                                 $("#vAVATAR").attr("src", "https://www.tlcpay.ph/solutions/GAB-TEST/REQUIREMENTS/"+display_photo.accountId+"."+display_photo.fileExt);

                             }
                        });

                 }else{
                    $("#vAVATAR").attr("src", details.vAVATAR);
                    $("#vimageValue").val(details.vAVATAR);
                 }
                  $("#vROLES").val(details.vROLES);
                  $("#vSPORTS").val(details.vSPORTS);
    //             $("#vREASONS_FOR_ID_REPRINT").val(details.vREASONS_FOR_ID_REPRINT).change();
                   $.ajax({
                       url: '/PublicAccessPortal/applications/get-signatory',
                       data:{
                           account_id :details.vID_FOR
                       },
                       type: 'GET',
                       dataType: 'text',
                       success: function(data){
                         var data = JSON.parse(data);
                          //console.log(data);
                          var sign = data.dir.split("/").pop();
                          //console.log(sign);
                         if(data.accountId != ""){
                             signatureImage = true;
                             $("#vpreviewImage").attr("src", "https://www.tlcpay.ph/solutions/GAB-TEST/REQUIREMENTS/"+sign+"."+data.fileExt);
                         }else{
                         $("#vpreviewImage").attr("src", "/PublicAccessPortal/assets/img/image_placeholder.jpg");
                         }

                       }

                       });

                       $.ajax({
                            url : "/PublicAccessPortal/applications/get-game-roles",
                            data : {
                                code : details.vSPORTS
                            },
                            type : "GET",
                            dataType : "text",
                            success: function(data){
                                 var roles = JSON.parse(data);
                                 $.each(roles , function(index, role) {
                                    if(role.code == details.vROLES){
                                        $("#ROLE_NAME").val(role.name);
                                    }
                                 });
                             }
                        });
                        $.ajax({
                               url: '/PublicAccessPortal/applications/get-requirements-per-app',
                             data:{
                                 account_id :ACCOUNT_ID
                             },
                             type: 'GET',
                             dataType: 'text',
                             success: function(data){
                                var req_data = JSON.parse(data);

                              for(var x = 0; x < req_data.length; x++){

                              var fileName = req_data[x].dir.toString().split('/');
                                  if(req_data[x].requirements == "AFFIDAVIT"){
                                    $("#affidavitViewModal").show();
                                    $("#affidavitViewModal").attr("data-value", req_data[x].accountId+ "-"+req_data[x].type+"."+ req_data[x].fileExt);
                                    $("#affidavitView").val(req_data[x].accountId+ "-"+req_data[x].type+"."+ req_data[x].fileExt);

                                  }
                               }
                             }
                        });
            },
             error : function(jqXHR, textStatus, errorThrown) {
                 console.log(errorThrown);
             }
        });
    });
        $("#vREASONS_FOR_ID_REPRINT").change(function(){
            if($("#vREASONS_FOR_ID_REPRINT").val() == "ID loss"){
                 $("input").attr("readonly", true);
                 $("#civilstatus").attr("disabled", true);
                 $("#gender").attr("disabled", true);

            }else{
                 $("input").attr("readonly", false)
                 $("#vCIVILSTATUS").removeAttr("disabled");
                 $("#gender").removeAttr("disabled");
                 $(".selectpicker").selectpicker("refresh");

            }
        });
            $(document).on("click", ".affidavitViewModal",function(){
                var value = $(this).data('value');
                $("#documentPreview").attr('src', "https://www.tlcpay.ph/solutions/GAB-TEST/REQUIREMENTS/"+value);
                $('#imageDocument').modal('show');

            });

        $(document).on("click", "#REPRINT_SUBMIT_APPLICATION", function(){
        var ACCOUNT_ID = $("#vACCOUNT_ID").val();
        $("#vSAVE_AS_DRAFT_REPRINT").val("NO");
        $("#REPRINT_SUBMIT_APPLICATION").prop("disabled", true);


            var obj;
            var validationForm=$('#REPRINT_ID_FORM');
            validationForm.validate();

            if($("#vREASONS_FOR_ID_REPRINT").val() == "" || $("#vLICENSE_NUMBER").val() == "" || $("#vROLES").val() == "" || $("#vLAST_NAME").val().trim() == ""
            || $("#vFIRST_NAME").val().trim() == "" || $("#vGENDER").val() == "" || $("#vCIVILSTATUS").val().trim() == "" || $("#vBIRTH_DATE").val() == "" || $("#vHOME_ADDRESS").val().trim() == "" || $("#imageValue").val() == ""){
                  $.alert({
                    title: '<label class="text-warning">Warning!</label>',
                    content: 'Please fill in required fields',
                    type:'red',
                        buttons: {
                            close: function() {

                                 $("#REPRINT_SUBMIT_APPLICATION").prop("disabled", false);
                            }
                        }
               });
            }else if(signatureImage == false && canvasUrl == ""){
                $("#vsignatureModal").modal("show");
                    $('#vsignatureModal').on('hidden.bs.modal', function () {
                        //console.log('sample');


                           $("#REPRINT_SUBMIT_APPLICATION").prop("disabled", false);
                    });

            }else{
                    if(validationForm.valid()){
                        var form = $("#REPRINT_ID_FORM")[0];
                        var data = new FormData(form);
                        $.confirm({
                            title:'<label class="text-warning">Confirm!</label>',
                            content: "Are you sure want to add this data?",
                            type: 'red',
                            buttons: {
                                confirm: {
                                    btnClass: 'btn-purple',
                                    action: function(){
                                        $.ajax({
                                            url : "/PublicAccessPortal/applications/add-application",
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

                                            },success:function(data){
                                            var accountId = data;
                                             if(signatureChange == true){
                                                 if(canvasUrl == ""){
                                                  $("#signature").each(function(){
                                                     var myFile = $(this)[0].files[0];
                                                         //console.log(myFile);
                                                         if($(myFile).length > 0){

                                                              var formData = new FormData();
                                                             formData.append('ACCOUNT_ID', accountId);
                                                             formData.append('REQUIREMENTS', 'SIG');
                                                             formData.append('TYPE', 'SIGNATORY');
                                                             formData.append('STATUS', 1);
                                                             formData.append("FILE", myFile);
                                                             formData.append('DIR', '../../REQUIREMENTS/');

                                                             $.ajax({
                                                                 url: '/PublicAccessPortal/applications/upload-requirements-directory',
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
                                                    formData.append('ACCOUNT_ID', accountId);
                                                    formData.append('REQUIREMENTS', 'SIG');
                                                    formData.append('TYPE', 'SIGNATORY');
                                                    formData.append('STATUS', 1);
                                                    formData.append("FILE", canvasUrl);
                                                    formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: '/PublicAccessPortal/applications/upload-requirements-directory',
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
                                             }else{
                                                  var copy_to = new FormData();
                                                      copy_to.append('account_id', accountId);
                                                      copy_to.append('id_for', $("#vID_FOR").val());
                                                       $.ajax({
                                                           url: '/PublicAccessPortal/applications/copy-previous-signature',
                                                         data: copy_to,
                                                         cache: false,
                                                         contentType: false,
                                                         processData: false,
                                                         type: 'POST',
                                                         timeout:1000000,
                                                          type: 'POST',
                                                          dataType: 'text',
                                                           success: function(){
                                                               console.log('Successfully Saved');
                                                           },error : function(){
                                                               console.log('Failed to Save');
                                                           }
                                                       });
                                             }
                                              if($('#image').val() == ""){
                                                    var copy_to = new FormData();
                                                        copy_to.append('account_id', accountId);
                                                        copy_to.append('id_for', $("#vID_FOR").val());
                                                       $.ajax({
                                                             url: '/PublicAccessPortal/applications/copy-previous-display-photo',
                                                           data: copy_to,
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
                                              }else{
                                                    $("#image").each(function(){
                                                         var myFile = $(this)[0].files[0];
                                                            //console.log(myFile);
                                                            if($(myFile).length > 0){

                                                                 var formData = new FormData();
                                                                formData.append('ACCOUNT_ID', accountId);
                                                                formData.append('REQUIREMENTS', 'DISPLAY_PHOTO');
                                                                formData.append('TYPE', 'DISPLAY_PHOTO');
                                                                formData.append('STATUS', 1);
                                                                formData.append("FILE", myFile);
                                                                formData.append('DIR', '../../REQUIREMENTS/');

                                                                $.ajax({
                                                                    url: '/PublicAccessPortal/applications/upload-requirements-directory',
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
                                              }

                                                         $("#affidavit").each(function(){
                                                         var myFile = $(this)[0].files[0];
                                                            //console.log(myFile);
                                                            if($(myFile).length > 0){

                                                                 var formData = new FormData();
                                                                formData.append('ACCOUNT_ID', accountId);
                                                                formData.append('REQUIREMENTS', 'R999');
                                                                formData.append('TYPE', 'DOCUMENTARY');
                                                                formData.append('STATUS', 1);
                                                                formData.append("FILE", myFile);
                                                                formData.append('DIR', '../../REQUIREMENTS/');

                                                                $.ajax({
                                                                    url: '/PublicAccessPortal/applications/upload-requirements-directory',
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
                                            },
                                             error : function(jqXHR, textStatus, errorThrown) {
                                                 console.log(errorThrown);
                                             }
                                        });
                                    }
                                },cancel: function(){
                                 $("#REPRINT_SUBMIT_APPLICATION").prop("disabled", false);
                             }
                            }
                        })
                    }else{
                         $("#REPRINT_SUBMIT_APPLICATION").prop("disabled", false);

                    }
            }

        });
                $(document).on("click", "#REPRINT_SAVE_APPLICATION", function(){
                 var ACCOUNT_ID = $("#vACCOUNT_ID").val();
                $("#vSAVE_AS_DRAFT_REPRINT").val("YES");
                  $("#REPRINT_SAVE_APPLICATION").prop("disabled", true);


                    var obj;
                    var validationForm=$('#REPRINT_ID_FORM');
                    validationForm.validate();
                    if(validationForm.valid()){
                        var form = $("#REPRINT_ID_FORM")[0];
                        var data = new FormData(form);
                        $.confirm({
                            title:'<label class="text-warning">Confirm!</label>',
                            content: "Are you sure want to add this data?",
                            type: 'red',
                            buttons: {
                                confirm: {
                                    btnClass: 'btn-purple',
                                    action: function(){
                                        $.ajax({
                                            url : "/PublicAccessPortal/applications/add-application",
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

                                            },success:function(data){
                                            var accountId = data;
                                             if(signatureChange == true){
                                                 if(canvasUrl == ""){
                                                  $("#signature").each(function(){
                                                     var myFile = $(this)[0].files[0];
                                                         //console.log(myFile);
                                                         if($(myFile).length > 0){

                                                              var formData = new FormData();
                                                             formData.append('ACCOUNT_ID', accountId);
                                                             formData.append('REQUIREMENTS', 'SIG');
                                                             formData.append('TYPE', 'SIGNATORY');
                                                             formData.append('STATUS', 1);
                                                             formData.append("FILE", myFile);
                                                             formData.append('DIR', '../../REQUIREMENTS/');

                                                             $.ajax({
                                                                 url: '/PublicAccessPortal/applications/upload-requirements-directory',
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
                                                    formData.append('ACCOUNT_ID', accountId);
                                                    formData.append('REQUIREMENTS', 'SIG');
                                                    formData.append('TYPE', 'SIGNATORY');
                                                    formData.append('STATUS', 1);
                                                    formData.append("FILE", canvasUrl);
                                                    formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: '/PublicAccessPortal/applications/upload-requirements-directory',
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
                                             }else{
                                                  var copy_to = new FormData();
                                                      copy_to.append('account_id', accountId);
                                                      copy_to.append('id_for', $("#vID_FOR").val());
                                                       $.ajax({
                                                           url: '/PublicAccessPortal/applications/copy-previous-signature',
                                                         data: copy_to,
                                                         cache: false,
                                                         contentType: false,
                                                         processData: false,
                                                         type: 'POST',
                                                         timeout:1000000,
                                                          type: 'POST',
                                                          dataType: 'text',
                                                           success: function(){
                                                               console.log('Successfully Saved');
                                                           },error : function(){
                                                               console.log('Failed to Save');
                                                           }
                                                       });
                                             }
                                              if($('#image').val() == ""){
                                                    var copy_to = new FormData();
                                                        copy_to.append('account_id', accountId);
                                                        copy_to.append('id_for', $("#vID_FOR").val());
                                                       $.ajax({
                                                             url: '/PublicAccessPortal/applications/copy-previous-display-photo',
                                                           data: copy_to,
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
                                              }else{
                                                    $("#image").each(function(){
                                                         var myFile = $(this)[0].files[0];
                                                            //console.log(myFile);
                                                            if($(myFile).length > 0){

                                                                 var formData = new FormData();
                                                                formData.append('ACCOUNT_ID', accountId);
                                                                formData.append('REQUIREMENTS', 'DISPLAY_PHOTO');
                                                                formData.append('TYPE', 'DISPLAY_PHOTO');
                                                                formData.append('STATUS', 1);
                                                                formData.append("FILE", myFile);
                                                                formData.append('DIR', '../../REQUIREMENTS/');

                                                                $.ajax({
                                                                    url: '/PublicAccessPortal/applications/upload-requirements-directory',
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
                                              }
                                                         $("#affidavit").each(function(){
                                                         var myFile = $(this)[0].files[0];
                                                            //console.log(myFile);
                                                            if($(myFile).length > 0){

                                                                 var formData = new FormData();
                                                                formData.append('ACCOUNT_ID', accountId);
                                                                formData.append('REQUIREMENTS', 'R999');
                                                                formData.append('TYPE', 'DOCUMENTARY');
                                                                formData.append('STATUS', 1);
                                                                formData.append("FILE", myFile);
                                                                formData.append('DIR', '../../REQUIREMENTS/');

                                                                $.ajax({
                                                                    url: '/PublicAccessPortal/applications/upload-requirements-directory',
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
                                            },
                                             error : function(jqXHR, textStatus, errorThrown) {
                                                 console.log(errorThrown);
                                             }
                                        });
                                    }
                                },cancel: function(){
                                 $("#REPRINT_SAVE_APPLICATION").prop("disabled", false);
                             }
                            }
                        })
                    }else{
                         $("#REPRINT_SAVE_APPLICATION").prop("disabled", false);

                    }
                });


    $(document).on("click", "#printApplications", function(){

            var ACCOUNT_ID = $(this).data("id");
            //console.log(ACCOUNT_ID);
            window.open("print-applications?account_id="+ACCOUNT_ID, "_blank");
    });

    //  ajax for edit application

    $(document).on('click', '#licenseUpdate', function(){
    $("#previewImage").attr("src", "/PublicAccessPortal/assets/img/image_placeholder.jpg");
        $("#medicalDiv").hide();
        $("#documentaryDiv").hide();
        $(".appended-documentary").remove();
        $(".appended-medical").remove();
        var ACCOUNT_ID = $(this).attr('data-id');
        var status = $(this).attr('data-status');
         permitIndicator = false;
         statusIndicator = status;
        //console.log(status);
        if(statusIndicator == "view"){

         $("input").attr("readonly", "readonly");
         $(".selectpicker").attr("disabled", true);
         $("input[type=checkbox]").attr("disabled", true);

           $("#submitDiv").hide();

        }else{
            $("#submitDiv").show();
        $(".selectpicker").attr("disabled", false);

        }

        $.ajax({
           url: 'get-update-applications',
           type: 'GET',
           dataType: 'text',
           data: {
               ACCOUNT_ID : ACCOUNT_ID
           },
          beforeSend: function(){
              dialog =  $.dialog({
                   title: '<label class="text-success">Loading Please Wait!</label>',
                   content: '<img src="/PublicAccessPortal/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                   type:'purple',
                   closeIcon: false,
                   backgroundDismiss: false
               })
           },
           complete: function(){
               dialog.close();
           },
           success: function(data){
               var application = JSON.parse(data);
              console.log(application);
               var application_type;
                if(application.vAPPLICATION_TYPE == "1"){
                   application_type = "New License";
                }else if(application.vAPPLICATION_TYPE == "2"){
                    application_type = "Renewal License";
                }else if(application.vAPPLICATION_TYPE == "3"){
                    application_type = "New Permit";
                }else if(application.vAPPLICATION_TYPE == "4"){
                     application_type = "Renewal Permit";
                 }
                // console.log(application.vBIRTH_DATE);
                 birthdate = application.vBIRTH_DATE.split('/');
                 var year = birthdate[0];
                 var month = birthdate[1];
                 var day = birthdate[2];
                 var birthdate = month + "/" + day + "/" + year;
//                var todayTime = new Date(application.vBIRTH_DATE);
//                var month = todayTime.getMonth() + 1;
//                var day = todayTime.getDate();
//                var year = todayTime.getFullYear();
//                var birthdate = month + "/" + day + "/" + year;
                  // console.log(application.vAVATAR);
               sports_selected = application.vSPORTS;
               roles_selected = application.vROLES;
               $("#modal-title").html(application.vACCOUNTID+" (LICENSE)");
               $("#ACCOUNT_ID").val(application.vACCOUNTID);
               $("#FIRST_NAME").val(application.vFIRST_NAME);
               $("#MIDDLE_NAME").val(application.vMIDDLE_NAME);
               $("#LAST_NAME").val(application.vLAST_NAME);
               $("#NICKNAME").val(application.vNICK_NAME);
               $("#HOME_ADDRESS").val(application.vHOME_ADDRESS);
               $("#OFFICE_ADDRESS").val(application.vOFFICE_ADDRESS);
               $("#BIRTH_DATE").val(birthdate);
               $("#PLACE_OF_BIRTH").val(application.vBIRTH_PLACE);
               $("#CITIZENSHIP").val(application.vCITIZENSHIP);
               $("#CIVIL_STATUS").val(application.vCIVILSTATUS);
               $("#AGE").val(application.vAGE);
               $("#LICENSE_TYPE").val("L");

               $("#HEIGHT").val(application.vHEIGHT);
               $("#WEIGHT").val(application.vWEIGHT);
               $("#GENDER").val(application.vGENDER);
               $("#CLUB").val(application.vCLUB);
               avatarUrl = application.vAVATAR.split("//");
               //console.log(avatarUrl.pop());

               //console.log(application.vAVATAR);

               if(application.vAVATAR != "assets/img/image_placeholder.jpg"){
                    image = true;
                    $("#AVATAR").attr("src","//"+avatarUrl.pop());
                    $("#imageValue").val(application.vAVATAR);
               }else{
                    image = false;
               }

              // console.log(application.vDIVISION);
               $("#DIVISIONS").val(application.vDIVISION).change();
                    if(application.vDIVISION == null){
                        // console.log(sports_selected);
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

                 $.ajax({
                     url: 'applications/get-requirements-per-app',
                     data:{
                         account_id :ACCOUNT_ID
                     },
                     type: 'GET',
                     dataType: 'text',
                     success: function(data){
                         var req_data = JSON.parse(data);
                         //console.log(req_data);

                          for(var x = 0; x < req_data.length; x++){

                          var fileName = req_data[x].dir.toString().split('/');
                              if(req_data[x].requirements == "REQUEST_LETTER"){

                                $("#textContract").val("//"+fileName.pop()+ "." + req_data[x].fileExt);

                              }
                                dir[req_data[x].requirements] = req_data[x].dir+"."+req_data[x].fileExt;
//                            if(req_data[x].requirements == "SIG"){
//                                 $("#previewImage").attr("src", req_data[x].dir+"."+req_data[x].fileExt);
//                             }
                                fileValue[req_data[x].requirements] = fileName.pop()+ "." + req_data[x].fileExt;
                          }


                     }

                 });
                      $.ajax({
                          url: '/PublicAccessPortal/applications/get-signatory',
                          data:{
                              account_id :ACCOUNT_ID
                          },
                          type: 'GET',
                          dataType: 'text',
                          success: function(data){
                            var data = JSON.parse(data);
                             //console.log(data);
                             var sign = data.dir.split("/").pop();
                             //console.log(sign);
                            $("#previewImage").attr("src", "https://www.tlcpay.ph/solutions/GAB-TEST/REQUIREMENTS/"+sign+"."+data.fileExt);
                            if(data.accountId != ""){
                                signatureImage = true;
                            }else{
                            $("#previewImage").attr("src", "/PublicAccessPortal/assets/img/image_placeholder.jpg");
                            }

                          }

                          });
           },error: function(){
              $('#licenseUpdate').modal('hide');
               $.dialog({
                   title:'<label class="text-Warning">Failed!</label>',
                   content: "Failed to Extract Application",
                   type: 'orange'
               })
            }
        });

    });

    $(document).on('click', '#permitUpdate', function() {

        $("#medicalDiv").hide();
        $("#documentaryDiv").hide();
        $(".appended-documentary").remove();
        $(".appended-medical").remove();
        var ACCOUNT_ID = $(this).attr('data-id');
            permitIndicator = true;
           var status = $(this).attr('data-status');
             statusIndicator = status;
            // console.log(statusIndicator);
            if(statusIndicator == "view"){

             $("input").attr("readonly", "readonly");
             $(".selectpicker").attr("disabled", true);
             $("input[type=checkbox]").attr("disabled", true);

               $("#submitPermitDiv").hide();
            }else{
                $("#submitPermitDiv").show();
             $(".selectpicker").attr("disabled", false);

             }

        $.ajax({
            url: 'get-update-applications',
            type: 'GET',
            dataType: 'text',
            data: {
                ACCOUNT_ID: ACCOUNT_ID
            },
            beforeSend: function(){
               dialog =  $.dialog({
                    title: '<label class="text-success">Loading Please Wait!</label>',
                    content: '<img src="/PublicAccessPortal/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                    type:'purple',
                    closeIcon: false,
                    backgroundDismiss: false
                })
            },
            complete: function(){
                dialog.close();
            },
            success: function (data) {
                var application = JSON.parse(data);
                //console.log(application);

                   var application_type;
                    if(application.vAPPLICATION_TYPE == "1"){
                       application_type = "New License";
                    }else if(application.vAPPLICATION_TYPE == "2"){
                        application_type = "Renewal License";
                    }else if(application.vAPPLICATION_TYPE == "3"){
                        application_type = "New Permit";
                    }else if(application.vAPPLICATION_TYPE == "4"){
                         application_type = "Renewal Permit";
                     }
                $("#PERMIT_DIVISIONS").val(application.vDIVISION).change();
                PERMIT_SPORT = application.vSPORTS;
                PERMIT_TYPE = application.vAPPLICATION_TYPE;
                $("#modal-title-permit").html(application.vACCOUNTID+" (PERMIT)");
                $("#PERMIT_ACCOUNT_ID").val(application.vACCOUNTID);
                $("#LICENSE_ACCOUNT_ID").val(application.vACCOUNTID);
                $("#PERMIT_FIRST_NAME").val(application.vFIRST_NAME);
                $("#PERMIT_MIDDLE_NAME").val(application.vMIDDLE_NAME);
                $("#PERMIT_LAST_NAME").val(application.vLAST_NAME);
                $("#PERMIT_NICKNAME").val(application.vNICK_NAME);

                //console.log(application.vDIVISIONS);
                //console.log(application.vDATE_START);
                $("#PERMIT_EVENT_START").val(application.vDATE_START);
                $("#PERMIT_EVENT_END").val(application.vDATE_END);
                $("#PERMIT_EVENT").val(application.vEVENT);
                $("#PERMIT_LOCATION").val(application.vLOCATION);
                $("#PERMIT_CLUB").val(application.vCLUB).change();
                $("#AVATAR").attr("src", application.vAVATAR);
                        $('#PERMIT_DIVISIONS option[value='+application.vDIVISIONS+']').attr('selected','selected');
                if(application.vDIVISION == "HRBSD"){

                    $("#PERMIT_HOME_ADDRESS").val(application.vHOME_ADDRESS);
                    $("#PERMIT_TELEPHONE").val(application.vTELEPHONE_HOME);
                    $("#PERMIT_LOCATION").val(application.vLOCATION);
                    $("#PERMIT_CLUB").val(application.vCLUB).change();

                }else if(application.vDIVISION == "BOCSD"){
                    //console.log(application.vTV_COVERAGE);
                    $("#PERMIT_TV_COVERAGE").val(application.vTV_COVERAGE).change();
                    $("#PERMIT_TICKETS").val(application.vTICKETS).change();
                     date_event = application.vDATE_EVENT.split('/');
                     var year = date_event[0];
                     var month = date_event[1];
                     var day = date_event[2];
                     var dateEvent = month + "/" + day + "/" + year;
                    $("#PERMIT_DATE_EVENT").val(dateEvent);
                    $("#PERMIT_TIME_EVENT").val(application.vTIME_EVENT);
                    $("#PERMIT_PLACE_EVENT").val(application.vPLACE_EVENT);

                }
                 $.ajax({
                     url: 'applications/get-requirements-per-app',
                     data:{
                         account_id :ACCOUNT_ID
                     },
                     type: 'GET',
                     dataType: 'text',
                     success: function(data){
                         var req_data = JSON.parse(data);
                         //console.log(req_data);
                         //console.log('sample');

                          for(var x = 0; x < req_data.length; x++){
                            var fileName = req_data[x].dir.toString().split('/');
                                $("#"+req_data[x].requirements+"_VALUE").val(fileName.pop());
                                fileValue[req_data[x].requirements] = fileName.pop()+ "." + req_data[x].fileExt;
                          }


                     }

                 });


            }, error: function () {
                $('#permitUpdate').modal('hide');
                $.dialog({
                    title: '<label class="text-Warning">Failed!</label>',
                    content: "Failed to Extract Application",
                    type: 'orange'
                })
            }
        });
    });

    $(document).on("click", "#SAVE_APPLICATION", function(){
        $("#vSAVE_AS_DRAFT").val("YES");
        //console.log($("#vSAVE_AS_DRAFT").val());
         var obj;
                var validationForm=$('#LICENSE_APPLICATION_FORM');
                validationForm.validate();

                       $("#UPDATE_APPLICATION").prop("disabled", true);
                        $("#SAVE_APPLICATION").prop("disabled", true);

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
//                        if((parseInt(y) + parseInt(Object.keys(fileValue).length)) <= parseInt(documentReqLength) + 1){
//                            draft = false;
//                            console.log('false');
//                        }else{
//                            draft = true;
//                        }
//                        console.log(parseInt(y) + parseInt(Object.keys(fileValue).length));
//                        console.log(parseInt(documentReqLength) + 1);

                if(validationForm.valid()) {
                    var form = $("#LICENSE_APPLICATION_FORM")[0];
                    var data = new FormData(form);
                    //console.log(data);
                    $.confirm({
                        title:'<label class="text-warning">Confirm!</label>',
                        content: "Are you sure want to update this application?",
                        type: 'red',
                        buttons: {
                            confirm:{
                                btnClass: 'btn-purple',
                                action: function(){
                                    $.ajax({
                                        url : "/PublicAccessPortal/applications/add-application",
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
                                                        url: 'applications/upload-requirements-directory',
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
                                               url: 'applications/upload-requirements-directory',
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
                                              //  console.log(myFile);
                                                if($(myFile).length > 0){

                                                     var formData = new FormData();
                                                    formData.append('ACCOUNT_ID', data);
                                                    formData.append('REQUIREMENTS', 'DISPLAY_PHOTO');
                                                    formData.append('TYPE', 'DISPLAY_PHOTO');
                                                    formData.append('STATUS', 1);
                                                    formData.append("FILE", myFile);
                                                    formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: 'applications/upload-requirements-directory',
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
                                                        url: 'applications/upload-requirements-directory',
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
                                                    console.log(myFile);
                                                    var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', $(this).attr("id"));
                                                        formData.append('TYPE', 'DOCUMENTARY');
                                                        formData.append('STATUS', 1);
                                                        formData.append("FILE", myFile);
                                                        formData.append('DIR', '../../REQUIREMENTS/');

                                                    $.ajax({
                                                        url: 'applications/upload-requirements-directory',
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

                                        },
                                        error : function(jqXHR, textStatus, errorThrown) {
                                            console.log(errorThrown);
                                            $.dialog({
                                                title:'<label class="text-Warning">Failed!</label>',
                                                content: "Can't update your application!",
                                                type: 'orange'
                                            })
                                        }
                                    });
                                }
                            },cancel: function(){
                               $("#UPDATE_APPLICATION").prop("disabled", false);
                               $("#SAVE_APPLICATION").prop("disabled", false);
                         }
                        }
                    })
                }
                else{
                    $("#UPDATE_APPLICATION").prop("disabled", false);
                    $("#SAVE_APPLICATION").prop("disabled", false);
                }

    });

    $(document).on('click', '#UPDATE_APPLICATION', function(){
    $("#vSAVE_AS_DRAFT").val("NO");
        var obj;
        var validationForm=$('#LICENSE_APPLICATION_FORM');
        validationForm.validate();

        $("#UPDATE_APPLICATION").prop("disabled", true);
        $("#SAVE_APPLICATION").prop("disabled", true);

         if($("#FIRST_NAME").val().trim() == "" || $("#LAST_NAME").val().trim() == "" ||
            $("#HOME_ADDRESS").val().trim() == "" || $("#BIRTH_DATE").val().trim() == "" ||
            $("#CITIZENSHIP").val().trim() == "" || $("#GENDER").val().trim() == "" ||
            $("#DIVISIONS").val() == "" || $("#roles").val() == "" || $("#sports").val() == "" || $('#CLUB').val().trim() == ""){
                  $.alert({
                    title: '<label class="text-warning">Warning!</label>',
                    content: 'Please fill in required fields',
                    type:'red',
                        buttons: {
                            close: function() {
                                 $("#UPDATE_APPLICATION").prop("disabled", false);
                                 $("#SAVE_APPLICATION").prop("disabled", false);
                            }
                        }
               });
        }else if($("#imageValue").val() == "" && image == false ){
                  $.alert({
                    title: '<label class="text-warning">Warning!</label>',
                    content: 'Please fill in required fields',
                    type:'red',
                        buttons: {
                            close: function() {
                                 $("#UPDATE_APPLICATION").prop("disabled", false);
                                 $("#SAVE_APPLICATION").prop("disabled", false);
                            }
                        }
               });
        }
        else{
            if(signatureImage == false && canvasUrl == ""){

                $("#signatureModal").modal("show");
                    $('#signatureModal').on('hidden.bs.modal', function () {
                        //console.log('sample');

                           $("#UPDATE_APPLICATION").prop("disabled", false);
                           $("#SAVE_APPLICATION").prop("disabled", false);
                    });

            }else{

//                if($("#DIVISION").val() === "" || $("#sports").val() === "" || $("#roles").val() === ""){
//
//                            draft= true;
//
//                        }else{
//                            $('.documentaryReq').each(function(){
//                            var myFile = $(this)[0].files[0];
//                                if($(myFile).length > 0){
//                                    y += 1;
//                                }
//                            });
//
//                        }
//                            if((parseInt(y) + parseInt(Object.keys(fileValue).length)) <= parseInt(documentReqLength) + 1){
//                                draft = false;
//                                console.log('false');
//                            }else{
//                                draft = true;
//                            }
//                            console.log(parseInt(y) + parseInt(Object.keys(fileValue).length));
//                            console.log(parseInt(documentReqLength) + 1);

                    if(validationForm.valid()) {
                        var form = $("#LICENSE_APPLICATION_FORM")[0];
                        var data = new FormData(form);
//                        for (var pair of data.entries()) {
//                            console.log(pair[0]+ ', ' + pair[1]);
//                        }
                        //console.log(data);
                        $.confirm({
                            title:'<label class="text-warning">Confirm!</label>',
                            content: "I HEREBY CERTIFY that the foregoing information and data together"+
                                 "with the attached papers are true and correct. Should this application be approved,"+
                                 "I bind myself to unhold and comply with the provision of the law govering the sports"+
                                 "or games and the rules and regulation promulgated thereunder, and all resolution adopted"+
                                 "or which may hereunder be adopted by the Board",
                            type: 'red',
                            buttons: {
                                confirm:{
                                    btnClass: 'btn-purple',
                                    action: function(){
                                        $.ajax({
                                            url : "/PublicAccessPortal/applications/add-application",
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
//                                              if(draft == true){
//                                                    $.dialog({
//                                                        title:'<label class="text-success">Success!</label>',
//                                                        content: 'Successfully Saved<br>Your application Saved as Draft',
//                                                        type: 'purple',
//                                                        buttons: {
//
//                                                        },
//                                                        close: function(){
//                                                            window.location.href = '/PublicAccessPortal/applications';
//                                                        }
//                                                    })
//
//                                              }else{
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
//                                              }
                                            },
                                            success : function (data){
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
                                                            url: 'applications/upload-requirements-directory',
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
                                                   url: 'applications/upload-requirements-directory',
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
                                                  //  console.log(myFile);
                                                    if($(myFile).length > 0){

                                                         var formData = new FormData();
                                                        formData.append('ACCOUNT_ID', data);
                                                        formData.append('REQUIREMENTS', 'DISPLAY_PHOTO');
                                                        formData.append('TYPE', 'DISPLAY_PHOTO');
                                                        formData.append('STATUS', 1);
                                                        formData.append("FILE", myFile);
                                                        formData.append('DIR', '../../REQUIREMENTS/');

                                                        $.ajax({
                                                            url: 'applications/upload-requirements-directory',
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
                                                            url: 'applications/upload-requirements-directory',
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
                                                        console.log(myFile);
                                                        var formData = new FormData();
                                                            formData.append('ACCOUNT_ID', data);
                                                            formData.append('REQUIREMENTS', $(this).attr("id"));
                                                            formData.append('TYPE', 'DOCUMENTARY');
                                                            formData.append('STATUS', 1);
                                                            formData.append("FILE", myFile);
                                                            formData.append('DIR', '../../REQUIREMENTS/');

                                                        $.ajax({
                                                            url: 'applications/upload-requirements-directory',
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

                                            },
                                            error : function(jqXHR, textStatus, errorThrown) {
                                                console.log(errorThrown);
                                                $.dialog({
                                                    title:'<label class="text-Warning">Failed!</label>',
                                                    content: "Can't update your application!",
                                                    type: 'orange'
                                                })
                                            }
                                        });
                                    }
                                },cancel: function(){
                                $("#UPDATE_APPLICATION").prop("disabled", false);
                                $("#SAVE_APPLICATION").prop("disabled", false);
                             }
                            }
                        })
                    }
                    else{
                        $("#UPDATE_APPLICATION").prop("disabled", false);
                        $("#SAVE_APPLICATION").prop("disabled", false);
                    }
                }
            }

    });

    $("#DIVISIONS").change(function() {
        switch ($("#DIVISIONS").val()){
            case "PBOPG":
            case "HRBSD":
                $(".BOCSD").hide();
                $('#PROMOTION_CONTRACT').val(null);
                $('#GAB_DENIED').val(null);
                break;
            case "BOCSD":
                $(".BOCSD").show();
                break;

        }
        $(".appended-sports").remove();
        var division = $("#DIVISIONS").val();

        $("#sports").prop("disabled", false);
        $(".selectpicker[data-id='sports']").removeClass("disabled");

        $.ajax({
            url : "applications/get-games",
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
                if(sports_selected != "") {
                    //console.log(sports_selected);
                    $("#sports").val(sports_selected).change();
                    if(statusIndicator == "view"){
                        $("#sports").attr('disabled', true);
                    }
                }

                $(".selectpicker").selectpicker("refresh");
            }
        });
    });
    $("#sports").change(function() {
        $(".appended-roles").remove();
        var sport = $("#sports").val();
            //console.log(sport);
        $("#roles").prop("disabled", false);
        $(".selectpicker[data-id='roles']").removeClass("disabled");

        $("#roles").val("default");
        $("#roles").selectpicker("refresh");
        $("#roles").empty();
        $.ajax({
            url : "applications/get-game-roles",
            data : {
                code : sport
            },
            type : "GET",
            dataType : "text",
            success : function(data){
                var roles = JSON.parse(data);
                   // console.log(roles);
                $.each(roles , function(index, role) {
                    $("#roles").append("<option class='appended-sports' value='"+role.code+"' id='ROLES'>"+role.name+"</option>");
                });

                  if(roles_selected != "") {
                    $("#roles").val(roles_selected).change();
                         // console.log('role');
                        if(statusIndicator == "view"){
                            $("#roles").attr('disabled', true);
                        }
                }
                $(".selectpicker").selectpicker("refresh");
            }

        });
    });
    $(document).on('change', '#CONTRACT',function(){
        if(this.checked){
            $('#CONTRACT_DIV').show();
            $('#PROMOTION_CONTRACT').val("YES")

        }else{
            $('#CONTRACT_DIV').hide();
            $('#PROMOTION_CONTRACT').val("NO")


        }
    });
    $(document).on('change', '#DENIED', function(){
        if(this.checked){
            $('#GAB_DENIED').val("YES");

        }else{
            $('#GAB_DENIED').val("NO");

        }
    });
    $("#PERMIT_DIVISIONS").change(function() {
        switch($("#PERMIT_DIVISIONS").val()){
            case "PBOPG":

                $(".BOCSD").hide();
                $(".HRBSD").hide();
                $(".PBOPG").show();
                $(".appended-hrbsd").remove();
                $("#PERMIT_CLUB").append('<option class="appended-pbopg" value="Team 1">Team 1</option>');
                $("#PERMIT_CLUB").append('<option class="appended-pbopg" value="Team 2">Team 2</option>');
                $("#PERMIT_CLUB").append('<option class="appended-pbopg" value="Team 3">Team 3</option>');
                $(".selectpicker").selectpicker("refresh");

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
                $("#PERMIT_CLUB").append('<option class="appended-hrbsd" value="PRCI">PRCI</option>');
                $("#PERMIT_CLUB").append('<option class="appended-hrbsd" value="MJCI">MJCI</option>');
                $("#PERMIT_CLUB").append('<option class="appended-hrbsd" value="MMTCI">MMTCI</option>');
                $(".selectpicker").selectpicker("refresh");
                // console.log($("#CLUB").val());
                break;
        }
    });

    $("#PERMIT_DIVISIONS").change(function() {
        $(".appended-application_type").remove();
        $(".appended-sports").remove();
        var division = $("#PERMIT_DIVISIONS").val();

        $("#PERMIT_SPORTS").prop("disabled", false);
        $("#PERMIT_TYPE").prop("disabled", false);
        $(".selectpicker[data-id='sports']").removeClass("disabled");

        $.ajax({
            url : "applications/get-games",
            data : {
                classification : division
            },
            type : "GET",
            dataType : "text",
            success : function(data){
                var games = JSON.parse(data);
                $.each(games , function(index, game) {
                    $("#PERMIT_SPORTS").append("<option class='appended-sports' value='"+game.code+"'>"+game.name+"</option>");

                });
                if(PERMIT_SPORT != "") {
                    $("#PERMIT_SPORTS").val(PERMIT_SPORT).change();
                        if(statusIndicator == "view"){
                            $("#PERMIT_SPORTS").attr('disabled', true);
                        }
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
                        $("#PERMIT_TYPE").append("<option class='appended-application_type' value='"+application_type.id+"'>"+application_type.name+"</option>");

                    });
                        if(PERMIT_TYPE != "") {
                            $("#PERMIT_TYPE").val(PERMIT_TYPE).change();
                                if(statusIndicator == "view"){
                                    $("#PERMIT_TYPE").attr('disabled', true);
                                }
                        }
                    $(".selectpicker").selectpicker("refresh");
                }
            });
    });

    $(document).on("click", "#SAVE_PERMIT_APPLICATION", function(){
        $("#vSAVE_AS_DRAFT_PERMIT").val("YES");
           //console.log($("#vSAVE_AS_DRAFT_PERMIT").val());
         var obj;
                var validationForm=$('#PERMIT_APPLICATION_FORM');
                validationForm.validate();

                $("#SAVE_PERMIT_APPLICATION").prop("disabled", true);
                $("#UPDATE_PERMIT_APPLICATION").prop("disabled", true);

                if(validationForm.valid()) {
                    var form = $("#PERMIT_APPLICATION_FORM")[0];
                    var data = new FormData(form);
                    //console.log(data);
                    $.confirm({
                        title:'<label class="text-warning">Confirm!</label>',
                        content: "Are you sure want to update this application?",
                        type: 'red',
                        buttons: {
                            confirm:{
                                btnClass: 'btn-purple',
                                action: function(){
                                    $.ajax({
                                        url : "/PublicAccessPortal/applications/add-application",
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
                                                    content: 'Successfully Updated',
                                                    type: 'purple',
                                                    buttons: {

                                                    },
                                                    close: function(){
                                                        location.reload();
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
                                                        url: 'applications/upload-requirements-directory',
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
                                                            url: 'applications/upload-requirements-directory',
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
                                                        url: 'applications/upload-requirements-directory',
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
                                                $('.documentaryReq').each(function(){
                                                    var myFile = $(this)[0].files[0];

                                                    if($(myFile).length == 0){
                                                        console.log('Empty Field');

                                                    }else{
                                                        console.log(myFile);
                                                        var formData = new FormData();
                                                            formData.append('ACCOUNT_ID', data);
                                                            formData.append('REQUIREMENTS', $(this).attr("id"));
                                                            formData.append('TYPE', 'DOCUMENTARY');
                                                            formData.append('STATUS', 1);
                                                            formData.append("FILE", myFile);
                                                            formData.append('DIR', '../../REQUIREMENTS/');

                                                        $.ajax({
                                                            url: 'applications/upload-requirements-directory',
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
                                        },
                                        error : function(jqXHR, textStatus, errorThrown) {
                                            console.log(errorThrown);
                                            $.dialog({
                                                title:'<label class="text-Warning">Failed!</label>',
                                                content: "Can't update your application!",
                                                type: 'orange'
                                            })
                                        }
                                    });
                                }
                            },cancel: function(){
                                $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                                $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                            }
                        }
                    })
                }
                else{
                    $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                    $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                }
    });

    $(document).on('click', '#UPDATE_PERMIT_APPLICATION', function(){
    $("#vSAVE_AS_DRAFT_PERMIT").val("NO");
   // console.log($("#vSAVE_AS_DRAFT_PERMIT").val());
        var obj;
        var validationForm=$('#PERMIT_APPLICATION_FORM');
        validationForm.validate();
           //console.log($("#PERMIT_DIVISIONS").val());
        $("#UPDATE_PERMIT_APPLICATION").prop("disabled", true);
        $("#SAVE_PERMIT_APPLICATION").prop("disabled", true);

           if($("#PERMIT_DIVISIONS").val() == "PBOPG" || $("#PERMIT_DIVISIONS").val() == ""){
                    if($("#sports").val() == ""){

                      $(".select_sports").each(function(i){
                      var label = $(this).first().siblings('.label-control').text();
       //                        $(this).siblings('.label-control').text(label +' is required');
                                $(this).siblings('.label-control').css('color','red');

                          });
                     }
                   if($("#PERMIT_TYPE").val() == ""){
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
                if($("#PERMIT_LAST_NAME").val().trim() == "" || $("#PERMIT_FIRST_NAME").val().trim()  == "" ||
                $("#EVENT_START").val() == "" || $("#EVENT_END").val() == "" || $("#PERMIT_EVENT").val() == "" ||
                $("#PERMIT_LOCATION").val().trim()  == ""){
                console.log('')
                    $.alert({
                            title: '<label class="text-warning">Warning!</label>',
                            content: 'Please fill in required fields',
                            type:'red',
                                buttons: {
                                    close: function() {
                                         $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                                         $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                                    }
                                }
                       });
                }else{
                        if(validationForm.valid()) {
                            var form = $("#PERMIT_APPLICATION_FORM")[0];
                            var data = new FormData(form);
                            //console.log(data);
                            $.confirm({
                                title:'<label class="text-warning">Confirm!</label>',
                                content: "Are you sure want to update this application?",
                                type: 'red',
                                buttons: {
                                    confirm:{
                                        btnClass: 'btn-purple',
                                        action: function(){
                                            $.ajax({
                                                url : "/PublicAccessPortal/applications/add-application",
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
                                                            content: 'Successfully Updated',
                                                            type: 'purple',
                                                            buttons: {

                                                            },
                                                            close: function(){
                                                                location.reload();
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
                                                                url: 'applications/upload-requirements-directory',
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
                                                                    url: 'applications/upload-requirements-directory',
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
                                                                url: 'applications/upload-requirements-directory',
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
                                                        content: "Can't update your application!",
                                                        type: 'orange'
                                                    })
                                                }
                                            });
                                        }
                                    },cancel: function(){
                                         $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                                         $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                                    }
                                }
                            })
                        }
                        else{
                                         $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                                         $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                        }
                }
            }else if($("#PERMIT_DIVISIONS").val() == "BOCSD"){
                    if($("#sports").val() == ""){

                      $(".select_sports").each(function(i){
                      var label = $(this).first().siblings('.label-control').text();
       //                        $(this).siblings('.label-control').text(label +' is required');
                                $(this).siblings('.label-control').css('color','red');

                          });
                     }
                   if($("#PERMIT_TYPE").val() == ""){
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
                if($("#PERMIT_LAST_NAME").val().trim()  == "" || $("#PERMIT_FIRST_NAME").val().trim()  == ""){
                   $.alert({
                           title: '<label class="text-warning">Warning!</label>',
                           content: 'Please fill in required fields',
                           type:'red',
                               buttons: {
                                   close: function() {
                                         $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                                         $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                                   }
                               }
                      });
                }else{
                        if(validationForm.valid()) {
                            var form = $("#PERMIT_APPLICATION_FORM")[0];
                            var data = new FormData(form);
                            //console.log(data);
                            $.confirm({
                                title:'<label class="text-warning">Confirm!</label>',
                                content: "Are you sure want to update this application?",
                                type: 'red',
                                buttons: {
                                    confirm:{
                                        btnClass: 'btn-purple',
                                        action: function(){
                                            $.ajax({
                                                url : "/PublicAccessPortal/applications/add-application",
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
                                                            content: 'Successfully Updated',
                                                            type: 'purple',
                                                            buttons: {

                                                            },
                                                            close: function(){
                                                                location.reload();
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
                                                                url: 'applications/upload-requirements-directory',
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
                                                                    url: 'applications/upload-requirements-directory',
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
                                                                url: 'applications/upload-requirements-directory',
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
                                                        content: "Can't update your application!",
                                                        type: 'orange'
                                                    })
                                                }
                                            });
                                        }
                                    },cancel: function(){
                                            $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                                            $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                                    }
                                }
                            })
                        }
                        else{
                                         $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                                         $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                        }
                }
            }else if($("#PERMIT_DIVISIONS").val() == "HRBSD"){
            if($("#sports").val() == ""){

              $(".select_sports").each(function(i){
              var label = $(this).first().siblings('.label-control').text();
//                        $(this).siblings('.label-control').text(label +' is required');
                        $(this).siblings('.label-control').css('color','red');

                  });
             }
           if($("#PERMIT_TYPE").val() == ""){
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
                if($("#PERMIT_LAST_NAME").val().trim()  == "" || $("#PERMIT_FIRST_NAME").val().trim()  == "" || $("#PERMIT_LOCATION").val().trim()  == ""){
                      $.alert({
                               title: '<label class="text-warning">Warning!</label>',
                               content: 'Please fill in required fields',
                               type:'red',
                                   buttons: {
                                       close: function() {
                                         $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                                         $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                                       }
                                   }
                          });
                }else{
                        if(validationForm.valid()) {
                            var form = $("#PERMIT_APPLICATION_FORM")[0];
                            var data = new FormData(form);
                            //console.log(data);
                            $.confirm({
                                title:'<label class="text-warning">Confirm!</label>',
                                content: "Are you sure want to update this application?",
                                type: 'red',
                                buttons: {
                                    confirm:{
                                        btnClass: 'btn-purple',
                                        action: function(){
                                            $.ajax({
                                                url : "/PublicAccessPortal/applications/add-application",
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
                                                            content: 'Successfully Updated',
                                                            type: 'purple',
                                                            buttons: {

                                                            },
                                                            close: function(){
                                                                location.reload();
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
                                                                url: 'applications/upload-requirements-directory',
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
                                                                    url: 'applications/upload-requirements-directory',
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
                                                                url: 'applications/upload-requirements-directory',
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
                                                        content: "Can't update your application!",
                                                        type: 'orange'
                                                    })
                                                }
                                            });
                                        }
                                    },cancel: function(){
                                         $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                                         $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                                    }
                                }
                            })
                        }
                        else{
                               $("#UPDATE_PERMIT_APPLICATION").prop("disabled", false);
                               $("#SAVE_PERMIT_APPLICATION").prop("disabled", false);
                        }
                }
            }else{

        if(validationForm.valid()) {
            var form = $("#PERMIT_APPLICATION_FORM")[0];
            var data = new FormData(form);
            //console.log(data);
            $.confirm({
                title:'<label class="text-warning">Confirm!</label>',
                content: "Are you sure want to update this application?",
                type: 'red',
                buttons: {
                    confirm:{
                        btnClass: 'btn-purple',
                        action: function(){
                            $.ajax({
                                url : "/PublicAccessPortal/applications/add-application",
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
                                            content: 'Successfully Updated',
                                            type: 'purple',
                                            buttons: {

                                            },
                                            close: function(){
                                                location.reload();
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
                                                url: 'applications/upload-requirements-directory',
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
                                                    url: 'applications/upload-requirements-directory',
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
                                                url: 'applications/upload-requirements-directory',
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
                                        content: "Can't update your application!",
                                        type: 'orange'
                                    })
                                }
                            });
                        }
                    },cancel: function(){
                       $("#UPDATE_APPLICATION").prop("disabled", false);
                       $("#SAVE_APPLICATION").prop("disabled", false);
                    }
                }
            })
        }
        else{
             $("#UPDATE_APPLICATION").prop("disabled", false);
             $("#SAVE_APPLICATION").prop("disabled", false);
        }
       }
    });

        $(document).on("change", "#roles", function(){
            $("#medicalDiv").hide();
            $("#documentaryDiv").hide();
            $(".appended-documentary").remove();
            $(".appended-medical").remove();
            var role = $("#roles").val();
            //console.log(role);
                    $.ajax({
                        url: "applications/get-medical-requirements",
                        data:{
                            role: role
                        },
                        type : "GET",
                        dataType : "text",
                        success: function(data){
                         var medRequirements = JSON.parse(data);
                       //  console.log(medRequirements);

                         if(medRequirements.length > 0){
                          $("#medicalDiv").show();
                         }
                         $.each(medRequirements , function(index, app) {
                          // console.log(app.code);
                                medicalReqLength += 1;
                            $("#medical-requirements").append(
                            "<div class='col-md-12 appended-medical'>"+
                            "<strong>'"+app.description+"'</strong>"+
                            "<div class='form-group form-file-upload'>"+
                            "<input type='file' id='"+app.code+"' class='medicalReq' accept='image/png, image/jpeg, image/jpg'>"+
                            "<a data-toggle='modal' class='viewMedical' id='viewMedical"+app.code+"' data-code='"+app.code+"' style='position:absolute;right:0;z-index:999;display:none;'>view</a>"+
                            "<div class='input-group'>"+
                            "<input type='text' id='text"+app.code+"' readonly='' class='form-control file' placeholder='Attachment'>"+
                            "</div>"+
                            "</div>"
                            );
                         });

                        }
                    });

            $.ajax({
                url: "applications/get-documentary-requirements",
                data:{
                    role: role
                },
                type : "GET",
                dataType : "text",
                success: function(data){
                 var docRequirements = JSON.parse(data);
                 ///console.log(docRequirements);
                 var number = 0;
                 if(docRequirements.length > 0){
                  $("#documentaryDiv").show();
                 }
                 $.each(docRequirements , function(index, app) {
                   //console.log(app.code);
                   documentReqLength += 1;
                   number += 1;
                   fileTest = app.code;
                    $("#documentary-requirements").append(
                    "<div class='col-md-12 appended-documentary'>"+
                    "<label class='form-label'>'"+app.description+"'</label>"+
                    "<div class='form-group form-file-upload'>"+
                    "<input type='file' id='"+app.code+"' class='documentaryReq' accept='image/png, image/jpeg, image/jpg'/>"+
                    "<a data-toggle='modal' class='viewDocument' id='viewDocument"+app.code+"' data-code='"+app.code+"' style='position:absolute;right:0;z-index:999;display:none;'>view</a>"+
                    "<div class='input-group'>"+
                    "<input type='text' id='text"+app.code+"' readonly='' class='form-control file' placeholder='Attachment'>"+
                    "</div>"+
                    "</div>"+
                    "</div>"
                    );
                 });

                    //console.log(statusIndicator);

                    if(statusIndicator == "view"){
                         var fileCode = Object.keys(fileValue)

                           if(fileCode.length > 0){
                            for(var x = 0 ; x < fileCode.length ; x++){
                              var code = fileCode[x];
                               $("#text"+fileCode[x]).val(fileValue[code]);
                            }

                        }
                        var dirCode = Object.keys(dir)
                        for(var z = 0; z < dirCode.length; z++){
                            var code = dirCode[z]

                            $("#viewDocument"+dirCode[z]).attr('data-url', "//"+dir[code]);
                            //console.log(dir[code]);
                            $("#viewDocument"+dirCode[z]).show();
                            $("#viewMedical"+dirCode[z]).attr('data-url', "//"+dir[code]);
                            //console.log(dir[code]);
                            $("#viewMedical"+dirCode[z]).show();
                        }
                             //console.log("sample");
                             $("input[type=file]").attr("disabled", true);
                       }else if(statusIndicator == "update"){
                         var fileCode = Object.keys(fileValue)

                           if(fileCode.length > 0){

                            for(var x = 0 ; x < fileCode.length ; x++){

                              var code = fileCode[x];
                                if(permitIndicator == true){
                                   $("#"+fileCode[x]).val(fileValue[code]);
                                }else{
                                     $("#text"+fileCode[x]).val(fileValue[code]);
                                }
                            }
                        }
                            var dirCode = Object.keys(dir)
                            for(var z = 0; z < dirCode.length; z++){
                                var code = dirCode[z]
                                //console.log(dir[code]);
                                $("#viewDocument"+dirCode[z]).attr('data-url', "//"+dir[code]);
                                //console.log(dir[code]);
                                $("#viewDocument"+dirCode[z]).show();
                               $("#viewMedical"+dirCode[z]).attr('data-url', "//"+dir[code]);
                                //console.log(dir[code]);
                                $("#viewMedical"+dirCode[z]).show();
                            }
                    }else{
                    }
                }
            });

        });

          // draw signature
            $(document).on("click", "#uploadButton", function(){
                draw = 0;
                signatureImage = true;
                $("#drawSignature").hide();
                $("#uploadSignature").show();
                $("#drawButton").show();
                $("#uploadButton").hide();
                $("#sig-clearBtn").hide();
            });
            $(document).on("click", "#drawButton", function(){
                 draw = 1;
                 signatureImage = false;
                $("#drawSignature").show();
                $("#uploadSignature").hide();
                $("#sig-clearBtn").show();
                $("#drawButton").hide();
                $("#uploadButton").show();
            });

            (function() {
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
                sigText.innerHTML = "Data URL for your signature will go here!";
                sigImage.setAttribute("src", "");
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
                        $("#previewImage").attr("src", canUrl);
                    });

            })();

        $('#signatureModal').on('show.bs.modal', function () {
            $('.modal').css('overflow-y', 'auto');
        });

            $(document).on("click", ".viewDocument",function(){
                var code = $(this).data('code');
                $("#documentPreview").attr('src', dir[code]);
                $('#imageDocument').modal('show');
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
//    for(var p = 0; p < fileTest.length; p++){
//    console.log(fileTest[p]);
//    }
        $(document).on("change", ".documentaryReq", function(){
            var size = $(this)[0].files[0].size;
               console.log(size);
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
    $('#updateLicenseModal').on('hidden.bs.modal', function () {
        console.log('sample');
        $(".selectpicker").prop("disabled", false);
        $(".selectpicker").selectpicker("refresh");
    });
       $(document).on("click", "#uploadButton", function(){
                draw = 0;
                signatureImage = true;
                $("#vdrawSignature").hide();
                $("#vuploadSignature").show();
                $("#vdrawButton").show();
                $("#uploadButton").hide();
                $("#vsig-clearBtn").hide();
            });
            $(document).on("click", "#vdrawButton", function(){
                 draw = 1;
                  signatureImage = false;
                $("#vdrawSignature").show();
                $("#vuploadSignature").hide();
                $("#vsig-clearBtn").show();
                $("#vdrawButton").hide();
                $("#uploadButton").show();
            });
            (function() {
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

              var canvas = document.getElementById("vsig-canvas");
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
              var clearBtn = document.getElementById("vsig-clearBtn");
              var submitBtn = document.getElementById("vsig-submitBtn");
              clearBtn.addEventListener("click", function(e) {
                clearCanvas();
                sigText.innerHTML = "Data URL for your signature will go here!";
                sigImage.setAttribute("src", "");
              }, false);

              $('#vsignatureModal').on('hidden.bs.modal', function () {
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
                signatureChange = true;
                }
                var signature = $("#vsignature").prop('files');
                //console.log(signature.length);
                if(signature.length > 0){
                    signatureImage = true;
                    signatureChange = true;
                }
              });
//                    $(document).on("click", "#uploadButton", function(){
//                      canUrl = canvas.toDataURL();
//                        $("#previewImage").attr("src", canUrl);
//                    });

       })();

           $("#vREASONS_FOR_ID_REPRINT").change(function(){
               if($("#vREASONS_FOR_ID_REPRINT").val() == "ID loss"){
                    $("input").attr("readonly", true);
                    $("#civilstatus").attr("disabled", true);
                    $("#gender").attr("disabled", true);
                      $("#vLICENSE_NUMBER").attr("readonly", true);
                      $("#ROLE_NAME").attr("readonly", true);

               }else{
                    $("input").attr("readonly", false)
                    $("#civilstatus").removeAttr("disabled");
                    $("#gender").removeAttr("disabled");
                    $(".selectpicker").selectpicker("refresh");
                      $("#vLICENSE_NUMBER").attr("readonly", true);
                      $("#ROLE_NAME").attr("readonly", true);

               }
           });
                   $(document).on("change","#gender", function(){
                       $("#vGENDER").val($("#gender").val());
                       console.log($("#vGENDER").val());
                   });
                   $(document).on("change","#civilstatus", function(){
                       $("#vCIVILSTATUS").val($("#civilstatus").val());
                       console.log($("#vCIVILSTATUS").val());
                   });
             $("#signature").change(function(){
                   var signature = $("#signature").prop('files');
                   console.log(signature.length);
                   if(signature.length > 0){
                       signatureImage = true;
                   }else{
                       signatureImage = false;
                   }
             });
                   $("#vsignature").change(function(){
                         var signature = $("#signature").prop('files');
                         console.log(signature.length);
                         if(signature.length > 0){
                             signatureImage = true;
                         }else{
                             signatureImage = false;
                         }
                   });
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