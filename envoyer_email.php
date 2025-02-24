<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "votre_email@exemple.com";  // L'adresse email où vous voulez recevoir les messages
    $subject = "Nouveau message de " . $nom;
    $body = "Message de : $nom\nEmail : $email\n\n$message";

    // Envoi de l'email
    if (mail($to, $subject, $body)) {
        echo "Message envoyé avec succès!";
    } else {
        echo "Échec de l'envoi du message.";
    }
}
?>