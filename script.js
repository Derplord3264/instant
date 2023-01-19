var drone = new ScaleDrone('6kUd68NohslUvV6L');

drone.on('open', function (error) {
  if (error) return console.error(error);

  var room = drone.subscribe('general-chat');

  room.on('open', function (error) {
    if (error) return console.error(error);
    console.log('Connected to room');
  });

  room.on('data', addMessageToScreen);
});

function onSubmitForm(event) {
  var nameEl = document.querySelector('.input.name')
    , contentEl = document.querySelector('.input.content');

  if (nameEl.value && contentEl.value) {
    sendMessageToScaleDrone(nameEl.value, contentEl.value);
    contentEl.value = '';
  }
}

function sendMessageToScaleDrone(name, content) {
  drone.publish({
    room: 'general-chat',
    message: {
      name: name,
      content: content
    }
  });
}

function addMessageToScreen(message) {
  var div = document.createElement('div');
  div.innerHTML = '<b>' + message.name + '</b>: ' + message.content;
  div.classList.add('message');
  document.querySelector('.text-area').appendChild(div);
}
