import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnH8y38y8YnkV87phTkkB57EUnETnUbag",
    authDomain: "software-testing-tool.firebaseapp.com",
    projectId: "software-testing-tool",
    storageBucket: "software-testing-tool.appspot.com",
    messagingSenderId: "692402590269",
    appId: "1:692402590269:web:0eba6a8518849ace8a1054",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const signupFormContainer = document.getElementById('signupFormContainer');
const signinFormContainer = document.getElementById('signinFormContainer');
const signupBtn = document.getElementById('signup-btn');
const signinBtn = document.getElementById('signin-btn');
const switchToSignInBtn = document.getElementById('switch-to-signin');
const switchToSignUpBtn = document.getElementById('switch-to-signup');

// Helper function to validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Toggle forms
function showSignIn() {
    signupFormContainer.style.display = 'none'; 
    signinFormContainer.style.display = 'block'; 
}

function showSignUp() {
    signupFormContainer.style.display = 'block'; 
    signinFormContainer.style.display = 'none'; 
}

// Sign Up function
async function signUp() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Sign Up Successful:', userCredential.user);
        alert('Sign Up Successful!');
        showSignIn();  // Switch to sign-in form
    } catch (error) {
        console.error('Sign Up Error:', error.message);
        alert(error.message);
    }
}

// Sign In function
async function signIn() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "home.html";
        console.log('Sign In Successful:', userCredential.user);
        alert('Sign In Successful!');
    } catch (error) {
        console.error('Sign In Error:', error.message);
        alert(error.message);
    }
}

// Event listeners for toggling forms
switchToSignInBtn.addEventListener("click", showSignIn);
switchToSignUpBtn.addEventListener("click", showSignUp);

// Event listeners for authentication
signupBtn.addEventListener("click", signUp);
signinBtn.addEventListener("click", signIn);
