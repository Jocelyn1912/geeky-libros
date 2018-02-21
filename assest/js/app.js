
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


/*
$('#prueba').click(function() {
  var string = "https://openlibra.com/book/javascript-inspirate";
  var separar = string.split("/");
  var url = "https://openlibra.com/es/book/download/" + separar[4];
  console.log(url);
});
*/




/*
id
author
categories:[]
content /reseña
content_short
cover
language
num_comments
pages
publisher
publisher_date
tags:[]
thumbnail
title

https://openlibra.com/es/book/download/javascript-inspirate
https://openlibra.com/book/javascript-inspirate


https://openlibra.com/es/book/download/mongodb-en-espanol-t1-el-principio
https://openlibra.com/book/mongodb-en-espanol-t1-el-principio

'http://www.etnassoft.com/api/v1/get/?get_categories=all&callback=?'

'http://www.etnassoft.com/api/v1/get/?any_tags=[javascript]&lang=spanish&callback=?'
*/
