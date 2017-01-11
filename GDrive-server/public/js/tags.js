loader = document.getElementById('loader');

$.getJSON("/data.json", function(data) {
  var nodes = data[0]
    , links = data[1]
    , el = document.getElementById("parent")
    , options = {
    width: screen.width,
    height: screen.height,
    colors: { "7": "blue" }
  };

  graph = new Insights(el, nodes, links, options)
    .filter({ cluster: 0, size: [500, null] })
    .zoom(.85)
    .focus({ text: "color" }, { in: 1 })
    .center()
    .render();

  graph.on('rendered', function() {
    loader.remove();
  })

  graph.on("node:click", function(d) {
    console.log("click", d);
  });

  graph.on("node:mouseover", function(d, offset) {
    console.log("mouseover", d, offset);
  });

  graph.on("node:mouseout", function(d, offset) {
    console.log("mouseout", d, offset);
  });

  graph.tooltip("<div>word: {{text}}</div><div>count: {{count}}</div>");
});


// var tags = {
//   init: function init() {
//     tags.add();
//   },
//   add: function () {
//     $.ajax({
//       url: "/tags/add",
//       method: "post",
//       success: function (res) {
//
//         console.log(res);
//
//       },
//       error: function (res) {
//         console.log(res);
//       }
//     })
//   }
// };
//
// $(function () {
//   tags.init();
// });
