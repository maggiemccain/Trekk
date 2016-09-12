console.log('is this working');

$('#readyBtn').on('click', function(event){
  $(event.target).closest('div').hide();
  $('#firstFilter').show();
  console.log('clicked ready button');
})
