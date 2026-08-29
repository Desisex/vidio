// Auth state management
let currentUser = null;

// Check auth state
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        document.getElementById('authBtn').textContent = 'Dashboard';
        document.getElementById('authBtn').onclick = () => {
            window.location.href = 'dashboard.html';
        };
        checkUserAccess(user.uid);
    } else {
        currentUser = null;
        document.getElementById('authBtn').textContent = 'Login';
        document.getElementById('authBtn').onclick = openAuthModal;
    }
});

// Open auth modal
function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

// Close modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        this.closest('.modal').style.display = 'none';
    };
});

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        document.getElementById('authModal').style.display = 'none';
        alert('Login successful!');
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
});

// Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        // Create user document in Firestore
        await db.collection('users').doc(userCredential.user.uid).set({
            email: email,
            hasAccess: false,
            accessExpiry: null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('authModal').style.display = 'none';
        alert('Account created successfully!');
    } catch (error) {
        alert('Signup failed: ' + error.message);
    }
});

// Toggle between login and signup
document.getElementById('signupToggle').onclick = (e) => {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
};

document.getElementById('loginToggle').onclick = (e) => {
    e.preventDefault();
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
};
