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
    return this.loaded > this.maxLoad;
  }
};

function onWindowLoad() {
  generateSolutions();
  portfolio.load(8);
  initPopups();

  $('#load-more-button').on('click', () => {
    if (portfolio.load(8))
      $('#load-more-button').remove();
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