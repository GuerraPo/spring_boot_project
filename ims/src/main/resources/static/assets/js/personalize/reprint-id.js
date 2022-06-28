$().ready(function(){
materialKit.initFormExtendedDatetimepickers();
    var url = window.location.href;
    var urlSplit = url.split("/");
    var accountId = urlSplit.pop();
    //console.log(accountId);
    var canvasUrl = "";
    var canUrl = "";
    var draft = false;
    var y = 0;
    var draw;
    var signatureImage = false;
    var canSignature_ext;
    var signatureChange = false;
    $.ajax({
         url: '/PublicAccessPortal/get-update-applications',
         data:{
             ACCOUNT_ID :accountId
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
            $("#vLICENSE_NUMBER").val(details.vLICENSE_NUMBER);
            $("#vID_FOR").val(accountId);
            $("#vLAST_NAME").val(details.vLAST_NAME);
            $("#vFIRST_NAME").val(details.vFIRST_NAME);
            $("#vMIDDLE_NAME").val(details.vMIDDLE_NAME);
            $("#vSUFFIX").val(details.vSUFFIX);
            $("#vCITIZENSHIP").val(details.vCITIZENSHIP);
            $("#vGENDER").val(details.vGENDER);
            $("#vBIRTH_PLACE").val(details.vBIRTH_PLACE);
            $("#vAGE").val(details.vAGE);
            $("#vHEIGHT").val(details.vHEIGHT);
            $("#vWEIGHT").val(details.vWEIGHT);
            $("#vCIVILSTATUS").val(details.vCIVILSTATUS);
            $("#gender").val(details.vGENDER).change();
            $("#civilstatus").val(details.vCIVILSTATUS).change();
             birthdate = details.vBIRTH_DATE.split('/');
             var year = birthdate[0];
             var month = birthdate[1];
             var day = birthdate[2];
             var birthdate = month + "/" + day + "/" + year;
             //console.log(birthdate);
             $("#vBIRTH_DATE").val(birthdate);
             $("#vHOME_ADDRESS").val(details.vHOME_ADDRESS);
             $("#vAVATAR").attr("src", details.vAVATAR);
             if(details.vAVATAR != "assets/img/image_placeholder.jpg" || details.vAVATAR != null){
                 $("#imageValue").val(details.vAVATAR);
             }
             $("#vROLES").val(details.vROLES);
             $("#vSPORTS").val(details.vSPORTS);
//             $("#vREASONS_FOR_ID_REPRINT").val(details.vREASONS_FOR_ID_REPRINT).change();
               $.ajax({
                   url: '/PublicAccessPortal/applications/get-signatory',
                   data:{
                       account_id :accountId
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
                         $("#previewImage").attr("src", "https://www.tlcpay.ph/solutions/GAB-TEST/REQUIREMENTS/"+sign+"."+data.fileExt);
                     }else{
                     $("#previewImage").attr("src", "/PublicAccessPortal/assets/img/image_placeholder.jpg");
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
                             account_id :accountId
                         },
                         type: 'GET',
                         dataType: 'text',
                         success: function(data){
                            var req_data = JSON.parse(data);

                          for(var x = 0; x < req_data.length; x++){
                           var fileName = req_data[x].dir.toString().split('/');
                           if(req_data[x].requirements == "R999"){
                              $("#affidavitViewModal").show();
                              $("#affidavitViewModal").attr("data-value", req_data[x].accountId+ "-"+req_data[x].requirements+"."+ req_data[x].fileExt);
                              $("#affidavitView").val(req_data[x].accountId+ "-"+req_data[x].requirements+"."+ req_data[x].fileExt);
                           }

                           }
                         }
                    });
        },
         error : function(jqXHR, textStatus, errorThrown) {
             console.log(errorThrown);
         }
    });

    $(document).on("click", "#SUBMIT_APPLICATION", function(){
     $("#vSAVE_AS_DRAFT").val("NO");
     $("#SUBMIT_APPLICATION").prop("disabled", true);
      //console.log($("#vID_FOR").val());

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

                             $("#SUBMIT_APPLICATION").prop("disabled", false);
                        }
                    }
           });
        }else if(signatureImage == false && canvasUrl == ""){
            $("#signatureModal").modal("show");
                $('#signatureModal').on('hidden.bs.modal', function () {
                    //console.log('sample');


                       $("#SUBMIT_APPLICATION").prop("disabled", false);
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
                                        if(signatureChange == true){
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
                                                    // console.log('draw');
                                                    var formData = new FormData();
                                                   formData.append('ACCOUNT_ID', data);
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
                                              copy_to.append('account_id', data);
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
                                                      copy_to.append('account_id', data);
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
                                                             formData.append('ACCOUNT_ID', data);
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
                                                        formData.append('ACCOUNT_ID', data);
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
                             $("#SUBMIT_APPLICATION").prop("disabled", false);
                         }
                        }
                    })
                }else{
                     $("#SUBMIT_APPLICATION").prop("disabled", false);

                }
        }

    });
        $(document).on("click", "#SAVE_APPLICATION", function(){
         $("#vSAVE_AS_DRAFT").val("YES");
        $("#SAVE_APPLICATION").prop("disabled", true);


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
                                        if(signatureChange == true){
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
                                                   formData.append('ACCOUNT_ID', data);
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
                                              copy_to.append('account_id', data);
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
                                                      copy_to.append('account_id', data);
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
                                                             formData.append('ACCOUNT_ID', data);
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
                                                    formData.append('ACCOUNT_ID', data);
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
                         $("#SAVE_APPLICATION").prop("disabled", false);
                     }
                    }
                })
            }else{
                 $("#SAVE_APPLICATION").prop("disabled", false);

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
        sigText.innerHTML = "Data URL for your signature will go here!";
        sigImage.setAttribute("src", "");
      }, false);

      $('#signatureModal').on('hidden.bs.modal', function () {
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
        var signature = $("#signature").prop('files');
        //console.log(signature.length);
        if(signature.length > 0){
            signatureImage = true;
            signatureChange = true;
        }
      });
            $(document).on("click", "#uploadButton", function(){
              canUrl = canvas.toDataURL();
                $("#previewImage").attr("src", canUrl);
            });

    })();
        $('#signatureModal').on('show.bs.modal', function () {
            $('.modal').css('overflow-y', 'auto');
        });

        $("#vREASONS_FOR_ID_REPRINT").change(function(){
            if($("#vREASONS_FOR_ID_REPRINT").val() == "ID loss"){
                 $("input").attr("readonly", true);
                 $("#civilstatus").attr("disabled", true);
                 $("#gender").attr("disabled", true);
                 $("#vLICENSE_NUMBER").attr("readonly", true);
                 $("#ROLE_NAME").attr("readonly", true);

            }else{
                 $("input").attr("readonly", false)
                 $("#vCIVILSTATUS").removeAttr("disabled");
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
            $(document).on("click", ".affidavitViewModal",function(){
                var value = $(this).data('value');
                console.log(value);
                $("#documentPreview").attr('src', "https://www.tlcpay.ph/solutions/GAB-TEST/REQUIREMENTS/"+value);
                $('#imageDocument').modal('show');
            });
});