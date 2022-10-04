import {ValidationError, Validator} from "checkeasy"

const jsonString = (): Validator<string> => (v: any, path: string) => {
    try {
        let x = JSON.parse(v)
        return v
    } catch (error) {
        throw new ValidationError(`${path} is not a valid JSON string. (${v})`)
    }
    
}

export { jsonString }