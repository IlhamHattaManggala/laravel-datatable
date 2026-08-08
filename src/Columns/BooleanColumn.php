<?php

declare(strict_types=1);

namespace Manggala\DataTable\Columns;

final class BooleanColumn extends BaseColumn
{
    protected function getType(): string
    {
        return 'boolean';
    }
}
