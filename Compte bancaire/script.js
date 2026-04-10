/**
 * FIDELIS BANK - Core Banking System (Simulation)
 * Version: 2.5.0 "Premium Gold"
 */

const BankingApp = (() => {
    // --- 1. CONFIGURATION ET DONNÉES SÉCURISÉES ---
    const CONFIG = {
        sessionKey: 'fidelisBank_Session',
        logoutRedirect: 'index.html',
        loginRedirect: 'index.html?view=dashboard'
    };

    const USER_DATA = {
        credentials: {
            id: "FRANCE-1985-BNP",
            pass: "SecuredAccess2024"
        },
        profile: {
            firstName: "OLIVIER",
            lastName: "BAUME",
            accountNum: "FR76 3000 4000 0000 1234 5678 90",
            balance: 10000000.00,
            credit: -90000.00,
            currency: "EUR",
            status: "Fonds bloqués suite à une Saisie-attribution J. H. du 12/11/2025. Le montant est indisponible."
        },
        transactions: [
            { date: "2025-11-12", label: "AVERTISSEMENT : Frais de Saisie-attribution J. H.", amount: -100.00 },
            { date: "2025-11-07", label: "Virement entrant - Facture 'Beta Consulting'", amount: 75939.55 },
            { date: "2025-11-05", label: "Frais de gestion trimestriels", amount: -150.00 },
            { date: "2025-10-30", label: "Virement entrant - Prêt bancaire débloqué", amount: 250000.00 },
            { date: "2025-10-25", label: "Virement entrant - Paiement client 'Alpha'", amount: 125000.00 }
        ]
    };

    // --- 2. UTILITAIRES DE FORMATAGE ---
    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });

    // --- 3. MOTEUR DE L'APPLICATION ---
    return {
        init() {
            this.bindEvents();
            this.checkSession();
            this.updateCurrentDates();
        },

        bindEvents() {
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => this.handleLogin(e));
            }

            // Délégation d'événement pour le bouton déconnexion (présent sur toutes les pages)
            document.addEventListener('click', (e) => {
                if (e.target.closest('.logout-icon') || e.target.closest('#logoutBtn')) {
                    this.logout();
                }
            });
        },

        handleLogin(e) {
            e.preventDefault();
            const id = document.getElementById('accountId').value.trim();
            const pass = document.getElementById('password').value;
            const errorEl = document.getElementById('errorMessage');

            if (id === USER_DATA.credentials.id && pass === USER_DATA.credentials.pass) {
                localStorage.setItem(CONFIG.sessionKey, 'true');
                // Effet de chargement "Pro"
                const btn = e.target.querySelector('button');
                btn.innerHTML = '<span class="loader"></span> Connexion...';
                btn.style.opacity = '0.7';
                
                setTimeout(() => window.location.href = CONFIG.loginRedirect, 800);
            } else {
                errorEl.textContent = "Accès refusé : Identifiants invalides.";
                errorEl.style.animation = "shake 0.5s";
                setTimeout(() => errorEl.style.animation = "", 500);
            }
        },

        checkSession() {
            const isLoggedIn = localStorage.getItem(CONFIG.sessionKey) === 'true';
            const urlParams = new URLSearchParams(window.location.search);
            const isDashboardView = urlParams.get('view') === 'dashboard' || !window.location.pathname.includes('index.html');

            if (isLoggedIn) {
                this.renderDashboard();
            } else if (isDashboardView) {
                this.logout(); // Sécurité : déconnexion si accès direct à une page dashboard
            }
        },

        renderDashboard() {
            // Affichage des sections
            this.toggleUI(true);

            // Injection des données profil
            this.safeSetText('clientNameHeaderIcon', `M. ${USER_DATA.profile.lastName}`);
            this.safeSetText('clientNameHeader', `${USER_DATA.profile.firstName} ${USER_DATA.profile.lastName}`);
            this.safeSetText('currentBalance', formatter.format(USER_DATA.profile.balance));
            this.safeSetText('accountStatus', USER_DATA.profile.status);
            
            // Gestion du montant crédit (rouge)
            const creditEl = document.querySelector('.credit-amount');
            if (creditEl) creditEl.textContent = formatter.format(USER_DATA.profile.credit);

            this.renderTransactions();
        },

        renderTransactions() {
            const tbody = document.getElementById('transactionBody');
            if (!tbody) return;

            tbody.innerHTML = USER_DATA.transactions.map(tx => `
                <tr class="fade-in">
                    <td>${tx.date}</td>
                    <td><strong>${tx.label}</strong></td>
                    <td class="${tx.amount > 0 ? 'credit' : 'debit'}">
                        ${tx.amount > 0 ? '+' : ''}${formatter.format(tx.amount)}
                    </td>
                </tr>
            `).join('');
        },

        toggleUI(loggedIn) {
            const loginSection = document.getElementById('loginSection') || document.querySelector('.login-container');
            const dashboard = document.getElementById('dashboardSection') || document.querySelector('.dashboard-wrapper');
            const iconNav = document.querySelector('.icon-nav');

            if (loginSection) loginSection.style.display = loggedIn ? 'none' : 'block';
            if (dashboard) dashboard.style.display = loggedIn ? 'flex' : 'none';
            if (iconNav) iconNav.style.display = loggedIn ? 'flex' : 'none';
        },

        logout() {
            localStorage.removeItem(CONFIG.sessionKey);
            window.location.href = CONFIG.logoutRedirect;
        },

        // Aideurs (Helpers)
        safeSetText(id, text) {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        },

        updateCurrentDates() {
            const now = new Date().toLocaleDateString('fr-FR');
            ['currentDate', 'currentDate2'].forEach(id => this.safeSetText(id, now));
        }
    };
})();

// Lancement au chargement du DOM
document.addEventListener('DOMContentLoaded', () => BankingApp.init());