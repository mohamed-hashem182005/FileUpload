

const admin = (req, res, next) => {
    if (req.userInfo.role !== 'admin') {
        return res.status(500).json({
            acess: false,
            message:'Not acess in your app '
        })
    }
    next();
}

module.exports = admin;