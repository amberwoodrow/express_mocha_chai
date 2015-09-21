// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  getFrogs();

  $('#edit-div').hide();

  $("#new-frog").submit(function(event) {    
    $.post('/frogs', $(this).serialize(), function(data) {
    });
    $(this)[0].reset();
    event.preventDefault();
    $('#frog-list').empty();
    getFrogs();
  });

  function getFrogs() {
    $.ajax({
      type: "GET",
      url: "/frogs",
      success: function (result) {
        for (var i=0; i<result.frogs.length; i++) {
          $('#frog-list').append(
            '<tr>' +
              '<td>' + 
                result.frogs[i].name + 
              '</td>'+
              '<td>' + 
                result.frogs[i].favFlyMeal + 
              '</td>' +
              '<td>' +
                '<a class="delete"  data-id="' + result.frogs[i]._id + '">Delete</a>' +
              '</td>' +
              '<td>' +
                '<a class="edit" data-id="' + result.frogs[i]._id + '">Edit</a>' +
              '</td>' +
            '</tr>'
          );
        }
      }
    });
  }

  $(document).on('click', '.delete', function(e) {
    e.preventDefault();
    console.log($(this).data('id'));
    var deleteBtnElement = this;
    $.ajax({
      type: "DELETE",
      url: "/frog/" + $(this).data('id') + "?_method=DELETE",
      success: function (result) {
        $(deleteBtnElement).parent().parent().remove();
      }
    });
  });

  $(document).on('click', '.edit', function() {
    $('#edit-div').show();
    $('#edit-frog').data('frog-id', $(this).data('id'));
  });

  $('#edit-frog').submit(function(e) {
    e.preventDefault();
    var editBtnElement = $(this).data('frog-id');
    $.ajax({
      type: "PUT",
      url: "/frog/" + editBtnElement,
      data: $('#edit-frog').serialize(),
      success: function (result) {
        $('#edit-div').hide();
        $('#frog-list').empty();
        $('#edit-frog').trigger('reset');

         $(this).data('frog-id', '');
        getFrogs();
      }
    });
  });


});
