<?php

declare(strict_types=1);

namespace Manggala\DataTable\Contracts;

use Illuminate\Contracts\Auth\Access\Authorizable;

interface ActionInterface
{
    public function getName(): string;

    public function getLabel(): string;

    public function isAuthorized(?Authorizable $user = null): bool;

    public function execute(array $ids): mixed;

    public function toArray(): array;
}
