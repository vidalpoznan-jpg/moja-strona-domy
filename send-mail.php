<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Dozwolona tylko metoda POST.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name    = trim($input['name'] ?? '');
$phone   = trim($input['phone'] ?? '');
$email   = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

// --- Walidacja ---
$errors = [];

if ($name === '') {
    $errors[] = 'Imię i nazwisko jest wymagane.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Podaj poprawny adres email.';
}
if ($message === '') {
    $errors[] = 'Wiadomość jest wymagana.';
}
if ($phone !== '' && !preg_match('/^[\d\s\+\-()]{6,20}$/', $phone)) {
    $errors[] = 'Podaj poprawny numer telefonu.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// --- Przygotowanie maila ---
$to = 'vidal.ajtner@gmail.com';
$mailSubject = $subject !== '' ? $subject : 'Wiadomość ze strony VIDAL';

$body  = "Imię i nazwisko: $name\n";
$body .= "Email: $email\n";
$body .= "Telefon: " . ($phone !== '' ? $phone : 'nie podano') . "\n";
$body .= "Temat: " . ($subject !== '' ? $subject : 'brak') . "\n";
$body .= "---\n\n$message\n";

$headers  = "From: noreply@" . ($_SERVER['SERVER_NAME'] ?? 'vidal-domy.pl') . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, "=?UTF-8?B?" . base64_encode($mailSubject) . "?=", $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Wiadomość została wysłana.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.']);
}
