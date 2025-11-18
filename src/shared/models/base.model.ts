export class BaseModel<TDelegate extends { [k: string]: any }> {
  static model: any
  static hidden: string[] = []

  static async find<T extends { findUnique: (args: any) => any }>(this: { model: T }, id: number, include: any = {}): Promise<Awaited<ReturnType<T["findUnique"]>>> {
    return this.model.findUnique({ where: { id }, include })
  }

  static async findUnique<T extends { findUnique: (args: any) => any }>(this: { model: T }, where: any, include: any = {}): Promise<Awaited<ReturnType<T["findUnique"]>>> {
    return this.model.findUnique({ where, include })
  }

  static async findFirst<T extends { findFirst: (args: any) => any }>(this: { model: T }, where: any, include: any = {}): Promise<Awaited<ReturnType<T["findFirst"]>>> {
    return this.model.findFirst({ where, include })
  }

  static async findMany<T extends { findMany: (args?: any) => any }, TArgs extends Parameters<T["findMany"]>[0]>(this: { model: T }, args?: TArgs): Promise<Awaited<ReturnType<T["findMany"]>>> {
    return this.model.findMany(args)
  }

  static async delete<T extends { delete: (args: any) => any }>(this: { model: T }, id: number): Promise<Awaited<ReturnType<T["delete"]>>> {
    return this.model.delete({ where: { id } })
  }

  static async deleteMany<T extends { deleteMany: (args?: any) => any }, TArgs extends NonNullable<Parameters<T["deleteMany"]>[0]>["where"]>(this: { model: T }, where?: TArgs): Promise<Awaited<ReturnType<T["deleteMany"]>>> {
    return this.model.deleteMany(where ? { where } : {})
  }

  static async create<T extends { create: (args: any) => any }, TArgs extends Parameters<T["create"]>[0]>(this: { model: T }, args: TArgs): Promise<Awaited<ReturnType<T["create"]>>> {
    return this.model.create(args)
  }

  static async createMany<T extends { createMany: (args: any) => any }, TArgs extends Parameters<T["createMany"]>[0]>(this: { model: T }, args: TArgs): Promise<Awaited<ReturnType<T["createMany"]>>> {
    return this.model.createMany(args)
  }

  static async updateMany<T extends { updateMany: (args: any) => any }, TArgs extends Parameters<T["updateMany"]>[0]>(this: { model: T }, args: TArgs): Promise<Awaited<ReturnType<T["updateMany"]>>> {
    return this.model.updateMany(args)
  }

  static async count<T extends { count: (args?: any) => Promise<number> }, TArgs extends NonNullable<Parameters<T["count"]>[0]>["where"]>(this: { model: T }, where?: TArgs): Promise<number> {
    return this.model.count(where ? { where } : {})
  }

  static async update<T extends { update: (args: any) => any }, TData>(this: { model: T }, id: number, data: TData): Promise<Awaited<ReturnType<T["update"]>>> {
    return this.model.update({
      where: { id },
      data
    })
  }

  static async paginate<T extends { findMany: (args?: any) => any; count: (args?: any) => any }, TArgs extends Parameters<T["findMany"]>[0]>(this: { model: T }, args: TArgs & PaginationParams): Promise<PaginatedResult<Awaited<ReturnType<T["findMany"]>>[number]>> {
    const { page = 1, pageSize = 10, ...rest } = args

    const skip = (page - 1) * pageSize
    const take = pageSize

    if (isNaN(skip) || isNaN(take) || skip < 0 || take <= 0 || isNaN(page) || isNaN(pageSize) || page <= 0 || pageSize <= 0) {
      throw new Error("Invalid pagination parameters")
    }

    const { where } = rest as { where?: any }

    const total = await (this.model as any).count({ where })

    const data = await (this.model as any).findMany({
      ...(rest as any),
      skip,
      take
    })

    const totalPages = Math.ceil(total / pageSize)

    return {
      data,
      pagination: {
        total,
        page,
        pages: totalPages,
        pageSize,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    }
  }
}
