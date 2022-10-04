import { Validator, ValidationError } from "checkeasy";

const date = (): Validator<string | number> => (v: any, path: string) => {
    if (!Number.isInteger(v) && typeof v !== 'string') {
        return new ValidationError(`[${path}] isn\'t a string or number`)
    }
    if (new Date(v).toString() === "Invalid Date") {
        return new ValidationError(`[${path}] is not a valid date`)
    }
    return v

}

export {date}