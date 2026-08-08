<?php

declare(strict_types=1);

namespace Manggala\DataTable\Filters;

use Closure;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Manggala\DataTable\Contracts\FilterInterface;

abstract class BaseFilter implements FilterInterface
{
    protected string $label;

    protected ?string $ability = null;

    protected ?Closure $conditionCallback = null;

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

    public function getName(): string
    {
        return $this->name;
    }

    public function getLabel(): string
    {
        return $this->label;
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

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'label' => $this->label,
            'type' => $this->getType(),
        ];
    }

    abstract protected function getType(): string;
}
