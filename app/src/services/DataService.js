import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/Users");
  }

  create(data) {
    return http.post("/Users", data);
  }

  update(data) {
    return http.post("/Users", data);
  }

}

export default new DataService();