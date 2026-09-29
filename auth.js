```javascript
// ===============================
// MESSAGE FUNCTION
// ===============================

const message = (id, text, success = false) => {
    const target = document.getElementById(id);

    if (!target) return;

    target.textContent = text;
    target.classList.toggle('success', success);
};


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

document.querySelectorAll('[data-toggle]').forEach(button => {

    button.addEventListener('click', () => {

        const input = document.getElementById(button.dataset.toggle);

        if (!input) return;

        const visible = input.type === 'text';

        input.type = visible ? 'password' : 'text';

        button.textContent = visible ? 'Show' : 'Hide';

    });

});


// ===============================
// REGISTER FORM
// ===============================

const registerForm = document.getElementById('registerForm');

if (registerForm) {

    registerForm.addEventListener('submit', event => {

        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim().toLowerCase();
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms');

        // Stop PHP submission ONLY when validation fails
        if (!name || !email || !password || !confirm) {

            event.preventDefault();

            message(
                'registerMessage',
                'Please complete all required fields.'
            );

            return;
        }


        // Email validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {

            event.preventDefault();

            message(
                'registerMessage',
                'Enter a valid email address.'
            );

            return;
        }


        // Password length
        if (password.length < 8) {

            event.preventDefault();

            message(
                'registerMessage',
                'Use at least 8 characters for your password.'
            );

            return;
        }


        // Password confirmation
        if (password !== confirm) {

            event.preventDefault();

            message(
                'registerMessage',
                'Your passwords do not match.'
            );

            return;
        }


        // Terms
        if (!terms.checked) {

            event.preventDefault();

            message(
                'registerMessage',
                'Please agree to the terms to continue.'
            );

            return;
        }


        /*
         IMPORTANT:

         We DO NOT use event.preventDefault()
         here because we want PHP to receive
         the form.

         PHP will handle:
         - Checking username
         - Saving the account
         - Database errors
         */

    });

}


// ===============================
// LOGIN FORM
// ===============================

const loginForm = document.getElementById('loginForm');

if (loginForm) {

    loginForm.addEventListener('submit', event => {

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('loginPassword').value;


        // Username
        if (!username) {

            event.preventDefault();

            message(
                'loginMessage',
                'Please enter your username.'
            );

            return;
        }


        // Password
        if (!password) {

            event.preventDefault();

            message(
                'loginMessage',
                'Please enter your password.'
            );

            return;
        }


        /*
         IMPORTANT:

         If everything is valid, we DON'T
         prevent the default submission.

         The form will go to:

         login.php

         PHP will check the database.
         */

    });

}


// ===============================
// FORGOT PASSWORD
// ===============================

const forgotPassword = document.getElementById('forgotPassword');

if (forgotPassword) {

    forgotPassword.addEventListener('click', () => {

        message(
            'loginMessage',
            'Password reset is not connected yet.'
        );

    });

}
```
