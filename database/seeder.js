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

// async function CreateTasks() {
//   connectMongoDB()
//     .then(() => {
//       Task.remove({}, () => {
//         console.log("All tasks removed! :(");
//       });
//     })
//     .then(() => {
//       Task.create(
//         {
//           title: "Build fence",
//           description: "Client wants a white fence with nice flowers!",
//           imgPath: "img/img.jpg",
//           clientId: "626eac210c3fb11ec17a42ee",
//         },
//         {
//           title: "Renovate ceiling",
//           description: "The ceiling should be green with yellow ribbons.",
//           imgPath: "img/img.jpg",
//           clientId: "626eb0e546ff8cfffea32049",
//         },
//         {
//           title: "Paint kitchen",
//           description: "New kitchen color is hotpink.",
//           imgPath: "img/img.jpg",
//           clientId: "626eb0e546ff8cfffea32049",
//         },

//       );
//       console.log("Tasks bulk is created :)");
//     });
// }
// CreateTasks();
