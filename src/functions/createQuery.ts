import { ObjectLiteral, SelectQueryBuilder } from "typeorm"
import { AppDataSource } from "../data-source"
import { typeCheck } from "./typeCheck"

const defaultReturnColumns = {
    student: [
        "id", 
        "fullName", 
        "year", 
        "form", 
        "ssid"
    ], 
    subject: [
        "id", 
        "name", 
        "year"
    ],
    subjects: [
        "id", 
        "name", 
        "year"
    ],
    teacher: [
        "id", 
        "fullName", 
        "code"
    ],
    learningTask: [
        "id", 
        "name", 
        "startDate", 
        "endDate", 
        "subject.name",
    ]
}


const exampleQuery = {
    id: 1
}

const exampleQuery2 = {
    fullName: {
        sortBy: {
            type: "contains",
            value: "j"
        }
    }
}

const addToQuery = (dbQuery: SelectQueryBuilder<ObjectLiteral>, type: string, query: object, mode: number) => {
    const keys = Object.keys(query)
    const values = Object.values(query)
    let selects = []
    for (let i = 0; i < keys.length; i++) {
        if (values[i] !== undefined) {
            if (typeCheck(values[i]) === "boolean") {
               selects.push(`${type}.${keys[i]}`)
            }
            if (values[i].value) {
                selects.push(`${type}.${keys[i]}`)
                if (mode === 0 && i === 0) {
                    dbQuery.andWhere(`${type}.${keys[i]} = :${keys[i]}`, {[keys[i]]: values[i].value})
                } else {
                    dbQuery.where(`${type}.${keys[i]} = :${keys[i]}`, {[keys[i]]: values[i].value})
                }
            } else {
                if (values[i].sortBy || values[i].orderBy) {
                    selects.push(`${type}.${keys[i]}`)
                    if (values[i].sortBy) {
                        let statement: string;
                        let value: string
                        switch (values[i].sortBy.type) {
                            case "contains":
                                statement = "like"
                                value = `%${values[i].sortBy.value}%`
                                break;
                            case "startsWith":
                                statement = "like"
                                value = `${values[i].sortBy.value}%`
                                break;
                            case "endsWith":
                                statement = "like"
                                value = `%${values[i].sortBy.value}`
                                break;
                            case "equalTo":
                                statement = "="
                                value = values[i].sortBy.value
                            case "lessThanOrEqualTo":
                                statement = "<="
                                value = values[i].sortBy.value
                                break;
                            case "greaterThanOrEqualTo":
                                statement = ">="
                                value = values[i].sortBy.value
                                break;
                            case "lessThan":
                                statement = "<"
                                value = values[i].sortBy.value
                                break;
                            case "geaterThan":
                                statement = ">"
                                value = values[i].sortBy.value
                                break;
                            default:
                                break;
                        }
                        console.log(keys[i])
                        console.log(value)
                        if (mode === 0 && i === 0) {
                            dbQuery.where(`${type}.${keys[i]} ${statement} :${keys[i]}`, { [keys[i]]: value })
                        } else {
                            dbQuery.andWhere(`${type}.${keys[i]} ${statement} :${keys[i]}`, { [keys[i]]: value})
                        }
                    }
                    if (values[i].orderBy) {
                        if (mode === 0 && i === 0) {
                            dbQuery.orderBy(keys[i], values[i].orderBy)
                        } else {
                            dbQuery.addOrderBy(keys[i], values[i].orderBy)
                        }
                    }
                } else {
                    dbQuery.leftJoin(`${type}.${keys[i]}`, keys[i])
                    addToQuery(dbQuery, keys[i], values[i], i)
                }
            }
        }
    }
    for (let i = 0; i < defaultReturnColumns[type].length; i++) {
        if (selects.includes(`${type}.${defaultReturnColumns[type][i]}`) === false) {
            selects.push(`${type}.${defaultReturnColumns[type][i]}`)
        }
    }
    dbQuery.addSelect(selects)
    return dbQuery
}

const createQuery = (query: any, entity: any, type: string) => {
    const dbQuery = AppDataSource.getRepository(entity).createQueryBuilder(type)
    const DBquery = addToQuery(dbQuery, type, query, 0)
    return DBquery
    
}


//const addToQuery = (dbQuery: SelectQueryBuilder<ObjectLiteral>, type: string, query: object) => {
//    const keys = Object.keys(query)
//    const values = Object.values(query)
//
//    for (let i = 0; i < keys.length; i++) {
//        if (typeCheck(values[i]) === "object") {
//            let keys2 = Object.keys(values[i])
//            let selectTypes = []
//            dbQuery.leftJoin(`${type}.${keys[i]}`, keys[i])
//            for (let k = 0; k < keys2.length; k++) {
//                selectTypes.push(`${keys[i]}.${keys2[k]}`)
//            }
//            if (!selectTypes.includes(`${keys[i]}.id`)) {
//                selectTypes.push(`${keys[i]}.id`)
//            }
//            dbQuery.addSelect(selectTypes)
//            addToQuery(dbQuery, keys[i], values[i])
//        } else {
//            if (i > 0) {
//                dbQuery.andWhere(`${type}.${keys[i]} like :${keys[i]}`, {[keys[i]]: `%${values[i]}%`})
//            } else {
//                dbQuery.where(`${type}.${keys[i]} like :${keys[i]}`, {[keys[i]]: `%${values[i]}%`})
//            }
//        }
//    }
//    return dbQuery
//}
//
//const createQuery = (entity: any, type: string, query: any) => {
//    console.log(query)
//    let dbQuery = AppDataSource.getRepository(entity).createQueryBuilder(type)
//    let DBquery = addToQuery(dbQuery, "student", query)
//    return DBquery
//}

export {createQuery}