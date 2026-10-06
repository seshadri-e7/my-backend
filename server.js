const http = require("http");

const products = [
  {
    id: 1,
    title: "Laptop",
    brand: "Dell",
    description: "Powerful laptop for work, study and everyday use.",
    price: 50000,
    category: "laptops",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    ],
    stock: 10
  },
  {
    id: 2,
    title: "Mobile",
    brand: "Samsung",
    description: "Modern smartphone with a beautiful display.",
    price: 20000,
    category: "smartphones",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    ],
    stock: 15
  },
  {
    id: 3,
    title: "Headphones",
    brand: "Sony",
    description: "Wireless headphones with high-quality sound.",
    price: 2000,
    category: "audio",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    ],
    stock: 20
  }
];

const server = http.createServer((req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/products" && req.method === "GET") {

    res.write(JSON.stringify(products));
    res.end();

  } else if (
    req.url.startsWith("/products/") &&
    req.method === "GET"
  ) {

    const id = Number(req.url.split("/")[2]);

    const product = products.find((p) => p.id === id);

    if (product) {
      res.write(JSON.stringify(product));
    } else {
      res.statusCode = 404;

      res.write(
        JSON.stringify({
          message: "Product not found"
        })
      );
    }

    res.end();

  } else {

    res.statusCode = 404;

    res.write(
      JSON.stringify({
        message: "Not Found"
      })
    );

    res.end();
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});