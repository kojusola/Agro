const Profile = require("./../models/profile")
const catchAsync = require("./../utils/catchAsync")

exports.livechat = catchAsync(async (req, res, next) => {
    const prof = await Profile.findOne({ user_id: req.user._id })
    const node = req.query.node
    const mes = prof.messages.filter(item => item.node == node)
    console.log(mes)
    return res.render('chat.hbs', {node, mes: mes[0]})
})