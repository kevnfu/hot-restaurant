$(document).ready(function() {
  let resList = $('#res-list');
  let waitList = $('#wait-list');

  $.get('/api/tables')
    .then(data => {
      data.forEach(e => {
        resList.append($(`
          <div class="card card-body">
            <h5 class="card-title">${e.name}</h5>
            <div class="card-text">${e.number}</div>
            <div class="card-text">${e.email}</div>
          </div>`));
      });
    });

  $.get('/api/waitlist')
    .then(data => {
      data.forEach(e => {
        waitList.append($(`
          <div class="card card-body">
            <h5 class="card-title">${e.name}</h5>
            <div class="card-text">${e.number}</div>
            <div class="card-text">${e.email}</div>
          </div>`));
      });
    });
});