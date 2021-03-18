var _ = require('lodash');
const mongoose = require('mongoose')
const MemberModel = require('../mongodb_models/member.model')

const URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const OPTS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auto_reconnect: true,
    connectTimeoutMS: 3600000,
    keepAlive: 3600000,
    socketTimeoutMS: 3600000
};

async function run() {
    console.log(URI)
    await mongoose.connect(URI, OPTS);
}

run();
// receive message from master process
process.on('message', async (message) => {
    console.log('Child Process started');
    MemberModel.aggregate([{
            $match: {
                status: "active",
            }
        },
        {
            $project: {
                "Member_Name": "$name",
                "Member_Email": "$email",
                "Member_Phone": "$phone",
                "Member_ID": "$_id",
                "idString": {
                    "$toString": "$_id"
                },
            }
        },
        {
            $lookup: {
                from: 'FeesReceipt',
                let: {
                    memberID: "$idString"
                },
                pipeline: [{
                        $match: {
                            $expr: {
                                $and: [{
                                    $eq: ["$member", "$$memberID"]
                                }]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            lastPaidMonth: {
                                $last: "$fees_for"
                            }
                        }
                    }
                ],
                as: "LastPaidDetails"
            }
        },
        {
            $lookup: {
                from: 'MemberSubscriptionPlan',
                let: {
                    memberID: '$idString'
                },
                pipeline: [

                    {
                        $match: {
                            $expr: {
                                $and: {
                                    $eq: ['$members', "$$memberID"]
                                }
                            }
                        }
                    }
                ],
                as: 'MembershipDetails'
            }
        }
    ]).exec(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(JSON.stringify(result));
        }

    })
});