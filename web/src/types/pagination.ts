export type Order = "ASC" | "DESC";

export interface IPagination<T> {
  data: T[];
  meta: IPaginationMeta;
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
