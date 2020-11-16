//	Declare and initialize global program constants

//	Declare and initialize global program variables
let isValid 	 = true;	//	Boolean form validation success flag
let regexpattern = "";		//	Holds current Regular Expression (regex)pattern
let string 		 = "";		//	String to hold final (valid) results

let $ = function (id) 
{
    return document.getElementById(id);
}

let validateForm = function ()
{
	//	Copy values from form inputs
	//	into local JavaScript variables
	
	let fname 				= $("fname").value;
	let lname				= $("lname").value;
	let address				= $("address").value;
	let zip					= $("zip").value;
	let cellphone			= $("cellphone").value;
    let email				= $("email").value;
    let confirmemail		= $("confirmemail").value;
	let shift;			
	let contactvia;
	let education;
	
	//alert ("Inputted password was: " + password + "\n" +
	//	   "Inputted confirm  was: " + confirmpassword);
/*	let birthdate		= $("birthDate").value;
	let favoritecolor	= $("favoritecolor").value;
	let personalwebsite	= $("personalwebsite").value;
	let ccnumber		= $("ccnumber").value;
*/	
	//	Validate Social Security Number Field
	validateFirstName(fname);
	validateLastName(lname);
	validateAddress(address);
	validateZip(zip);
	validateCellPhone(cellphone);
	validateEmail(email);
	validateShift();
	validateContactVia();
    validateEducation();
    validateConfirmEmail(confirmemail, email);
	
	if (isValid) {
		alert("The current values are:\n" + string);
	}
};



function validateFirstName(f)
{
	// Validate the First Name
	if (f.trim() == "")
	{ 
		$("fname_error").firstChild.nodeValue = 
						"First Name Required.";
		isValid = false;
	}
	else
	{
		regexpattern = /^([A-Za-z]){1,50}$/;
	
		if (!f.match(regexpattern))
		{
			$("fname_error").firstChild.nodeValue = 
						"First Name Must Be Alpha Only.";
			isValid = false;
		}
		else
		{
			$("fname_error").firstChild.nodeValue = "";
			string += "First Name:  " + f + "\n";
		} 		
	}
}

function validateLastName(l)
{
	// Validate the Last Name
	if (l.trim() == "")
	{ 
		$("lname_error").firstChild.nodeValue = 
						"Last Name Required.";
		isValid = false;
	}
	else
	{
		regexpattern = /^([A-Za-z]){1,50}$/;
	
		if (!l.match(regexpattern))
		{
			$("lname_error").firstChild.nodeValue = 
						"Last Name Must Be Alpha Only.";
			isValid = false;
		}
		else
		{
			$("lname_error").firstChild.nodeValue = "";
			string += "Last Name:  " + l + "\n";
		} 		
	}
}

function validateAddress(a)
{
	// Validate the Address
	if (a.trim() == "")
	{ 
		$("address_error").firstChild.nodeValue = 
						"Address Required.";
		isValid = false;
	}
	else
	{
		$("address_error").firstChild.nodeValue = "";
		string += "Address:  " + a + "\n";
	}
}



function validateZip(z)
{
	// Validate the Zip Code
	if (z.trim() == "")
	{ 
		$("zip_error").firstChild.nodeValue = 
						"Zip Code Required.";
		isValid = false;
	}
	else
	{
		regexpattern = /^\d{5}([\-]\d{4})?$/;
	
		if (!z.match(regexpattern))
		{
			$("zip_error").firstChild.nodeValue = 
						"Zip Code nnnnn or nnnnn-nnnn only.";
			isValid = false;
		}
		else
		{
			$("zip_error").firstChild.nodeValue = "";
			string += "Zip Code: " + z + "\n";
		}
	} 		
}

function validateCellPhone(c)
{
	// Validate the Phone Number
	if (c.trim() == "")
	{ 
		$("cellphone_error").firstChild.nodeValue = 
						"Phone Number Required.";
		isValid = false;
	}
	else
	{
		regexpattern = /^\d{3}-\d{3}-\d{4}$/;
	
		if (!c.match(regexpattern))
		{
			isValid = false;
			$("cellphone_error").firstChild.nodeValue = 
						"# must be in nnn-nnn-nnnn format.";
		}
		else
		{
			$("cellphone_error").firstChild.nodeValue = "";
			string += "Phone Number:  " + c + "\n";
		} 		
	}
}

function validateEmail(e)
{
	// Validate the Email Address
	if (e.trim() == "")
	{ 
		$("email_error").firstChild.nodeValue = 
						"Email Address Required.";
		isValid = false;
	}
	else
	{
		regexpattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
	
		if (!e.match(regexpattern))
		{
			$("email_error").firstChild.nodeValue = 
						"Invalid email address input.";
			isValid = false;
		}
		else
		{
			$("email_error").firstChild.nodeValue = "";
			string += "Email Address:  " + e + "\n";
		} 		
	}
}

