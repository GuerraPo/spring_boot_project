$().ready(function(){

    $.ajax({
       url: 'get-user-level',
       dataType: 'text',
       type: 'GET',
       success:function(data){
          var app = JSON.parse(data);
        $.each(app , function(index, dataList) {
             $("#USER_LEVEL_NAME").append("<option class='appended-name' value='"+game.code+"' id='SPORTS'>"+game.name+"</option>");
       }
       $(".selectpicker").selectpicker("refresh");
    });

});