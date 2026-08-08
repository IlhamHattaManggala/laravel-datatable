<?php

declare(strict_types=1);

namespace Manggala\DataTable\Columns;

use Illuminate\Support\Carbon;

final class DateColumn extends BaseColumn
{
    private string $format = 'M d, Y';

    private bool $diffForHumans = false;

    public function dateFormat(string $format): self
    {
        $this->format = $format;

        return $this;
    }

    public function diffForHumans(bool $diffForHumans = true): self
    {
        $this->diffForHumans = $diffForHumans;

        return $this;
    }

    public function format(mixed $value, mixed $row): mixed
    {
        $val = parent::format($value, $row);
        if ($val === null) {
            return null;
        }

        $date = Carbon::parse($val);

        if ($this->diffForHumans) {
            return $date->diffForHumans();
        }

        return $date->format($this->format);
    }

    protected function getType(): string
    {
        return 'date';
    }
}
