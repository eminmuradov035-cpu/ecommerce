import { refreshTokens } from "./utils.js"

const basketItemsContainer = document.getElementById("basketItemsContainer")
const clearAllBtn = document.getElementById("clearAllBtn")
const totalPrice = document.getElementById("totalPrice")
const productIds = []

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

const removeItem = async (id) => {
    try {
        const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
        const res = await fetch(`https://ilkinibadov.com/api/v1/basket/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    } catch (error) {
        console.error(error)
    }
}

clearAllBtn.addEventListener("click", () => {
    productIds.map(id => {
        removeItem(id)
    })
    getBasketItems()
    basketItemsContainer.innerHTML = ''
})

const renderBasketItems = (basketItems) => {
    basketItems.map(item => {
        productIds.push(item.id)
        const div = document.createElement("div")
        const img = document.createElement("img")
        const title = document.createElement("h3")
        const price = document.createElement("p")

        img.setAttribute("src", item.image)
        title.innerText = `${item.title} (${item.count})`
        price.innerText = `${item.currency}${item.total}`

        div.classList.add("border-[0px]", "transition", "delay-150", "duration-300", "ease-in-out", "hover:-translate-y-1", "hover:scale-110")
        img.classList.add("bg-[#F5F5F5]", "items-center", "p-[35px]", "size-[300px]", "object-contain")
        title.classList.add("mt-[16px]", "text-[16px]")
        price.classList.add("text-[#DB4444]", "mt-[8px]")

        div.append(img)
        div.append(title)
        div.append(price)
        basketItemsContainer.append(div)
    })
}

const getBasketItems = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
        const res = await fetch("https://ilkinibadov.com/api/v1/basket/products", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })

        if (res.status === 401) {
            refreshTokens(getBasketItems)
        }

        if (res.ok) {
            const data = await res.json()
            totalPrice.innerText = `Total price: ${data.currency || "$"}${data.basketTotal}`
            renderBasketItems(data.content)
        }
    } catch (error) {
        console.error(error)
    }
}

window.onload = () => {
    getBasketItems()
}

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