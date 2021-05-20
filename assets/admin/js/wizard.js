$(function () {
    'use strict';
    const form = $("#register-form");
    const stripe = Stripe(stripeApiKey);
    const elements = stripe.elements();
    const cardElement = elements.create('card', {hidePostalCode: true});
    cardElement.mount('#card-element');

    form.validate({
        errorElement: 'strong',
        errorClass: 'is-invalid',
        errorPlacement: function errorPlacement(error, element) {
            element.closest('.form-group').append(error);
            error.addClass('invalid-feedback');
        },
        rules: {
            confirm_password: {
                equalTo: "#password"
            },
            email: {
                email:true,
                remote:`/api/duplicate/email`
            },
            slug: {
                pattern: /^[a-z0-9-]+$/,
                remote:`/api/duplicate/slug`
            },
            color_primary: {
                pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
            },
            color_secondary: {
                pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
            }
        }, messages: {
            email: {
                remote: "This e-mail address is already in use"
            },
            slug: {
                pattern: 'Please enter a correct domain, only a dash (-) is allowed',
                remote: "This domain is already in use"
            },
            color_primary: {
                pattern: 'Please select a correct hex color code'
            },
            color_secondary: {
                pattern: 'Please select a correct hex color code'
            }
        }
    });

    $("#register-wizard").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        onStepChanging: function (event, currentIndex, newIndex) {
            if(currentIndex < newIndex){
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid() & form.valid();
            }
            return true;
        },
        onStepChanged: function(event, currentIndex){
            if(currentIndex === 2){
                cardElement.mount('#card-element');
            }
        },
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: async function (event, currentIndex)  {
            await finishStripe();


        }
    });

    $("#wizardVertical").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        stepsOrientation: 'vertical'
    });

    async function finishStripe(){
        const cardHolderName = document.getElementById('cardholder');

        const { setupIntent, error } = await stripe.handleCardSetup(
            clientSecret, cardElement, {
                payment_method_data: {
                    billing_details: {
                        name: cardHolderName.value
                    }
                }
            }
        );

        console.log('setup intent', setupIntent);
        console.log('setup error', error);

        if (error) {
            // Display "error.message" to the user...
            console.log(error.message);
            alert(error.message);
        } else {
            document.getElementById('payment-method').value = setupIntent.payment_method;
            $("#register-form").submit();
        }
    }
});
