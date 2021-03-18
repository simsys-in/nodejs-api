const ReportsModel = require('../models/reports.model');


exports.getReportString = function (req, res) {
    const report_name = req.query.report_name
    const USER = req.user
    const COMPANY = USER.company
    console.log(report_name, COMPANY);
    if (COMPANY) {
        ReportsModel.aggregate([{
            $match: {
                file_name: report_name,
                // company: COMPANY
            }
        }]).exec(function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    }
}
