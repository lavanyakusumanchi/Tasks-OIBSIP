document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const messageDiv = document.getElementById('message');
    const loginUsernameInput = document.getElementById('login-username');

    function displayAlert(message, isError = false) {
        alert(message);
    }

    function displayMessage(message, isError = false) {
        messageDiv.textContent = message;
        messageDiv.style.color = isError ? 'red' : 'green';
    }

    function showForm(form) {
        document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
        form.classList.add('active');
    }

    function validatePassword(password) {
        if (password.length < 8) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/[a-z]/.test(password)) {
            return false;
        }
        if (!/\d/.test(password)) {
            return false;
        }
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
            return false;
        }
        return true;
    }
    showForm(registerForm);
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        if (localStorage.getItem(username)) {
            displayMessage('User already exists. Please login.', true);
            showForm(loginForm);
        } else {
            if (!validatePassword(password)) {
                displayMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.', true);
            } else {
                localStorage.setItem(username, password);
                displayMessage('Registration successful! Please login.', false);
                showForm(loginForm);
            }
        }
    });
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            displayAlert('Login successful! Welcome, ' + username);
            window.location.href = 'user page.html';
        } else {
            displayMessage('Invalid username or password.', true);
        }
    });
    const forgotPasswordButton = document.getElementById('forgot-password');
    forgotPasswordButton.addEventListener('click', () => {
        const username = loginUsernameInput.value.trim();
        if (localStorage.getItem(username)) {
            let newPassword = prompt('Enter your new password:');
            const confirmPassword = prompt('Confirm your new password:');
            if (newPassword && confirmPassword && newPassword === confirmPassword) {
                if (!validatePassword(newPassword)) {
                    displayAlert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.', true);
                } else {
                    localStorage.setItem(username, newPassword);
                    displayAlert('Password changed successfully!');
                }
            } else {
                displayAlert('Passwords do not match. Please try again.', true);
            }
        } else {
            displayAlert('User not found. Please enter a valid username.', true);
        }
    });
    loginUsernameInput.addEventListener('input', () => {
        const username = loginUsernameInput.value;
        if (localStorage.getItem(username)) {
            showForm(loginForm);
            displayMessage('User exists. Please enter your password.', false);
        }
    });
});
