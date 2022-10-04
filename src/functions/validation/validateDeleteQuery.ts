import { object, int, alternatives, arrayOf  } from "checkeasy"

const deleteValidator = object({
    id: alternatives([int(), arrayOf(int(), {min: 1})])
}, {min: 1, max: 1})

export {deleteValidator}