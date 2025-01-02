import { DeleteResult, UpdateResult, FindOptionsWhere, FindOptionsOrder, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class IRepository<T> {
   abstract create(createDto: DeepPartial<T>): Promise<T>;

   abstract createMany(createDtos: DeepPartial<T[]>): Promise<T[]>;

   abstract findAll(
      filter?: FindOptionsWhere<T>,
      sort?: FindOptionsOrder<T>,
      relations?: string[] // Agregar parámetro opcional de relaciones
   ): Promise<T[]>;

   abstract findAllWithPaginate(
      page: number,
      take: number,
      filter?: FindOptionsWhere<T>,
      sort?: FindOptionsOrder<T>,
      relations?: string[] // Agregar parámetro opcional de relaciones
   ): Promise<{ result: T[]; pages: number; count: number }>;

   abstract findOne(id: string, relations?: string[]): Promise<T | null>; // Agregar parámetro opcional de relaciones

   abstract findOneWithFilter(
      filters: FindOptionsWhere<T>,
      relations?: string[] // Agregar parámetro opcional de relaciones
   ): Promise<T | null>;

   abstract findOneByAttribute(
      attribute: keyof T,
      value: any,
      relations?: string[] // Agregar parámetro opcional de relaciones
   ): Promise<T | null>;

   abstract update(id: string, updateDto: QueryDeepPartialEntity<T>): Promise<T | null>;

   abstract updateMany(
      filters: FindOptionsWhere<T>,
      updates: QueryDeepPartialEntity<T>
   ): Promise<UpdateResult>;

   abstract deleteMany(filters: FindOptionsWhere<T>): Promise<DeleteResult>;

   abstract deleteOne(id: string): Promise<DeleteResult>;

   abstract count(filters?: FindOptionsWhere<T>): Promise<number>;

   // Método para consultas avanzadas con QueryBuilder
   abstract findWithQueryBuilder(
      alias: string,
      selectFields: string[],
      page: number,
      take: number,
      whereConditions?: { [key: string]: any },
      sort?: FindOptionsOrder<T>,
      relations?: { [key: string]: string }
   ): Promise<{ result: T[]; pages: number; count: number }>

   abstract findAllWithQueryBuilder(
      alias: string,
      selectFields: string[],
      whereConditions?: { [key: string]: any },
      sort?: FindOptionsOrder<T>,
      relations?: { [key: string]: string }
   ): Promise<T[]>
}
