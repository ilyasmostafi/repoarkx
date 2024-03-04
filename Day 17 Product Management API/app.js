const express = require("express");
const app = express();

app.use(express.json());
const port = 3100;
let products = [
  { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
  { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
  { id: 3, name: "Sony PlayStation 5", price: 499.99 },
  { id: 4, name: "MacBook Pro 16", price: 2399.99 },
  { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  for (let product of products) {
    if (product.id == req.params.id) {
      return res.status(200).send(product);
    }
  }
  return res.status(404).send();
});
app.get("/products/search", (req, res) => {
  const { minPrice, maxPrice, q } = req.query;
  let filteredProducts = products;

  if (q) {
    const searchQuery = q.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
  }

  if (minPrice && maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= parseFloat(minPrice) &&
        product.price <= parseFloat(maxPrice)
    );
  }
  res.send(filteredProducts);
});
app.post("/products", (req, res) => {
  const product = req.body;
  const id = products.length + 1;
  const newProduct = { id, ...product };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.put("/products/:id", (req, res) => {
  const { name, price } = req.body;

  const index = products.findIndex((item) => item.id == req.params.id);
  console.log(index);
  if (index !== -1) {
    console.log("Valid Product ID");

    if (name) {
      products[index].name = name;
    }
    if (price) {
      products[index].price = parseFloat(price);
    }
    res.status(200).send({ message: "Updated Successfully" });
  } else {
    res.status(400).send({ message: "Invalid Product ID" });
  }
});
app.delete("/products/:id", (req, res) => {
  const Index = products.findIndex((item) => item.id == req.params.id);
  console.log(Index);
  if (Index !== -1) {
    products.splice(Index, 1);
    res.status(200).send({ message: "Deleted Succesfully" });
  } else {
    res.status(400).send({ message: "Invalid Product ID" });
  }
});
app.listen(port, () => console.log(`Server is running on port ${port}`));