<?php

declare(strict_types=1);

namespace Manggala\DataTable\Pipelines;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Manggala\DataTable\Contracts\FilterInterface;

final class FilterPipeline
{
    /**
     * @param Collection<int, FilterInterface> $filters
     */
    public function __construct(private readonly Collection $filters) {}

    public function apply(Builder $query, array $activeFilters): Builder
    {
        if (empty($activeFilters)) {
            return $query;
        }

        foreach ($this->filters as $filter) {
            $name = $filter->getName();
            if (isset($activeFilters[$name]) && $activeFilters[$name] !== null && $activeFilters[$name] !== '') {
                $filter->apply($query, $activeFilters[$name]);
            }
        }

        return $query;
    }
}
