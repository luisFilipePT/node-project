var users = {
  'luis': {nickname: "luis", name: "Luis", lastName: "Oliveira", age: 35},
  'nunes': {nickname: "nunes", name: "Nuno", lastName: "Santos", age: 22},
}

// UPDATE LIST
var updateList = function(usersList) {
  var tableBodyHtml = $('tbody');
  tableBodyHtml.empty();

  if(Object.keys(usersList).length === 0) {
    tableBodyHtml.append('<td colspan="4">No users</td>');

  } else {
    console.log(usersList);
    for (var i = 0; i < Object.keys(usersList).length; i++) {
      var user = users[Object.keys(usersList)[i]];

      var row = '<tr>'+
      '<th class="js-user-id">' + user.nickname + '</th>'+
      '<td>' + user.name + '</td>'+
      '<td>' + user.lastName + '</td>'+
      '<td>' + user.age + '</td>'+
      '<td>'+
        '<a href="#" class="js-show-user js-'+ user.nickname +'"><span class="glyphicon glyphicon-eye-open" aria-hidden="true" style="color:blue; margin-right:10px"></span></a>'+
        '<a href="#" class="js-edit-user js-'+ user.nickname +'"><span class="glyphicon glyphicon-pencil" aria-hidden="true"  style="color:blue; margin-right:10px"></span></a>'+
        '<a href="#" id="js-delete-user-'+ user.nickname +'" class="js-delete-user js-'+ user.nickname +'"><span class="glyphicon glyphicon-trash" aria-hidden="true"  style="color:blue"></span></a>'+
      '</td>'+
      '</tr>';

      tableBodyHtml.append(row);
    }
  }
  attachListeners();
};

// CREATE
var createUser = function() {
  var newUser = {
    nickname: $('#nickname').val(),
    name: $('#first-name').val(),
    lastName: $('#last-name').val(),
    age: $('#age').val(),
  }

  for (var i = 0; i < Object.keys(users).length; i++) {
    var user = users[Object.keys(users)[i]];


    if (user.nickname === newUser.nickname) {
      alert('Nickname already exists');
      return;
    }

  }

  users[newUser.nickname] = newUser;

  updateList(users);
  showListView();
};

// SEARCH
var searchUser = function(searchTerm) {
  var filteredUsers = {};

  for (var i = 0; i < Object.keys(users).length; i++) {
    var user = users[Object.keys(users)[i]];

    if (user.nickname.indexOf(searchTerm) !== -1) {
      filteredUsers[user.nickname] = user;
    }
  };

  updateList(filteredUsers);
};

// SHOW
var showUser = function(userId) {
  var user = users[userId]
  $('#nickname').val(user.nickname).attr('disabled', true);
  $('#first-name').val(user.name).attr('disabled', true);
  $('#last-name').val(user.lastName).attr('disabled', true);
  $('#age').val(user.age).attr('disabled', true);
  showDetailView('#show/' + user.nickname, 'Show');
  $('#save').hide();
}

// SHOW
var editUser = function(userId) {
  var user = users[userId]
  $('#nickname').val(user.nickname).attr('disabled', true);
  $('#first-name').val(user.name);
  $('#last-name').val(user.lastName);
  $('#age').val(user.age);
  showDetailView('#edit/' + user.nickname, 'Edit');
}

// DELETE
var deleteUser = function(userId) {
  delete users[userId];
  updateList(users);
}

// RESET FORM
var resetForm = function() {
  $('#nickname').val('').attr('disabled', false);
  $('#first-name').val('').attr('disabled', false);
  $('#last-name').val('').attr('disabled', false);
  $('#age').val('').attr('disabled', false);
}

var showListView = function() {
  window.location = "#";
  $('#sec-detail').hide();
  $('#sec-list').show();
  resetForm();
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
  $('.js-show-user').click(function(e) {
    e.preventDefault();
    var selectedUserId = $(e.currentTarget).closest('tr').find('.js-user-id').text();
    showUser(selectedUserId);
  });

  // DELETE CLICKED
  $('.js-delete-user').click(function(e) {
    e.preventDefault();
    var selectedUserId = $(e.currentTarget).closest('tr').find('.js-user-id').text();
    deleteUser(selectedUserId);
  });

  // DELETE CLICKED
  $('.js-edit-user').click(function(e) {
    e.preventDefault();
    var selectedUserId = $(e.currentTarget).closest('tr').find('.js-user-id').text();
    editUser(selectedUserId);
  });
}

$(function() {
  window.location = '#';
  updateList(users);

  // EVENTS -----------
  // SHOW CREATE
  $('#new').click(function() {
    showDetailView('#create', 'Create');
  });

  // CREATE SAVE
  $('#save').click(function() {
    createUser();
  });

  // CANCEL ACTION
  $('#cancel').click(function() {
    showListView();
  });

  // CANCEL ACTION
  $('#search').click(function() {
    searchUser($('#search-field').val());
  });

  $(window).bind('hashchange', function(e) {
    var routeInfo = window.location.hash.split('/');

    switch(routeInfo[0]) {
      case '':
        showListView();
      break;
      case '#create':
        showDetailView('#create', 'Create');
      break;
      case '#edit':
        editUser(routeInfo[1]);
      break;
      case '#show':
        showUser(routeInfo[1]);
      break;
    }
  });

  attachListeners();
});
