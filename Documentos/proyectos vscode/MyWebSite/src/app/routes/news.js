const dbConnection = require('../../production/dbConnection');
const session = require('express-session')
module.exports = app => {

  const connection = dbConnection();

  app.use(session({
    
    secret: 'secret',
    resave: true,
    loggedin: false,
    
    
    saveUninitialized: true
  }));

  app.get('/logout', function (req, res) {
    req.session.destroy(() => {
      res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
    })
});
  app.post('/login', (req, res)=>{
      var user = req.body.email
      var pass = req.body.password
  
       connection.query('SELECT nombre, email, password FROM usuarios WHERE email= ?',[user], (e,r)=>{
        console.log(pass , r[0].password)
        if(pass == r[0].password){
         
         req.session.loggedin = true
         req.session.nombre = r[0].nombre
         res.redirect("/horario")
        }else{
          res.render('news/login',{

          })
        }
      })
  })
  
  app.get('/semestre', (req,res)=>{
    connection.query('select nombre from materia', (e,r) => {
      res.render('semestre',{
        materia:r,
        title:'semestre'
      }); 
    });
  })
  
  app.get('/perfil', (req,res)=>{
    res.render('perfil.ejs',{
      title:'semestre'
    })
  })
  app.get('/', (req,res)=>{
    res.render('main.ejs',{
      title:'semestre'
    })
  })
  app.get('/login',(req,res)=>{
    res.render('news/login')
  })
  app.get("/horario", function(req,res){
    if(req.session.loggedin){
     connection.query('select * from materia', (e,r) => {
        res.render('news/index',{
          materia:r,
          name: req.session.nombre,
          login:true
        });
      });
    }else{
      
      res.send('fracaso')
    }
    
    });

  app.get('/news', (req, res) => {
    if(req.session.loggedin){
      connection.query('SELECT * FROM materia', (err, result) => {
        res.render('news/news', {
          news: result
        });
      });
    }else{
      res.redirect('/')
    }
   
  });

  app.post("/news",function(req,res){
    var codigo= req.body.codigo;
    var nombre = req.body.nombre;
    var horario= req.body.horario;
    var salon= req.body.salon;
    connection.query("insert into materia (codigo,nombre,horario,salon) value (\""+codigo+"\",\""+nombre+"\",\""+horario+"\",\""+salon+"\")",function(e,r){});
    res.redirect("/news");
  });

  app.get("/edit/:materiaid",function(req,res){
    if(req.session.loggedin){
      connection.query("select * from materia where id="+req.params.materiaid ,function(e,r){
        res.render("news/edit.ejs",{
            materia:r[0]
         });
      });
    }else{
      res.redirect('/')
    }
    
    });


    app.post("/update",function(req,res){
     
        var id = req.body.id;
        var codigo = req.body.codigo;
        var nombre = req.body.nombre;
        var horario = req.body.horario;
        var salon = req.body.salon;
        console.log(id,codigo,nombre,horario,salon)
        connection.query(" update materia set codigo=\""+codigo+"\",nombre=\""+nombre+"\",horario=\""+horario+"\",salon=\""+salon+"\" where id="+id,function(e,r){
        });
      
        res.redirect("/");
      
        res.redirect("/");
      }
    );

    app.get("/delete/:materiaid",function(req,res){
      if(req.session.loggedin){
        connection.query("delete from materia where id="+req.params.materiaid,function(e,r){
        });
        res.redirect("/");
      }else{
        res.redirect("/");
      }
      
    });
};
