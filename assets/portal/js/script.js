window.app = window.app || {}, app.lazyLoadState = app.lazyLoadState || {}, app.lazyLoad = function (e) {
    "use strict";
    e.type || (app.lazyLoadState = !1), app.lazyLoadState || (app.lazyLoadState = !0, requestAnimationFrame(function () {
        if (e.selector) var t = e.selector; else t = "." + e.classEl;
        var a = document.querySelectorAll(t), l = a.length;
        if (l > 0) {
            for (var o = 0; o < l; o++) {
                if ("init" === e.type) var i = a[o].getBoundingClientRect(); else i = {top: 0};
                var p = a[o].getAttribute(e.attrName);
                if (p && i.top < window.innerHeight) {
                    if (a[o].classList.contains("bg-load")) a[o].style.backgroundImage = "url('" + p + "')"; else if (a[o].classList.contains("img-load")) {
                        var r = a[o].getAttribute("alt"), n = document.createElement("IMG");
                        n.src = p, r ? (n.alt = r, a[o].removeAttribute("alt")) : n.alt = "", a[o].appendChild(n)
                    } else a[o].src = p;
                    a[o].classList.remove(e.classEl), a[o].removeAttribute(e.attrName)
                }
            }
            app.lazyLoadState = !1
        } else app.lazyLoadState = "done", "init" === e.type && (window.removeEventListener("scroll", app.pageLoad), delete app.pageLoad)
    }))
};


var refresh_handler = function () {
	app.lazyLoadState = false;
	app.pageLoad();
};

