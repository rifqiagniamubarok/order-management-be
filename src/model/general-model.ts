export interface PaginationRequest {
  search?: string;
  page: number;
  pageSize: number;
}

export interface PaginationResponse extends PaginationRequest {
  nextPage: number;
  prevPage: number;
  lastPage: number;
  total: number;
}
