const container = document.getElementById('container')

const getAllProduct = async () => {
  try {
    const res = await fetch("https://ilkinibadov.com/api/v1/products")
    const data = await res.json()
    renderItems(data.products)
  } catch (error) {
    console.error(error);
  }
}
getAllProduct()

const renderItems = (products) => {
  products.forEach(product => {
    const div = document.createElement('div')
    const img = document.createElement('img')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const span = document.createElement('span')

    img.src = product.images[0]
    img.classList.add('size-[200px]', 'object-contain', 'ml-15')

    h3.innerText = product.title
    h3.classList.add("font-bold", 'text-xl')

    p.innerText = product.description
    p.classList.add('text-x')

    span.innerText = `${product.currency} ${product.price}`
    span.classList.add('text-red-500', 'font-bold')

    div.classList.add('border', 'border-zinc-300', 'p-3', 'rounded-xl', 'flex', 'flex-col', 'justify-center', 'gap-4', 'shadow-xl', 'cursor-pointer')

    div.append(img)
    div.append(h3)
    div.append(p)
    div.append(span)
    container.append(div)
  });
}