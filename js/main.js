window.onload = onWindowLoad; // Если кто-то подключит скрипт без 'defer'

var solutionNames = [
  "Кухни",
  "Шкафы-купе",
  "Гостиные",
  "Прихожие",
  "Спальни",
  "Гардеробы",
  "Кабинеты",
  "Библиотеки",
  "Лофтовая мебель",
  "Для кафе",
  "Торговое оборудование",
  "Офисная мебель"
];

var portfolio = {
  loaded: 0,
  maxLoad: 73,
  load: function(count) {
    var source = $("#portfolio-item-template").html();
    var template = Handlebars.compile(source);
    var itemsLeft = count;

    while (this.loaded <= this.maxLoad && itemsLeft-- > 0) {
      $("#portfolio .container")
        .append(
          template({
            index: ++this.loaded
          })
        );
    }
    return this.loaded <= this.maxLoad; // Осталось еще картинок?
  }
};

var callRequestDialog = {
  opened: false,
  open: function() {
    if (this.opened) return;
    this.opened = true;

    var source = $("#call-dialog-template").html();
    var template = Handlebars.compile(source);
    $('body').append(template());

    $('.user-dialog__bg, .user-dialog__close-btn').click(() => {
      this.close();
    });

    $('#submit-btn').click(() => {
      var prevent = false;
      $('.user-dialog input').removeClass('request-call__input--border-red');

      $('.user-dialog input').each((index) => {
        var current = $($('.user-dialog input')[index]);
        
        current.removeClass('request-call__input--border-red');
        if (!current.val()) {
          prevent = true;
          current.addClass('request-call__input--border-red');
        }
      });
      if (prevent) return;

      this.close();
      showMessageDialog('Спасибо!', 'Скоро мы вам перезвоним!');
    });
  },
  close: function() {
    if (!this.opened) return;
    this.opened = false;
    closeMessageDialog();
  }
}

function onWindowLoad() {
  generateSolutions();
  portfolio.load(8);
  initPopups();

  $('#load-more-button').on('click', () => {
    if (!portfolio.load(8))
      $('#load-more-button').remove();
  });

  $('.request-call-btn').on('click', () => {
    callRequestDialog.open();
  });
}

function generateSolutions() {
  var source = $("#solution-template").html();
  var template = Handlebars.compile(source);

  for (index in solutionNames)
    $("#our-solutions .container")
      .append(
        template({
          number: +index+1,
          name: solutionNames[index]
        })
      );
}

function initPopups() {
  $('#portfolio .container').magnificPopup({
    delegate: 'div',
    type: 'image',
    gallery: {
      enabled: true
    },
    callbacks: {
      buildControls: function() {
        this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
      }
    },
    closeMarkup: '<div title="%title%" type="button" class="mfp-close"></button>'
  });
}

function showMessageDialog(title, message) {
  closeMessageDialog();
  var source = $("#message-dialog-template").html();
  var template = Handlebars.compile(source);
  $('body').append(template({title, message}));

  $('.user-dialog__bg, .user-dialog__close-btn, #submit-btn').on('click', () => {
    closeMessageDialog();
  });
}

function closeMessageDialog() {
  if ($('.user-dialog-wr').length) {
    $('.user-dialog__bg, .user-dialog__close-btn').off('click');
    $('.user-dialog-wr').remove();
  }
}