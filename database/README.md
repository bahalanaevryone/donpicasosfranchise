# Database Setup

Import `don_picasos_schema.sql` in phpMyAdmin.

1. Open phpMyAdmin.
2. Go to the `Import` tab.
3. Choose `database/don_picasos_schema.sql`.
4. Click `Import`.

The script creates this database:

```sql
don_picasos_franchise
```

It includes tables for admin users, franchise packages, package features, ROI projections,
branches, branch staff, lead sources, franchise leads, lead activity history, contact messages,
monthly dashboard metrics, and dashboard reporting views.

Important: the seeded admin passwords are placeholders. Replace the `password_hash` values in
`admin_users` with real hashes before using this beyond a prototype.

## XAMPP API

The React app reads MySQL through the PHP files in `api/`. Copy those files to:

```text
C:\xampp\htdocs\don-picasos-api
```

The frontend default API URL is:

```text
http://localhost/don-picasos-api
```

Keep XAMPP Apache and MySQL running when using the admin dashboard, branches page, or contact form.
