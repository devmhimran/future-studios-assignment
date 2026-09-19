export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Response<X> = {
  data: X;
  meta: Meta;
};
