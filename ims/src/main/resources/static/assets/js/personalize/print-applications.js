$().ready(function(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var ACCOUNT_ID = urlParams.get('ACCOUNT_ID');

    $.ajax({
        url: 'get-update-applications',
        data:{
            ACCOUNT_ID: ACCOUNT_ID
        },
        dataType: 'GET',
        type: 'TEXT',
        success: function(data){
            var application = JSON.parse(data);

            var fullName = application.vFirst_NAME +" "+ application.vMIDDLE_NAME +".  "+application.vLAST_NAME;

        }
    })

})