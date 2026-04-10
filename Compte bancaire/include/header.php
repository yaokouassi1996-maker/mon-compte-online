<?php 
// -----------------------------------------------------------
// Simule la vérification de session côté serveur
// L'état est géré par la redirection JS/LocalStorage, donc 
// nous ne faisons qu'afficher la structure de base.
// -----------------------------------------------------------

// L'état de connexion est géré par JavaScript/LocalStorage
// En PHP simple, nous allons afficher la structure complète du header pour le moment.
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fidelis Bank</title> 
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div id="fullHeader"> 
        <header>
            <div class="header-content">
                <div class="logo-area">
                    <h1><span class="logo-accent">FIDELIS</span> BANK</h1>
                    <p class="tagline">La banque et l'assurance d'un monde qui change</p>
                </div>
                <div class="icon-nav">
                    <button class="icon-btn"><span class="icon">🔍</span></button>
                    <button class="icon-btn"><span class="icon">📄</span></button>
                    <button class="icon-btn message-icon">
                        <span class="icon">✉️</span>
                        <span class="notification">3</span>
                    </button>
                    <button class="icon-btn user-profile">
                        <span class="icon">👤</span> 
                        <span id="clientNameHeaderIcon"></span>
                    </button>
                    <a href="deconnexion.php" class="icon-btn logout-icon" id="logoutButtonHeader" title="Se Déconnecter">
                        <span class="icon">🚪</span>
                    </a>
                </div>
            </div>
        </header>
    </div>