import http from "./config"

const product = {
  create: (data) => http.post("/product", data),
  get: (params) => http.get("/products", { params }),
  delete: (product_id) => http.delete(`/product/${product_id}`),
  update: (data) => http.put("/product", data),
  upload: (id, file) => http.post(`/media/upload-photo?id=${id}`, file)
}

export default product;
