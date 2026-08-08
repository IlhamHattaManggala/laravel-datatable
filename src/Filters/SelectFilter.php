<?php

declare(strict_types=1);

namespace Manggala\DataTable\Filters;

use Illuminate\Database\Eloquent\Builder;

final class SelectFilter extends BaseFilter
{
    private array $options = [];

    public function options(array $options): self
    {
        $this->options = $options;

        return $this;
    }

    public function apply(Builder $builder, mixed $value): Builder
    {
        if (is_array($value)) {
            return $builder->whereIn($this->name, $value);
        }

        return $builder->where($this->name, $value);
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'options' => $this->options,
        ]);
    }

    protected function getType(): string
    {
        return 'select';
    }
}
