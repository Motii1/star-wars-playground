export interface ModelList<Model> {
  items: Model[];
  hasMore: boolean;
  totalPages: number;
  totalItems: number;
}

export class Pagination {
  public readonly page: number;
  public readonly perPage: number;

  constructor(params: { page: number; perPage: number }) {
    this.page = params.page;
    this.perPage = params.perPage;
  }

  get offset(): number {
    return (this.page - 1) * this.perPage;
  }

  getTotalPages(total: number): number {
    return this.perPage === 0
      ? 1
      : Math.max(Math.ceil(total / this.perPage), 1);
  }

  hasMore(total: number): boolean {
    return this.page < this.getTotalPages(total);
  }

  getModelList<Model>(items: Model[], total: number): ModelList<Model> {
    return {
      items,
      totalItems: total,
      totalPages: this.getTotalPages(total),
      hasMore: this.hasMore(total),
    };
  }
}
