const DBCON = require('../db_config');
const { issetNotEmpty } = require('../helpers/common');
const AddLessModel = require('../models/add_less_mas.model');
const AddLess = new AddLessModel();
const LedgerModel = require('../models/ledger_mas.model');
const Ledger = new LedgerModel();









const Product_CategoryModel = require('../models/product_category_mas.model');
const Product_Category = new Product_CategoryModel();

const Ledger_GroupModel = require('../models/ledger_group_mas.model');
const Ledger_Group = new Ledger_GroupModel();

const Ledger_CategoryModel = require('../models/ledger_category_mas.model');
const Ledger_Category = new Ledger_CategoryModel();



exports.saveAddLess = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    AddLess.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getAllAddLesss = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    AddLess.getAll((err, data) => {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendSuccess("", data)
        }
    })
}


exports.getAllAddLessSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as vale, name from add_less_mas where status = ?', status, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getAddLess = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);
    const USER = req.user;

    AddLess.find(Number(id), function (err, data) {
        if (err) {
            console.log(err);
            res.sendError(err)
        } else {
            res.sendInfo("", data);
        }
    })
}

exports.deleteAddLess = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);
    const USER = req.user;

    if (issetNotEmpty(id)) {
        AddLess.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Add Less Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Add Less Not Found! ")
    }

}

exports.saveLedger = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Ledger.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getLedger = function (req, res) {
    var ID = req.query.id;
    if(issetNotEmpty(ID))
    {
        Ledger.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    }
    else{
        Ledger.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.getAllLedgerSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as vale, name from ledger where status = ?', status, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// exports.getAddLess = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     AddLess.find(Number(id), function (err, data) {
//         if (err) {
//             console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteLedger = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Ledger.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Ledger Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Ledger Not Found! ")
    }

}






//product_category 

// exports.saveProduct_Category = function (req, res) {
//     const body = req.body;
//     body.id = req.query.id;
//     Product_Category.checkAndSaveOrUpdate(body, (err, result, msg) => {
//         if (err) {
//             console.log(err);
//             res.sendError(err);
//         } else {
//             res.sendSuccess(msg, result)
//         }
//     })
// }


// exports.getAllProduct_Categorys = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     Product_Category.getAll((err, data) => {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendSuccess("", data)
//         }
//     })
// }


// exports.getAllProduct_CategorySB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select id as value, name from product_category_mas where status = ?', status, function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }

// exports.getProduct_Category = function (req, res) {
//     // const id = req.query.id;
//     // console.log("ID : " + id);
//     // const USER = req.user;

//     // Product_Category.find(Number(id), function (err, data) {
//     //     if (err) {
//     //         console.log(err);
//     //         res.sendError(err)
//     //     } else {
//     //         res.sendInfo("", data);
//     //     }
//     // })
//     var ID = req.query.id;
//     if(issetNotEmpty(ID))
//     {
//         Product_Category.find(Number(ID), function (err, data) {
//             if (err) {
//                 console.log(err);
//                 res.sendError(err)
//             } else {
//                 res.sendInfo("", data);
//             }
//         })
//     }
//     else{
//         Product_Category.getAll((err, data) => {
//             if (err) {
//                 console.log(err)
//                 res.sendError(err)
//             } else {
//                 res.sendSuccess("", data)
//             }
//         })
//     }
// }

// exports.deleteProduct_Category = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     if (issetNotEmpty(id)) {
//         Product_Category.delete(Number(id), function (err, data) {
//             if (err) {
//                 console.log(err);
//                 res.sendError(err)
//             } else {
//                 res.sendInfo("Product Category Deleted Successfully!");
//             }
//         })
//     } else {
//         res.sendWarning("Product Category Not Found! ")
//     }

// }




exports.saveProduct_Category = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Product_Category.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getProduct_Category = function (req, res) {
    var ID = req.query.id;
    if(issetNotEmpty(ID))
    {
        Product_Category.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    }
    else{
        Product_Category.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.getAllProduct_CategorySB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as vale, name from product_category where status = ?', status, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// exports.getAddLess = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     AddLess.find(Number(id), function (err, data) {
//         if (err) {
//             console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteProduct_Category = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Product_Category.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Product Category Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Product Category Not Found! ")
    }

}


exports.saveLedger_Group = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Ledger_Group.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getLedger_Group = function (req, res) {
    var ID = req.query.id;
    if(issetNotEmpty(ID))
    {
        Ledger_Group.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    }
    else{
        Ledger_Group.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.getAllLedger_GroupSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as vale, name from ledger_group where status = ?', status, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// exports.getAddLess = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     AddLess.find(Number(id), function (err, data) {
//         if (err) {
//             console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteLedger_Group = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Ledger_Group.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Ledger Group Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Ledger Group Not Found! ")
    }

}

exports.saveLedger_Category = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Ledger_Category.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getLedger_Category = function (req, res) {
    var ID = req.query.id;
    if(issetNotEmpty(ID))
    {
        Ledger_Category.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    }
    else{
        Ledger_Category.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.getAllLedger_CategorySB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as vale, name from ledger_category where status = ?', status, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// exports.getAddLess = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     AddLess.find(Number(id), function (err, data) {
//         if (err) {
//             console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteLedger_Category = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Ledger_Category.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Ledger Category Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Ledger Category Not Found! ")
    }

}
