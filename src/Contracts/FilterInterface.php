<?php

declare(strict_types=1);

namespace Manggala\DataTable\Contracts;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Builder;

interface FilterInterface
{
    public function getName(): string;

    public function getLabel(): string;

    public function isAuthorized(?Authorizable $user = null): bool;

    public function apply(Builder $builder, mixed $value): Builder;

    public function toArray(): array;
}
