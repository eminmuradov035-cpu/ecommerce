const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')
const loginBtn = document.getElementById('loginInput')

const darkmodeBtn = document.getElementById("darkmodeBtn")

darkmodeBtn.addEventListener("click", () => {

  const darkmode = localStorage.getItem("darkmode")
  localStorage.setItem("darkmode", darkmode === "light" ? "dark" : "light")

  const currentMode = localStorage.getItem("darkmode")
  console.log(currentMode);

  const body = document.getElementById("body")

  if (currentMode === "light") {
    body.classList.remove("bg-slate-900", "text-white")
    body.classList.add("bg-white", "text-black")
  } else {
    body.classList.remove("bg-white", "text-black")
    body.classList.add("bg-slate-900", "text-white")
  }

})


let userData = {}

emailInput.addEventListener('input', (e) => {
  userData = {
    ...userData,
    email: e.target.value
  }
})

passwordInput.addEventListener('input', (e) => {
  userData = {
    ...userData,
    password: e.target.value
  }
})

const loginUser = async () => {
  try {
    const res = await fetch("https://ilkinibadov.com/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      const data = await res.json()
      console.log(data)
      sessionStorage.setItem("accesToken", data.accesToken)
      sessionStorage.setItem("refrshToken", data.accesToken)

      window.location.href = "http://127.0.0.1:5500/index.html"
    } else {
      alert("Email or password is incorrect!")
    }

  } catch (error) {
    console.error(error)
  }
}

loginBtn.addEventListener("click", loginUser)

window.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("darkmode") || "light"

  const body = document.getElementById("body")

  if (savedMode === "light") {
    body.classList.remove("bg-slate-900", "text-white")
    body.classList.add("bg-white", "text-black")
  } else {
    body.classList.remove("bg-white", "text-black")
    body.classList.add("bg-slate-900", "text-white")
  }
})
