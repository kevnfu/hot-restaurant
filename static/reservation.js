$('#form').submit(function(e) {
  e.preventDefault();
  let formObj = $('#form').serializeArray()
    .map(item => ({[item.name]: item.value}))
    .reduce((a,b) => Object.assign(a, b));
  // console.log(JSON.stringify(formObj));
  
  $.post('/api/tables', formObj)
    .then(data => {
      if(data.waitlist) {
        alert('Sorry you are on the waitlist.');
      } else {
        alert('Table reserved.');
      }
    });
});