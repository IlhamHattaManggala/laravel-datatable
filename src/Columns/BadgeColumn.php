<?php

declare(strict_types=1);

namespace Manggala\DataTable\Columns;

final class BadgeColumn extends BaseColumn
{
    private array $colors = [];

    public function colors(array $colors): self
    {
        $this->colors = $colors;

        return $this;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'colors' => $this->colors,
        ]);
    }

    protected function getType(): string
    {
        return 'badge';
    }
}