// Create custom select
function setCustomSelect(selectorSelect, selectorContent, subCategory, optionID) {
	var lastSelect = 0,
		elSelect = document.querySelectorAll(selectorSelect),
		elContent = document.querySelectorAll(selectorContent),
		elSubCat = [],
		optionSelect = [],
		valueOptionSelect = [];

	for (var i = 0; i < elContent.length; i++) {
		elSubCat.push = i;
		elSubCat[i] = elContent[i].querySelectorAll(subCategory);
	}

	for (var i = 0; i < elSelect.length; i++) {
		optionSelect.push = i;
		optionSelect[i] = elSelect[i].querySelectorAll('option');
	}

	for (var i = 0; i < optionSelect.length; i++) {
		valueOptionSelect.push = [];
		valueOptionSelect[i] = [];
		for (var ii = 1; ii < optionSelect[i].length; ii++) {
			valueOptionSelect[i].push = ii;
			valueOptionSelect[i][ii - 1] = optionSelect[i][ii].value;
		}
	}

	var x, i, j, selElmnt, a, b, c;
	/*look for any elements with the class "custom-select":*/
	x = document.getElementsByClassName("custom-select");
	for (i = 0; i < x.length; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		/*for each element, create a new DIV that will act as the selected item:*/
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < selElmnt.length; j++) {
			/*for each option in the original select element,
			create a new DIV that will act as an option item:*/
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function(e) {
				/*when an item is clicked, update the original select box,
				and the selected item:*/
				var y, i, k, s, h, valueSelect, indexInner;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				h = this.parentNode.previousSibling;
				for (i = 0; i < s.length; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						valueSelect = s.options[i].value;
						indexInner = i - 1;
						y = this.parentNode.getElementsByClassName("same-as-selected");
						for (k = 0; k < y.length; k++) {
						y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						break;
					}
				}
				h.click();

				var indexOuter,
					targetID = e.target.parentNode.parentNode.id;

				if (targetID === optionID.idPhoto) {
					indexOuter = 0;
				} else if (targetID === optionID.idVideo) {
					indexOuter = 1;
				} else {
					indexOuter = 2;
				}

				for (var i = 0; i < elSelect.length; i++) {
					idEl = elSelect[i].id;
					if (targetID === idEl) {
						if (i !== lastSelect) {
							elSelect[lastSelect].classList.remove('active');
							elContent[lastSelect].classList.remove('active');
							elSelect[i].classList.add('active');
							elContent[i].classList.add('active');
							lastSelect = i;
						}
					}
				}

				for (var i = 0; i < elSubCat[indexOuter].length; i++) {
					elSubCat[indexOuter][i].classList.remove('current');
				}

				elSubCat[indexOuter][indexInner].classList.add('current');
				refresh_handler();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function(e) {
			/*when the select box is clicked, close any other select boxes,
			and open/close the current select box:*/
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}

	elSelect[lastSelect].classList.add('active');
	elContent[lastSelect].classList.add('active');
}

// Create contact page custom select
function customSelect() {
	var x, i, j, selElmnt, a, b, c;
	/*look for any elements with the class "custom-select":*/
	x = document.getElementsByClassName("custom-select");
	for (i = 0; i < x.length; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		/*for each element, create a new DIV that will act as the selected item:*/
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < selElmnt.length; j++) {
			/*for each option in the original select element,
			create a new DIV that will act as an option item:*/
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function(e) {
				/*when an item is clicked, update the original select box,
				and the selected item:*/
				var y, i, k, s, h;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				h = this.parentNode.previousSibling;
				for (i = 0; i < s.length; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
							s.selectedIndex = i;
							h.innerHTML = this.innerHTML;
							y = this.parentNode.getElementsByClassName("same-as-selected");
						for (k = 0; k < y.length; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						break;
					}
				}
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function(e) {
			/*when the select box is clicked, close any other select boxes,
			and open/close the current select box:*/
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}
}

// Close custom select options
function closeAllSelect(elmnt) {
	/*a function that will close all select boxes in the document,
	except the current select box:*/
	var x, y, i, arrNo = [];
	x = document.getElementsByClassName("select-items");
	y = document.getElementsByClassName("select-selected");
	for (i = 0; i < y.length; i++) {
		if (elmnt == y[i]) {
			arrNo.push(i)
		} else {
			y[i].classList.remove("select-arrow-active");
		}
	}
	for (i = 0; i < x.length; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
		}
	}
}

// General Popup
app.popup = function (setting) {
	'use strict';
	console.log(setting);
	var body = document.body,
		buttonsOpenPopup = document.querySelectorAll(setting.buttonsOpen),
		buttonClosePopup = document.getElementById(setting.idButtonClose),
		idPopup = document.getElementById(setting.idPopup),
		wrapperIdPopup = document.querySelector('#' + setting.idPopup + ' ' + setting.bgPopup),
		totalButtons = buttonsOpenPopup.length,
		publicAPI = {};

	var _openPopup = function () {
		body.classList.add('overflow-hidden');
		idPopup.classList.add('show');
		setTimeout(function () {
			idPopup.classList.add('open');
		}, 100);
		if (!!setting.external) {
			setting.external();
		}
	};

	var _closePopup = function () {
		body.classList.remove('overflow-hidden');
		idPopup.classList.remove('open');
		setTimeout(function () {
			idPopup.classList.remove('show');
		}, 800);
	};

	var destroyPopup = function () {
		for (var i = 0; i < totalButtons; i++) {
			buttonsOpenPopup[i].removeEventListener('click', _openPopup, false);
		}

		buttonClosePopup.removeEventListener('click', _closePopup, false);
		wrapperIdPopup.removeEventListener('click', _closePopup, false);
		delete publicAPI.destroy;
	};

	for (var i = 0; i < totalButtons; i++) {
		buttonsOpenPopup[i].addEventListener('click', _openPopup, false);
	}

	buttonClosePopup.addEventListener('click', _closePopup, false);
	wrapperIdPopup.addEventListener('click', _closePopup, false);
	publicAPI.destroy = destroyPopup;
	return publicAPI;
};

// Login & Register Form Validation
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory(root));
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		factory(root);
	}
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    root.mdl = root.mdl || {};

    mdl.mdlForm = function (mdlName) {
        "use strict";

        var form,
            fields = [],
            patterns,
            message,
            callbackSuccess,
            callbackError,
            errDiv,
            i,
            publicAPI = {};

        function _clean(object) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    object[key] = null;
                    delete object[key];
                }
            }
        }

        function _throwErr(info) {
            errDiv.innerHTML = info.errMsg;
            errDiv.className = info.classErr;
            info.field.className = info.classField;
            if (info.event.type === 'submit' && info.classField === 'invalid') {
                throw info.errMsg;
            }
        }

        function _validate(data) {
            var info = {
                field: data.field,
                event: data.event,
                errMsg: message[data.field.name],
                classErr: 'errorbox visible',
                classField: 'invalid'
            };

            if (!!data.regex.test(data.field.value)) {
                if (data.event.type === 'submit') {
                    if (data.field.type === 'password') {
                        data.pswd.push(data.field.value);
                        if (!!data.pswd[1] && data.pswd[0] !== data.pswd[1]) {
                            info.errMsg = message['notMatch'];
                            _throwErr(info);
                        }
                    }
                    if (!data.pswd[1]) {
                        data.form[data.field.name] = data.field.value;
                    }
                }
                info.errMsg = '', info.classErr = 'errorbox', info.classField = 'valid';
                _throwErr(info);
            } else {
                if (event.type === 'submit' && data.field.value === '') {
                    info.errMsg = message['default'];
                }
                _throwErr(info);
            }
        }

        function _keyup(event) {
            if (event.keyCode !== 13) {
                _validate({
                    event: event,
                    field: event.target,
                    regex: patterns[event.target.name]
                });
            }
        }


        function initialize(config) {
            form = document.getElementById(config.formID);
            patterns = config.regexPatterns;
            message = config.errorMessage;
            if (!config.errorMessage.notMatch) {
                message.notMatch = 'Your Confirm Password does not match.';
            }
            if (!config.errorMessage.default) {
                message.default = 'Please fill all the required fields.';
            }
			callbackSuccess = config.callbackSuccess;
			callbackError = config.callbackError;
            errDiv = document.createElement('DIV');
            errDiv.setAttribute('id', 'errorbox-' + config.formID);
            form.parentNode.insertBefore(errDiv, form.nextSibling);
            for (i = 0; i < form.children.length; i++) {
                if (form.children[i].tagName === 'INPUT' && form.children[i].type !== 'submit') {
                    fields.push(form.children[i]);
                    form.children[i].addEventListener('keyup', _keyup);
                }
            }
            form.addEventListener('submit', _submit);
        }

        function destroy() {
            errDiv.removeAttribute('id');
            errDiv.parentNode.removeChild(errDiv);
            form.removeEventListener('submit', _submit);
            for (i = 0; i < fields.length; i++) {
                fields[i].removeEventListener('keyup', _keyup);
                fields[i] = null;
                if (i === fields.length - 1) {
                    fields.splice(0, fields.length);
                }
            }
            _clean(patterns);
            _clean(message);
            _clean(publicAPI);
            i = null;
            form = null;
			callbackSuccess = null;
			callbackError = null;
            errDiv = null;
            _clean = null;
            _throwErr = null;
            _validate = null;
            _keyup = null;
            _submit = null;
            initialize = null;
            destroy = null;
            mdl[mdlName] = null;
            delete mdl[mdlName];
        }

        publicAPI.init = initialize;
        publicAPI.destroy = destroy;

        return publicAPI;
    };
});

