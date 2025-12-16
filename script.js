const container = document.getElementById('container')
const darkmodeBtn = document.getElementById("darkmodeBtn")
const viewMoreBtn = document.getElementById('viewMoreBtn')
const categoriesContainer = document.getElementById('categoriesContainer')
const productsTitle = document.getElementById('productsTitle')
const searchInput = document.getElementById("searchInput")

let selectedCategory = ''
let searchTerm = ''

searchInput.addEventListener("input", (e) => {
  selectedCategory = ''
  searchTerm = e.target.value
  productsTitle.innerText = e.target.value
  getAllProduct()
})

const categories = ['electronics', 'clothing', 'books', 'furniture', 'toys', 'groceries', 'beauty', 'sports', 'automotive', 'other']

categories.forEach(category => {
  const button = document.createElement('button')
  button.innerText = category
  button.classList.add("border", "border-zinc-300", "p-5", "rounded-lg", "hover:cursor-pointer", "hover:bg-zinc-100", "categoryBtns")

  button.addEventListener('click', () => {
    selectedCategory = ''
    removeSelect()
    selectedCategory = category
    searchTerm = ''
    productsTitle.innerText = category.toUpperCase()
    button.classList.add("!border-red-500")
    getAllProduct()
  })
  categoriesContainer.append(button)
})

function removeSelect() {
  let categoryBtns = Array.from(document.getElementsByClassName('categoryBtns'))

  categoryBtns.forEach(btn => {
    btn.classList.remove("!border-red-500")
  })
}

let limit = 8

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


viewMoreBtn.addEventListener("click", () => {
  limit += 8
  getAllProduct()
})

async function getAllProduct() {
  try {
    let url = ''

    if (!selectedCategory && !searchTerm) {
      url = `https://ilkinibadov.com/api/v1/products?page=1&limit=${limit}`
    }

    if (selectedCategory) {
      url = `https://ilkinibadov.com/api/v1/products/category/${selectedCategory}`
    }

    if (searchTerm.length >= 3) {
      url = `https://ilkinibadov.com/api/v1/search?searchterm=${searchTerm}`
    }

    container.innerHTML = ''
    const res = await fetch(url)

    if (res.status === 404) {
      container.innerHTML = ''
      const h2 = document.createElement('h2')
      h2.innerText = "No product found"
      container.append(h2)
    }

    if (res.ok) {
      const data = await res.json()
      let renderData = data.products

      if (selectedCategory) {
        renderData = data
      }

      if (searchTerm.length >= 3) {
        renderData = data.content
      }

      renderItems(renderData)
      limit >= data.totalProducts && viewMoreBtn.classList.add('hidden')
    }
  } catch (error) {
    console.error(error);
  }
}

getAllProduct()

const renderItems = (products) => {
  if (products.length) {
    products.forEach(product => {
      const div = document.createElement('div')
      const img = document.createElement('img')
      const h3 = document.createElement('h3')
      const p = document.createElement('p')
      const span = document.createElement('span')
      const a = document.createElement('a')

      img.src = searchTerm.length >= 3 ? product.image : product.images[0]
      img.classList.add('size-[350px]', 'object-contain', 'mx-auto')

      h3.innerText = product.title
      h3.classList.add("font-bold", 'text-xl')

      p.innerText = product.description || ''
      p.classList.add('text-xs')

      span.innerText = `${product.currency} ${product.price}`
      span.classList.add('text-red-500', 'font-bold')

      div.classList.add('w-full', 'h-full', 'border', 'border-zinc-300', 'p-3', 'rounded-xl', 'flex', 'flex-col', 'justify-center', 'gap-4', 'shadow-xl', 'cursor-pointer')
      a.classList.add('w-full', 'h-full')
      a.setAttribute('href', `http://127.0.0.1:5500/product.html?id=${product._id || product.id}`)

      div.append(img)
      div.append(h3)
      div.append(p)
      div.append(span)
      a.append(div)
      container.append(a)
    });
  }
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