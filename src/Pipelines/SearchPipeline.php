<?php

declare(strict_types=1);

namespace Manggala\DataTable\Pipelines;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Manggala\DataTable\Contracts\ColumnInterface;

final class SearchPipeline
{
    /**
     * @param Collection<int, ColumnInterface> $columns
     */
    public function __construct(private readonly Collection $columns) {}

    public function apply(Builder $query, string $term): Builder
    {
        $term = trim($term);
        if ($term === '') {
            return $query;
        }

        $searchableColumns = $this->columns->filter(fn (ColumnInterface $col) => $col->isSearchable())->values();
        if ($searchableColumns->isEmpty()) {
            return $query;
        }

        return $query->where(function (Builder $subQuery) use ($term, $searchableColumns) {
            foreach ($searchableColumns as $index => $column) {
                $colName = $column->getName();
                if ($index === 0) {
                    $subQuery->where($colName, 'LIKE', "%{$term}%");
                } else {
                    $subQuery->orWhere($colName, 'LIKE', "%{$term}%");
                }
            }
        });
    }
}
