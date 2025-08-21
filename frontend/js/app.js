// Adopet Web Application - Main JavaScript File

// Global variables
let currentUser = null;
let authToken = null;
let selectedPet = null;
let loginAttempts = 0;
let isUserBlocked = false;

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Initialize Materialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidenav
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems);
    
    // Initialize form validation
    M.updateTextFields();
    
    // Check if user is already logged in
    checkAuthStatus();
    
    // Setup event listeners
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Login form submission
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Forgot password form submission
    document.getElementById('forgot-password-form').addEventListener('submit', handleForgotPassword);
}

// Check authentication status
function checkAuthStatus() {
    const savedToken = localStorage.getItem('adopet_token');
    const savedUser = localStorage.getItem('adopet_user');
    
    if (savedToken && savedUser) {
        authToken = savedToken;
        currentUser = JSON.parse(savedUser);
        showAuthenticatedUI();
    } else {
        showLogin();
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    // Check if user is blocked
    if (isUserBlocked) {
        showToast('Usuário bloqueado por múltiplas tentativas. Tente novamente em 15 minutos.', 'error');
        return;
    }
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validate fields
    if (!email || !password) {
        showToast('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Entrando...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Login successful
            authToken = data.token;
            currentUser = data.user;
            loginAttempts = 0;
            isUserBlocked = false;
            
            // Save to localStorage
            localStorage.setItem('adopet_token', authToken);
            localStorage.setItem('adopet_user', JSON.stringify(currentUser));
            
            // Show success message and redirect
            showToast('Login realizado com sucesso!', 'success');
            setTimeout(() => {
                showAuthenticatedUI();
            }, 1000);
            
        } else {
            // Login failed
            loginAttempts++;
            
            if (data.error === 'Usuário bloqueado') {
                isUserBlocked = true;
                showToast('Usuário bloqueado por múltiplas tentativas de login. Tente novamente em 15 minutos.', 'error');
            } else {
                const remainingAttempts = 3 - loginAttempts;
                if (remainingAttempts > 0) {
                    showToast(`Usuário ou senha inválidos, tente novamente. Tentativas restantes: ${remainingAttempts}`, 'error');
                } else {
                    showToast('Muitas tentativas de login. Usuário bloqueado por 15 minutos.', 'error');
                    isUserBlocked = true;
                    
                    // Unblock user after 15 minutes
                    setTimeout(() => {
                        isUserBlocked = false;
                        loginAttempts = 0;
                        showToast('Usuário desbloqueado. Tente fazer login novamente.', 'info');
                    }, 15 * 60 * 1000);
                }
            }
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showToast('Erro ao conectar com o servidor. Tente novamente.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Handle forgot password form submission
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('reset-email').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    
    // Validate fields
    if (!email || !newPassword) {
        showToast('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Processando...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, newPassword })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showToast('Senha alterada com sucesso!', 'success');
            setTimeout(() => {
                showLogin();
                // Clear form
                document.getElementById('reset-email').value = '';
                document.getElementById('new-password').value = '';
                M.updateTextFields();
            }, 1500);
        } else {
            showToast(data.message || 'Erro ao alterar senha.', 'error');
        }
        
    } catch (error) {
        console.error('Password reset error:', error);
        showToast('Erro ao conectar com o servidor. Tente novamente.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Show authenticated UI
function showAuthenticatedUI() {
    // Hide login sections
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('forgot-password-section').style.display = 'none';
    
    // Show navigation items
    document.getElementById('nav-home').style.display = 'block';
    document.getElementById('nav-pets').style.display = 'block';
    document.getElementById('nav-logout').style.display = 'block';
    document.getElementById('mobile-nav-home').style.display = 'block';
    document.getElementById('mobile-nav-pets').style.display = 'block';
    document.getElementById('mobile-nav-logout').style.display = 'block';
    
    // Show home section
    showHome();
}

// Show login section
function showLogin() {
    hideAllSections();
    document.getElementById('login-section').style.display = 'block';
    
    // Hide navigation items
    document.getElementById('nav-home').style.display = 'none';
    document.getElementById('nav-pets').style.display = 'none';
    document.getElementById('nav-logout').style.display = 'none';
    document.getElementById('mobile-nav-home').style.display = 'none';
    document.getElementById('mobile-nav-pets').style.display = 'none';
    document.getElementById('mobile-nav-logout').style.display = 'none';
}

// Show forgot password section
function showForgotPassword() {
    hideAllSections();
    document.getElementById('forgot-password-section').style.display = 'block';
}

// Show home section
async function showHome() {
    hideAllSections();
    document.getElementById('home-section').style.display = 'block';
    
    // Update user info
    if (currentUser) {
        document.getElementById('user-info').innerHTML = `
            <strong>Nome:</strong> ${currentUser.name}<br>
            <strong>Email:</strong> ${currentUser.email}
        `;
    }
}

// Show pets section
async function showPets() {
    hideAllSections();
    document.getElementById('pets-section').style.display = 'block';
    
    // Load pets
    await loadPets();
}

// Load pets from API
async function loadPets() {
    try {
        const response = await fetch(`${API_BASE_URL}/pets`);
        const data = await response.json();
        
        if (response.ok && data.success) {
            displayPets(data.pets);
        } else {
            showToast('Erro ao carregar pets.', 'error');
        }
        
    } catch (error) {
        console.error('Error loading pets:', error);
        showToast('Erro ao conectar com o servidor.', 'error');
    }
}

// Display pets in grid
function displayPets(pets) {
    const petsGrid = document.getElementById('pets-grid');
    petsGrid.innerHTML = '';
    
    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.className = 'col s12 m6 l4';
        petCard.innerHTML = `
            <div class="card pet-card" data-pet-id="${pet.id}" onclick="selectPet(${pet.id})">
                <div class="card-image">
                    <img src="${pet.image}" alt="${pet.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Pet+Image'">
                </div>
                <div class="card-content">
                    <span class="card-title">${pet.name}</span>
                    <div class="pet-info">
                        <strong>Espécie:</strong> ${pet.species}<br>
                        <strong>Raça:</strong> ${pet.breed}<br>
                        <strong>Idade:</strong> ${pet.age} anos
                    </div>
                    <div class="pet-description">${pet.description}</div>
                </div>
            </div>
        `;
        petsGrid.appendChild(petCard);
    });
}

// Select a pet
function selectPet(petId) {
    // Remove previous selection
    const previousSelected = document.querySelector('.pet-card.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    
    // Add selection to clicked pet
    const petCard = document.querySelector(`[data-pet-id="${petId}"]`);
    if (petCard) {
        petCard.classList.add('selected');
        selectedPet = petId;
        
        // Enable adopt button
        document.getElementById('adopt-btn').disabled = false;
        
        showToast(`Pet ${petCard.querySelector('.card-title').textContent} selecionado!`, 'info');
    }
}

// Adopt selected pet
async function adoptPet() {
    if (!selectedPet) {
        showToast('Pet não escolhido, deseja continuar essa ação', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/pets/adopt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ petId: selectedPet })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message fade-in';
            successMessage.innerHTML = `
                <h5>🎉 Adoção Realizada com Sucesso!</h5>
                <p>${data.message}</p>
                <p><strong>Pet:</strong> ${data.pet.name} (${data.pet.species} - ${data.pet.breed})</p>
            `;
            
            // Insert before pets grid
            const petsGrid = document.getElementById('pets-grid');
            petsGrid.parentNode.insertBefore(successMessage, petsGrid);
            
            // Reset selection
            selectedPet = null;
            document.getElementById('adopt-btn').disabled = true;
            
            // Remove selection from UI
            const selectedCard = document.querySelector('.pet-card.selected');
            if (selectedCard) {
                selectedCard.classList.remove('selected');
            }
            
            showToast('Pet adotado com sucesso!', 'success');
            
        } else {
            showToast(data.message || 'Erro ao adotar pet.', 'error');
        }
        
    } catch (error) {
        console.error('Adoption error:', error);
        showToast('Erro ao conectar com o servidor.', 'error');
    }
}

// Cancel adoption
function cancelAdoption() {
    if (selectedPet) {
        // Remove selection
        const selectedCard = document.querySelector('.pet-card.selected');
        if (selectedCard) {
            selectedCard.classList.remove('selected');
        }
        
        selectedPet = null;
        document.getElementById('adopt-btn').disabled = true;
        
        showToast('Adoção cancelada.', 'info');
    } else {
        showToast('Nenhum pet selecionado para cancelar.', 'info');
    }
}

// Logout function
function logout() {
    // Clear authentication data
    authToken = null;
    currentUser = null;
    selectedPet = null;
    loginAttempts = 0;
    isUserBlocked = false;
    
    // Clear localStorage
    localStorage.removeItem('adopet_token');
    localStorage.removeItem('adopet_user');
    
    // Reset UI
    showLogin();
    
    // Clear forms
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    M.updateTextFields();
    
    showToast('Logout realizado com sucesso!', 'success');
}

// Hide all sections
function hideAllSections() {
    const sections = [
        'login-section',
        'forgot-password-section',
        'home-section',
        'pets-section'
    ];
    
    sections.forEach(sectionId => {
        document.getElementById(sectionId).style.display = 'none';
    });
}

// Show toast message
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add to container
    const container = document.getElementById('toast-container');
    container.appendChild(toast);
    
    // Show toast
    M.toast({
        html: message,
        classes: type,
        displayLength: 4000,
        activationPercent: 0.8
    });
    
    // Auto-remove after display
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 4500);
}

// Utility function to format error messages
function formatErrorMessage(error) {
    if (typeof error === 'string') {
        return error;
    }
    
    if (error.message) {
        return error.message;
    }
    
    if (error.error) {
        return error.error;
    }
    
    return 'Erro desconhecido ocorreu.';
}

// Handle API errors
function handleApiError(error, defaultMessage = 'Erro ao processar requisição') {
    console.error('API Error:', error);
    
    if (error.status === 401) {
        showToast('Sessão expirada. Faça login novamente.', 'error');
        setTimeout(() => {
            logout();
        }, 2000);
    } else if (error.status === 403) {
        showToast('Acesso negado.', 'error');
    } else if (error.status === 404) {
        showToast('Recurso não encontrado.', 'error');
    } else if (error.status === 500) {
        showToast('Erro interno do servidor.', 'error');
    } else {
        showToast(defaultMessage, 'error');
    }
}

// Export functions for global access
window.showLogin = showLogin;
window.showForgotPassword = showForgotPassword;
window.showHome = showHome;
window.showPets = showPets;
window.selectPet = selectPet;
window.adoptPet = adoptPet;
window.cancelAdoption = cancelAdoption;
window.logout = logout;
