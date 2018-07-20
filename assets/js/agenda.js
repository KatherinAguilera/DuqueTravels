$('#add').click( function() { // id (add) click en html
    alert("Note Add!"); 
   var Description = $('#description').val(); // variables 
   var Descriptiones = $('#descriptiones').val();
  if($("#description").val() == '') { // validar que el campo del formulario estes diligenciados
    $('#alert').html("<strong>Warning!</strong> You left the to-do empty");
    $('#alert').fadeIn().delay(1000).fadeOut();
    return false;
   }
     if($("#descriptiones").val() == '') { // validar que el campo del formulario estes diligenciados
    $('#alert').html("<strong>Warning!</strong> You left the to-do empty");
    $('#alert').fadeIn().delay(1000).fadeOut();
    return false;
   }
   $('#todos').prepend("<div>&nbspNote&nbsp&nbsp&nbsp" + Description + "</div>"); //mostrar datos html
     $('#todo').prepend("<div>&nbspDate&nbsp&nbsp&nbsp" + Descriptiones + "</div>"); //mostrar datos html
   $('#form')[0].reset();
   var todos = $('#todos').html();
   localStorage.setItem('todos', todos); // obtener datos por localStorage
   var todo = $('#todo').html(); 
   localStorage.setItem('todo', todo);
   return false;

});

if(localStorage.getItem('todos')) { // guardar datos
$('#todos').html(localStorage.getItem('todos')); 

}
if(localStorage.getItem('todo')) { // guardar datos
$('#todo').html(localStorage.getItem('todo'));
}

$('#clear').click( function() { // borrar todos los datos registrados
window.localStorage.clear();
location.reload();
return false;
});