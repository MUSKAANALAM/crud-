var express = require ("express")
var app = express();
var chalk = require("chalk");
var bookRouter = express.Router();
const sql = require("mssql");

/** 
 *@swagger
 * path:
 *  /users/customer:
 *    get:
 *      summary: first API
 *      tags: [Users]
 *      parameters:
 *       - in: path
 *         name: customer
 *         schema:
 *           type: integer
 *         required: true
 *         description: my app
 *      responses:
 *       "200":
 *      description: API ID
 *      
 * 
*/
var bookRouter = express.Router();
function router(nav){  
  const books = [
    {
        "isbn": "9781593275846",
        "title": "Eloquent JavaScript, Second Edition",
        "subtitle": "A Modern Introduction to Programming",
        "author": "Marijn Haverbeke",
        "published": "2014-12-14T00:00:00.000Z",
        "publisher": "No Starch Press",
        "pages": 472,
        "description": "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
        "website": "http://eloquentjavascript.net/"
      },
      {
        "isbn": "9781449331818",
        "title": "Learning JavaScript Design Patterns",
        "subtitle": "A JavaScript and jQuery Developer's Guide",
        "author": "Addy Osmani",
        "published": "2012-07-01T00:00:00.000Z",
        "publisher": "O'Reilly Media",
        "pages": 254,
        "description": "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.",
        "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
      },
      {
        "isbn": "9781449365035",
        "title": "Speaking JavaScript",
        "subtitle": "An In-Depth Guide for Programmers",
        "author": "Axel Rauschmayer",
        "published": "2014-02-01T00:00:00.000Z",
        "publisher": "O'Reilly Media",
        "pages": 460,
        "description": "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.",
        "website": "http://speakingjs.com/"
      },
      {
        "isbn": "9781491950296",
        "title": "Programming JavaScript Applications",
        "subtitle": "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
        "author": "Eric Elliott",
        "published": "2014-07-01T00:00:00.000Z",
        "publisher": "O'Reilly Media",
        "pages": 254,
        "description": "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
        "website": "http://chimera.labs.oreilly.com/books/1234000000262/index.html"
      },
      {
        "isbn": "9781593277574",
        "title": "Understanding ECMAScript 6",
        "subtitle": "The Definitive Guide for JavaScript Developers",
        "author": "Nicholas C. Zakas",
        "published": "2016-09-03T00:00:00.000Z",
        "publisher": "No Starch Press",
        "pages": 352,
        "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.",
        "website": "https://leanpub.com/understandinges6/read"
      }
]
bookRouter.route('/:id')
.all ((req, res, next)=>{
  (async function query(){
    const request = new sql.Request();
    const {id} = req.params;
    const { recordset } = await request.input ('id', sql.Int ,id)
    .query( "select * from books where id = @id" );
    req.book = recordset[0] ;
    next();
}());
})
.get((req,res)=>{
 res.render("index",
       {
              book : req.book,
              nav
      
       }
      )

  }
 )

  

bookRouter.route('/')
.get((req,res)=>{
  (async function query (){ 
    var request = new sql.Request()
    //request.query()
    //.then ((result)=>
    // console.log(result))
   const result = await  request.query("select * from books")
      console.log(result);
      res.render("books",
       {
          books: result.recordset,
          nav
      
       }
      )
    }())
  })
  bookRouter.route('/users/:id')
  .get((req,res)=>{
    (async function query (){ 
      var request = new sql.Request()
      const id = req.params.id
      //request.query()
      //.then ((result)=>
      // console.log(result))
     const result = await  request.input("id",sql.Int,id)
     .query("delete from books where id=@id")
        console.log(result);
        res.render("author",
         {
            books: result.recordset,
            nav
        
         }
        )
      }())
    })
  bookRouter.route('/update/:id').post((req,res)=>{
    (async function query(){
      var request = new sql.Request();
      const id = req.params.id;
      var title = req.body.title;
      var author = req.body.author;
      console.log(id);
      console.log(title)
      var result = await  request.input('id',sql.Int,id)
      var result = await  request.input('title',sql.Char ,title)
      var result = await  request.input('author',sql.Char,author)
      request.query("update books SET title=@title, author= @author where id=@id")
      res.render('author')
    }())
  }) 
  bookRouter.route('/update/:id').get((req,res)=>{
    var id = req.params.id;
     res.render("update",{ id : id}
     )
     console.log(id)
  }) 

      
  return bookRouter;
}



module.exports = router ;
