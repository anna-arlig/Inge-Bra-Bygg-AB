const { User, Task } = require("../models");
const connectMongoDB = require("../database/connection");
async function CreateUsers() {
  connectMongoDB()
    .then(() => {
      User.remove({}, () => {
        console.log("All users removed! :(");
      });
    })
    .then(() => {
      User.create(
        {
          name: "David",
          role: "admin",
          email: "david@ibb.se",
          password: "grillkorv",
          address: {
            city: "Stockholm",
            street: "Sveavagen",
            zipCode: "123-34",
          },
        },
        {
          name: "Johan",
          role: "worker",
          email: "johan@ibb.se",
          password: "123",
          address: {
            city: "Stockholm",
            street: "Sveavagen",
            zipCode: "123-34",
          },
        },
        {
          name: "Erika",
          role: "worker",
          email: "Erika@ibb.se",
          password: "123",
          address: {
            city: "Stockholm",
            street: "Sveavagen",
            zipCode: "123-34",
          },
        },
        {
          name: "Misa",
          role: "client",
          email: "misa@se.se",
          password: "123",
          address: {
            city: "Stockholm",
            street: "Sveavagen",
            zipCode: "123-34",
          },
        },
        {
          name: "Miso",
          role: "client",
          email: "miso@se.se",
          password: "123",
          address: {
            city: "Stockholm",
            street: "Sveavagen",
            zipCode: "123-34",
          },
        }
      );
      console.log("Users bulk is created :)");
    });
}
CreateUsers();

