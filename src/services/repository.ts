export interface Repository<X, Y = X> {
  getAll: () => Promise<X[]>;
  getItemById?: (id: string) => Promise<X>;
  create?: (item: Y) => Promise<X>;
}
