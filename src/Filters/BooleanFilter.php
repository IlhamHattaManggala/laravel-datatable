<?php

declare(strict_types=1);

namespace Manggala\DataTable\Filters;

use Illuminate\Database\Eloquent\Builder;

final class BooleanFilter extends BaseFilter
{
    public function apply(Builder $builder, mixed $value): Builder
    {
        if ($value === null || $value === '') {
            return $builder;
        }

        $boolVal = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        if ($boolVal !== null) {
            return $builder->where($this->name, $boolVal);
        }

        return $builder;
    }

    protected function getType(): string
    {
        return 'boolean';
    }
}
