export interface Pagination {
  pageNumber: number;
  pageSize: number; 
  totalElements: number;
  totalPages: number;
}

export const defaultPagination: Pagination = {
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
};