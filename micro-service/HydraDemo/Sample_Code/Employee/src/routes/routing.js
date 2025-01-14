const he = require('hydra-express');
const hExpress = he.getExpress();
const hydra = he.getHydra()
let router = hExpress.Router();
const empDetails = [
    { "empId": 101, "empName": "Claire", "age": 30, "level": 3 },
    { "empId": 102, "empName": "Benny", "age": 29, "level": 4 },
    { "empId": 103, "empName": "Daphne", "age": 27, "level": 5 },
    { "empId": 104, "empName": "Matt", "age": 31, "level": 6 },
    { "empId": 105, "empName": "Peter", "age": 29, "level": 6 }
]
router.get('/:empId', async(req, res, next) => {
    try {
        const empId = Number(req.params.empId)
        const details = await empDetails.find(data => data.empId === empId)
            //Creation of request message
        let message = hydra.createUMFMessage({
            to: 'departmentService:[get]/departmentRoute?level=' + details.level,
            from: 'employee_service',
            body: {}
        });
        //Making an API request to another microservice
        try {
            let response = await hydra.makeAPIRequest(message);
            res.send({ result: { data: {...details, salary: response.salary } } })
        } catch (err) { next(err) }
    } catch (error) {
        next(error)
    }
})
module.exports = router