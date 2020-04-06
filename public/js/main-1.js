const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

function ValidateEmail(){
	var emailID = document.getElementById("emailID");
	var password = document.getElementById("password");

	if(emailID.value.trim() != "" && password.value.trim() != ""){
		// console.log("Sign in successfull")
		// emailID.value = "";
		// password.value = "";
		// return true
		if(emailID.value.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)
				&& password.value.trim().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/)) {
					alert("Login successfull");
					return true;
		}
		else {
				if(emailID.value.trim() == ''|| password.value.trim() == ''){
						alert("Sign up failed. Email and password cannot be empty");
						return false;
				}
				else{
					alert("Sign up failed");
					return false;
				}
		}
	}
	else{
		alert("Sign up failed");
		console.log("failed");
		return false
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});
