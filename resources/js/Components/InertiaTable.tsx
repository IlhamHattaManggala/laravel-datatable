import React, { useState, useEffect, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { DataTablePayload, ColumnConfig, BulkActionConfig } from '../Types/datatable';

export interface InertiaTableProps {
  table: DataTablePayload;
  className?: string;
}

export const InertiaTable: React.FC<InertiaTableProps> = ({ table, className = '' }) => {
  const { columns, bulkActions, data, pagination, state } = table;

  const [search, setSearch] = useState(state.search || '');
  const [selectedIds, setSelectedIds] = useState<Array<string | number>>([]);
  const [density, setDensity] = useState<'compact' | 'normal' | 'comfortable'>('normal');
  const [visibleColumns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    columns.forEach((col) => {
      initial[col.name] = true;
    });
    return initial;
  });
  const [activeFilters] = useState<Record<string, any>>(state.filters || {});

  // Debounced Search Sync
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== state.search) {
        updateState({ search, page: 1 });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  const updateState = (newParams: Record<string, any>) => {
    router.get(
      window.location.pathname,
      {
        search: state.search,
        sort: state.sort,
        direction: state.direction,
        filters: activeFilters,
        per_page: state.per_page,
        ...newParams,
      },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handleSort = (columnName: string) => {
    const isSame = state.sort === columnName;
    const direction = isSame && state.direction === 'asc' ? 'desc' : 'asc';
    updateState({ sort: columnName, direction });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(data.map((row) => row._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string | number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const executeBulkAction = (action: BulkActionConfig) => {
    if (selectedIds.length === 0) return;

    if (action.confirm && !window.confirm(action.confirm)) {
      return;
    }

    router.post(
      `/datatable/bulk-action`,
      { action: action.name, ids: selectedIds },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setSelectedIds([]),
      }
    );
  };

  const activeColumnCount = useMemo(
    () => columns.filter((col) => visibleColumns[col.name]).length + 1,
    [columns, visibleColumns]
  );

  const getPaddingClass = () => {
    switch (density) {
      case 'compact':
        return 'py-1.5 px-3 text-xs';
      case 'comfortable':
        return 'py-4 px-6 text-sm';
      default:
        return 'py-3 px-4 text-sm';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden space-y-4 p-4 ${className}`}>
      {/* Search Bar & Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search table records... (Press '/' to focus)"
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center space-x-2">
          {/* Density Controls */}
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-800 p-0.5 bg-gray-50 dark:bg-gray-800/40">
            {(['compact', 'normal', 'comfortable'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                  density === d ? 'bg-white dark:bg-gray-700 shadow-xs text-gray-900 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Per Page Selector */}
          <select
            value={state.per_page}
            onChange={(e) => updateState({ per_page: Number(e.target.value), page: 1 })}
            className="px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-medium"
          >
            {[10, 15, 25, 50, 100].map((opt) => (
              <option key={opt} value={opt}>
                {opt} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Selection Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 px-4 py-2.5 rounded-lg animate-fade-in">
          <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
            {selectedIds.length} item(s) selected
          </span>
          <div className="flex items-center space-x-2">
            {bulkActions.map((action) => (
              <button
                key={action.name}
                onClick={() => executeBulkAction(action)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  action.danger
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {action.label}
              </button>
            ))}
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-2"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Main Table Grid */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="p-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={data.length > 0 && selectedIds.length === data.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                />
              </th>
              {columns
                .filter((col) => visibleColumns[col.name])
                .map((col) => (
                  <th
                    key={col.name}
                    onClick={() => col.sortable && handleSort(col.name)}
                    className={`px-4 py-3 ${col.sortable ? 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-300' : ''}`}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{col.label}</span>
                      {col.sortable && state.sort === col.name && (
                        <span>{state.direction === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={activeColumnCount} className="py-8 text-center text-sm text-gray-500">
                  No matching records found.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row._id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors ${
                    selectedIds.includes(row._id) ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row._id)}
                      onChange={(e) => handleSelectRow(row._id, e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  {columns
                    .filter((col) => visibleColumns[col.name])
                    .map((col) => (
                      <td key={col.name} className={getPaddingClass()}>
                        {renderCellValue(col, row[col.name])}
                      </td>
                    ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 pt-2">
        <div>
          Showing {pagination.from ?? 0} to {pagination.to ?? 0} of {pagination.total} entries
        </div>
        <div className="flex items-center space-x-1">
          <button
            disabled={pagination.current_page === 1}
            onClick={() => updateState({ page: pagination.current_page - 1 })}
            className="px-3 py-1.5 border rounded-md disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
          >
            Previous
          </button>
          <span className="px-3 font-semibold">
            Page {pagination.current_page} of {pagination.last_page}
          </span>
          <button
            disabled={pagination.current_page === pagination.last_page}
            onClick={() => updateState({ page: pagination.current_page + 1 })}
            className="px-3 py-1.5 border rounded-md disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

function renderCellValue(column: ColumnConfig, value: any) {
  if (value === null || value === undefined) return <span className="text-gray-400">-</span>;

  if (column.type === 'badge') {
    const color = column.colors?.[value] || 'gray';
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-${color}-100 text-${color}-800 dark:bg-${color}-950 dark:text-${color}-300`}>
        {value}
      </span>
    );
  }

  if (column.type === 'boolean') {
    return value ? (
      <span className="text-emerald-600 font-bold">✓</span>
    ) : (
      <span className="text-red-500 font-bold">✕</span>
    );
  }

  return String(value);
}

export default InertiaTable;
