-- Don Picaso's House Of Franchise franchise system database
-- Import this file in phpMyAdmin. It creates the database, tables, indexes,
-- useful reporting views, and starter data used by the current prototype.

CREATE DATABASE IF NOT EXISTS don_picasos_franchise
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE don_picasos_franchise;

SET FOREIGN_KEY_CHECKS = 0;

DROP VIEW IF EXISTS dashboard_summary;
DROP VIEW IF EXISTS lead_status_summary;
DROP VIEW IF EXISTS branch_status_summary;

DROP TABLE IF EXISTS lead_activities;
DROP TABLE IF EXISTS franchise_leads;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS branch_staff;
DROP TABLE IF EXISTS branches;
DROP TABLE IF EXISTS package_features;
DROP TABLE IF EXISTS roi_projections;
DROP TABLE IF EXISTS franchise_packages;
DROP TABLE IF EXISTS lead_sources;
DROP TABLE IF EXISTS monthly_metrics;
DROP TABLE IF EXISTS admin_users;

-- New end-user applicant/auth tables (for register/login from the Opportunity Options flow)
DROP TABLE IF EXISTS opportunity_applications;
DROP TABLE IF EXISTS applicant_users;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE admin_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin', 'admin', 'manager', 'staff') NOT NULL DEFAULT 'staff',
  status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  last_login_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_users_email (email)
) ENGINE=InnoDB;

-- Applicant table used for register/login (end users submitting opportunity applications)
CREATE TABLE applicant_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(40) NULL,
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  last_login_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_applicant_users_email (email)
) ENGINE=InnoDB;

-- Opportunity applications created from Opportunity Options (Business Rebranding / Supply Distribution / Ready-to-Cook Products)
CREATE TABLE opportunity_applications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  applicant_id BIGINT UNSIGNED NOT NULL,
  package_id BIGINT UNSIGNED NOT NULL,
  inquiry_type ENUM('franchise', 'investment', 'locations', 'general') NOT NULL DEFAULT 'franchise',
  investment_budget VARCHAR(120) NULL,
  preferred_location VARCHAR(160) NULL,
  message TEXT NULL,
  status ENUM('submitted', 'new', 'contacted', 'meeting', 'qualified', 'converted', 'lost') NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_opportunity_applications_applicant (applicant_id),
  KEY idx_opportunity_applications_package (package_id),
  CONSTRAINT fk_opportunity_applications_applicant
    FOREIGN KEY (applicant_id) REFERENCES applicant_users (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_opportunity_applications_package
    FOREIGN KEY (package_id) REFERENCES franchise_packages (id)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE franchise_packages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  package_code VARCHAR(40) NOT NULL,
  name VARCHAR(120) NOT NULL,
  description TEXT NULL,
  investment_min DECIMAL(14,2) NOT NULL,
  investment_max DECIMAL(14,2) NULL,
  currency CHAR(3) NOT NULL DEFAULT 'PHP',
  is_recommended TINYINT(1) NOT NULL DEFAULT 0,
  display_order INT UNSIGNED NOT NULL DEFAULT 0,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_franchise_packages_code (package_code)
) ENGINE=InnoDB;

