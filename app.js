// Import
const express = require('express');
const fileUpload = require('express-fileupload');
const flash = require('express-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const fs = require('fs');
const fallen = require('./fallen')

// Initial
const app = express();
const svPort = process.env.PORT || 3000;
const removeFileDelay = 60000; // 1 Min

app.use(session({
    secret: process.env.SESSION_SECRET || 'foobar',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(fileUpload({ createParentPath: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(expressLayouts)
app.set('view engine', 'ejs')
/* app.use(express.json()); */

app.use((req, res, next) => {
    res.locals.succMsg = req.flash('succMsg')
    res.locals.errMsg = req.flash('errMsg')
    next()
})

app.get('/', (req, res) => {
    res.render('index.ejs', { downloadUrl: req.flash('downloadUrl') })
})
app.get('/uploads/*', (req, res) => {
    res.download(`./${req.originalUrl}`)
})
app.post('/upload', async (req, res) => {
    try {
        if (!req.files) throw 'Have no upload files... !'
        let myfile = req.files.myfile
        if (req.files.myfile.mimetype !== 'application/xaml+xml') throw 'Invalid file type !'

        const destFilePath = './uploads/' + Date.now() + `_${myfile.name}`
        await myfile.mv(destFilePath)
        setTimeout(() => { fs.unlink(destFilePath, (err) => {}) }, removeFileDelay)

        let fileTxt = await fs.readFileSync(destFilePath, 'utf8')
        await fs.writeFileSync(destFilePath, fallen(fileTxt))

        req.flash('downloadUrl', destFilePath)
        req.flash('succMsg', 'Upload successfully')
    }
    catch (err) { req.flash('errMsg', err) }
    res.redirect('/')
})
   
app.listen(svPort, () => 
  console.log(`App is listening on port ${svPort}.`)
);