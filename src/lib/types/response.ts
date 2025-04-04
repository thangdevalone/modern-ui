export interface ErrorResponse {
  success: boolean;
  status: number;
  path: string;
  message: string;
  type: string;
}

export interface SuccessResponse<T> {
  path: string;
  message: string;
  status: number;
  pagination?: Pagination;
  data: T;
}

export interface Pagination {
  page: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
}