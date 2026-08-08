<?php

declare(strict_types=1);

namespace Manggala\DataTable;

use Illuminate\Support\ServiceProvider;

final class DataTableServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/datatable.php', 'datatable');
    }

    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../config/datatable.php' => config_path('datatable.php'),
            ], 'datatable-config');

            $this->publishes([
                __DIR__ . '/../resources/js' => resource_path('js/Vendor/DataTable'),
            ], 'datatable-views');
        }
    }
}
