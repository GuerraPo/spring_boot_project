function forgotPassword() {
    var email = $("#MAIL").val();

    $.ajax({
        url : "forget-password",
        data : {
            email : email
        },
        type : "POST",
        dataType : "text",
        success : function(data){
            $.dialog({
                title: '<label class="text-success">Success!</label>',
                content: data,
                type: 'green'
            });
            $('#forgotPassword').modal('toggle');
            $("#MAIL").val('');
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $.dialog({
                title:'<label class="text-danger">Failed!</label>',
                content: textStatus,
                type: 'red'
            })
            $('#forgotPassword').modal('toggle');
            $("#MAIL").val('');
        }
    });
}