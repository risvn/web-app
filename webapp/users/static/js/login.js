
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




const loginForm = document.getElementById("login");

loginForm.addEventListener("submit",async(e)=>{
e.preventDefault();

const loginData=new FormData(loginForm);
const data=Object.fromEntries(loginData.entries());
const csrftoken = getCookie("csrftoken");  
const res = await fetch("/login/" ,{
    method: "POST",
       headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrftoken   
  },
      body: JSON.stringify(data)
    });


const result =await res.json();

if(result.success){
window.location.href=result.redirect_url;
    alert(result.message);
}
else  {
        console.error(result.message);
        alert(result.message);
    }
  }
)