function validateShift()
{
	let els		= document.getElementsByClassName('sh');
	let count		= 0;
	
//	alert("The value of els in the validateShift() function is: " + els.length)
	for (let i = 0; i < els.length; ++i)
	{
		if (els[i].checked)
		{
			++count;
			break;
		} 
	}
	
//	alert("Count = " + count);
	if (count === 0)
	{		
		$("shift_error").firstChild.nodeValue = " please select either bitcoin or ethereum.";
		isValid = false;
	}
	else
	{
		let s = document.querySelector('input[name = "shift"]:checked').value;
//		alert ("The checked one is: " + s);
		$("shift_error").firstChild.nodeValue = "";
		string += "Desired Shift:  " + 
				 s.charAt(0).toUpperCase() + s.slice(1) + "\n";
	}
}

function validateContactVia()
{
	let inputElems	= document.getElementsByTagName("input");
    let count 	= 0;
	let choices = "";
	
    for (let i = 0; i < inputElems.length; ++i)
	{
		if (inputElems[i].type === "checkbox" && inputElems[i].checked === true)
		{
			$("contactvia_error").firstChild.nodeValue = "";
//			alert ("The value of inputElems[i].value is " + inputElems[i].value)
			choices += inputElems[i].value + " ";
			++count;
		}
	}
	
	if (count == 0)
	{
		$("contactvia_error").firstChild.nodeValue = 
					"Please select hardware or web wallet";
		isValid = false;
	}
	else
	{
		string += "Contact Via:  " + choices + "\n";
	}
}

function validateEducation()
{
	let els		= document.getElementsByClassName('edu');
	let count		= 0;
	
//	alert("The value of els in the validateEducation() function is: " + els.length)
	for (let i = 0; i < els.length; ++i)
	{
		if (els[i].checked)
		{
			++count;
			break;
		} 
	}
	
//	alert("Count = " + count);
	if (count === 0)
	{		
		$("education_error").firstChild.nodeValue = "Highest Education Required.";
		isValid = false;
	}
	else
	{
		let e = document.querySelector('input[name = "education"]:checked').value;
//		alert ("The checked one is: " + e);
		$("education_error").firstChild.nodeValue = "";
		string += "Highest Education:  " + 
				 e.charAt(0).toUpperCase() + e.slice(1) + "\n";
	}
}

//function validatePassword(p)
//{
	// Validate the Password
	//if (p == "")
	//{ 
	//	$("password_error").firstChild.nodeValue = 
	//					"Password Required.";
	//	isValid = false;
	//}
	//else
	//{
	//	if ((p.length < 10) || (p.length > 25))
	//	{
	//		$("password_error").firstChild.nodeValue = 
	//					"Password Must Be 10 - 25 Characters.";
	//		isValid = false;
	//	}
	//	else
	//	{
	//		$("password_error").firstChild.nodeValue = "";
	//		string += "Password:  " + p + "\n";
	//	} 		
	//}
//}

function validateConfirmemail(c, e)
{
	// Validate the Confirm Password
	if (c == "")
	{ 
		$("confirmemail_error").firstChild.nodeValue = 
						"Confirm Password Required.";
		isValid = false;
	}
	else
	{
		if (c != e)
		{
			$("confirmemail_error").firstChild.nodeValue = 
						"Confirm Email Must == Email.";
			isValid = false;
		}
		else
		{
			$("confirmemail_error").firstChild.nodeValue = "";
			string += "Confirm Email:  " + c + "\n";
		} 		
	}
}

let clearAll = function() {
	$("ssn").value				=	"";
	$("ssn_error").value		=	"*";
	$("fname").value			=	"";
	$("fname_error").value		=	"*";
	$("lname").value			=	"";
	$("lname_error").value		=	"*";
	$("address").value			=	"";
	$("address_error").value	=	"*";
	$("city").value				=	"";
	$("city_error").value		=	"*";
	$("state").value			=	"";
	$("state_error").value		=	"*";
	$("zip").value				=	"";
	$("zip_error").value		=	"*";
	$("cellphone").value		=	"";
	$("cellphone_error").value	=	"*";
	$("email").value			=	"";
	$("email_error").value 		=	"*";
	$("shift").value			=	"";
	$("shift_error").value 		=	"*";
	$("contactvia").value		=	"";
	$("contactvia_error").value	=	"*";
	$("education").value 		=	"";
	$("education_error").value	=	"*";
	//$("password").value 		=	"";
	//$("password_error").value	=	"*";
	$("confirmemail").value 	=	"";
	$("confirmemail_error").value = "*";
	$("fname").focus();
}

//	"Register" the functions
window.onload = function() {
	$("validate").onclick		=	validateForm;
	$("clear").onclick			=	clearAll;
	$("fname").focus();
};