CREATE TABLE package_features (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  package_id BIGINT UNSIGNED NOT NULL,
  feature_text VARCHAR(255) NOT NULL,
  display_order INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_package_features_package (package_id),
  CONSTRAINT fk_package_features_package
    FOREIGN KEY (package_id) REFERENCES franchise_packages (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE roi_projections (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  package_id BIGINT UNSIGNED NOT NULL,
  metric_name VARCHAR(120) NOT NULL,
  min_value DECIMAL(14,2) NULL,
  max_value DECIMAL(14,2) NULL,
  unit VARCHAR(40) NOT NULL DEFAULT 'PHP',
  display_text VARCHAR(120) NOT NULL,
  display_order INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_roi_package (package_id),
  CONSTRAINT fk_roi_package
    FOREIGN KEY (package_id) REFERENCES franchise_packages (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE branches (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  branch_code VARCHAR(40) NOT NULL,
  name VARCHAR(160) NOT NULL,
  address_line VARCHAR(255) NOT NULL,
  city VARCHAR(120) NOT NULL,
  province VARCHAR(120) NULL,
  region VARCHAR(120) NULL,
  country VARCHAR(80) NOT NULL DEFAULT 'Philippines',
  phone VARCHAR(40) NULL,
  email VARCHAR(180) NULL,
  business_hours VARCHAR(120) NULL,
  status ENUM('operating', 'upcoming', 'closed', 'paused') NOT NULL DEFAULT 'upcoming',
  franchise_owner_name VARCHAR(160) NULL,
  opened_on DATE NULL,
  target_opening_on DATE NULL,
  image_url VARCHAR(500) NULL,
  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_branches_code (branch_code),
  KEY idx_branches_status (status),
  KEY idx_branches_city (city)
) ENGINE=InnoDB;

CREATE TABLE branch_staff (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  branch_id BIGINT UNSIGNED NOT NULL,
  full_name VARCHAR(160) NOT NULL,
  role VARCHAR(100) NOT NULL,
  phone VARCHAR(40) NULL,
  email VARCHAR(180) NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_branch_staff_branch (branch_id),
  CONSTRAINT fk_branch_staff_branch
    FOREIGN KEY (branch_id) REFERENCES branches (id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE lead_sources (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(255) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_lead_sources_name (name)
) ENGINE=InnoDB;

CREATE TABLE franchise_leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_number VARCHAR(40) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  inquiry_type ENUM('franchise', 'investment', 'locations', 'general') NOT NULL DEFAULT 'franchise',
  package_id BIGINT UNSIGNED NULL,
  source_id BIGINT UNSIGNED NULL,
  budget_min DECIMAL(14,2) NULL,
  budget_max DECIMAL(14,2) NULL,
  preferred_location VARCHAR(160) NULL,
  message TEXT NULL,
  status ENUM('new', 'contacted', 'meeting', 'qualified', 'converted', 'lost', 'closed') NOT NULL DEFAULT 'new',
  priority ENUM('low', 'normal', 'high', 'urgent') NOT NULL DEFAULT 'normal',
  assigned_to BIGINT UNSIGNED NULL,
  next_follow_up_at DATETIME NULL,
  converted_branch_id BIGINT UNSIGNED NULL,
  submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_franchise_leads_number (lead_number),
  KEY idx_franchise_leads_status (status),
  KEY idx_franchise_leads_submitted (submitted_at),
  KEY idx_franchise_leads_package (package_id),
  KEY idx_franchise_leads_source (source_id),
  KEY idx_franchise_leads_assigned (assigned_to),
  CONSTRAINT fk_franchise_leads_package
    FOREIGN KEY (package_id) REFERENCES franchise_packages (id)
    ON DELETE SET NULL,
  CONSTRAINT fk_franchise_leads_source
    FOREIGN KEY (source_id) REFERENCES lead_sources (id)
    ON DELETE SET NULL,
  CONSTRAINT fk_franchise_leads_assigned
    FOREIGN KEY (assigned_to) REFERENCES admin_users (id)
    ON DELETE SET NULL,
  CONSTRAINT fk_franchise_leads_branch
    FOREIGN KEY (converted_branch_id) REFERENCES branches (id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE lead_activities (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  admin_user_id BIGINT UNSIGNED NULL,
  activity_type ENUM('note', 'call', 'email', 'meeting', 'status_change', 'follow_up') NOT NULL,
  subject VARCHAR(180) NOT NULL,
  details TEXT NULL,
  old_status VARCHAR(40) NULL,
  new_status VARCHAR(40) NULL,
  activity_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_lead_activities_lead (lead_id),
  KEY idx_lead_activities_user (admin_user_id),
  CONSTRAINT fk_lead_activities_lead
    FOREIGN KEY (lead_id) REFERENCES franchise_leads (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_lead_activities_user
    FOREIGN KEY (admin_user_id) REFERENCES admin_users (id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE contact_messages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  inquiry_type ENUM('franchise', 'investment', 'locations', 'general') NOT NULL DEFAULT 'general',
  investment_budget VARCHAR(120) NULL,
  preferred_location VARCHAR(160) NULL,
  message TEXT NOT NULL,
  lead_id BIGINT UNSIGNED NULL,
  status ENUM('unread', 'read', 'replied', 'archived') NOT NULL DEFAULT 'unread',
  submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contact_messages_status (status),
  KEY idx_contact_messages_submitted (submitted_at),
  KEY idx_contact_messages_lead (lead_id),
  CONSTRAINT fk_contact_messages_lead
    FOREIGN KEY (lead_id) REFERENCES franchise_leads (id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE monthly_metrics (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  metric_month DATE NOT NULL,
  total_leads INT UNSIGNED NOT NULL DEFAULT 0,
  conversions INT UNSIGNED NOT NULL DEFAULT 0,
  total_revenue DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  notes VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_monthly_metrics_month (metric_month)
) ENGINE=InnoDB;

INSERT INTO admin_users (full_name, email, password_hash, role, status)
VALUES
  ('System Administrator', 'admin@donpicasos.ph', '$2y$12$RPAKvqnlvE4/VD48qgaDNODe/W8SL/LvBHLkcdIKohIwUlfQov0wG', 'super_admin', 'active'),
  ('Franchise Manager', 'franchise.manager@donpicasos.ph', '$2y$12$RPAKvqnlvE4/VD48qgaDNODe/W8SL/LvBHLkcdIKohIwUlfQov0wG', 'manager', 'active');

-- Example applicants (password = demo1234)
INSERT INTO applicant_users (full_name, email, phone, password_hash, status)
VALUES
  ('Demo Applicant One', 'applicant1@donpicasos.ph', '639171111111', '$2y$12$RPAKvqnlvE4/VD48qgaDNODe/W8SL/LvBHLkcdIKohIwUlfQov0wG', 'active'),
  ('Demo Applicant Two', 'applicant2@donpicasos.ph', '639172222222', '$2y$12$RPAKvqnlvE4/VD48qgaDNODe/W8SL/LvBHLkcdIKohIwUlfQov0wG', 'active');

INSERT INTO franchise_packages
  (package_code, name, description, investment_min, investment_max, currency, is_recommended, display_order)
VALUES
  ('STARTER', 'Starter Package', 'Ideal for aspiring entrepreneurs entering the food business.', 299000.00, 299000.00, 'PHP', 0, 1),
  ('PRO', 'Pro Package', 'Designed for entrepreneurs seeking larger market opportunities and business growth.', 599000.00, 599000.00, 'PHP', 0, 2),
  ('ELITE', 'Elite Package', 'Ideal for prime locations and multi-unit expansion.', 1000000.00, 1000000.00, 'PHP', 0, 3);

INSERT INTO package_features (package_id, feature_text, display_order)
SELECT fp.id, seed.feature_text, seed.display_order
FROM (
  SELECT 'STARTER' package_code, 'Full franchise rights' feature_text, 1 display_order UNION ALL
  SELECT 'STARTER', 'Operations system access', 2 UNION ALL
  SELECT 'STARTER', 'Marketing support', 3 UNION ALL
  SELECT 'STARTER', 'Supply chain support', 4 UNION ALL
  SELECT 'STARTER', 'Titser Art mentorship program', 5 UNION ALL
  SELECT 'STARTER', 'Brand development assistance', 6 UNION ALL
  SELECT 'PRO', 'Everything in Starter', 1 UNION ALL
  SELECT 'PRO', 'Priority site selection support', 2 UNION ALL
  SELECT 'PRO', 'Enhanced marketing materials', 3 UNION ALL
  SELECT 'PRO', 'Business coaching sessions', 4 UNION ALL
  SELECT 'PRO', 'Leadership development program', 5 UNION ALL
  SELECT 'PRO', 'Financial literacy training', 6 UNION ALL
  SELECT 'ELITE', 'Everything in Pro', 1 UNION ALL
  SELECT 'ELITE', 'Multi-unit expansion rights', 2 UNION ALL
  SELECT 'ELITE', 'Prime location support', 3 UNION ALL
  SELECT 'ELITE', 'Dedicated franchise manager', 4 UNION ALL
  SELECT 'ELITE', 'Full Titser Art entrepreneur program', 5 UNION ALL
  SELECT 'ELITE', 'Regional expansion opportunities', 6
) seed
JOIN franchise_packages fp ON fp.package_code = seed.package_code;

INSERT INTO roi_projections
  (package_id, metric_name, min_value, max_value, unit, display_text, display_order)
SELECT fp.id, seed.metric_name, seed.min_value, seed.max_value, seed.unit, seed.display_text, seed.display_order
FROM (
  SELECT 'STARTER' package_code, '2026 Projected Sales' metric_name, 1800000.00 min_value, 1800000.00 max_value, 'PHP' unit, 'PHP 1.8M', 1 display_order UNION ALL
  SELECT 'PRO', '2028 Projected Sales', 2380500.00, 2380500.00, 'PHP', 'PHP 2.38M', 1 UNION ALL
  SELECT 'ELITE', '2030 Projected Sales', 3148211.25, 3148211.25, 'PHP', 'PHP 3.15M', 1 UNION ALL
  SELECT 'STARTER', 'Annual Growth Target', 15.00, 15.00, 'percent', '15% annually', 2 UNION ALL
  SELECT 'PRO', 'Primary Revenue Stream', NULL, NULL, 'text', 'Bulk orders', 2 UNION ALL
  SELECT 'ELITE', 'Funding Target', 3000000.00, 5000000.00, 'PHP', 'PHP 3M - PHP 5M', 2
) seed
JOIN franchise_packages fp ON fp.package_code = seed.package_code;

INSERT INTO branches
  (branch_code, name, address_line, city, province, region, phone, business_hours, status, franchise_owner_name, opened_on, target_opening_on, image_url)
VALUES
  ('MAIN-MINDORO', 'Don Picaso Main Office', 'Mamburao', 'Mamburao', 'Occidental Mindoro', 'Mimaropa', NULL, 'Business hours to be confirmed', 'operating', 'Arturo D. Alafriz Jr.', NULL, NULL, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop'),
  ('SORSOGON', 'Donsol Reference Location', 'Donsol', 'Donsol', 'Sorsogon', 'Bicol Region', NULL, 'To be confirmed', 'upcoming', NULL, NULL, NULL, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop');

INSERT INTO lead_sources (name, description)
VALUES
  ('Website Form', 'Inquiry submitted from the website contact form'),
  ('Phone Inquiry', 'Lead received through phone call'),
  ('Facebook', 'Lead from Facebook campaign or page'),
  ('TikTok', 'Lead from TikTok content or campaign'),
  ('Instagram', 'Lead from Instagram content or campaign'),
  ('Referral', 'Lead referred by an existing partner or customer'),
  ('Trade Shows and Events', 'Lead from trade shows, exhibits, or business events'),
  ('Direct Sales', 'Lead from direct sales outreach');

INSERT INTO monthly_metrics (metric_month, total_leads, conversions, total_revenue)
VALUES
  ('2026-01-01', 0, 0, 1800000.00),
  ('2027-01-01', 0, 0, 2070000.00),
  ('2028-01-01', 0, 0, 2380500.00),
  ('2029-01-01', 0, 0, 2737575.00),
  ('2030-01-01', 0, 0, 3148211.25);

-- Example opportunity applications tied to existing franchise_packages via package_code and existing applicants via email
INSERT INTO opportunity_applications
  (applicant_id, package_id, inquiry_type, investment_budget, preferred_location, message, status)
SELECT
  au.id AS applicant_id,
  fp.id AS package_id,
  'franchise' AS inquiry_type,
  'PHP 299,000' AS investment_budget,
  'Mamburao' AS preferred_location,
  'Hi Don Picaso team, I would like to learn more about this opportunity.' AS message,
  'submitted' AS status
FROM applicant_users au
JOIN franchise_packages fp ON fp.package_code = 'STARTER'
WHERE au.email = 'applicant1@donpicasos.ph'
UNION ALL
SELECT
  au.id AS applicant_id,
  fp.id AS package_id,
  'investment' AS inquiry_type,
  'PHP 1,000,000' AS investment_budget,
  'Manila' AS preferred_location,
  'Looking to open an elite franchise location. Please advise next steps.' AS message,
  'submitted' AS status
FROM applicant_users au
JOIN franchise_packages fp ON fp.package_code = 'ELITE'
WHERE au.email = 'applicant2@donpicasos.ph';

CREATE VIEW lead_status_summary AS
SELECT
  status,
  COUNT(*) AS total
FROM franchise_leads
GROUP BY status;

CREATE VIEW branch_status_summary AS
SELECT
  status,
  COUNT(*) AS total
FROM branches
GROUP BY status;

CREATE VIEW dashboard_summary AS
SELECT
  (SELECT COUNT(*) FROM franchise_leads) AS total_leads,
  (SELECT COUNT(*) FROM branches WHERE status = 'operating') AS active_franchises,
  (SELECT COALESCE(SUM(total_revenue), 0) FROM monthly_metrics) AS total_revenue,
  (SELECT ROUND((SUM(conversions) / NULLIF(SUM(total_leads), 0)) * 100, 2) FROM monthly_metrics) AS conversion_rate,
  (SELECT COUNT(*) FROM franchise_leads WHERE status = 'new') AS new_leads,
  (SELECT COUNT(*) FROM franchise_leads WHERE status IN ('contacted', 'meeting')) AS in_progress_leads,
  (SELECT COUNT(*) FROM franchise_leads WHERE status = 'qualified') AS qualified_leads,
  (SELECT COUNT(*) FROM franchise_leads WHERE status = 'converted') AS converted_leads;
