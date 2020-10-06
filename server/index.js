require('dotenv').config()

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const {
    sequelize
} = require("./models")
const config = require("./config")

const path = require("path")

const app = express()

app.use("/static", express.static(path.join(__dirname, 'static')))

app.use(express.json())
app.use(morgan("combined"))
app.use(cors())

require('./middleware/passport')

require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
    const appPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(appPath));

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}

sequelize.sync({force: true})
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
    });