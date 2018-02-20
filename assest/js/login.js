// Función de resgistro de usuarios
function registrar(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  // Si el usuario se registró correctamente
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
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
    contenido.innerHTML = `<div class="alert alert-primary" role="alert">No has iniciado seción</div>`;
    // ...
  }
});
}
observador();

// Función que contruye el dom en caso de haber iniciado seción
function aparece(user){
  var user = user;
  var contenido = document.getElementById('contenido');
  if (user.emailVerified) {
    contenido.innerHTML = `<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
  <p>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p><button onclick="cerrar()" class="btn btn-danger">Cerrar sesión</button>`;
  }
}

// Función que cierra seción
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

// Función que envía un correo al usuario que se está creando
function verificar(){
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('Enviando correo...');
}).catch(function(error) {
  // An error happened.
  console.log(error);
});
}

/*Modal*/
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus()
})