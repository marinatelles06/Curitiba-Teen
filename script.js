const toggleBtn = document.getElementById("toggle-sidebar");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", function () {
  sidebar.classList.toggle("open");
});

function verificarInput() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  const input = document.querySelector("#email").value;
  const pass = document.querySelector("#password").value;
  if (input == "marinatelles06@gmail.com" && pass == "marina2812") {
    window.location.href = "adm1";
  } else {
    alert("Texto incorreto!");
  }
}

function deletePost(postId) {
  fetch(`/posts/${postId}`, {
    method: "DELETE",
  }).then(() => {
    window.location.reload();
  });
}
