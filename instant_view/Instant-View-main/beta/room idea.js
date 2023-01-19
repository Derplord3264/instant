/* This is a snipit I made that might work as a room function. We might have to move to the scaledrone platform to make it work though :( */

let room, peerConnection;
let roomName = "observable-" + prompt("Enter room name", "defaultRoom");
let userName = prompt("Hey there, what's your name?", "Incognito") || "no_name";

// One instance of Scaledrone establishes a single connection, takes parameter 'CHANNEL_ID_FROM_DASHBOARD'.
let drone = new ScaleDrone("5gYhBgieIfaOUv1M", {
  data: {
    name: userName
  }
});

const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
};

drone.on("error", error => {
  console.log(error);
});

// 'reconnect' event indicates reconnection occured succesfully.
drone.on("reconnect", () => {
  console.log("reconnected");
});

// 'open' event indicates a connection has been opened.
drone.on("open", error => {
  if (error) return console.error(error);

  // Subscribe to the room specified by the user.
  room = drone.subscribe(roomName);
  room.on("open", error => {
    if (error) {
      onError(error);
    }
  });

  // Event members is invoked once upon connecting to a room and returns array with member list (including client).
  room.on("members", members => {
    console.log("MEMBERS", members);
    const isOfferer = members.length === 2; // Returns boolean, where true means the client is the second person in the room.
    startWebRTC(isOfferer);
  });
