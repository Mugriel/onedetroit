<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']); exit;
}
$configPath = dirname(__DIR__) . '/private/config.php';
$config = file_exists($configPath) ? require $configPath : [];
$apiKey = trim($config['openai_api_key'] ?? '');
$model = trim($config['openai_model'] ?? 'gpt-4.1-mini');
$body = json_decode(file_get_contents('php://input'), true);
$signals = $body['signals'] ?? [];
$context = trim($body['context'] ?? '');
if (!is_array($signals) || count($signals) < 2) {
  http_response_code(400);
  echo json_encode(['error' => 'Select at least two signals.']); exit;
}

$fallback = function() use ($signals, $context) {
  $labels = array_map(fn($s) => $s['label'] ?? 'Signal', $signals);
  $name = count($labels) >= 3 ? $labels[0] . ' + ' . $labels[1] . ' Opportunity' : 'Cross-System Opportunity';
  return [
    'source' => 'demo',
    'result' => [
      'opportunity_name' => $name,
      'problem_summary' => 'One Detroit detected several signals from different systems that may create more value when addressed together.',
      'connections_detected' => array_slice(array_map(fn($x) => 'Potential connection: ' . $x, $labels), 0, 5),
      'recommended_strategy' => 'Suggested strategy: convene the relevant agencies and partners around a small pilot that combines the selected needs and assets, then measure outcomes before expansion.',
      'lead_agency' => 'City innovation / coordinating office',
      'supporting_agencies' => ['Relevant city department', 'Public service partner'],
      'partners' => ['Community organization', 'Local employer or nonprofit'],
      'existing_assets' => array_values(array_filter(array_map(fn($s) => ($s['kind'] ?? '') === 'asset' ? ($s['label'] ?? '') : null, $signals))),
      'staffing_needs' => ['Pilot coordinator', 'Program support staff'],
      'contractor_needs' => ['As-needed specialist support'],
      'estimated_budget' => 'Estimated pilot budget — illustrative; requires city review',
      'funding_options' => ['Existing program funds', 'Grant funding', 'Public-private partnership'],
      'hot_spots' => ['Determine using selected signal geography'],
      'expected_outcomes' => ['Reduce duplicated effort', 'Improve resident access', 'Create measurable cross-system value'],
      'assumptions' => ['Selected signals require validation with source agencies', 'No causal relationship is assumed'],
      'evidence_used' => $labels,
      'public_summary' => 'Detroit is exploring a coordinated project that connects existing city resources and community needs so one intervention can create multiple benefits.',
    ]
  ];
};

if ($apiKey === '') {
  echo json_encode($fallback(), JSON_UNESCAPED_SLASHES); exit;
}

$signalText = [];
foreach ($signals as $s) {
  $signalText[] = '- ' . ($s['label'] ?? 'Signal') . ' | category: ' . ($s['category'] ?? 'Other') . ' | type: ' . ($s['kind'] ?? 'need') . ' | source: ' . ($s['source'] ?? 'Unspecified') . ' | detail: ' . ($s['detail'] ?? '');
}

$system = <<<TXT
You are the One Detroit Opportunity Engine, a municipal decision-support assistant.
Your job is to discover useful cross-system opportunities from signals that normally live in different agencies, programs, or datasets.
Do NOT merely summarize the inputs. Look for an unexpected but plausible coordinated intervention that could create multiple outcomes.
Consider: location, timing, population served, demand, existing assets, agencies, employees, contractors, partners, budget feasibility, hot spots, sustainability and public transparency.
Rules:
- Never claim correlation proves causation.
- Never invent legal authority, binding agency commitments, exact procurement facts, or verified budgets.
- Any budget language must be clearly illustrative.
- Make recommendations for human review, not final city decisions.
- public_summary must be plain, welcoming resident language.
TXT;

$user = "Selected signals:\n" . implode("\n", $signalText) . "\n\nAdditional demo context:\n" . ($context ?: 'None') . "\n\nCreate one coordinated opportunity that meaningfully connects the signals.";

$schema = [
  'type' => 'object', 'additionalProperties' => false,
  'required' => ['opportunity_name','problem_summary','connections_detected','recommended_strategy','lead_agency','supporting_agencies','partners','existing_assets','staffing_needs','contractor_needs','estimated_budget','funding_options','hot_spots','expected_outcomes','assumptions','evidence_used','public_summary'],
  'properties' => [
    'opportunity_name'=>['type'=>'string'], 'problem_summary'=>['type'=>'string'],
    'connections_detected'=>['type'=>'array','items'=>['type'=>'string']],
    'recommended_strategy'=>['type'=>'string'], 'lead_agency'=>['type'=>'string'],
    'supporting_agencies'=>['type'=>'array','items'=>['type'=>'string']],
    'partners'=>['type'=>'array','items'=>['type'=>'string']],
    'existing_assets'=>['type'=>'array','items'=>['type'=>'string']],
    'staffing_needs'=>['type'=>'array','items'=>['type'=>'string']],
    'contractor_needs'=>['type'=>'array','items'=>['type'=>'string']],
    'estimated_budget'=>['type'=>'string'],
    'funding_options'=>['type'=>'array','items'=>['type'=>'string']],
    'hot_spots'=>['type'=>'array','items'=>['type'=>'string']],
    'expected_outcomes'=>['type'=>'array','items'=>['type'=>'string']],
    'assumptions'=>['type'=>'array','items'=>['type'=>'string']],
    'evidence_used'=>['type'=>'array','items'=>['type'=>'string']],
    'public_summary'=>['type'=>'string']
  ]
];

$payload = [
  'model' => $model,
  'input' => [
    ['role'=>'system','content'=>$system],
    ['role'=>'user','content'=>$user]
  ],
  'text' => ['format'=>['type'=>'json_schema','name'=>'one_detroit_opportunity','strict'=>true,'schema'=>$schema]]
];

$ch = curl_init('https://api.openai.com/v1/responses');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Authorization: Bearer ' . $apiKey],
  CURLOPT_POSTFIELDS => json_encode($payload),
  CURLOPT_TIMEOUT => 45,
]);
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);
if ($response === false || $status < 200 || $status >= 300) {
  $fb = $fallback();
  $fb['note'] = 'Live AI unavailable; demo fallback used.' . ($error ? ' ' . $error : '');
  echo json_encode($fb, JSON_UNESCAPED_SLASHES); exit;
}
$data = json_decode($response, true);
$text = $data['output_text'] ?? '';
if (!$text && isset($data['output'][0]['content'][0]['text'])) $text = $data['output'][0]['content'][0]['text'];
$result = json_decode($text, true);
if (!is_array($result)) {
  $fb = $fallback(); $fb['note'] = 'AI response could not be parsed; demo fallback used.';
  echo json_encode($fb, JSON_UNESCAPED_SLASHES); exit;
}
echo json_encode(['source'=>'openai','result'=>$result], JSON_UNESCAPED_SLASHES);