// Login Popup
function openPopupLogin() {
	document.body.classList.add('show-pop-up');
	document.body.classList.add('overflow-hidden');
	document.getElementById('pop-up-wrapper').innerHTML =
		'<div id="pop-up-col">' +
			'<div id="pop-up-box">' +
				'<div id="pop-up-content">' +
					'<div id="login-content">' +
						'<button id="button-close-login" onClick="closePopupLogin()">X</button>' +
						'<div id="logo-color">' +
							'<img src="http://panomatics.com/assets/images/logo-color.png" alt="Panomatics Logo" />' +
						'</div>' +
						'<h4 id="form-title">WELCOME TO PANOMATICS VIRTUAL TOURS!</h4>' +
						'<form id="form-login" action="/login" method="POST">' +
							'<input id="email" name="email" type="text" placeholder="EMAIL">' +
							'<input id="password" name="password" type="password" placeholder="PASSWORD">' +
							'<input id="submit" type="submit" value="LOGIN">' +
						'</form>' +
						'<div id="login-info">' +
							'<p>PLEASE LOGIN OR SIGN UP <a onClick="openPopupRegister()">HERE</a></p>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';

	mdl.login = mdl.mdlForm('login');
	mdl.login.init({
		formID: 'form-login',
		regexPatterns: {
			email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			password: /^.{8,}$/
		},
		errorMessage: {
			username: 'Username needs to be alphanumeric and between 5-12 characters.',
			password: 'Password needs to be alphanumeric, at least one lowercase, one uppercase and between 8-20 characters.'
		},
		callbackSuccess: function (res) {
			console.log(JSON.parse(res));
			loginSuccess();
		},
		callbackError: function (res) {
			console.log(res);
			loginError();
		}
	});
}

