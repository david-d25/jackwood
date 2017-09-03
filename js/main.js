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

function onWindowLoad() {
  generateSolutions();
  initPopups();
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
  var source = $("#portfolio-item-template").html();
  var template = Handlebars.compile(source);

  for (var i = 1; i <= 8; i++)
    $("#portfolio .container")
      .append(
        template({
          index: i
        })
      );

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