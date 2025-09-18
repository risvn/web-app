  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('editModal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('edit-profile');

    if (!modal) {
      console.warn('Modal element (#editModal) not found.');
      return;
    }

    const openModal = (e) => {
      if (e) e.preventDefault();
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    };
    const closeModal = () => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    };

    // open
    if (openBtn) openBtn.addEventListener('click', openModal);

    // close X
    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.preventDefault(); closeModal(); });

    // close by clicking outside modal-content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });

    // Optional: close modal after successful AJAX response
    if (form) {
      form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const formData = new FormData(form);
        // debug: log entries
        for (let [k, v] of formData.entries()) console.log('FORMDATA', k, v);

        // CSRF helper (if in external file, keep it there)
        function getCookie(name) {
          let value = null;
          if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let c of cookies) {
              c = c.trim();
              if (c.startsWith(name + '=')) { value = decodeURIComponent(c.substring(name.length + 1)); break; }
            }
          }
          return value;
        }

        try {
          const res = await fetch('/edit-profile/', {
            method: 'POST',
            headers: { 'X-CSRFToken': getCookie('csrftoken') }, // DO NOT set Content-Type
            body: formData
          });
          const data = await res.json();
          if (data.success) {
            // update UI quickly (you can update the profile image src here if server returns URL)
            closeModal();
            // optional: refresh visible profile data or update DOM elements directly
            window.location.reload(); // or update DOM to avoid reload
          } else {
            alert(data.message || 'Update failed');
          }
        } catch (err) {
          console.error('Upload error', err);
          alert('Network or server error');
        }
      });
    }
  });

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

