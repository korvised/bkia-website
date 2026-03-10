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
- **Features**: airline, airport, auth, counter, flight, lost-found, news, notice, permission, role, route, user

### Web (`web/`)
- **Framework**: Next.js
- **Public-facing pages**

---

## Completed Admin Features

| Feature | Path | Pattern | Notes |
|---------|------|---------|-------|
| Airline | `/flights/airlines` | Modal (Dialog) | Logo upload (multipart), activate/deactivate endpoints, server-side pagination |
| Airport | `/flights/airports` | Modal (Dialog) | No file upload (pure JSON), client-side pagination (`usePagination`), status toggle via PATCH |
| Lost & Found | `/support/lost-found` | Modal (Dialog) | Image upload (multipart), ImageLightbox component for preview |
| Notice | `/content/notices` | Separate pages | Multilingual, markdown preview (react-markdown), priority badge, NoticePriorityBadge |
| News | `/content/news` | Separate pages | Cover image upload (multipart), auto-slugify, markdown preview, NewsCategoryBadge |

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
  hooks/use<Feature>Columns.tsx
  hooks/useGet<Feature>s.ts
  hooks/index.ts
  pages/<Feature>Page.tsx   ← modal pattern (simple entity)
  pages/<Feature>ListPage.tsx + <Feature>CreatePage.tsx + <Feature>EditPage.tsx  ← page pattern (rich content)
  pages/index.ts
  routes.ts             ← { path, element, allowRoles }
  types/<feature>.type.ts
  types/index.ts
```

**RTK Query tags**: Defined in `src/constants/tags.ts`, registered in `src/redux/api-slice.ts` tagTypes.
- Current tags: `USER_TAG`, `AIRLINE_TAG`, `AIRPORT_TAG`, `COUNTER_TAG`, `FLIGHT_TAG`, `ROUTE_TAG`, `ROLE_TAG`, `PERMISSION_TAG`, `LOST_FOUND_TAG`, `NOTICE_TAG`, `NEWS_TAG`

**Routing**: `src/routes/private-routes.ts` — imports feature routes and spreads them.

**Access control**: `src/constants/access-roles.ts` — `FLIGHT_ACCESS_ROLES`, `CONTENT_ACCESS_ROLES`, `SETTINGS_ACCESS_ROLES`, `SUPPORT_ACCESS_ROLES`.

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

**Button & switch color theme**: Always use `bg-primary` for primary action buttons and active toggle switches. Never use `bg-blue-600` or `bg-green-500`.
```typescript
// Submit button
className={cn(
  "bg-primary hover:bg-primary-600 ...",
  isLoading && "cursor-not-allowed bg-primary/60",
)}

// isActive toggle switch
className={cn(
  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  form.isActive ? "bg-primary" : "bg-gray-300",
)}
```

**Form modals — stale data fix**: Always add `useEffect([isOpen, editX])` to re-populate state:
```typescript
useEffect(() => {
  setField(editItem?.field ?? "");
}, [isOpen, editItem]);
```

**Server-side pagination** (e.g. Airline, News, Notice): API returns `IPagination<T>` = `{ data: T[], meta: { total, page, limit, pages } }`. Use `filters` state with `page`/`limit` passed as query params.

**Client-side pagination** (e.g. Airport): API returns `T[]` directly. Use `usePagination` hook from `@/hooks`:
```typescript
const { page, pageSize, paginatedData, total, totalPages,
  handlePageChange, handlePageSizeChange } = usePagination(data);
