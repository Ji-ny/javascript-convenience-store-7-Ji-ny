import Shop from "./Controller/Shop.js";

class App {
  async run() {
    new Shop().start();
  }
}

export default App;
