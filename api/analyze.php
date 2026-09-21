<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

$scenarioName = trim((string)($input['scenario_name'] ?? 'Custom Opportunity'));
$category = trim((string)($input['category'] ?? 'Community'));
$datasets = $input['datasets'] ?? [];
$delivery = $input['delivery_context'] ?? [];
$fallback = $input['fallback_result'] ?? null;

if (!is_array($datasets) || count($datasets) < 2) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Add at least two input signals before analysis.']);
    exit;
}

$configPath = __DIR__ . '/../private/config.php';
$config = file_exists($configPath) ? require $configPath : [];
$apiKey = trim((string)($config['openai_api_key'] ?? getenv('OPENAI_API_KEY') ?: ''));
$model = trim((string)($config['openai_model'] ?? 'gpt-4.1-mini'));

function safe_string($v) {
    return trim((string)$v);
}

function build_fallback($scenarioName, $category, $datasets, $delivery, $fallback) {
    if (is_array($fallback) && !empty($fallback['opportunity_name'])) {
        return $fallback;
    }
    $names = array_values(array_filter(array_map(fn($d) => safe_string($d['name'] ?? ''), $datasets)));
    $sources = array_values(array_filter(array_map(fn($d) => safe_string($d['source'] ?? ''), $datasets)));
    $signals = implode(' + ', array_slice($names, 0, 4));
    $budget = safe_string($delivery['budget'] ?? 'Budget to be validated with city teams');
    $hotspot = safe_string($delivery['hotspots'] ?? 'Pilot location to be identified using neighborhood-level data');
    return [
        'opportunity_name' => $scenarioName ?: 'Cross-System Community Opportunity',
        'problem_summary' => 'Multiple city signals appear to describe needs and assets that are currently managed separately. One Detroit flags them for coordinated human review.',
        'connections_detected' => $names ?: ['Multiple independent city signals may be complementary'],
        'recommended_strategy' => 'Suggested strategy: convene the relevant teams, validate the overlap, and design one pilot that combines the strongest complementary assets and needs.',
        'lead_agency' => safe_string($delivery['lead_agency'] ?? 'Lead agency to be assigned'),
        'supporting_agencies' => array_values(array_filter(array_map('trim', explode(',', safe_string($delivery['agencies'] ?? 'Relevant city departments'))))),
        'partners' => array_values(array_filter(array_map('trim', explode(',', safe_string($delivery['partners'] ?? 'Community and institutional partners'))))),
        'existing_assets' => $names,
        'staffing_needs' => [safe_string($delivery['staffing'] ?? 'Staffing needs to be validated during pilot planning')],
        'contractor_needs' => [safe_string($delivery['contractors'] ?? 'Contractor/vendor needs to be evaluated after scope validation')],
        'estimated_budget' => ($budget ?: 'To be determined') . ' — Estimated pilot budget — illustrative',
        'funding_options' => [safe_string($delivery['funding'] ?? 'Potential grants, city funds, and partner contributions')],
        'hot_spots' => [$hotspot],
        'expected_outcomes' => ['Reduce duplicated effort across systems', 'Create a testable multi-outcome pilot', 'Improve public visibility into why the project exists'],
        'assumptions' => ['Input signals require human validation', 'Correlation does not establish causation', 'Agency capacity and legal requirements must be confirmed'],
        'evidence_used' => $sources ?: ['User-provided demo inputs'],
        'public_summary' => 'One Detroit connected several separate city signals and identified a possible coordinated project for city teams and residents to review.',
    ];
}

$fallbackResult = build_fallback($scenarioName, $category, $datasets, $delivery, $fallback);

if ($apiKey === '') {
    echo json_encode([
        'ok' => true,
        'source' => 'mock',
        'note' => 'Demo engine active — add private/config.php with OPENAI_API_KEY to enable live AI analysis.',
        'result' => $fallbackResult,
    ]);
    exit;
}

$schema = [
    'type' => 'object',
    'additionalProperties' => false,
    'required' => [
        'opportunity_name','problem_summary','connections_detected','recommended_strategy','lead_agency',
        'supporting_agencies','partners','existing_assets','staffing_needs','contractor_needs','estimated_budget',
        'funding_options','hot_spots','expected_outcomes','assumptions','evidence_used','public_summary'
    ],
    'properties' => [
        'opportunity_name' => ['type' => 'string'],
        'problem_summary' => ['type' => 'string'],
        'connections_detected' => ['type' => 'array', 'items' => ['type' => 'string']],
        'recommended_strategy' => ['type' => 'string'],
        'lead_agency' => ['type' => 'string'],
        'supporting_agencies' => ['type' => 'array', 'items' => ['type' => 'string']],
        'partners' => ['type' => 'array', 'items' => ['type' => 'string']],
        'existing_assets' => ['type' => 'array', 'items' => ['type' => 'string']],
        'staffing_needs' => ['type' => 'array', 'items' => ['type' => 'string']],
        'contractor_needs' => ['type' => 'array', 'items' => ['type' => 'string']],
        'estimated_budget' => ['type' => 'string'],
        'funding_options' => ['type' => 'array', 'items' => ['type' => 'string']],
        'hot_spots' => ['type' => 'array', 'items' => ['type' => 'string']],
        'expected_outcomes' => ['type' => 'array', 'items' => ['type' => 'string']],
        'assumptions' => ['type' => 'array', 'items' => ['type' => 'string']],
        'evidence_used' => ['type' => 'array', 'items' => ['type' => 'string']],
        'public_summary' => ['type' => 'string'],
    ],
];

