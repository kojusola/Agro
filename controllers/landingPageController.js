const catchAsync = require("./../utils/catchAsync")

exports.landPage = catchAsync(async(req, res, next) => {
    res.render('agroindex')
})