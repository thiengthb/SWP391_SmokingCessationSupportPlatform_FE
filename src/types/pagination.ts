export const Direction = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

export type Direction = (typeof Direction)[keyof typeof Direction];

export type PaginationParams = {
    page?: number;
    size?: number;
    sortBy?: string;
    direction?: Direction;
}

export type PaginationResponse<T> = {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export const defaultPaginationParams: PaginationParams = {
    page: 0,
    size: 10,
    sortBy: "createdAt",
    direction: Direction.DESC,
};

export const defaultPaginationResponse: PaginationResponse<any> = {
    content: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
};