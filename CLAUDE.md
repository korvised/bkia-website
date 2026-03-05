# BKIA Airport Website — Project Memory

## Project Overview

Airport management system for BKIA (Boun Keua International Airport).
Three sub-projects: `server` (NestJS), `admin` (React + Vite + RTK Query), `web` (Next.js).

---

## Architecture

### Server (`server/`)
- **Framework**: NestJS + TypeORM + PostgreSQL
- **Auth**: JWT (access + refresh tokens)
- **Path alias**: `@/` → `src/`
- **Modules**: airline, airport, auth, counter, flight, lost-found, news, notice, permission, role, route, user, weather

### Admin (`admin/`)
- **Framework**: React 18 + Vite + TypeScript
- **State/API**: Redux Toolkit + RTK Query (`apiSlice` in `src/redux/api-slice.ts`)
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI (for Select, Dialog, etc.)
- **Package manager**: pnpm
- **Path alias**: `@/` → `src/`
- **Features**: airline, airport, auth, counter, flight, permission, role, route, user

### Web (`web/`)
- **Framework**: Next.js
- **Public-facing pages**

---

## Key Conventions

### Server

**Module structure** (every feature follows this pattern):
```
modules/<feature>/
  dtos/
    create-<feature>.dto.ts
    update-<feature>.dto.ts
    query-<feature>.dto.ts
    index.ts
  <feature>.controller.ts
  <feature>.service.ts
  <feature>.module.ts
  index.ts            ← exports module + service
```

**Guards**: `JwtAuthGuard` + `RolesGuard` on all protected endpoints.
`@Roles(UserRole.ADMIN)` decorator for admin-only routes.

**Enums** live in `server/src/types/enum.ts` — `UserRole`, `UserStatus`, `PermissionSlug`, etc.

**Seeders**: Use `OnModuleInit` pattern; check env var before seeding.
- `RoleSeeder` in `role.module.ts` — controlled by `SEED_ROLES=true`
- `PermissionSeeder` in `permission.module.ts` — controlled by `SEED_PERMISSIONS=true`
- Pattern: check if record exists by unique field, insert only if missing (idempotent)

**SUPER_ADMIN exclusion**: Never assign `UserRole.SUPER_ADMIN` via the role API — excluded in `role.service.ts` and `role.seeder.ts`.

### Admin

**Feature structure**:
```
features/<feature>/
  api/<feature>Api.ts   ← RTK Query endpoints
  api/index.ts
  components/           ← modals, badges, small UI
  components/index.ts
  pages/<Feature>Page.tsx
  pages/index.ts
  routes.ts             ← { path, element, allowRoles }
  types/<feature>.type.ts
  types/index.ts
```

**RTK Query tags**: Defined in `src/constants/tags.ts`, registered in `src/redux/api-slice.ts` tagTypes.

**Routing**: `src/routes/private-routes.ts` — imports feature routes and spreads them.

**Access control**: `src/constants/access-roles.ts` — `FLIGHT_ACCESS_ROLES`, `CONTENT_ACCESS_ROLES`, `SETTINGS_ACCESS_ROLES`.

**Navigation**: `src/constants/navigation.ts` — `NAVIGATION_GROUPS` array with `allowRoles` per group/item.

**Alert service**: Use `alertService` (not direct SweetAlert2) from `@/services/alert.service`.
```typescript
await alertService.success("Title", "Message");
await alertService.error("Message", "Title");
const result = await alertService.confirmModal("Title", "Message");
if (!result.isConfirmed) return;
```

**`cn` utility**: Uses `clsx` only (no tailwind-merge). Conflicting classes are NOT merged.
- `cn("w-full", "w-40")` → both applied, `w-full` wins.
- Fix: wrap component in `<div className="w-40 shrink-0">` instead of passing className.

