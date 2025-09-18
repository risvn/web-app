
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




const editProfile = document.getElementById("edit-profile");

editProfile.addEventListener("submit",async(e)=>{
e.preventDefault();

const formData=new FormData(editProfile);

const csrftoken = getCookie("csrftoken");  
const res = await fetch("/edit-profile/" ,{
    method: "POST",
       headers: {
    "X-CSRFToken": csrftoken   
  },
      body:formData
    });


const result =await res.json();

if(result.success){
window.location.href=result.redirect_url;
    alert(result.message);
}
else  {
        alert(result.message);
    }
  }
)

