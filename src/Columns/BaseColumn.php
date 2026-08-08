<?php

declare(strict_types=1);

namespace Manggala\DataTable\Columns;

use Closure;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Manggala\DataTable\Contracts\ColumnInterface;

abstract class BaseColumn implements ColumnInterface
{
    protected string $label;

    protected bool $sortable = false;

    protected bool $searchable = false;

    protected ?string $ability = null;

    protected ?Closure $conditionCallback = null;

    protected ?Closure $formatCallback = null;

    public function __construct(protected readonly string $name)
    {
        $this->label = ucwords(str_replace(['_', '-'], ' ', $name));
    }

    public static function make(string $name): static
    {
        /** @phpstan-ignore new.static */
        return new static($name);
    }

    public function label(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function sortable(bool $sortable = true): static
    {
        $this->sortable = $sortable;

        return $this;
    }

    public function searchable(bool $searchable = true): static
    {
        $this->searchable = $searchable;

        return $this;
    }

    public function can(string $ability): static
    {
        $this->ability = $ability;

        return $this;
    }

    public function when(Closure $callback): static
    {
        $this->conditionCallback = $callback;

        return $this;
    }

    public function formatUsing(Closure $callback): static
    {
        $this->formatCallback = $callback;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function isSortable(): bool
    {
        return $this->sortable;
    }

    public function isSearchable(): bool
    {
        return $this->searchable;
    }

    public function isAuthorized(?Authorizable $user = null): bool
    {
        if ($this->ability !== null && (! $user || ! $user->can($this->ability))) {
            return false;
        }

        if ($this->conditionCallback instanceof Closure && ! ($this->conditionCallback)($user)) {
            return false;
        }

        return true;
    }

    public function format(mixed $value, mixed $row): mixed
    {
        if ($this->formatCallback instanceof Closure) {
            return ($this->formatCallback)($value, $row);
        }

        return $value;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'label' => $this->label,
            'type' => $this->getType(),
            'sortable' => $this->sortable,
            'searchable' => $this->searchable,
        ];
    }

    abstract protected function getType(): string;
}
