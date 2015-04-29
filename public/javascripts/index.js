$(document).ready(function () {

  function fitHeader () {
    if (window.location.pathname === '/') {
      return;
    }

    var height = $('.menu').outerHeight(true);
    $('header.main').height(height);
  }

  $(window).resize(fitHeader);

  setTimeout(fitHeader, 300);

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
    function E (e) {
      swal('Ошибка!', e, 'error');
    }

    var form = (e.target.id === 'request') ? {
      type: 'request',
      phone: $(e.target).find('input#phone').val(),
      name: $(e.target).find('input#name').val().trim()
    } : (e.target.id === 'feedback') ? {
      type: 'feedback',
      mail: $(e.target).find('input#mail').val(),
      name: $(e.target).find('input#name').val().trim(),
      text: $(e.target).find('#text').val().trim()
    } : {};

    if (form.type === 'request' && !form.phone) {
      E('Укажите номер телефона');
    } else if (form.type === 'feedback' && !form.mail) {
      E('Укажите правильный E-mail');
    } else if (form.type === 'feedback' && !form.text) {
      E('Укажите текст обращения');
    } else if (!form.name) {
      E('Укажите имя');
    } else if (form.type) {
      $(e.target).find('button').attr('disabled','disabled');

      $.post('/request', form).success(function () {
        if (form.type === 'request') {
          swal("Запрос отправлен!", "Мы перезвоним Вам в течении 10 минут", "success");
        } else {
          swal("Сообщение отправлено!", "Мы ответим Вам на указанный email", "success");
        }
        $('.lightbox').hide();
        $(e.target).find('button').removeAttr('disabled');
      }).error(function () {
        $(e.target).find('button').removeAttr('disabled');
        E('Что-то пошло не так. Мы уже работаем над этим.');
      });
    } else {
      E('Неизвестная ошибка');
    }

    return false;
  });
});
