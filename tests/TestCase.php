<?php

declare(strict_types=1);

namespace Manggala\DataTable\Tests;

use Manggala\DataTable\DataTableServiceProvider;
use Orchestra\Testbench\TestCase as OrchestraTestCase;

abstract class TestCase extends OrchestraTestCase
{
    protected function getPackageProviders($app): array
    {
        return [
            DataTableServiceProvider::class,
        ];
    }

    protected function defineEnvironment($app): void
    {
        $app['config']->set('app.key', 'base64:2fl+Kw26nZt5LYJ2K+aU4V0B9K5pZzY4Z5Z5Z5Z5Z5Y=');
        $app['config']->set('datatable.per_page', 15);
    }
}