function closePopupLogin() {
	document.body.classList.remove('show-pop-up');
	document.body.classList.remove('overflow-hidden');
	if (mdl.login) {
		mdl.login.destroy();
	}
	document.getElementById('pop-up-wrapper').innerHTML = '';
}

function loginSuccess() {
	mdl.login.destroy();
	document.getElementById('login-content').innerHTML =
		'<button id="button-close-login" onClick="closePopupLogin()">X</button>' +
		'<div id="logo-color">' +
			'<img src="http://panomatics.com/assets/images/logo-color.png" alt="Panomatics Logo" />' +
		'</div>' +
		'<h4 id="form-title">LOGIN SUCCESSFUL!</h4>' +
		'<p class="error-text-login">Thank you for registering with us. Have fun experiencing our virtual tours and 360° videos!</p>';
}

function loginError() {
	mdl.login.destroy();
	document.getElementById('login-content').innerHTML =
		'<button id="button-close-login" onClick="closePopupLogin()">X</button>' +
		'<div id="logo-color">' +
			'<img src="http://panomatics.com/assets/images/logo-color.png" alt="Panomatics Logo" />' +
		'</div>' +
		'<h4 id="form-title">ACCESS DENIED</h4>' +
		'<p class="error-text-login">There was a problem with your login, please doublecheck your details and try again <a href="index.html">here</a>.</p>';
}

// Register Popup
function openPopupRegister() {
	if (mdl.login) {
		closePopupLogin();
	}
	document.body.classList.add('show-pop-up');
	document.body.classList.add('overflow-hidden');
	document.getElementById('pop-up-wrapper').classList.add('scroll');
	document.getElementById('pop-up-wrapper').innerHTML =
		'<div id="header-pop-up">' +
			'<img src="http://panomatics.com/assets/images/logo.png" />' +
		'</div>' +
		'<div id="pop-up-col">' +
			'<div id="pop-up-box">' +
				'<div id="register-image-banner">' +
					'<img src="http://panomatics.com/assets/images/main-image.jpg" alt="" />' +
				'</div>' +
				'<div id="pop-up-content">' +
					'<div id="logo-color">' +
						'<img src="http://panomatics.com/assets/images/logo-color.png" alt="Panomatics Logo" />' +
					'</div>' +
					'<div id="register-content">' +
						'<button id="button-close-register" onClick="closePopupRegister()">X</button>' +
						'<h4 id="form-title">THANK YOU FOR YOUR INTEREST IN PANOMATICS!</h4>' +
						'<p>please enter your information in the form below in order to view our virtual tours. we will send you a verification link together with your password to your email.</p>' +
						'<form id="form-register" action="/register" method="POST">' +
							'<input type="text" name="firstname" id="firstname" placeholder="FIRST NAME">' +
							'<input type="text" name="lastname" id="lastname" placeholder="LAST NAME">' +
							'<input type="number" name="phone" id="phone" placeholder="PHONE NUMBER">' +
							'<input type="text" name="email" id="email" placeholder="EMAIL ADDRESS">' +
							'<input type="text" name="company" id="company" placeholder="COMPANY">' +
							'<input type="text" name="position" id="position" placeholder="POSITION">' +
							'<input id="submit" type="submit" value="REGISTER">' +
						'</form>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div id="pop-up-footer">' +
			'<a href="#">OFFICES AND LOCATIONS</a>' +
			'<span>|</span>' +
			'<a href="contact.html">CONTACT</a>' +
			'<span>|</span>' +
			'<a href="#">TERMS & CONDITIONS</a>' +
			'<p id="copyright-footer">© PANOMATICS 2017</p>' +
		'</div>';

	mdl.register = mdl.mdlForm('register');
	mdl.register.init({
		formID: 'form-register',
		regexPatterns: {
			firstname: /^[a-z\d]{5,12}$/i,
			lastname: /^[a-z\d]{5,12}$/i,
			phone: /^[a-z\d]{5,12}$/i,
			email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			company: /^[a-z\d]{5,12}$/i,
			position: /^[a-z\d]{5,12}$/i
		},
		errorMessage: {
			firstname: 'Firstname needs to be alphanumeric and between 5-12 characters.',
			lastname: 'Lastname needs to be alphanumeric and between 5-12 characters.',
			phone: 'Phone number needs to be alphanumeric and between 5-12 characters.',
			email: 'Email needs to be a valid address, e.g. me@mydomain.com.',
			company: 'Company needs to be alphanumeric and between 5-12 characters.',
			position: 'Position needs to be alphanumeric and between 5-12 characters.'
		},
		callbackSuccess: function (res) {
			console.log(JSON.parse(res));
			registerSuccess();
		},
		callbackError: function (res) {
			console.log(res);
			registerError()
		}
	});
}

