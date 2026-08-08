<?php

declare(strict_types=1);

namespace Manggala\DataTable\Core;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Manggala\DataTable\Contracts\ColumnInterface;
use Manggala\DataTable\Contracts\FilterInterface;
use Manggala\DataTable\Pipelines\FilterPipeline;
use Manggala\DataTable\Pipelines\SearchPipeline;
use Manggala\DataTable\Pipelines\SortPipeline;

abstract class DataTable
{
    abstract public function query(): Builder;

    /**
     * @return array<int, ColumnInterface>
     */
    abstract public function columns(): array;

    /**
     * @return array<int, FilterInterface>
     */
    public function filters(): array
    {
        return [];
    }

    public function bulkActions(): array
    {
        return [];
    }

    public static function make(): static
    {
        /** @phpstan-ignore new.static */
        return new static();
    }

    public function render(Request $request): array
    {
        $user = $request->user();

        /** @var \Illuminate\Support\Collection<int, ColumnInterface> $authorizedColumns */
        $authorizedColumns = collect($this->columns())
            ->filter(fn (ColumnInterface $col) => $col->isAuthorized($user))
            ->values();

        /** @var \Illuminate\Support\Collection<int, FilterInterface> $authorizedFilters */
        $authorizedFilters = collect($this->filters())
            ->filter(fn (FilterInterface $filter) => $filter->isAuthorized($user))
            ->values();

        $authorizedBulkActions = collect($this->bulkActions())
            ->filter(fn ($action) => method_exists($action, 'isAuthorized') ? $action->isAuthorized($user) : true)
            ->values();

        $query = $this->query();
        $query = (new SearchPipeline($authorizedColumns))->apply($query, (string) $request->input('search', ''));
        $query = (new FilterPipeline($authorizedFilters))->apply($query, (array) $request->input('filters', []));
        $query = (new SortPipeline($authorizedColumns))->apply(
            $query,
            (string) $request->input('sort', ''),
            (string) $request->input('direction', 'asc')
        );

        $perPage = (int) $request->input('per_page', config('datatable.per_page', 15));
        $paginator = $query->paginate($perPage);

        $formattedItems = collect($paginator->items())->map(function ($row) use ($authorizedColumns) {
            $formattedRow = ['_id' => $row->getKey()];
            foreach ($authorizedColumns as $column) {
                $rawVal = data_get($row, $column->getName());
                $formattedRow[$column->getName()] = $column->format($rawVal, $row);
            }

            return $formattedRow;
        });

        return [
            'columns' => $authorizedColumns->map(fn ($col) => $col->toArray())->values()->all(),
            'filters' => $authorizedFilters->map(fn ($filter) => $filter->toArray())->values()->all(),
            'bulkActions' => $authorizedBulkActions->map(fn ($action) => method_exists($action, 'toArray') ? $action->toArray() : (array) $action)->values()->all(),
            'data' => $formattedItems->all(),
            'pagination' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
            ],
            'state' => [
                'search' => (string) $request->input('search', ''),
                'sort' => (string) $request->input('sort', ''),
                'direction' => (string) $request->input('direction', 'asc'),
                'filters' => (array) $request->input('filters', []),
                'per_page' => $perPage,
            ],
        ];
    }
}
