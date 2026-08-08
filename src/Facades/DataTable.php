<?php

declare(strict_types=1);

namespace Manggala\DataTable\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Manggala\DataTable\Core\DataTable
 */
final class DataTable extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'datatable';
    }
}
