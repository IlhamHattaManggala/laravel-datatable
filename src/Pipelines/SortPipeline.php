<?php

declare(strict_types=1);

namespace Manggala\DataTable\Pipelines;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Manggala\DataTable\Contracts\ColumnInterface;

final class SortPipeline
{
    /**
     * @param Collection<int, ColumnInterface> $columns
     */
    public function __construct(private readonly Collection $columns) {}

    public function apply(Builder $query, string $sortColumn, string $direction): Builder
    {
        if (trim($sortColumn) === '') {
            return $query;
        }

        $column = $this->columns->first(fn (ColumnInterface $col) => $col->getName() === $sortColumn && $col->isSortable());
        if (! $column instanceof ColumnInterface) {
            return $query;
        }

        $dir = strtolower($direction) === 'desc' ? 'desc' : 'asc';

        return $query->orderBy($sortColumn, $dir);
    }
}
