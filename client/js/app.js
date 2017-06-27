var movies = {
  'Transformers:-The-Last-Knight': {id:"Transformers:-The-Last-Knight", title: "Transformers: The Last Knight", year: "2017", director: "Michael Bay", cast: "Mark Wahlberg, Anthony Hopkins, Josh Duhamel", imdb: "http://www.imdb.com/title/tt3371366/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=2773216402&pf_rd_r=08N3BAV4T28T5TB844WV&pf_rd_s=right-7&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_cht_t0"},
  'The-House': {id:"The-House" , title: "The House", year: "2017", director: " Andrew Jay Cohen", cast: "Will Ferrell, Amy Poehler, Ryan Simpkins", imdb: "http://www.imdb.com/title/tt4481514/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=2750721702&pf_rd_r=08N3BAV4T28T5TB844WV&pf_rd_s=right-2&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_otw_t1"},
}

// UPDATE LIST
var updateList = function(moviesList) {
  var tableBodyHtml = $('tbody');
  tableBodyHtml.empty();

  if(Object.keys(moviesList).length === 0) {
    tableBodyHtml.append('<td colspan="4">No movies</td>');

  } else {
    console.log(moviesList);
    for (var i = 0; i < Object.keys(moviesList).length; i++) {
      var movie = movies[Object.keys(moviesList)[i]];

      var row = '<tr>'+
      '<th id="'+ movie.id +'" class="js-movie-id">' + movie.title + '</th>'+
      '<td>' + movie.year + '</td>'+
      '<td>' + movie.director + '</td>'+
      '<td>' + movie.cast + '</td>'+
      '<td>'+
        '<a href="'+ movie.imdb +'"><span class="glyphicon glyphicon-play-circle" aria-hidden="true" style="color:blue; margin-right:10px"></span></a>'+
      '</td>'+
      '<td>'+
        '<a href="#" class="js-show-movie js-'+ movie.id +'"><span class="glyphicon glyphicon-eye-open" aria-hidden="true" style="color:blue; margin-right:10px"></span></a>'+
      '</td>'+
      '</tr>';

      tableBodyHtml.append(row);
    }
  }
  attachListeners();
};

// SHOW
var showmovie = function(movieId) {
  var movie = movies[movieId]
  console.log(movie);
  $('#year').text(movie.year);
  $('#director').text(movie.director);
  $('#cast').text(movie.cast);
  $('#imdb').attr('href', movie.imdb);
  showDetailView('#show/' + movie.title, movie.title);
}

var showListView = function() {
  window.location = "#";
  $('#sec-detail').hide();
  $('#sec-list').show();
}

var showDetailView = function(location, title) {
  window.location = location;
  $('#detail-title').text(title);
  $('#sec-list').hide();
  $('#save').show();
  $('#sec-detail').show();
}

var attachListeners = function() {
  // SHOW CLICKED
  $('.js-show-movie').click(function(e) {
    e.preventDefault();
    var selectedmovieId = $(e.currentTarget).closest('tr').find('.js-movie-id').attr('id');
    showmovie(selectedmovieId);
  });

}

$(function() {
  window.location = '#';
  updateList(movies);

  // EVENTS -----------
  // SHOW CREATE
  $('#new').click(function() {
    showDetailView('#create', 'Create');
  });

  // CANCEL ACTION
  $('#cancel').click(function() {
    showListView();
  });

  // CANCEL ACTION
  $('#search').click(function() {
    searchmovie($('#search-field').val());
  });

  $(window).bind('hashchange', function(e) {
    var routeInfo = window.location.hash.split('/');

    switch(routeInfo[0]) {
      case '':
        showListView();
      break;
      case '#show':
        showmovie(routeInfo[1]);
      break;
    }
  });

  attachListeners();
});
