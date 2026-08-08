export interface ColumnConfig {
  name: string;
  label: string;
  type: 'text' | 'badge' | 'date' | 'avatar' | 'boolean' | 'action';
  sortable: boolean;
  searchable: boolean;
  copyable?: boolean;
  truncate?: number;
  colors?: Record<string, string>;
  size?: string;
}

export interface FilterConfig {
  name: string;
  label: string;
  type: 'select' | 'date_range' | 'boolean';
  options?: Record<string, string>;
}

export interface BulkActionConfig {
  name: string;
  label: string;
  icon?: string;
  danger?: boolean;
  confirm?: string;
}

export interface PaginationConfig {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number | null;
  to: number | null;
}

export interface TableState {
  search: string;
  sort: string;
  direction: 'asc' | 'desc';
  filters: Record<string, any>;
  per_page: number;
}

export interface DataTablePayload {
  columns: ColumnConfig[];
  filters: FilterConfig[];
  bulkActions: BulkActionConfig[];
  data: Array<Record<string, any>>;
  pagination: PaginationConfig;
  state: TableState;
}