```
Render `<Pagination>` from `@/components/ui/table/pagination.tsx` with `className="border-t border-gray-100 px-4 py-3"`.

**Select (status filter)**: Use Headless UI `<Select>` from `@/components/ui/form`. Wrap in `<div className="w-40 shrink-0">` to constrain width.

**Breadcrumbs**: `<Breadcrumb>` from `@/components/ui`. `showHome` defaults to `true`. Use `path` (not `href`) for clickable links.
```typescript
<Breadcrumb items={[
  { label: "Flight Management" },
  { label: "Airlines", icon: LuPlaneTakeoff },
]} />
// With clickable parent:
<Breadcrumb items={[
  { label: "News", icon: LuNewspaper, path: "/content/news" },
  { label: "Create" },
]} />
```

**`asset()` utility** from `@/lib`: converts `IFile.path` (relative S3 key) → full URL.
```typescript
import { asset } from "@/lib";
<img src={asset(item.logoFile.path)} />
// URL: https://bkia-website.s3.ap-southeast-7.amazonaws.com/{path}
```
Always use `asset()` when rendering any `IFile.path` in `<img src>`.

**Multipart/FormData pattern** (file upload APIs — Airline, News, Lost & Found):
```typescript
const fd = new FormData();
fd.append("name", value);
fd.append("names", JSON.stringify({ en, lo, zh }));  // JSON objects must be stringified
fd.append("logo", file);                              // File
fd.append("isActive", String(true));                  // booleans as string
```
Server DTOs use `@Transform(({ value }) => stringToJsonObject(value))` to parse back.

**Multilingual fields pattern** (`MultilingualText = { en: string; lo: string; zh: string }`):
- Language tab UI with EN / ລາວ / 中文 tabs
- Store as `names: { en: "", lo: "", zh: "" }` in form state
- Send as `JSON.stringify(names)` in FormData (or directly in JSON body)

**Status toggle in table**: Clicking the status badge directly updates the record.
- With activate/deactivate endpoints (Airline): call `activateAirline` / `deactivateAirline`
- Without separate endpoints (Airport): call `updateAirport({ id, body: { isActive: !item.isActive } })`

**Markdown preview** (Notice, News content fields):
- Installed: `react-markdown` + `remark-gfm`
- Toggle Write/Preview with tab buttons
- CSS class `.markdown-preview` defined in `admin/src/index.css`
- Label: `Content — Markdown supported`

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

### Airline entity
- `code` (2–8 chars, unique, uppercase), `name` (fallback), `names` (jsonb multilingual), `logoFile` (optional IFile), `hotline`, `phone`, `website`, `isActive`
- Create/Update: multipart/form-data (`logo` field for file)
- Separate activate/deactivate: `PATCH /airlines/:id/activate`, `PATCH /airlines/:id/deactivate`

### Airport entity
- `code` (2–10 chars, unique, uppercase), `name` (fallback), `names` (jsonb multilingual), `isActive`
- Create/Update: pure JSON body (no file upload)
- No separate activate/deactivate — use `PATCH /airports/:id` with `{ isActive: bool }`
- `GET /airports` returns `Airport[]` directly (no pagination wrapper)

### News entity
- `slug` (unique), `coverImage` (IFile, required), `title`/`excerpt`/`content` (jsonb multilingual), `category` (NewsCategory enum), `author`, `publishDate`, `isFeatured`, `isPublished`, `viewCount`, `tags` (IMultilingualText[]), `metaDescription` (optional jsonb)
- Create/Update: multipart/form-data (`coverImage` field)
- `NewsCategory` enum in `admin/src/types/enum.type.ts`

### Notice entity
- `title`/`description`/`content` (jsonb multilingual), `priority` (ImportantPriority enum: URGENT/HIGH/NORMAL), `startDate`, `endDate`, `isActive`, `tags` (IMultilingualText[])
- Create/Update: pure JSON body (no file upload)

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
6. **`asset()` for IFile paths** — always wrap `IFile.path` with `asset()` before using as `<img src>`.
7. **FormData JSON fields** — multilingual objects (`names`, `title`, etc.) must be `JSON.stringify()`-ed before `fd.append()`.
8. **Breadcrumb `path` not `href`** — `BreadcrumbItem` uses `path?: string` (not `href`) to render `<Link to={path}>`.
9. **Button & switch color** — use `bg-primary hover:bg-primary-600` (never `bg-blue-600`) for primary action buttons; disabled/loading state: `bg-primary/60`. Active toggle switch: `bg-primary` (never `bg-green-500`). Focus ring: `focus:ring-primary`.
10. **Airport has no pagination** — `GET /airports` returns plain array; use `usePagination` hook for client-side paging.
