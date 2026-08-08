# Laravel Data Table 📊

[![Latest Stable Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/IlhamHattaManggala/laravel-datatable)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PHP Version](https://img.shields.io/badge/php-%5E8.2%20%7C%20%5E8.3%20%7C%20%5E8.4-777BB4.svg)](composer.json)
[![Laravel Version](https://img.shields.io/badge/laravel-%5E10.0%20%7C%20%5E11.0%20%7C%20%5E12.0%20%7C%20%5E13.0-FF2D20.svg)](composer.json)
[![Inertia Support](https://img.shields.io/badge/inertia.js-React%20%7C%20Vue-9553E9.svg)](https://inertiajs.com)

**Laravel Data Table** (`manggala/laravel-datatable`) is a production-ready, keyboard-navigable, server-driven Data Table package designed specifically for Laravel applications powered by Inertia.js and React.

---

## 💡 Why Laravel Data Table?

Data tables constitute over 80% of enterprise web applications, back-office administration portals, and SaaS dashboards. In the Laravel ecosystem, popular table packages (like Filament Tables, Livewire PowerGrid, or Rappasoft Datatables) are **100% bound to Livewire and Blade**.

Applications built with **Inertia.js** currently lack a native, server-driven data table package on Packagist. Developers are forced to rewrite pagination links, debounced search timers, multi-column sorting parameters, filter modals, row selection checkboxes, bulk action endpoints, and CSV exports manually for every single entity.

**Laravel Data Table** bridges this gap by introducing a **Server-Driven UI (SDUI)** table engine:
* **Fluent PHP Schema**: Declare table columns, badges, formatters, search rules, and bulk actions entirely in expressive PHP classes.
* **Sleek React UI Component**: Automatically renders a high-contrast, dark-mode-ready React table (`<InertiaTable />`) with zero custom React boilerplate.
* **Seamless Inertia Integration**: Operates natively via `router.get()` & `router.post()` for instant reactive updates without full page reloads.
* **Manggala Ecosystem Synergy**: Deeply integrates with `manggala/laravel-spotlight` for global command palette table searches and embeds as responsive widgets inside `manggala/laravel-dashboard-builder`.

---

## 🌟 Key Features

| Feature | Description |
|---|---|
| 📋 **Fluent PHP Column Suite** | `TextColumn`, `BadgeColumn`, `DateColumn`, `AvatarColumn`, `BooleanColumn`, `ImageColumn`, `ActionColumn`. |
| 🔍 **Debounced Global & Column Search** | Fast, 200ms debounced search streaming directly through Eloquent builder pipelines. |
| 🎛️ **Dynamic Filter Suite** | `SelectFilter`, `DateRangeFilter`, `NumberRangeFilter`, `BooleanFilter`, `TernaryFilter`. |
| ⚡ **Reactive Bulk Actions** | Execute bulk operations (Delete, Status Update, Export) on selected rows with confirmation modals. |
| 👁️ **Column Visibility & Density Control** | Empower users to show/hide columns and adjust row density (Compact, Normal, Comfortable). |
| 📥 **Streamed CSV/Excel Export** | Export matching database records instantly to CSV without memory exhaustion. |
| ♿ **WCAG 2.1 AA Keyboard Trapping** | Arrow key cell/row navigation, focus trapping, and hotkey actions (`/` to focus search, `Esc` to clear). |
| 🔒 **Role & Gate Security** | Protect columns, filters, and bulk actions using Laravel Gates, Policies, and Spatie Roles. |

---

## 📦 Installation

Install the package via Composer:

```bash
composer require manggala/laravel-datatable
```

Run the package installation command to publish configuration and Inertia React component views:

```bash
php artisan datatable:install
```

Optionally publish resources manually:

```bash
# Publish configuration file
php artisan datatable:publish --tag=config

# Publish React component views
php artisan datatable:publish --tag=views
```

---

## 🚀 Quick Start

### 1. Define a Data Table Class

Create a dedicated Table class extending `DataTable`:

```php
namespace App\Tables;

use App\Models\User;
use Manggala\DataTable\Core\DataTable;
use Manggala\DataTable\Columns\TextColumn;
use Manggala\DataTable\Columns\BadgeColumn;
use Manggala\DataTable\Columns\AvatarColumn;
use Manggala\DataTable\Columns\DateColumn;
use Manggala\DataTable\Columns\ActionColumn;
use Manggala\DataTable\Filters\SelectFilter;
use Manggala\DataTable\Filters\DateRangeFilter;
use Manggala\DataTable\Actions\BulkAction;

class UsersTable extends DataTable
{
    public function query()
    {
        return User::query()->with('roles');
    }

    public function columns(): array
    {
        return [
            AvatarColumn::make('avatar_url')->label('')->size('sm'),
            TextColumn::make('name')->label('Full Name')->sortable()->searchable()->copyable(),
            TextColumn::make('email')->label('Email Address')->sortable()->searchable(),
            BadgeColumn::make('role')->label('Role')
                ->colors([
                    'admin' => 'red',
                    'editor' => 'yellow',
                    'user' => 'blue',
                ]),
            DateColumn::make('created_at')->label('Joined Date')->format('M d, Y')->sortable(),
            ActionColumn::make('actions')->label('Actions'),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('role')->options([
                'admin' => 'Administrator',
                'editor' => 'Editor',
                'user' => 'Regular User',
            ]),
            DateRangeFilter::make('created_at')->label('Registration Date'),
        ];
    }

    public function bulkActions(): array
    {
        return [
            BulkAction::make('delete')
                ->label('Delete Selected')
                ->icon('trash')
                ->danger()
                ->confirm('Are you sure you want to delete selected users?')
                ->action(fn ($ids) => User::destroy($ids)),
        ];
    }
}
```

---

### 2. Render Table in Inertia Controller

```php
namespace App\Http\Controllers;

use App\Tables\UsersTable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Users/Index', [
            'usersTable' => UsersTable::make()->render($request),
        ]);
    }
}
```

---

### 3. Mount Frontend Component in Inertia Page

Include the `<InertiaTable />` component inside your Inertia React page:

```tsx
import React from 'react';
import { InertiaTable } from '@/Components/InertiaTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function UsersIndex({ usersTable }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Directory</h1>
                        <p className="text-sm text-gray-500">Manage user accounts, roles, and permissions</p>
                    </div>
                </div>

                {/* Server-Driven Data Table */}
                <InertiaTable table={usersTable} />
            </div>
        </AuthenticatedLayout>
    );
}
```

---

## 🔒 Authorization & Security

Protect columns, actions, or filters based on Laravel Gates or User permissions:

```php
// Protect bulk action using Laravel Gate
BulkAction::make('delete')
    ->can('delete-users')
    ->action(fn ($ids) => User::destroy($ids));

// Protect column based on custom closure condition
TextColumn::make('salary')
    ->when(fn ($user) => $user->isAdmin());
```

---

## 🔗 Manggala Ecosystem Synergy

`manggala/laravel-datatable` integrates natively with the entire Manggala suite:

1. **`manggala/laravel-spotlight`**: Type `Cmd+K` -> `"Filter Users by Admin"` to execute dynamic table filter preset triggers directly from the command palette.
2. **`manggala/laravel-dashboard-builder`**: Embed data tables as compact, live-updating widgets inside custom user dashboards.
3. **`manggala/laravel-settings`**: Auto-save column visibility and row density preferences directly into user setting manifests.

---

## ⚙️ Configuration Reference

The published configuration file (`config/datatable.php`) controls default pagination limits and styling thresholds:

```php
return [
    'per_page' => 15,
    'per_page_options' => [10, 15, 25, 50, 100],
    'search_debounce_ms' => 200,
    'default_density' => 'normal', // 'compact', 'normal', 'comfortable'
    'export' => [
        'chunk_size' => 1000,
    ],
];
```

---

## 📄 License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
