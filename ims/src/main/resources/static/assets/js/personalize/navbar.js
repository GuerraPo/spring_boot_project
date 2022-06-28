$().ready(function(){
    var loginStat = $("#loginStat").val();
    //console.log(loginStat);
    var role = $("#role").val();
    //console.log(role);
    if(role == "[SUPERADMIN]"){

        $(".admin-menu").show();
        $(".super-admin-menu").show();
        $(".applicant-menu").hide();

    }else if(role == "[APPLICANT]"){
         $(".admin-menu").hide();
         $(".applicant-menu").show();
          $(".super-admin-menu").hide();
    }else if (role == "[ADMIN]"){
        $(".applicant-menu").hide();
         $(".admin-menu").show();
         $(".super-admin-menu").hide();
    }
    if(loginStat == "0"){
        $(".user-only").hide();
        $(".non-user").show();
    }
    else if(loginStat == "1"){
        $(".user-only").show();
        $(".non-user").hide();
        $.ajax({
            url : "/PublicAccessPortal/get-avatar",
            type : "GET",
            dataType : "text",
            success : function(data){
                $("#avatar").attr("src", "/PublicAccessPortal"+data);
            }
        });
    }
});