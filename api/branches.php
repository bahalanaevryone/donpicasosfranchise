<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

$db = db();

$branches = rows($db->query("
    SELECT
      branch_code,
      name,
      CONCAT(address_line, ', ', city, IF(province IS NULL OR province = '', '', CONCAT(', ', province))) AS address,
      city,
      province,
      region,
      phone,
      business_hours AS hours,
      status,
      image_url AS image,
      COALESCE(franchise_owner_name, 'TBA') AS franchiseOwner,
      CASE
        WHEN opened_on IS NOT NULL THEN DATE_FORMAT(opened_on, '%M %Y')
        WHEN target_opening_on IS NOT NULL THEN CONCAT('Opening ', DATE_FORMAT(target_opening_on, '%M %Y'))
        ELSE 'TBA'
      END AS openedDate
    FROM branches
    ORDER BY
      FIELD(status, 'operating', 'upcoming', 'paused', 'closed'),
      COALESCE(opened_on, target_opening_on),
      name
"));

$regionStats = rows($db->query("
    SELECT region, COUNT(*) AS total
    FROM branches
    GROUP BY region
    ORDER BY total DESC, region ASC
"));

json_response([
    'branches' => $branches,
    'stats' => [
        'total' => count($branches),
        'operating' => count(array_filter($branches, fn($branch) => $branch['status'] === 'operating')),
        'upcoming' => count(array_filter($branches, fn($branch) => $branch['status'] === 'upcoming')),
        'cities' => count(array_unique(array_map(fn($branch) => $branch['city'], $branches))),
    ],
    'regionStats' => $regionStats,
]);
