import axios from "axios";

const STORE_API_URL = "https://sales-report-app.cfapps.io/";
const FE_URL = "http://localhost:3000";
// const ALL_STORES_API_URL = `${STORE_API_URL}stores`;
const ALL_STORES_API_URL = `https://sales-report-app.cfapps.io/stores`;
const FE_GRAPH_URL = `${FE_URL}/stores`;

class StoreDataService {
  async retrieveAllStores() {
    var uname = "admin";
    var pass = "adminpassword";

    const response = await axios.get(`${ALL_STORES_API_URL}`, {
      auth: {
        username: uname,
        password: pass
      }
    });
    // .then(function(response) {
    //   console.log("Authenticated");
    // })
    // .catch(function(error) {
    //   console.log("Error on Authentication");
    // });
    return response;
  }
  async deleteStore(id) {
    //console.log('executed service')
    const response = await axios.delete(
      `${ALL_STORES_API_URL}/delete/store/${id}`,

      {
        auth: {
          username: "admin",
          password: "adminpassword"
        }
      }
    );
    return response;
  }
  async retrieveStore(id) {
    const response = await axios.get(
      `${ALL_STORES_API_URL}/${id}`,

      {
        auth: {
          username: "admin",
          password: "adminpassword"
        }
      }
    );

    return response;
  }
  /*  showGraph(){
        return axios.get(`${FE_GRAPH_URL}/show/graph`);   
    }*/
  async updateStore(id) {
    const response = await axios.put(
      `${ALL_STORES_API_URL}/update/${id}`,
      {},
      {
        auth: {
          username: "admin",
          password: "adminpassword"
        }
      }
    );

    return response;
  }
}

export default new StoreDataService();
