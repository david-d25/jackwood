window.onload = onWindowLoad; // Если кто-то подключит скрипт без defer

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