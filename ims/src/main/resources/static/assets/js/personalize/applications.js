$().ready(function(){
    materialKit.initFormExtendedDatetimepickers();
    var application_type;
    var application_id;

    $(document).on("click", "#searchShow", function(){
        $("#searchFields").show();
        $("#searchShow").attr("id", "searchHide");
        $("#MONTH").append('<option class="appended-month" value="01">January</option>');
        $("#MONTH").append('<option class="appended-month" value="02">February</option>');
        $("#MONTH").append('<option class="appended-month" value="03">March</option>');
        $("#MONTH").append('<option class="appended-month" value="04">April</option>');
        $("#MONTH").append('<option class="appended-month" value="05">May</option>');
        $("#MONTH").append('<option class="appended-month" value="06">June</option>');
        $("#MONTH").append('<option class="appended-month" value="07">July</option>');
        $("#MONTH").append('<option class="appended-month" value="08">August</option>');
        $("#MONTH").append('<option class="appended-month" value="09">September</option>');
        $("#MONTH").append('<option class="appended-month" value="10">October</option>');
        $("#MONTH").append('<option class="appended-month" value="11">November</option>');
        $("#MONTH").append('<option class="appended-month" value="12">December</option>');

        var dateNow = new Date();
        var monthNow = dateNow.getMonth();
        if((monthNow + 1) <= 9){

        $("#MONTH").val("0"+(monthNow + 1)).change();

        }else{

        $("#MONTH").val(monthNow + 1).change();

        }

        var yearNow = dateNow.getFullYear();

        for(var yearStart = 2000; yearStart <= yearNow; yearStart++){

        $("#YEAR").append('<option class="appended-year" value="'+yearStart+'">'+yearStart+'</option>');

        }
         $("#YEAR").val(yearNow).change();

         $(".selectpicker").selectpicker("refresh");
         $(".appended-APPLICATION_TYPE").remove();
         $.ajax({
             url : "/PublicAccessPortal/applications/get-app-types",
             type: 'GET',
             dataType : "text",
             success: function(data){
             var APP_TYPES = JSON.parse(data);
             console.log(APP_TYPES);
              $.each(APP_TYPES , function(index, APP_TYPE) {
                        $("#APPLICATION_TYPE").append("<option class='appended-APPLICATION_TYPE' value='"+APP_TYPE.id+"' id='SPORTS'>"+APP_TYPE.name+"</option>");
                  });
                  $(".selectpicker").selectpicker("refresh");
             }
         });
    });

    $(document).on("click", "#searchHide", function (){
     $(".appended-year").remove();
     $(".appended-month").remove();
        $("#searchFields").hide();
        $("#searchHide").attr("id", "searchShow");
    });

     $(document).on("click", "#SEARCH_APPLICATION", function(){
      var table = $("#datatable").DataTable();
      var obj;
      var MONTH = $("#MONTH").val();
      var YEAR = $("#YEAR").val();
      var APPLICATION_TYPE = $("#APPLICATION_TYPE").val();
                //console.log(data);
              $.ajax({
                    url : "get-applications",
                    type: 'GET',
                    dataType : "text",
                    data : {
                        month : MONTH,
                        year : YEAR,
                        applicationType : APPLICATION_TYPE
                    },
                    beforeSend: function(){
                        obj =  $.dialog({
                            title: '<label class="text-success">Loading Please Wait!</label>',
                            content: '<img src="/PublicAccessPortal/assets/img/loaders/loader-128x/Preloader_2.gif" style="margin-left: auto;margin-right: auto;display: block;">',
                            type:'purple',
                            closeIcon: false,
                            backgroundDismiss: false
                        })

                    },
                    success : function (data){
                        obj.close();

                        //console.log(data.accountId);
                        var apps = JSON.parse(data);
                       // console.log(apps.length);
                        if(apps.length == 0 ){
                      $.dialog({
                            title:'<label class="text-warning">Success!</label>',
                            content: 'No Available Data',
                            type: 'purple'
                        })
                        }else{
                        $.dialog({
                            title:'<label class="text-success">Success!</label>',
                            content: 'Successfully Searched',
                            type: 'purple'
                         })
                     table.clear();
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
                    },
                    error : function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                        $.dialog({
                            title:'<label class="text-Warning">Failed!</label>',
                            content: "Failed to Search Application!",
                            type: 'orange'
                        })
                    }
                });
    });

    $(document).on("click", "#printApplications", function(){

            var ACCOUNT_ID = $(this).data("id");
            console.log(ACCOUNT_ID);
            window.open("print-applications?account_id="+ACCOUNT_ID, "_blank");
    });

});
