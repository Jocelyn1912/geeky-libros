
$.getJSON( 'http://www.etnassoft.com/api/v1/get/?category=libros_programacion&keyword=python&callback=?', function ( results ) {
    console.log( 'Search Result(s): ', results );
} );
