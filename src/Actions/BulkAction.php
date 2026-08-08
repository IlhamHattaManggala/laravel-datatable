<?php

declare(strict_types=1);

namespace Manggala\DataTable\Actions;

use Closure;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Manggala\DataTable\Contracts\ActionInterface;

final class BulkAction implements ActionInterface
{
    private string $label;

    private string $icon = 'lightning';

    private bool $isDanger = false;

    private ?string $confirmMessage = null;

    private ?string $ability = null;

    private ?Closure $conditionCallback = null;

    private ?Closure $actionCallback = null;

    public function __construct(private readonly string $name)
    {
        $this->label = ucwords(str_replace(['_', '-'], ' ', $name));
    }

    public static function make(string $name): self
    {
        return new self($name);
    }

    public function label(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function icon(string $icon): self
    {
        $this->icon = $icon;

        return $this;
    }

    public function danger(bool $isDanger = true): self
    {
        $this->isDanger = $isDanger;

        return $this;
    }

    public function confirm(string $message): self
    {
        $this->confirmMessage = $message;

        return $this;
    }

    public function can(string $ability): self
    {
        $this->ability = $ability;

        return $this;
    }

    public function when(Closure $callback): self
    {
        $this->conditionCallback = $callback;

        return $this;
    }

    public function action(Closure $callback): self
    {
        $this->actionCallback = $callback;

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

    public function execute(array $ids): mixed
    {
        if ($this->actionCallback instanceof Closure) {
            return ($this->actionCallback)($ids);
        }

        return null;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'label' => $this->label,
            'icon' => $this->icon,
            'danger' => $this->isDanger,
            'confirm' => $this->confirmMessage,
        ];
    }
}
