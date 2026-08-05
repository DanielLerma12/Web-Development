const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

const loginSpan = document.querySelector("#login-form span");
const registerSpan = document.querySelector("#register-form span");

const logoutButton = document.querySelector("#close-session");

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);

  const username = formData.get("login-username");
  const password = formData.get("login-password");

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => {
    if (res.ok) {
      loginSpan.innerText = "Registered successfully. Signin-in";
      loginSpan.style.color = "green";
      setTimeout(() => {
        window.location.href = "/protected";
      }, 1500);
    } else {
      res.json().then((prompt) => {
        loginSpan.innerText = prompt;
        loginSpan.style.color = "red";
      });
    }
  });
});

registerForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(registerForm);

  const username = formData.get("register-username");
  const password = formData.get("register-password");
  const confirmPassword = formData.get("register-confirm-password");

  if (password !== confirmPassword) {
    registerSpan.innerText = "Password is not the same. Check again";
    registerSpan.style.color = "red";
    return;
  }

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((res) => {
    if (res.ok) {
      registerSpan.innerText = "Registered successfully. Signing-in";
      registerSpan.style.color = "green";
      setTimeout(() => {
        fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }).then((res) => {
          if (res.ok) {
            window.location.href = "/protected";
          } else {
            window.location.href = "/";
          }
        });
      }, 1500);
    } else {
      res.json().then((prompt) => {
        registerSpan.innerText = prompt;
        registerSpan.style.color = "red";
      });
    }
  });
});
