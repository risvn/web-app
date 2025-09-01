function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie("csrftoken");

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Send to Django backend
  const res = await fetch("/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken, 
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success) {
        alert(result.message);
    window.location.href = result.redirect_url;
  } else {
    alert(result.message);
  }
});
