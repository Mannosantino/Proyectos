<?php
header('Content-Type: application/json; charset=utf-8');

$accessToken = getenv('MERCADO_PAGO_ACCESS_TOKEN');

if (!$accessToken) {
    http_response_code(500);
    echo json_encode(['error' => 'Falta configurar MERCADO_PAGO_ACCESS_TOKEN']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);

if (!is_array($payload) || empty($payload['items'])) {
    http_response_code(400);
    echo json_encode(['error' => 'La solicitud debe incluir al menos un producto']);
    exit;
}

$preference = [
    'items' => array_map(static function ($item) {
        return [
            'title' => (string) ($item['title'] ?? 'Producto'),
            'quantity' => max(1, (int) ($item['quantity'] ?? 1)),
            'unit_price' => (float) ($item['unit_price'] ?? 0),
            'currency_id' => 'ARS',
        ];
    }, $payload['items']),
];

$curl = curl_init('https://api.mercadopago.com/checkout/preferences');
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($preference),
]);

$response = curl_exec($curl);
$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['error' => 'No se pudo conectar con Mercado Pago']);
    curl_close($curl);
    exit;
}

curl_close($curl);
http_response_code($status);
echo $response;
