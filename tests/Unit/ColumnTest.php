<?php

declare(strict_types=1);

use Manggala\DataTable\Columns\BadgeColumn;
use Manggala\DataTable\Columns\TextColumn;
use Manggala\DataTable\Tests\TestCase;

uses(TestCase::class);

it('sets attributes fluently on text column DTO', function () {
    $column = TextColumn::make('name')
        ->label('Full Name')
        ->sortable()
        ->searchable()
        ->copyable();

    expect($column->getName())->toBe('name')
        ->and($column->getLabel())->toBe('Full Name')
        ->and($column->isSortable())->toBeTrue()
        ->and($column->isSearchable())->toBeTrue();
});

it('serializes column DTO to array correctly', function () {
    $column = BadgeColumn::make('status')
        ->colors(['active' => 'green', 'banned' => 'red']);

    $array = $column->toArray();

    expect($array)->toBeArray()
        ->and($array['name'])->toBe('status')
        ->and($array['type'])->toBe('badge')
        ->and($array['colors'])->toBe(['active' => 'green', 'banned' => 'red']);
});
