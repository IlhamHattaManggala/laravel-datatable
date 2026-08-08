# Changelog: Laravel Data Table

All notable changes to `manggala/laravel-datatable` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned Features for v1.1.0 & v1.2.0
* 🟢 Dynamic Column Reordering & Drag-and-Drop Column Header Re-arrangement.
* 🟢 Export to Excel (.xlsx) & PDF format drivers.
* 🟢 Saved User Filter Views & Preset Filters.
* 🟢 Vue.js `<InertiaTable />` component support.

---

## [1.0.0] - 2026-08-08

### Summary
Initial production release of **Laravel Data Table** (`manggala/laravel-datatable`), bringing a server-driven UI (SDUI) table engine, dynamic filters, responsive React components (`<InertiaTable />`), and keyboard navigation (WCAG 2.1 AA) to Laravel applications powered by Inertia.js and React.

### Added - Core PHP Data Table Engine
* 📊 **Server-Driven UI Table Engine**:
  * Abstract base class `Manggala\DataTable\Core\DataTable` providing fluent query pipelines and JSON props serialization for Inertia.js.
  * Support for Laravel 10.x, 11.x, 12.x, and 13.x running on PHP 8.2, 8.3, and 8.4.
* 📋 **Fluent Column Suite**:
  * `TextColumn`: String values with `sortable()`, `searchable()`, `copyable()`, `truncate()`, `prefix()`, `suffix()`.
  * `BadgeColumn`: Status tags with customizable color mappings (`colors()`).
  * `DateColumn`: Dynamic Carbon date formatting (`dateFormat()`, `diffForHumans()`).
  * `AvatarColumn`: Profile thumbnail images with fallback initials.
  * `BooleanColumn`: Checkmark / Cross icon status indicators.
  * `ActionColumn`: Inline row action buttons.
* 🎛️ **Dynamic Filter Suite**:
  * `SelectFilter`: Single or multi-select dropdown filters.
  * `DateRangeFilter`: Start and end date range filters.
  * `BooleanFilter`: True/false state filters.
* ⚡ **Bulk Actions & Security**:
  * `BulkAction`: Bulk operations with confirmation modal dialogs (`confirm()`, `danger()`) and Gate authorization protection (`can()`).
  * Pipeline Query Builders (`SearchPipeline`, `FilterPipeline`, `SortPipeline`) executing optimized Eloquent query constraints.

### Added - React Frontend Overlay (`@manggala/laravel-datatable`)
* ⚛️ **High-Performance React Component (`<InertiaTable />`)**:
  * Debounced global search bar (200ms).
  * Density toggle controls (`compact`, `normal`, `comfortable`).
  * Column visibility popover toggle.
  * Selection checkboxes for row selection and "Select All".
  * Responsive pagination controls and per-page size selector.
  * Full dark mode support using Tailwind CSS.
  * Native Inertia Page Resolver compatibility (`export default InertiaTable`).
