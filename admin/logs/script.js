// Array to store login credentials
        const loginCredentials = [
            { id: 'admin001', password: 'admin123', role: 'ULB Admin' },
            {id: 'suar', password: '123', role: 'ULB Admin' },
            { id: 'champion001', password: 'green123', role: 'Green Champion' },
            { id: 'supervisor001', password: 'depot123', role: 'Depot Supervisor' },
            { id: 'analyst001', password: 'data123', role: 'Data Analyst' }
        ];

        // Get form elements
        const loginForm = document.getElementById('adminLoginForm');
        const statusMessage = document.getElementById('statusMessage');
        const loginContainer = document.getElementById('loginForm');
        const successContainer = document.getElementById('successPage');

        // Handle form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from submitting normally
            
            // Get form values
            const role = document.getElementById('role').value;
            const adminId = document.getElementById('adminId').value;
            const password = document.getElementById('password').value;
            
            // Check if all fields are filled
            if (!role || !adminId || !password) {
                showStatusMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Check credentials against the array
            const user = loginCredentials.find(credential => 
                credential.id === adminId && 
                credential.password === password && 
                credential.role === role
            );
            
            if (user) {
                // Login successful
                showStatusMessage('Login successful!', 'success');
                console.log('Logged in as:', user);
                
                // Show success page after a short delay
                setTimeout(() => {
                    redirecttorole(role);
                }, 1000);
            } else {
                // Login failed
                showStatusMessage('Invalid credentials. Please check your ID, password, and role.', 'error');
            }
        });



        function redirecttorole(user){
            if (user = 'ULB Admin'){
                window.location.href = 'admin/dashboard.html';
            }
            else if (user = 'Green Champion'){
                window.location.href = 'champion/dashboard.html';
            }
            else if (user = 'Depot Supervisor'){
                window.location.href = 'supervisor/dashboard.html';
            }
            else{
                window.location.href = 'index.html';
            }
        }



        // Function to show status messages
        function showStatusMessage(message, type) {
            statusMessage.textContent = message;
            statusMessage.className = 'status-message status-' + type;
            statusMessage.classList.remove('hidden');
        }
        const target = routes[user.role] || '../dashboard.html';

        window.location.href = target;


        // Function to show success page
        function showSuccessPage(user) {
            // Update success page content
            document.getElementById('userRole').textContent = 'Role: ' + user.role;
            document.getElementById('userId').textContent = 'ID: ' + user.id;
            
            // Hide login form and show success page
            loginContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
        }



        // Function to handle logout
        function logout() {
            // Clear form fields
            document.getElementById('role').value = '';
            document.getElementById('adminId').value = '';
            document.getElementById('password').value = '';
            
            // Hide status message
            statusMessage.classList.add('hidden');
            
            // Show login form and hide success page
            successContainer.classList.add('hidden');
            loginContainer.classList.remove('hidden');
        }