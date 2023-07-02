let userEmail = "";

export function SetEmail(email) {
    localStorage.setItem('userEmail', email);
  }
  
  export function getEmail() {
    return localStorage.getItem('userEmail');
  }