// Función de resgistro de usuarios
function registrar(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  // Si el usuario se registró correctamente
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    // Enviando correo de verificación
    verificar()
  })

  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});
}

// Función de ingreso para usuarios ya registrados
function ingreso(){
  var email2 = document.getElementById('email2').value;
  var password2 = document.getElementById('password2').value;

  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});
}

// Función que monitorea si es que si se registra un nuevo usuario o si existe alguna sesión en nuestro sitio.
function observador(){
  // Si existe algún cambio de usuario o si alguien se registro ejecuta if
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('existe usuario activo')
    aparece(user);
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    console.log('*****************');
    console.log(user.emailVerified);
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    console.log('no existe usuario activo')
    contenido.innerHTML = `<div class="alert alert-primary" role="alert"><img src="assest/img/laptop.png" class="img-responsive"><h3>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</h3></div>`;
    // ...
  }
});
}
observador();

// Función que contruye el dom en caso de haber iniciado sesión
function aparece(user){
  var user = user;
  var contenido = document.getElementById('contenido');
  if (user.emailVerified) {
    var containerLibro = document.getElementById('containerLibro');
    containerLibro.classList.remove('hidden');
    contenido.innerHTML = `<button onclick="cerrar()" class="btn btn-danger">Cerrar sesión</button>`;
  }
}

// Función que cierra sesión
function cerrar(){
  firebase.auth().signOut()
  // Respuesta positiva
  .then(function(){
    console.log('Saliendo...');
  })
  //Respuesta negativa
  .catch(function(error){
    console.log('error');
  })
}

// Función que verifica correo electrónico
function verificar(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('enviando correo...')
}).catch(function(error) {
  // An error happened.
  console.log(error);
  });
}

//const lang = $(this).val();
$('#search').click(function() {
  $('#libros').empty();
  const key = $('#keyword').val();
  $.getJSON( `http://www.etnassoft.com/api/v1/get/?category=libros_programacion&keyword=${key}&num_items=50&callback=?`, function (data) {
    for (var i in data){
      $('#libros').append('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 portada"><button value="' + data[i].ID + '" class="info" type="button" data-toggle="modal" data-target="#myModal"><img src="' + data[i].thumbnail + '"><span>' + data[i].title + '</span></button></div>');
    }// for

     $('.info').click(function(){
      $('.modal-body').empty(); 
      const id = $(this).val();
      $.getJSON(`http://www.etnassoft.com/api/v1/get/?id=${id}&callback=?` , function(details){
        $('.modal-body').append('<h3>' + details[0].title + '</h3><h4><strong>Autor: ' + details[0].author + '</strong></h4><p><strong>Idioma:</strong> ' + details[0].language + '</p><p><strong>Fecha de publicación:</strong> ' + details[0].publisher_date + '</p><p><strong>Páginas:</strong> ' + details[0].pages + '</p><p><strong>Reseña: </strong><em>' + details[0].content_short + '</em></p><a href="' + details[0].url_download + '" target="_blank">Link para descargar <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span></a>');
        });//llamada 2
      });//funcion detalles
    });//llamada 1
  });// funcion search

