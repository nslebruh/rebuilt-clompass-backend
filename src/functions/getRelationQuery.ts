import { SelectQueryBuilder } from "typeorm"
import { AppDataSource } from "../data-source"

const getRelationQuery = (entity: any, type: string, array: boolean, value: any) => {
    const statment = array ? "IN" : "="
    const query: SelectQueryBuilder<typeof entity> = AppDataSource.getRepository(entity).createQueryBuilder(type).where(`${type}.id ${statment} :${type}`, {[type]: value})
    return query

}

export {getRelationQuery}