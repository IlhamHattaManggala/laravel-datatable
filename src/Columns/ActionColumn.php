<?php

declare(strict_types=1);

namespace Manggala\DataTable\Columns;

final class ActionColumn extends BaseColumn
{
    protected function getType(): string
    {
        return 'action';
    }
}
