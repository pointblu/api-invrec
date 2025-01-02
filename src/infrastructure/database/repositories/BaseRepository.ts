import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult, FindOptionsWhere, FindOptionsOrder, DeepPartial, DataSource } from 'typeorm';
import { IRepository } from 'application/ports/Repository/IRepository.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class BaseRepository<T> implements IRepository<T> {
    constructor(
        protected readonly repository: Repository<T>,
        protected readonly dataSource: DataSource, // Agregar DataSource para QueryBuilder avanzado
    ) { }

    async create(createDto: DeepPartial<T>): Promise<T> {
        return await this.repository.save(createDto);
    }

    async createMany(createDtos: DeepPartial<T[]>): Promise<T[]> {
        return await this.repository.save(createDtos);
    }

    async findAll(
        filter?: FindOptionsWhere<T>,
        sort?: FindOptionsOrder<T>,
        relations?: string[]
    ): Promise<T[]> {
        return await this.repository.find({
            where: filter,
            order: sort,
            relations, // Agregar relaciones
        });
    }

    async findAllWithPaginate(
        page: number,
        take: number,
        filter?: FindOptionsWhere<T>,
        sort?: FindOptionsOrder<T>,
        relations?: string[]
    ): Promise<{ result: T[]; pages: number; count: number }> {
        const [result, count] = await this.repository.findAndCount({
            where: filter,
            order: sort,
            skip: (page - 1) * take,
            take,
            relations, // Agregar relaciones
        });
        const pages = Math.ceil(count / take);

        return { result, pages, count };
    }

    async findOne(id: string, relations?: string[]): Promise<T | null> {
        return await this.repository.findOne({
            where: { id } as unknown as FindOptionsWhere<T>,
            relations, // Agregar relaciones
        });
    }

    async findOneWithFilter(filters: FindOptionsWhere<T>, relations?: string[]): Promise<T | null> {
        return await this.repository.findOne({
            where: filters as unknown as FindOptionsWhere<T>,
            relations, // Agregar relaciones
        });
    }

    async findOneByAttribute(attribute: keyof T, value: any, relations?: string[]): Promise<T | null> {
        return await this.repository.findOne({
            where: { [attribute]: value } as FindOptionsWhere<T>,
            relations, // Agregar relaciones
        });
    }

    async update(id: string, updateDto: QueryDeepPartialEntity<T>): Promise<T | null> {
        await this.repository.update(id, updateDto);
        return await this.findOne(id);
    }

    async updateMany(filters: FindOptionsWhere<T>, updates: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
        return await this.repository.update(filters, updates);
    }

    async deleteMany(filters: FindOptionsWhere<T>): Promise<DeleteResult> {
        return await this.repository.delete(filters);
    }

    async deleteOne(id: string): Promise<DeleteResult> {
        return await this.repository.delete({ id } as unknown as FindOptionsWhere<T>);
    }

    async count(filters?: FindOptionsWhere<T>): Promise<number> {
        return await this.repository.count({ where: filters });
    }

    // Nuevo método para consultas avanzadas con QueryBuilder
    async findWithQueryBuilder(
        alias: string,
        selectFields: string[],
        page: number,
        take: number,
        whereConditions?: { [key: string]: any },
        sort?: FindOptionsOrder<T>,
        relations?: { [key: string]: string }
    ): Promise<{ result: T[]; pages: number; count: number }> {
        const queryBuilder = this.repository.createQueryBuilder(alias);

        // Agregar campos de selección con alias
        queryBuilder.select(selectFields);

        // Agregar condiciones de filtrado si existen
        if (whereConditions) {
            Object.entries(whereConditions).forEach(([key, value]) => {
                queryBuilder.andWhere(`${alias}.${key} = :${key}`, { [key]: value });
            });
        }

        // Agregar relaciones y joins si existen
        if (relations) {
            Object.keys(relations).forEach(relation => {
                queryBuilder.leftJoinAndSelect(`${alias}.${relation}`, relations[relation]);
            });
        }

        // Agregar orden si está definido
        if (sort) {
            Object.entries(sort).forEach(([key, value]) => {
                queryBuilder.addOrderBy(`${alias}.${key}`, value as 'ASC' | 'DESC');
            });
        }

        // Aplicar paginación
        queryBuilder.skip((page - 1) * take).take(take);

        try {
            // Ejecutar la consulta y contar los resultados
            const [result, count] = await queryBuilder.getManyAndCount();
            const pages = Math.ceil(count / take);

            return { result, pages, count };
        } catch (error) {
            console.error("Error en QueryBuilder:", error.message);
            throw new InternalServerErrorException("Error en la consulta de base de datos");
        }
    }
    async findAllWithQueryBuilder(
        alias: string,
        selectFields: string[],
        whereConditions?: { [key: string]: any },
        sort?: FindOptionsOrder<T>,
        relations?: { [key: string]: string }
    ): Promise<T[]> {
        const queryBuilder = this.repository.createQueryBuilder(alias);

        // Agregar campos de selección con alias
        queryBuilder.select(selectFields);

        // Agregar condiciones de filtrado si existen
        if (whereConditions) {
            Object.entries(whereConditions).forEach(([key, value]) => {
                queryBuilder.andWhere(`${alias}.${key} = :${key}`, { [key]: value });
            });
        }

        // Agregar relaciones y joins si existen
        if (relations) {
            Object.keys(relations).forEach(relation => {
                queryBuilder.leftJoinAndSelect(`${alias}.${relation}`, relations[relation]);
            });
        }

        // Agregar orden si está definido
        if (sort) {
            Object.entries(sort).forEach(([key, value]) => {
                queryBuilder.addOrderBy(`${alias}.${key}`, value as 'ASC' | 'DESC');
            });
        }

        try {
            // Ejecutar la consulta y devolver todos los resultados
            const result = await queryBuilder.getMany();
            return result;
        } catch (error) {
            console.error("Error en QueryBuilder:", error.message);
            throw new InternalServerErrorException("Error en la consulta de base de datos");
        }
    }
}
