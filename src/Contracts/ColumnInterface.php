<?php

declare(strict_types=1);

namespace Manggala\DataTable\Contracts;

use Illuminate\Contracts\Auth\Access\Authorizable;

interface ColumnInterface
{
    public function getName(): string;

    public function getLabel(): string;

    public function isSortable(): bool;

    public function isSearchable(): bool;

    public function isAuthorized(?Authorizable $user = null): bool;

    public function format(mixed $value, mixed $row): mixed;

    public function toArray(): array;
}
