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

    function newLicense() {
      $("#licenseForm").show();
      $("#permitForm").hide();
      $("#licenseButton").show();
      $("#permitButton").hide();

    }

    function newPermit() {
      $("#licenseForm").hide();
      $("#permitForm").show();
      $("#permitButton").show();
      $("#licenseButton").hide();

    }

    $(document).on("click", "#LICENSE_APPLICATION", function(){
     $("#LICENSE_APPLICATION").prop("disabled", true);

      if($("#vFIRST_NAME").val().trim() == "" || $("#vLAST_NAME").val().trim() == "" ||
        $("#vHOME_ADDRESS").val().trim() == "" || $("#vBIRTH_DATE").val().trim() == "" ||
        $("#vCITIZENSHIP").val().trim() == "" || $("#vGENDER").val().trim() == "" ||
        $("#LICENSE_DIVISIONS").val() == "" || $("#license_sports").val() == "" || $("#license_roles").val() == "" ||
        $("#image").val() == "" || $('#vCLUB').val().trim() == ""){

            $(".licenseRequire").each(function(i){
                   if($(this).val().trim() == ""){
                       var label = $(this).first().siblings('.label-control').text();
                      //$('#CLUB').siblings('.label-control').text(label+' is required');
                      $(this).siblings('.label-control').css('color','red');
                      $(this).css('background-image','linear-gradient(red,red),linear-gradient(red,red)');
                   }
            });

                        if($("#APPLICATION_TYPE").val() == ""){
                         $(".APPLICATION_TYPE_SELECT").each(function(i){
                        var label = $(this).first().siblings('.label-control').text();
                  //                         $(this).siblings('.label-control').text(label +' is required');
                          $(this).siblings('.label-control').css('color','red');
                         });
                         }
                 if($("#vGENDER").val() == ""){
                  $(".vGENDER").each(function(i){
                 var label = $(this).first().siblings('.label-control').text();
           //                         $(this).siblings('.label-control').text(label +' is required');
                   $(this).siblings('.label-control').css('color','red');
                  });
                  }
              if($("#LICENSE_DIVISIONS").val() == ""){
               $(".LICENSE_DIVISIONS").each(function(i){
              var label = $(this).first().siblings('.label-control').text();
        //                         $(this).siblings('.label-control').text(label +' is required');
                        $(this).siblings('.label-control').css('color','red');
               });
               }
            if($("#license_sports").val() == ""){
             $(".license_sports").each(function(i){
            var label = $(this).first().siblings('.label-control').text();
      //                         $(this).siblings('.label-control').text(label +' is required');
                      $(this).siblings('.label-control').css('color','red');
             });
             }
                  if($("#license_roles").val() == ""){
                   $(".license_roles").each(function(i){
                  var label = $(this).first().siblings('.label-control').text();
            //                         $(this).siblings('.label-control').text(label +' is required');
                            $(this).siblings('.label-control').css('color','red');
                   });
                   }
                       setTimeout(function(){
                       $("#LICENSE_APPLICATION").prop("disabled", false);
                       }, 2000);

        }else{

            if(signatureImage == false && canvasUrl == ""){

                    $("#signatureModal").modal("show");
                        $('#signatureModal').on('hidden.bs.modal', function () {
                            //console.log('sample');

                               $("#LICENSE_APPLICATION").prop("disabled", false);
                        });

                }else{

                     webUserSubmit();
                }

        }
    });

      function webUserSubmit(){
      var webUserForm = new FormData();

        $("input[type=text]").each(function(i){

            if($(this).val() != ""){
            var inputName = $(this).attr("name");
            webUserForm.append(inputName, $(this).val());
            }

        });
         $("#image").each(function(){
             var myFile = $(this)[0].files[0];
             if($(myFile).length > 0){
                webUserForm.append("image", myFile);
             }
         });
        // webUserForm.append("vUSERNAME", $("#EMAIL").val());
        var validationForm=$('#APPLICATION_FORM');
        validationForm.validate();

         if(validationForm.valid()){
                var form = $("#APPLICATION_FORM")[0];
                var data = new FormData(form);

                data.append('stateOffense', $("#STATE_OFFENSE").val());

                $.confirm({
                    title:'<label class="text-warning">Confirm!</label>',
                    content: "Are you sure want to add this data?",
                    type: 'red',
                    buttons: {
                        confirm: {
                            btnClass: 'btn-purple',
                            action: function () {
//                                $.ajax({
//                                    url : "/PublicAccessPortal/walk-in/add-web-user",
//                                    enctype: 'multipart/form-data',
//                                    data : data,
//                                    cache: false,
//                                    contentType: false,
//                                    processData: false,
//                                    type: 'POST',
//                                    timeout:1000000,
//                                    success : function (data){
//
//                                    },
//                                    error : function(jqXHR, textStatus, errorThrown) {
//                                        console.log(errorThrown);
//                                    }
//                                });
//                                var licenseForm = new FormData(form);
//                                  licenseForm.append('vDIVISION', $("#LICENSE_DIVISIONS").val());
//                                  licenseForm.append('vSPORTS', $("#license_sports").val());
//                                  licenseForm.append('vROLES', $("#license_roles").val());
//
//                                licenseForm.append('vLAST_NAME', $("#vLAST_NAME").val());
//                                licenseForm.append('vFIRST_NAME', $("#vFIRST_NAME").val());
//                                licenseForm.append('vMIDDLE_NAME', $("#vMIDDLE_NAME").val());
//                                licenseForm.append('vNICK_NAME', $("#vNICK_NAME").val());
//                                licenseForm.append('vHOME_ADDRESS', $("#vHOME_ADDRESS").val());
//                                licenseForm.append('vHOME_CONTACT', $("#vHOME_CONTACT").val());
//                                licenseForm.append('vOFFICE_ADDRESS', $("#vOFFICE_ADDRESS").val());
//                                licenseForm.append('vOFFICE_CONTACT', $("#vOFFICE_CONTACT").val());
//                                licenseForm.append('vBIRTH_DATE', $("#vBIRTH_DATE").val());
//                                licenseForm.append('vPLACE_OF_BIRTH', $("#vPLACE_OF_BIRTH").val());
//                                licenseForm.append('vAGE', $("#vAGE").val());
//                                licenseForm.append('vGENDER', $("#vGENDER").val());
//                                licenseForm.append('vCITIZENSHIP', $("#vCITIZENSHIP").val());
//                                licenseForm.append('vCIVILSTATUS', $("#vCIVILSTATUS").val());
//                                licenseForm.append('vHEIGHT', $("#vHEIGHT").val());
//                                licenseForm.append('vWEIGHT', $("#vWEIGHT").val());
//                                    licenseForm.append('vCLUB', $("#vCLUB").val());
//                                    licenseForm.append('vAPPLICATION_TYPE', "L");
//                                  var applicationData = {
//                                       vAPPLICATION_TYPE: "L",
//                                       vSAVE_AS_DRAFT: "NO",
//                                       vDIVISION:$("#LICENSE_DIVISIONS").val(),
//                                       vSPORTS:$("#license_roles").val(),
//                                       vROLES:$("#license_roles").val(),
//                                       vLAST_NAME:$("#vLAST_NAME").val(),
//                                       vFIRST_NAME:$("#vFIRST_NAME").val(),
//                                       vMIDDLE_NAME:$("#vMIDDLE_NAME").val(),
//                                       vNICK_NAME:$("#vNICK_NAME").val(),
//                                       vHOME_ADDRESS:$("#vHOME_ADDRESS").val(),
//                                       vHOME_CONTACT:$("#vHOME_CONTACT").val(),
//                                       vOFFICE_ADDRESS:$("#vOFFICE_ADDRESS").val(),
//                                       vOFFICE_CONTACT:$("#vOFFICE_CONTACT").val(),
//                                       vBIRTH_DATE:$("#vBIRTH_DATE").val(),
//                                       vPLACE_OF_BIRTH:$("#vPLACE_OF_BIRTH").val(),
//                                       vAGE:$("#vAGE").val(),
//                                       vGENDER:$("#vGENDER").val(),
//                                       vCITIZENSHIP:$("#vCITIZENSHIP").val(),
//                                       vCIVILSTATUS:$("#vCIVILSTATUS").val(),
//                                       vHEIGHT:$("#vHEIGHT").val(),
//                                       vWEIGHT:$("#vWEIGHT").val(),
//                                       vCLUB:$("#vCLUB").val(),
//                                       vEDUCATION_BACKGROUND:$("#vEDUCATION_BACKGROUND").val(),
//                                       vGAB_DENIED:$("#vGAB_DENIED").val(),
//                                       vSTATE_OFFENSE:$("#vSTATE_OFFENSE").val(),
//                                       vUSERNAME:$("#EMAIL").val()
//                                  };
                                  var applicationData = {
                                    vSPORTS : $("#license_sports").val(),
                                    vROLES : $("#license_roles").val(),
                                    vLICENSE_NUMBER : "",
                                    vFIRST_NAME : $("#vFIRST_NAME").val(),
                                    vMIDDLE_NAME : $("#vMIDDLE_NAME").val(),
                                    vLAST_NAME : $("#vLAST_NAME").val(),
                                    vNICK_NAME : $("#vNICK_NAME").val(),
                                    vHOME_ADDRESS : $("#vHOME_ADDRESS").val(),
                                    vTELEPHONE_HOME : $("#vHOME_CONTACT").val(),
                                    vOFFICE_ADDRESS : $("#vOFFICE_ADDRESS").val(),
                                    vTELEPHONE_OFFICE : $("#vOFFICE_CONTACT").val(),
                                    vBIRTH_PLACE : $("#vPLACE_OF_BIRTH").val(),
                                    vBIRTH_DATE : $("#vBIRTH_DATE").val(),
                                    vAGE : $("#vAGE").val(),
                                    vGENDER : $("#vGENDER").val(),
                                    vHEIGHT : $("#vHEIGHT").val(),
                                    vWEIGHT : $("#vWEIGHT").val(),
                                    vCITIZENSHIP : $("#vCITIZENSHIP").val(),
                                    vCIVILSTATUS : $("#vCIVILSTATUS").val(),
                                    vCLUB : $("#vCLUB").val(),
                                    vACCUSED_CRIME : $("#vEDUCATION_BACKGROUND").val(),
                                    vSTATE_OFFENSE : $("#vSTATE_OFFENSE").val(),
                                    vSSS : "",
                                    vRING_NAME : "",
                                    vHAIR_COLOR : "",
                                    vEYE_COLOR : "",
                                    vPARENTS_FIRST_NAME : "",
                                    vPARENTS_MIDDLE_NAME : "",
                                    vPARENTS_LAST_NAME : "",
                                    vPARENTS_NICK_NAME : "",
                                    vMANAGER_FIRST_NAME : "",
                                    vMANAGER_MIDDLE_NAME : "",
                                    vMANAGER_LAST_NAME : "",
                                    vMANAGER_NICK_NAME : "",
                                    vEDUCATION_BACKGROUND : "",
                                    vPROMOTION_CONTRACT : "",
                                    vGAB_DENIED : $("#vGAB_DENIED").val(),
                                    vFIGHT_RECORD : "",
                                    vAMATEUR_RECORD : "",
                                    vROUNDER : "",
                                    vTRAINING : "",
                                    vPROFESSIONAL_PERIOD : "",
                                    vAPPLICANT_DATE : null,
                                    vLOCATION : "",
                                    vDATE_EVENT : null,
                                    vPROCLAMATION : "",
                                    vBENIFICIARY : "",
                                    vREQUEST : "",
                                    vFOREIGN_PARTICIPANTS : "",
                                    vPROMOTER : "",
                                    vBOUTS : "",
                                    vTV_COVERAGE : "",
                                    vTICKETS : "",
                                    vDATE_WEIGHT_IN : null,
                                    vTIME_WEIGHTIN : "",
                                    vPLACE_WEIGHT_IN : "",
                                    vWEIGHT_SCALE : "",
                                    vTIME_EVENT : "",
                                    vPLACE_EVENT : "",
                                    vTELEPHONE_EVENT : "",
                                    vAMBULANCE : "",
                                    vHOSPITAL_NEARBY : "",
                                    vDATE_START : null,
                                    vDATE_END : null,
                                    vEVENT : "",
                                    vPERMIT_NUMBER : "",
                                    vAPPLICATION_FOR : "",
                                    vGYM : "",
                                    vDATE_APPLIED : null,
                                    vDATE_FIGHT : null,
                                    vPASSPORT_FIRST_NAME : "",
                                    vPASSPORT_MIDDLE_NAME : "",
                                    vPASSPORT_LAST_NAME : "",
                                    vOPPONENT_FIRST_NAME : "",
                                    vOPPONENT_MIDDLE_NAME : "",
                                    vOPPONENT_LAST_NAME : "",
                                    vOPPONENT_NICK_NAME : "",
                                    vTITLE_WEIGHT : "",
                                    vROUNDS : "",
                                    vSAVE_AS_DRAFT: "NO",
                                    vDATE_CONTEST : null,
                                    vFIGHT_RECORDS : "",
                                    vCONTEST_PLACE : "",
                                    vAPPLICATION_TYPE : "L",
                                    vSTATUS : "",
                                    vOFFICE : "",
                                    vCREATED_BY : "",
                                    vSUFFIX : "",
                                    vACCOUNTID : null,
                                    vDIVISION : $("#LICENSE_DIVISIONS").val(),
                                    vAVATAR : "NO",
                                    vID_FOR : "",
                                    vREASONS_FOR_ID_REPRINT : "",
                                    vTYPE_CODE : "",
                                    vUSERNAME : $("#EMAIL").val()
                                  };
                                  $.ajax({
                                      url : "/PublicAccessPortal/walk-in/add-walk-in-application",
                                      data : JSON.stringify(applicationData),
                                        type: "POST",
                                    dataType: "json",
                                    contentType : 'application/json; charset=utf-8',

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
                                                      window.location.href = '/PublicAccessPortal/walk-in-form';
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

                        }
                    }
                })
            }
            else{
                 $("#SUBMIT_APPLICATION").prop("disabled", false);

            }

    }
        $(document).on("change", "#license_roles", function(){
            $("#medicalDiv").hide();
            $("#documentaryDiv").hide();
            $(".appended-documentary").remove();
            $(".appended-medical").remove();
            var role = $("#license_roles").val();
           // console.log(role);
                    $.ajax({
                        url: "/PublicAccessPortal/applications/get-medical-requirements",
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
                url: "/PublicAccessPortal/applications/get-documentary-requirements",
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

    $("#LICENSE_DIVISIONS").change(function() {
        switch ($("#LICENSE_DIVISIONS").val()){
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
        var division = $("#LICENSE_DIVISIONS").val();

        $("#license_sports").prop("disabled", false);
        $(".selectpicker[data-id='sports']").removeClass("disabled");

        $.ajax({
            url : "/PublicAccessPortal/applications/get-games",
            data : {
                classification : division
            },
            type : "GET",
            dataType : "text",
            success : function(data){
                var games = JSON.parse(data);
                $.each(games , function(index, game) {
                    $("#license_sports").append("<option class='appended-sports' value='"+game.code+"' id='SPORTS'>"+game.name+"</option>");

                });
                $(".selectpicker").selectpicker("refresh");
            }
        });
    });

    $("#license_sports").change(function() {
        $(".appended-roles").remove();
        var sport = $("#license_sports").val();

        $("#license_roles").prop("disabled", false);
        $(".selectpicker[data-id='roles']").removeClass("disabled");

        $("#license_roles").val("default");
        $("#license_roles").selectpicker("refresh");
        $("#license_roles").empty();
        $.ajax({
            url : "/PublicAccessPortal/applications/get-game-roles",
            data : {
                code : sport
            },
            type : "GET",
            dataType : "text",
            success : function(data){
                var roles = JSON.parse(data);
                $.each(roles , function(index, role) {
                    $("#license_roles").append("<option class='appended-roles' value='"+role.code+"' id='ROLES'>"+role.name+"</option>");
                });
                $(".selectpicker").selectpicker("refresh");
            }
        });
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
    $(document).on('change', '#DENIED', function(){
        if(this.checked){
            $('#GAB_DENIED').val("YES");

        }else{
            $('#GAB_DENIED').val("NO");

        }
    });

    function withCrime() {
      // Get the checkbox
      var checkBox = document.getElementById("ACCUSED_CRIME");
      // Get the output text
      var text = document.getElementById("STATE_OFFENSE");

      // If the checkbox is checked, display the output text
      if (checkBox.checked == true){
        text.setAttribute("required","required");
        text.style.display = "block";
      } else {
        text.style.display = "none";
        text.removeAttribute("required");
      }
    }
        $(document).on('change', '#DENIED', function(){
            if(this.checked){
                $('#GAB_DENIED').val("YES");

            }else{
                $('#GAB_DENIED').val("NO");

            }
        });

});
    var maxDate = new Date();
        jQuery('#vBIRTH_DATE').datetimepicker({
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
     $('#vBIRTH_DATE').datetimepicker().on('dp.change', function (event) {
            var birth_date = new Date($("#vBIRTH_DATE").val());
            var today = new Date();

            var age = Math.floor((today-birth_date) / (365.25 * 24 * 60 * 60 * 1000));
           // console.log(age);
            $("#vAGE").val(age).change();
    });
