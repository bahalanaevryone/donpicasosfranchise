<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

$db = db();

$summary = $db->query('SELECT * FROM dashboard_summary LIMIT 1')->fetch_assoc();

$recentLeads = rows($db->query("
    SELECT
      fl.lead_number AS id,
      CONCAT(fl.first_name, ' ', fl.last_name) AS name,
      fl.email,
      fl.phone,
      REPLACE(fp.name, ' Package', '') AS package_name,
      CONCAT('PHP ', FORMAT(COALESCE(fl.budget_max, fl.budget_min, 0), 0)) AS budget,
      fl.preferred_location AS location,
      DATE(fl.submitted_at) AS submitted_date,
      fl.status
    FROM franchise_leads fl
    LEFT JOIN franchise_packages fp ON fp.id = fl.package_id
    ORDER BY fl.submitted_at DESC, fl.id DESC
    LIMIT 12
"));

$leadsBySource = rows($db->query("
    SELECT
      ls.name AS source,
      COUNT(fl.id) AS count,
      ROUND(COUNT(fl.id) / NULLIF((SELECT COUNT(*) FROM franchise_leads), 0) * 100) AS percentage
    FROM lead_sources ls
    LEFT JOIN franchise_leads fl ON fl.source_id = ls.id
    GROUP BY ls.id, ls.name
    ORDER BY count DESC
"));

$monthlyData = rows($db->query("
    SELECT
      DATE_FORMAT(metric_month, '%Y') AS month,
      total_leads AS leads,
      conversions
    FROM monthly_metrics
    ORDER BY metric_month ASC
"));

$statusOverview = rows($db->query("
    SELECT status, COUNT(*) AS count
    FROM franchise_leads
    GROUP BY status
"));

json_response([
    'summary' => $summary,
    'recentLeads' => $recentLeads,
    'leadsBySource' => $leadsBySource,
    'monthlyData' => $monthlyData,
    'statusOverview' => $statusOverview,
    'lastUpdated' => date('F j, Y g:i A'),
]);
