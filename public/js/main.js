
(function ($) {
    "use strict";
    // window.location.replace('/vote.html');
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    var change = false;
    var email;

    $("#submit-btn").on("click", function(e){
        e.preventDefault();
        console.log("hello");
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        console.log(check);
        change = check;
        if(check == true){
          //alert("PROCEED");
          // document.getElementById("hidden").style.display = "block";
          // document.getElementById("submit-btn").innerHTML = "PROCEED";
    
                var to=$("#email").val();
                //$("#message").text("Sending E-mail...Please wait");
                console.log("Sending E-mail...Please wait");
                alert("OTP has been sent to "+to);
                $.get("http://localhost:3000/send",{to:to},function(data){
                if(data=="sent")
                {
                    //$("#message").empty().html("<p>Email is been sent at "+to+" . Please check inbox !</p>");
                console.log("Email is been sent at "+to+" . Please check inbox !");
                }
    
            });
        }
    });
    
    // $("#submit-btn-otp").on("click", function(e){
    //     e.preventDefault();
        
    //     var otp = $("#otp").val()
    //     $.get("http://localhost:3000/verify", {otp:otp}, function(data){
    //         if(data=="true"){
    //             window.location.replace('/vote.html');
    //             // $.get("http://localhost:3000/vote");
    //         }else{
    //             console.log("Incorrect otp");
    //         }
    //     });

    //     // var xmlHttp = new XMLHttpRequest();
    //     // xmlHttp.onreadystatechange = function() { 
    //     //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    //     //         callback(xmlHttp.responseText);
    //     // }
    //     // xmlHttp.open("GET", "http://localhost:3000/verify", true); // true for asynchronous 
    //     // xmlHttp.send(otp);
    // });



    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        //======================EMAIL==========================================//
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)) {
                return true;
            }
            else {
                if($(input).val().trim() == ''){
                    return false;
                }
                else{
                  return false;
                }
            }
        }
        //=========================PHONE=======================================//
        if($(input).attr('type') == 'phone' || $(input).attr('name') == 'phone') {
            if($(input).val().trim().match(/^[789]\d{9}$/)) {
                return true;
            }
            else {
                if($(input).val().trim() == ''){
                    return false;
                }
                else{
                  return false;
                }
            }
        }
        //=========================ID=======================================//
        if($(input).attr('type') == 'ID' || $(input).attr('name') == 'ID') {
            if($(input).val().trim().match(/^[1]\d{8}$/)) {
                return true;
            }
            else {
                if($(input).val().trim() == ''){
                    return false;
                }
                else{
                  return false;
                }
            }
        }

    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    function changeText(){

    }

    function c(){
        var otp = $("#otp").val()
        $.get("http://localhost:3000/verify", {otp:otp}, function(data){
            if(data=="true"){
                // window.location.replace('/vote.html');
                // $.get("http://localhost:3000/vote");
                return true;
            }else{
                console.log("Incorrect otp");
                return false;
            }
        });
    } 

})(jQuery);

   