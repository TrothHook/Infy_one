const he = require('../../node_modules/hydra-express');
const hExpress = he.getExpress();
let router = hExpress.Router();

let departmentObj = [
    { level: 1, salary: 15000 },
    { level: 2, salary: 20000 },
    { level: 3, salary: 25000 },
    { level: 4, salary: 30000 },
    { level: 5, salary: 35000 },
    { level: 6, salary: 40000 },
]

router.get('/', async(req, res, next) => {
    try {
        const level = Number(req.query.level)
        const retData = await departmentObj.find(data => data.level === level)
        res.json(retData)
    } catch (error) {
        next(error)
    }

})

module.exports = router