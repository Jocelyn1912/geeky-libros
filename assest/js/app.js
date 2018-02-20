
//const lang = $(this).val();
$('#search').click(function() {
  $('#libros').empty();
  const key = $('#keyword').val();
  $.getJSON( `http://www.etnassoft.com/api/v1/get/?category=libros_programacion&keyword=${key}&num_items=50&callback=?`, function (data) {
    for (var i in data){
      $('#libros').append('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 portada"><img src="' + data[i].thumbnail + '"><h4>' + data[i].title+ '</h4></div>');


    }// for


  });// llamada

});//funcion busqueda

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