$systemPrompt = <<<'PROMPT'
You are the One Detroit Opportunity Engine, a civic decision-support system.

Your task is to analyze city signals that normally live in separate systems and identify ONE useful cross-system opportunity that would be easy to miss if each dataset were reviewed in isolation.

Look for:
- unrelated needs that could be addressed together;
- underused public assets that could serve another purpose;
- city projects that could be coordinated;
- complementary agency capabilities;
- opportunities where one intervention creates multiple outcomes;
- realistic pilot hot spots based only on the provided context;
- staffing, contractor, partner, timing and funding considerations.

Rules:
- Do not claim causation from correlation.
- Do not invent exact legal requirements or agency commitments.
- Do not invent precise local facts that were not provided.
- Any budget must be explicitly labeled "Estimated pilot budget — illustrative".
- If exact budget data is unavailable, give a clearly illustrative range or say it requires validation.
- Frame agencies, partners and strategies as suggested or potential.
- Human review is required before implementation.
- Keep public_summary plain, useful, and resident-friendly.
- Return only the requested structured output.
PROMPT;

$datasetLines = [];
foreach ($datasets as $d) {
    $datasetLines[] = '- ' . safe_string($d['name'] ?? 'Signal') .
        ' | source: ' . safe_string($d['source'] ?? 'Unspecified') .
        ' | detail: ' . safe_string($d['detail'] ?? '');
}

$deliveryLines = [];
foreach ($delivery as $k => $v) {
    if (safe_string($v) !== '') $deliveryLines[] = '- ' . $k . ': ' . safe_string($v);
}

$userPrompt = "Working scenario: {$scenarioName}\nCategory: {$category}\n\nIndependent inputs:\n" . implode("\n", $datasetLines) .
    "\n\nDelivery / feasibility context:\n" . (count($deliveryLines) ? implode("\n", $deliveryLines) : '- No extra constraints supplied') .
    "\n\nIdentify one cross-system opportunity. The result should explain why the combination is useful, what would need to happen, and what a resident-facing summary should say.";

$payload = [
    'model' => $model,
    'store' => false,
    'input' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user', 'content' => $userPrompt],
    ],
    'text' => [
        'format' => [
            'type' => 'json_schema',
            'name' => 'one_detroit_opportunity',
            'strict' => true,
            'schema' => $schema,
        ],
    ],
];

$ch = curl_init('https://api.openai.com/v1/responses');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 45,
]);
$responseBody = curl_exec($ch);
$httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($responseBody === false || $httpCode < 200 || $httpCode >= 300) {
    echo json_encode([
        'ok' => true,
        'source' => 'mock',
        'note' => 'Live AI was unavailable; demo fallback used.' . ($httpCode ? ' HTTP ' . $httpCode : '') . ($curlError ? ' ' . $curlError : ''),
        'result' => $fallbackResult,
    ]);
    exit;
}

$decoded = json_decode($responseBody, true);
$text = '';
if (isset($decoded['output_text']) && is_string($decoded['output_text'])) {
    $text = $decoded['output_text'];
} elseif (isset($decoded['output']) && is_array($decoded['output'])) {
    foreach ($decoded['output'] as $item) {
        if (($item['type'] ?? '') !== 'message' || !isset($item['content']) || !is_array($item['content'])) continue;
        foreach ($item['content'] as $part) {
            if (($part['type'] ?? '') === 'output_text' && isset($part['text'])) {
                $text .= (string)$part['text'];
            }
        }
    }
}

$parsed = json_decode($text, true);
if (!is_array($parsed) || empty($parsed['opportunity_name'])) {
    echo json_encode([
        'ok' => true,
        'source' => 'mock',
        'note' => 'Live AI returned an unexpected format; demo fallback used.',
        'result' => $fallbackResult,
    ]);
    exit;
}

echo json_encode([
    'ok' => true,
    'source' => 'openai',
    'model' => $model,
    'result' => $parsed,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
