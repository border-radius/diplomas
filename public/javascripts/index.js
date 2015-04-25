$(document).ready(function () {
  $('.runbox').click(function () {
    $('.lightbox').show();
  });

  $('.lightbox').click(function (e) {
    if (!$(e.target).hasClass('center')){
      return;
    }

    $('.lightbox').hide();
  });

  $('form').submit(function (e) {
    $(e.target).find('button').attr('disabled','disabled');
    if ($(e.target).find('input#mail').val()) {
      $.post('/request', {
        mail: $(e.target).find('input#mail').val(),
        name: $(e.target).find('input#name').val(),
        text: $(e.target).find('#text').val()
      }).success(function () {
        $(e.target).find('button').removeAttr('disabled');
        swal("Сообщение отправлено!", "Мы ответим Вам на указанный email", "success");
      }).error(function () {
        $(e.target).find('button').removeAttr('disabled');
        swal("Ошибка", "Что-то пошло не так. Мы уже работаем над этим.", "error");
      });      
    } else {
      $.post('/request', {
        phone: $(e.target).find('input#phone').val(),
        name: $(e.target).find('input#name').val()
      }).success(function () {
        $(e.target).find('button').removeAttr('disabled');
        swal("Запрос отправлен!", "Мы перезвоним Вам в течении часа", "success");
      }).error(function () {
        $(e.target).find('button').removeAttr('disabled');
        swal("Ошибка", "Что-то пошло не так. Мы уже работаем над этим.", "error");
      });
    }

    return false;
  });
});