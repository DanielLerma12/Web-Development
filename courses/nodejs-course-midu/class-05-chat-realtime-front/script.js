import { API_URL } from "./config.js";

let username = localStorage.getItem("username");

if (!username) {
  const response = await fetch("https://randomuser.me/api/");

  const data = await response.json();

  username = data.results[0].login.username;

  console.log(username);

  localStorage.setItem("username", username);
}

const socket = io(`${API_URL}`, {
  auth: {
    serverOffset: 0,
    username,
  },
});

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const messages = document.querySelector("#messages");

socket.on("chat message", (result) => {
  const date = new Date(result.created_at);
  const item = `
      <li>
        <strong>${result.content}</strong>
        <div>
    <p>${result.username}</p>
    <p>${date.toLocaleTimeString()}</p>
    </div>

      </li>
    `;

  messages.insertAdjacentHTML("beforeend", item);
  socket.auth.serverOffset = result.id;
  messages.scrollTop = messages.scrollHeight;
});

socket.on("chat history", (result) => {
  messages.innerHTML = "";
  result.forEach((r) => {
    const date = new Date(r.created_at);
    const item = `
      <li>
        <strong>${r.content}</strong>
        <div>
    <p>${r.username}</p>
    <p>${date.toLocaleTimeString()}</p>
    </div>

      </li>
    `;

    messages.insertAdjacentHTML("beforeend", item);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});
