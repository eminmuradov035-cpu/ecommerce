const bigImg = document.getElementById('bigImg')
const images = document.getElementById('images')
const title = document.getElementById('title')
const stock = document.getElementById('stock')
const price = document.getElementById('price')
const description = document.getElementById('description')
const relatedItems = document.getElementById('relatedItems')
const remove = document.getElementById('remove')
const add = document.getElementById('add')
const count = document.getElementById('count')
const addToBasketBtn = document.getElementById('addToBasketBtn')

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

let selectedImage
let itemId
let basketItemCount = 1
let itemStock = 0

count.innerText = basketItemCount

remove.addEventListener("click", () => {
    if (basketItemCount > 1) {
        basketItemCount -= 1
        count.innerText = basketItemCount
    }
})

add.addEventListener("click", () => {
    if (basketItemCount < itemStock) {
        basketItemCount += 1
        count.innerText = basketItemCount
    }
})

const addItemToBasket = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
        const res = await fetch("https://ilkinibadov.com/api/v1/basket/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                productId: itemId,
                count: basketItemCount
            })
        })

        alert(res.ok ? "Item added to basket" : "Error while adding item to basket")
    } catch (error) {
        console.error(error)
    }
}

addToBasketBtn.addEventListener("click", addItemToBasket)

const renderPage = (product) => {
    selectedImage = product.images[0]
    bigImg.setAttribute("src", selectedImage)

    product.images.map(image => {
        const button = document.createElement('button')
        button.classList.add('w-fit', "h-fit")
        button.addEventListener('click', () => {
            selectedImage = image
            bigImg.setAttribute("src", selectedImage)
        })
        const img = document.createElement('img')
        img.setAttribute("src", image)
        img.classList.add("w-[170px]", "h-[138px]", "object-contain", "border", "border-zinc-300")
        button.append(img)
        images.append(button)
    })

    title.innerText = product.title

    if (product.stock) {
        stock.innerText = "In Stock"
        stock.classList.add("text-[#00FF66]")
    } else {
        stock.innerText = "Out of Stock"
        stock.classList.add("text-red-400")
    }

    price.innerText = `${product.currency}${product.price}`
    description.innerText = product.description
}

const renderSimilarItems = (similarItems) => {
    similarItems.map(item => {
        const div = document.createElement('div')
        const img = document.createElement('img')
        const title = document.createElement('p')
        const price = document.createElement('p')
        const a = document.createElement('a')
        a.classList.add('w-full', 'h-full')
        a.setAttribute('href', `http://127.0.0.1:5500/product.html?id=${item._id}`)

        img.setAttribute("src", item.images[0])
        title.innerText = item.title
        price.innerText = `${item.currency}${item.price}`

        div.classList.add("border-[0px]", "transition", "delay-150", "duration-300", "ease-in-out", "hover:-translate-y-1", "hover:scale-110")
        img.classList.add("bg-[#F5F5F5]", "items-center", "p-[35px]", "size-[300px]", "object-contain")
        title.classList.add("mt-[16px]")
        price.classList.add("text-[#DB4444]", "mt-[8px]")

        div.append(img)
        div.append(title)
        div.append(price)
        a.append(div)
        relatedItems.append(a)
    })

}

const getProductDetails = async (itemId) => {
    try {
        const res = await fetch(`https://ilkinibadov.com/api/v1/products/${itemId}/details`)
        if (res.ok) {
            const data = await res.json()
            itemStock = data.stock
            renderPage(data)
        }
    } catch (error) {
        console.error(error)
    }
}

const getSimilarProducts = async (itemId) => {
    try {
        const res = await fetch(`https://ilkinibadov.com/api/v1/products/${itemId}/similar`)
        if (res.ok) {
            const data = await res.json()
            renderSimilarItems(data)
        }
    } catch (error) {
        console.error(error)
    }
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        itemId = id
        getProductDetails(id)
        getSimilarProducts(id)
    }
};

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