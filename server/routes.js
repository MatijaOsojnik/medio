const AuthenticationController = require('./controllers/AuthenticationController')
const ArticlesController = require('./controllers/ArticlesController')
const CategoriesController = require('./controllers/CategoriesController')
const RolesController = require('./controllers/RolesController')
const UsersController = require('./controllers/UsersController')
const GeneralController = require('./controllers/GeneralController')

// const authJwt = require('./middleware/authJwt')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const UserControllerPolicy = require('./policies/UserControllerPolicy')
const ArticleControllerPolicy = require('./policies/ArticleControllerPolicy')

// const UserControllerPolicy = require('./policies/UserControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE";
        return cb(error, false)
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
}).single('file');

module.exports = (app) => {

    // LOGIN, REGISTER ROUTES
    app.post('/api/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post('/api/login', AuthenticationController.login)

    //USER ROUTES
    app.get('/api/users', UsersController.index)
    app.get('/api/users/admin', UsersController.allUserInfo)
    app.get('/api/users/:userId', UsersController.show)
    app.post('/api/users/:userId/upload', upload, UsersController.uploadFile)

    app.use((err, req, res, next) => {
        if (err.code === "INCORRECT_FILETYPE") {
            res.status(422).json({
                error: 'Only images are allowed'
            });
            return;
        }
        if (err.code === "LIMIT_FILE_SIZE") {
            res.status(422).json({
                error: 'File size should be less than 2 MB!'
            });
            return;
        }
    });

    app.put('/api/users/:userId', UserControllerPolicy.update, UsersController.put)
    app.delete('/api/users/:userId', UsersController.delete)

    // ARTICLE ROUTES
    app.get('/api/articles', ArticlesController.index)
    app.get('/api/articles/:articleId', ArticlesController.show)
    app.get('/api/articles/users/:userId', ArticlesController.user)
    app.get('/api/articles/categories/:categoryId', ArticlesController.showCategories)
    app.get('/api/articles/categories/similar/:categoryId/:articleId', ArticlesController.showSimilar)
    app.get('/api/articles/categories/other/:categoryId/:articleId', ArticlesController.showDifferent)

    app.put('/api/articles/:articleId', ArticleControllerPolicy.update, ArticlesController.put)
    app.post('/api/articles/:userId', ArticleControllerPolicy.update, ArticlesController.post)
    app.delete('/api/articles/:articleId', ArticlesController.delete)

    // CATEGORY ROUTES
    app.get('/api/categories', CategoriesController.index)
    app.post('/api/categories', CategoriesController.create)
    app.put('/api/categories', CategoriesController.update)
    app.delete('/api/categories', CategoriesController.delete)

    // ROLE ROUTES
    app.get('/api/roles', RolesController.index)
    app.post('/api/roles', RolesController.create)
    app.put('/api/roles', RolesController.update)
    app.delete('/api/roles', RolesController.delete)

    // GENERAL ROUTES

    app.get('/api/admin/general/count', GeneralController.count)
    app.get('/api/history/:userId', GeneralController.findHistory) //TRACK USER HISTORY
    app.post('/api/history/:articleId/:userId', GeneralController.postHistory)

    //FILE UPLOAD ROUTE
    // app.post('/upload', upload.single('file'), (req, res) => {
    //     res.json({file: req.file})
    //     console.log(req.file)
    //     console.log(req.body)
    // })
}