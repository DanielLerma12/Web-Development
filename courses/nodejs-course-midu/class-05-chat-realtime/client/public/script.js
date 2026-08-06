import { API_URL } from "./config.js";

let username = localStorage.getItem("username");

if (!username) {
  const res = await fetch(`${API_URL}/user`);
  const data = await res.json();

  username = data.username;
  localStorage.setItem("username", username);
}

/* let username = localStorage.getItem("username");

if (!username) {
  const response = await fetch("https://randomuser.me/api/");

  const data = await response.json();

  username = data.results[0].login.username;

  localStorage.setItem("username", username);
} */

const socket = io(`${API_URL}`, {
  auth: {
    serverOffset: 0,
    username,
  },
});

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const messages = document.querySelector("#messages");
const logoutBtn = document.querySelector("#logout");

socket.on("chat message", (result) => {
  if (result.id === 1) messages.innerHTML = "";

  const date = new Date(result.created_at);
  const item = `
      <li>
        <strong>${result.content}</strong>
        <div>
    <p>${result.users.user_name}</p>
    <p>${date.toLocaleTimeString()}</p>
    </div>

      </li>
    `;

  messages.insertAdjacentHTML("beforeend", item);

  socket.auth.serverOffset = result.id;
  messages.scrollTop = messages.scrollHeight;
});

socket.on("chat history", (result) => {
  let item = "";

  if (result.length === 0) {
    item = `
    <li>
      <strong>No messages yet</strong>
    </li>
  `;
  } else {
    messages.innerHTML = "";
    result.forEach((r) => {
      const date = new Date(r.created_at);
      item += `
        <li>
          <strong>${r.content}</strong>
          <div>
      <p>${r.users.user_name}</p>
      <p>${date.toLocaleTimeString()}</p>
      </div>
  
        </li>
      `;
    });
  }

  messages.insertAdjacentHTML("beforeend", item);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const res = await fetch(`${API_URL}/logout`, { method: "POST" });

  if (res.ok) {
    window.location.href = "/";
  }
});
