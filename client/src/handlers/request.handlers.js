import { validationResults } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResults(req)

    if (!errors.isEmpty()) return res.status(400).json(errors.array[0].msg);
};

export default { validate };