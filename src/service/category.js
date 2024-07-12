import http from "./config"

const category = {
	create: (data) => http.post("/category", data),
	get: (params) => http.get("/categories", {params}),
	delete: (category_id) => http.delete(`/category/${category_id}`),
	update: (data) => http.put("/category", data)
}

export default category
