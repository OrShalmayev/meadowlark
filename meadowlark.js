require('dotenv').config()
var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');

app.set('port', process.env.PORT || 3000);

/**************************** Serving Static Files ****************************/
app.use(express.static('public'));

/**************************** Local Variables ****************************/
app.use((req,res,next)=>{
    res.locals.url = process.env.BASE_URL;
    res.locals.logo = process.env.LOGO;
    next();
});
/**************************** EJS ****************************/
app.set('view engine', 'ejs');
app.use(expressLayouts);

/**************************** Routing ****************************/

// Home Page
app.get('/', (req, res, next) => {
    res.render('pages/index');
});

// About Page
app.get('/about', (req,res,next)=>{
    let fortunes = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple.",
       ];
    let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('pages/about',{
        fortunes: randomFortune,
    });
});

// custom 404 page
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});