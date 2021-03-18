


exports.saveMemberSubscriptionPlan = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const id = req.query.id;
    if (issetNotEmpty(id)) {
        MemberSubscriptionPlanModel.aggregate([{
            $match: {
                _id: ObjectId(id),
                company : USER.company,
            }
        }]).exec(function (err, data) {
            if (err) {
                res.sendError(err)
            } else {
                MemberSubscriptionPlanModel.aggregate([{
                    $match: {
                        name: body.name,
                        status: body.status,
                        company : USER.company,
                        _id: {
                            $ne: ObjectId(id)
                        }
                    }
                }]).exec(function (err, d) {
                    if (err) {
                        console.log(err)
                        res.sendError(err)
                    } else {
                        console.log(d)
                        if (d.length > 0) {
                            res.sendWarning("MemberSubscriptionPlan Name Already Found!")
                        } else {
                            MemberSubscriptionPlanModel.findByIdAndUpdate(ObjectId(id), body, function (err, updatedData) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    res.sendSuccess("MemberSubscriptionPlan Updated Successfully!", updatedData)
                                }
                            })
                        }
                    }
                })
            }
        })
    } else {
        MemberSubscriptionPlanModel.aggregate([{
            $match: {
                name: body.name,
                company : USER.company,
                status: body.status
            }
        }]).exec(function (err, data) {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                if (data.length > 0) {
                    res.sendWarning("MemberSubscriptionPlan Already Found!")
                } else {
                    MemberSubscriptionPlanModel.create(body)
                        .then(createdMemberSubscriptionPlan => {
                            res.sendSuccess("MemberSubscriptionPlan Created Successfully!", createdMemberSubscriptionPlan)
                        })
                        .catch(err => {
                            console.log(err)
                            res.sendError(err)
                        })
                }
            }
        })
    }
}


exports.getAllMemberSubscriptionPlans = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    MemberSubscriptionPlanModel.aggregate([{
        $match: { 
            company : USER.company,
        }
    }]).exec(function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            data.forEach(async (dt, ind) => {
                dt.key = dt._id;
                dt.branch_name = await BranchModel.getBranchById(dt.branch).then(data => data.name);
                dt.designation_name = await DesignationModel.getDesignationById(dt.designation).then(data => data.name);
                dt.company_name = await TenantModel.getTenantById(dt.company).then(data => data.name);
                dt.batch_name = await BatchModel.getBatchById(dt.batch).then(data => data.name);
                if(ind === data.length - 1)
                {
                    res.sendSuccess("", data)
                }
            })
        }
    })
}


exports.getAllMemberSubscriptionPlanSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    MemberSubscriptionPlanModel.aggregate([{
            $match: {
                "status": status,
                company : USER.company,
            }
        },
        {
            $project: {
                "value" : "$_id",
                "name": "$name"
            }
        }
    ]).exec(function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getMemberSubscriptionPlan = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);
    const USER = req.user;

    MemberSubscriptionPlanModel.aggregate([{
        $match: {
            "_id": ObjectId(id),
            company : USER.company,
        }
    }]).exec(function (err, data) {
        if (err) {
            console.log(err);
            res.sendError(err)
        } else {
            // if(data.length > 0)
            // {
            //     data[0].joining_date = new Date(data[0].joining_date)
            // }
            res.sendInfo("", data);
        }
    })
}

exports.deleteMemberSubscriptionPlan = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);
    const USER = req.user;

    if (issetNotEmpty(id)) {
        MemberSubscriptionPlanModel.deleteOne({
            "_id": ObjectId(id),
            company : USER.company,
        }, function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("MemberSubscriptionPlan Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("MemberSubscriptionPlan Not Found! ")
    }

}
