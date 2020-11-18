//	Declare and initialize global program constants
const genericError 	= "Please fix the inidcated problems and then resubmit your order";
const typeError    	= "Please select either Bitcoin or Ethereum";
const walletError	= "Please select Hardware and/or Web Wallet";
const customerError	= "Please complete all Customer Information";
const billingError	= "Please complete all Billing Information";

//	Declare and initialize global program variables
let isValid 	 	= true;	//	Boolean form validation success flag
let regexpattern 	= "";		//	Holds current Regular Expression (regex)pattern
let string 			= "";		//	String to hold final (valid) results

let $ = function (id) 
{
    return document.getElementById(id);
}

let validateForm = function ()
{
	//	Copy values from form inputs
	//	into local JavaScript variables
	let type;			
	let wallet;
	let fname 				= $("fname").value;
	let lname				= $("lname").value;
	let address				= $("address").value;
	let zip					= $("zip").value;
	let email				= $("email").value;
	let emailConfirm		= $("emailConfirm").value;
	let phone				= $("phone").value;
	
	//	Define variable flags
	let validType			= true;
	let validWallet			= true;
	let validFname			= true;
	let validLname			= true;
	let validAddress		= true;
	let validZip			= true;
	let validEmail			= true;
	let validEmailConfirm	= true;
	let validPhone			= true;
	let fix					= "";
	let generic				= "";
	
	//	Validation Routine Function Calls
	validType 		 		= 	validateType();
	validWallet 	 		= 	validateWallet();
	validFname		 		=	validateFirstName(fname);
	validLname		 		= 	validateLastName(lname);
	validAddress	 		=	validateAddress(address);
	validZip		 		=	validateZip(zip);
	validEmail		 		=	validateEmail(email);
	validEmailConfirm 		=	validateEmailConfirm(email, emailConfirm);
	validPhone		 		= 	validatePhone(phone);
	fix = isBillingInfoChecked(this.form);
	
	//	For debugging
	let str = "";
	str += "validFname = " 			+ validFname + "\n";
	str += "validLname = " 			+ validLname + "\n";
	//str += "validAddress = " 		+ validAddress + "\n";
	//str += "validZip = " 			+ validZip + "\n";
	//str += "validEmail = " 			+ validEmail + "\n";
	//str += "validEmailConfirm = " 	+ validEmailConfirm + "\n";
	//str += "validPhone = " 			+ validPhone + "\n";	
	//alert(str);


if (!validType)
{
	radio_error.innerHTML = typeError;
	generic = true;
}
else
{
	radio_error.innerHTML = "";
}
if (!validWallet)

{
	checkbox_error.innerHTML = walletError;
	generic = true;
}
else
{
	checkbox_error.innerHTML = "";
}

if ((!validFname) || (!validLname)  	  || (!validAddress) || (!validZip) ||
	(!validEmail) || (!validEmailConfirm) || (!validPhone))
	{
		customer_error.innerHTML = customerError;
		generic = true;
	}
else
{
	customer_error.innerHTML = "";
}

if (!fix)
{
	billing_error.innerHTML = billingError;
	generic = true;
}
else
{
	billing_error.innerHTML = "";
}

if (!generic)
{
	generic_error.innerHTML = genericError;
	generic = true;
}
else
{
	generic_error.innerHTML ="";
}
};

function validateType()
{
	if (($('radBitcoin').checked) || ($('radEthereum').checked))
	{
		return true;
	}
	return false;
}

function validateWallet()
{
	if (($('chkHardwareWallet').checked) || ($('chkWebWallet').checked))
	{
		return true;
	}
	return false;
}

function validateFirstName(f)
{
	if (f.trim() === "")
	{
		return false;
	}
	return true;
}

function validateLastName(l)
{
	if (l.trim() === "")
	{
		return false;
	}
	return true;
}

function validateAddress(a)
{
	if (a.trim() === "")
	{
		return false;
	}
	return true;
}

function validateZip(z)
{
	if (z.trim() === "")
	{
		return false;
	}
	else
	{
		regexpattern = /^\d{5}([\-]\d{4})?$/;

		if (!z.match(regexpattern))
		{
			return false;
		}
	}
	return true;
}

function validateEmail(e)
{
	if (e.trim() === "")
	{
		return false;
	}
	else
	{
		regexpattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;  
		if (!e.match(regexpattern))
		{
			return false;
		}
	}
	return true;
}

function validateEmailConfirm(e, ec)
{
if (ec.trim() === "")
{
	return false
}
else if (e !== ec)
{
	return false;
}

return true;
}

function validatePhone(p)
{
if (p.trim() === "")
{
	return false;
}
	else
	{
		regexpattern = /^\d{3}-\d{3}-\d{4}$/;
		if(!p.match(regexpattern))
		{
			return false;
		}
	}
	return true;
}

function isBillingInfoChecked(f) 
{
	if (f.billingInfo.checked) {
		f.billingFname.value     = f.fname.value;
		f.billingLname.value	 = f.lname.value;
		f.billingAddress.value   = f.adress.value;
		f.billingZip.value       = f.zip.value;
		f.billingPhone.value     = f.phone.value;
		return true;
	}

else
{
	f.billingFname.value 	= "";
	f.billinglname.value 	= "";
	f.billingAddress.value 	= "";
	f.billingZip.value 		= "";
	f.billingPhone.value 	= "";
	return false;
}
}

//	"Register" the functions
window.onload = function() {
	$("buynow").onclick = validateForm;
};