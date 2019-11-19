//*************************************************************************************************
// The following section is JQuery and JavaScript code to enable functionality                     
// There are 4 different sets of functionality in this section                                     
// 1) Jquery enables the numeric spinner to select password length.                                
// 2) Main page load:  Sets the environment for the page.                                          
// 3) Event that runs when user selects button to reset to defaults                                
// 4) Event that runs when user clicks on generate password.  It calls CalculateRandompwd function 
// 5) Event that runs when user clicks on copy to clipboard                                        
// 6) Function CalculateRandompwd.  Calculates password conforming to user input
//                    
//*************************************************************************************************


/***************************************************************************************************/
// Following section reads the value of the numerical range and writes to the html of id # result 
/***************************************************************************************************/

$(document).ready(function(){
    // Read value on page load
    $("#result").html($("#UserRequestedPwdLength").val());

    // Read value on change
    $("#UserRequestedPwdLength").change(function(){
        $("#result").html($(this).val());
    });

});        

//***************************************************************************************
// The following code will execute when the user requests to clear the screen
// from a password originally displayed, and clears the screen, hides password
// result and customer message.  Also resets the password length to the
// default of 45 characters, and the type of characters to special
//***************************************************************************************

$("#ResetToDefaults").click(function()  //  This code executes when user clicks on Generate password
{
    document.getElementById("PasswordResult").style.color="white";     // hiding the password result
    document.getElementById("MessageToCustomer").style.color="white";  // hiding the message to user 
    document.getElementById("UserRequestedPwdLength").value=45;        // setting the password length at 45
    document.getElementById("result").innerHTML="45";                  // showing the password length value
    document.getElementById("TypeofChars1").checked=true;  //   all choices checked
    document.getElementById("TypeofChars2").checked=true;  //  all choices checked
    document.getElementById("TypeofChars3").checked=true;  //  all choices checked
    document.getElementById("TypeofChars4").checked=true;  //  all choices checked
    document.getElementById("CopyToClippboard").disabled=true; // all choices checked
})

//***************************************************************************************
// The following code Copies the password to the clipboard.  It is called when the user 
// clicks on the button copy to clipboard.
//***************************************************************************************

$("#CopyToClippboard").click(function() {
    var text = document.getElementById("PasswordResult");
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
    selection.removeAllRanges();

    alert("Password "+document.getElementById("PasswordResult").innerText+ "has been copied to clipboard.");
})

//********************************************************************************************
//  For the length of the password, it generates a random index.  It accepts two parameters
//  PwdLength:  Numberic, represents the length of the array
//  Option1-4 specified the type of characters included in the password generated, as follows
//        Option1: Special characters
//        Option2: Numeric
//        Option3: Alphabetic, lowercase
//        Option4: Alphanumeric, uppercase
//  Option1-4 are boolean
//********************************************************************************************

function CalculateRandomPwd(PwdLength,Option1,Option2,Option3,Option4) 
{
    // The following arrays are potential candidates for being included in the password depending on
    // the type of characters the user selected
    var ArrayofCharacters1='\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~'.split('');
    var ArrayofCharacters2='0123456789'.split('');
    var ArrayofCharacters3='abcdefghijklmnopqrstuvwxyz'.split('');
    var ArrayofCharacters4='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Finalized the potential characters to be included in the password
    // Variable ArrayofCharacters to contain all potential candidates

    var ArrayofCharacters=[];
    if(Option1) {ArrayofCharacters=ArrayofCharacters.concat(ArrayofCharacters1)};
    if(Option2) {ArrayofCharacters=ArrayofCharacters.concat(ArrayofCharacters2)};
    if(Option3) {ArrayofCharacters=ArrayofCharacters.concat(ArrayofCharacters3)};
    if(Option4) {ArrayofCharacters=ArrayofCharacters.concat(ArrayofCharacters4)};

    var LengthOfChoices=ArrayofCharacters.length;  // how many character choices we have
    var RandomIndex=0;  //  Random number to access the array
    var RandomPassword="";  // Random password value

    // Calculating the random password
    for (var i=0;i<PwdLength;i++) {
        RandomIndex=Math.floor(Math.random() * (LengthOfChoices));
        RandomPassword=RandomPassword+ArrayofCharacters[RandomIndex];
    };

return (RandomPassword);
}   // End of function CalculateRandomPwd

//*********************************************************************************
// This code is triggered by the user clicking generate password.  It evaluates
// user input from the html form, and call the random generator function that
// will ultimately create the random password
//*********************************************************************************

$("#GeneratePassword").click(function()  //  This code executes when user clicks on Generate password
{   
    // initializing which character type user selected
    
    var Option1=false;
    var Option2=false;
    var Option3 =false;
    var Option4 =false;  // Optionx boolean

    if(document.getElementById("TypeofChars1").checked) {Option1 =true};
    if(document.getElementById("TypeofChars2").checked) {Option2 =true};
    if(document.getElementById("TypeofChars3").checked) {Option3 =true};
    if(document.getElementById("TypeofChars4").checked) {Option4 =true};


    // Validates that at least one type of character was selected.  If so, calls the function
    // to generate the password.  Otherwise, provides and alert and does nothing

    if(Option1||Option2||Option3||Option4) {

        // Updating the value of the password on the clipboard
        document.getElementById("PasswordResult").innerText=CalculateRandomPwd($("#UserRequestedPwdLength").val(),Option1,Option2,Option3,Option4)
        document.getElementById("PasswordResult").style.color="black";  // Displays the password
        document.getElementById("MessageToCustomer").style.color="black";  // Displays the message to user
        document.getElementById("CopyToClippboard").disabled=false;  // Enables button to copy to clipboard
        document.getElementById("ResetToDefaults").disabled=false;  // Enables button to reset to defaults
    }
    else {alert("Please select at least one character type to continue")}

})  //  End of function when user clicks on Generate password