**Form modals — stale data fix**: Always add `useEffect([isOpen, editX])` to re-populate state:
```typescript
useEffect(() => {
  setField(editItem?.field ?? "");
}, [isOpen, editItem]);
```

**Pagination**: Use `usePagination` hook from `@/hooks`:
```typescript
const { page, pageSize, paginatedData, total, totalPages,
  handlePageChange, handlePageSizeChange } = usePagination(data);
```
Render `<Pagination>` from `@/components/ui/table/pagination.tsx` with `className="border-t border-gray-100 px-4 py-3"`.

**Select (status filter)**: Use Headless UI `<Select>` from `@/components/ui/form`. Wrap in `<div className="w-40 shrink-0">` to constrain width.

**Breadcrumbs**: `<Breadcrumb>` from `@/components/ui`. `showHome` defaults to `true`.
```typescript
<Breadcrumb items={[{ label: "Settings" }, { label: "Users", icon: LuShield }]} />
```

---

## Data Model Highlights

### User → Roles (ManyToMany)
- `user_roles` join table
- API: `PATCH /users/add-roles/:id`, `PATCH /users/remove-roles/:id`

### User → Permissions (ManyToMany)
- `user_permissions` join table
- Permissions are assigned **directly to users**, not to roles
- API: `PATCH /users/add-permissions/:id`, `PATCH /users/remove-permissions/:id`

### Permission entity
- `id` (uuid), `name`, `slug` (unique), `description`
- Slug format: `<module>:<action>` e.g. `flight:create`, `lost-found:read`
- All slugs defined in `PermissionSlug` enum (`server/src/types/enum.ts`)

### Role entity
- `id`, `role` (UserRole enum), `description`, `isActive`
- `SUPER_ADMIN` role is excluded from all CRUD operations

---

## Permission Slugs

Modules with CRUD permissions: `flight`, `airline`, `airport`, `counter`, `route`,
`news`, `notice`, `lost-found`, `user`, `role`, `permission`

Format: `<module>:read|create|update|delete`

---

## Settings Pages (Admin)

| Page | Path | Access | Key feature |
|------|------|--------|-------------|
| Users | `/settings/users` | ADMIN_ROLES | Manage roles + permissions per user |
| Roles | `/settings/roles` | ADMIN_ROLES | Create/edit/delete roles |
| Permissions | `/settings/permissions` | ADMIN_ROLES | View seeded permissions (grouped by module) |

**ManagePermissionsModal** (`admin/src/features/user/components/ManagePermissionsModal.tsx`):
- Groups permissions by slug prefix (e.g., all `flight:*` together)
- Accordion expand/collapse per group
- Count badge (`x/total`) per group
- "Assign all / Remove all" per group
- `max-w-2xl` modal width

**PermissionPage** (`admin/src/features/permission/pages/PermissionPage.tsx`):
- Read-only grouped accordion view (no Add button — permissions are seeded)
- Edit/Delete per permission row
- Same grouping logic as ManagePermissionsModal

---

## Environment Variables

### Server (`server/.env`)
```
APP_ENV=development
APP_PORT=9090
SEED_ROLES=true          # seed default roles on startup
SEED_PERMISSIONS=true    # seed default permissions on startup
```

---

## Git

- Main branch: `main`
- Claude worktree branch: `claude/sweet-tharp`
- Root `.gitignore` excludes: `.claude/`, `.env`, `node_modules/`, `dist/`, `*.pem`
- Sub-project gitignores are independent and already configured

---

## Common Pitfalls

1. **Edit tool requires prior Read** — always read a file before editing it in the same session.
2. **`cn` doesn't merge conflicts** — wrap in a div to constrain width instead of passing className.
3. **Stale modal data** — all form modals need `useEffect([isOpen, editItem])`.
4. **Import path for enums** — use `@/types/enum` not `@/types` (no barrel index.ts in types/).
5. **SUPER_ADMIN exclusion** — never expose SUPER_ADMIN in role lists or dropdowns.
