<?php

declare(strict_types=1);

namespace Manggala\DataTable\Filters;

use Illuminate\Database\Eloquent\Builder;

final class DateRangeFilter extends BaseFilter
{
    public function apply(Builder $builder, mixed $value): Builder
    {
        if (! is_array($value)) {
            return $builder;
        }

        $from = $value['from'] ?? null;
        $to = $value['to'] ?? null;

        if ($from) {
            $builder->whereDate($this->name, '>=', $from);
        }

        if ($to) {
            $builder->whereDate($this->name, '<=', $to);
        }

        return $builder;
    }

    protected function getType(): string
    {
        return 'date_range';
    }
}
