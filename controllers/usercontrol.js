var path = require('path')


exports.user = function( req , res){
res.render("index",
 {
        nav:[ { link:"/users/books",title: "book" } , 
        {link:"/users/author" , title: "Author" } ]

 }
)
}
