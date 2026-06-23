# TODO - Opportunity Register/Login + DB Save

## Step 1: DB schema
- [x] Update `database/don_picasos_schema.sql`:
  - [x] Add `applicant_users` table
  - [x] Add `opportunity_applications` table
  - [x] Add example seed data

## Step 2: Backend APIs
- [x] Create `api/auth_register.php`
- [x] Create `api/auth_login.php`
- [x] Create `api/opportunity_apply.php`
- [x] Ensure `opportunity_apply` writes to:
  - [x] `opportunity_applications`
  - [x] `franchise_leads`
  - [x] `contact_messages`

## Step 3: Frontend routes/pages/components
- [x] Update `src/app/routes.tsx` to add `/register` and `/login`
- [x] Create `src/app/components/AuthForm.tsx`
- [x] Create `src/app/pages/RegisterPage.tsx`
- [x] Create `src/app/pages/LoginPage.tsx`
- [x] Create `src/app/pages/OpportunityApplicationPage.tsx`

## Step 4: Frontend integration
- [x] Update `src/app/pages/FranchisePage.tsx`:
  - [x] Change “Get Started” buttons to `/register?mode=opportunity&package=...`
- [x] Update `src/app/lib/api.ts` to support auth POST with Bearer token

## Step 5: Verify
- [ ] Manual test flow:
  - [ ] Click Get Started → register with preselected package
  - [ ] Register → login
  - [ ] Submit opportunity application → DB rows created
  - [ ] Admin dashboard shows new lead entries
