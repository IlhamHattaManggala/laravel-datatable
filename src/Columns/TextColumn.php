<?php

declare(strict_types=1);

namespace Manggala\DataTable\Columns;

use Illuminate\Support\Str;

final class TextColumn extends BaseColumn
{
    private bool $copyable = false;

    private ?int $truncateLength = null;

    private string $prefix = '';

    private string $suffix = '';

    public function copyable(bool $copyable = true): self
    {
        $this->copyable = $copyable;

        return $this;
    }

    public function truncate(int $length): self
    {
        $this->truncateLength = $length;

        return $this;
    }

    public function prefix(string $prefix): self
    {
        $this->prefix = $prefix;

        return $this;
    }

    public function suffix(string $suffix): self
    {
        $this->suffix = $suffix;

        return $this;
    }

    public function format(mixed $value, mixed $row): mixed
    {
        $val = parent::format($value, $row);
        if ($val === null) {
            return null;
        }

        $str = (string) $val;
        if ($this->truncateLength !== null) {
            $str = Str::limit($str, $this->truncateLength);
        }

        return $this->prefix . $str . $this->suffix;
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'copyable' => $this->copyable,
            'truncate' => $this->truncateLength,
        ]);
    }

    protected function getType(): string
    {
        return 'text';
    }
}
