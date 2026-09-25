$(function () {
  $('#btn-ocultar').on('click', function () {
    $('p').fadeOut(300);
  });

  $('#btn-mostrar').on('click', function () {
    $('p').fadeIn(300);
  });

  $('#btn-destacar').on('click', function () {
    $('h1, p').toggleClass('destacado');
  });
});