function closePopupRegister() {
	document.body.classList.remove('show-pop-up');
	document.body.classList.remove('overflow-hidden');
	if (mdl.register) {
		mdl.register.destroy();
	}
	document.getElementById('pop-up-wrapper').classList.remove('scroll');
	document.getElementById('pop-up-wrapper').innerHTML = '';
}

function registerSuccess() {
	mdl.register.destroy();
	document.getElementById('register-content').innerHTML =
		'<button id="button-close-register" onClick="closePopupRegister()">X</button>' +
		'<h4 id="form-title-success">REGISTRATION SUCCESSFUL!</h4>' +
		'<p>Your account has been created successfully and we have sent you an email. Please click the verification link within that mail to activate your account.</p>';
}

function registerError() {
	mdl.register.destroy();
	document.getElementById('register-content').innerHTML =
		'<button id="button-close-register" onClick="closePopupRegister()">X</button>' +
		'<h4 id="form-title-success">SIGNUP FORM ERROR</h4>' +
		'<p class="error-text">Something went wrong whilst processing your data. Please <a href="index.html">review</a> your input and try again. Thank you!</p>';
}

function resizeHeaderOnScroll() {
  var distanceY = window.pageYOffset || document.documentElement.scrollTop,
	  hide = 150,
	  shrinkOn = 200,
	  headerEl = document.getElementById('header');

  if (distanceY > hide) {
    headerEl.classList.add("hide");
  } else {
    headerEl.classList.remove("hide");
  }
  if (distanceY > shrinkOn) {
    headerEl.classList.add("smaller");
  } else {
    headerEl.classList.remove("smaller");
  }
}


'use strict';

// Lazyload function

window.addEventListener('load', function () {
    // Set LazyLoad for initial page load
    app.pageLoad = function () {
        app.lazyLoad({
            selector: '.active .current .img-async',
            attrName: 'src-url'
        });
        //resizeHeaderOnScroll();
    };

    app.lazyLoadState = false;
    // Call LazyLoad for initial page load
    app.pageLoad();
    window.addEventListener('scroll', app.pageLoad);
    app.lazyLoad({
        classEl: 'lazy-load',
        attrName: 'src-url'
    });
    // Create mobile menu
    app.mobileMenu = app.popup({
        idPopup: 'mobile-menu',
        buttonsOpen: '#open-mobile-menu',
        idButtonClose: 'close-mobile-menu',
        bgPopup: '.bg-popup-wrapper'
    });

}, false);
