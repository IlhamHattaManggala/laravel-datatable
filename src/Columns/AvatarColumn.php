<?php

declare(strict_types=1);

namespace Manggala\DataTable\Columns;

final class AvatarColumn extends BaseColumn
{
    private string $size = 'md';

    public function size(string $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'size' => $this->size,
        ]);
    }

    protected function getType(): string
    {
        return 'avatar';
    }
}
