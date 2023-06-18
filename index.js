const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const rooms = [
  {
    room_name: "test",
    no_of_seats_available: 100,
    amenities: ["TV", "fridge", "AC", "wifi"],
    price: 5000,
    room_id: "201",
    booking_details: [
      {
        booking_status: "complete",
        customer_name: "rabbit",
        date: new Date("2023-10-01"),
        start_time: "08:35",
        end_time: "21:35",
      },
    ],
  },
  {
    room_name: "test1",
    no_of_seats_available: 50,
    amenities: ["TV", "fridge", "wifi"],
    price: 2000,
    room_id: "202",
    booking_details: [
      {
        booking_status: "complete",
        customer_name: "cat",
        date: new Date("2023-12-01"),
        start_time: "01:35",
        end_time: "21:35",
      },
    ],
  },
];

//creating a new room
app.post("/createRoom", function (req, res) {
  let newroom = {
    room_name: req.body.room_name,
    no_of_seats_available: req.body.no_of_seats_available,
    amenities: req.body.amenities,
    price: req.body.price,
    room_id: "203",
  };
  rooms.push(newroom);
  res.json(rooms);
});

// booking a new room
app.post("/bookRoom", function (req, res) {
  
  let booking_details = {
    room_id : req.body.room_id,
    customer_name: req.body.customer_name,
    date: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    booking_status: "complete",
  };
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].room_id == booking_details.room_id) {
      rooms[i].booking_details.forEach((element) => {
        if (
          element.date === booking_details.date ||
          (element.start_time === booking_details.start_time &&
          element.end_time === booking_details.end_time)
        ) {
          res.status(400).send("Please book another slot");
        } else {
          rooms[i].booking_details.push(booking_details);
          res.status(200).send(rooms);
        }
      });
    } else {
      res.status(400).send("Invalid details");
    }
  }
});

//list all rooms
app.get("/getallrooms", (req, res) => {
  let array = [];
  for (let i = 0; i < rooms.length; i++) {
    rooms[i].booking_details.forEach((e) => {
      let newarray = {
        "Room Name": rooms[i].room_name,
        "Booked Status": e.booking_status,
        "Customer Name": e.customer_name,
        "Date": e.date,
        "Start Time": e.start_time,
        "End Time": e.end_time,
      };
      array.push(newarray);
    });
  }
  res.send(array);
});

//list all customers
app.get("/getallcustomers", (req, res) => {
  let array = [];
  for (let i = 0; i < rooms.length; i++) {
    rooms[i].booking_details.forEach((e) => {
      let newarray = {
        "Customer Name": e.customer_name,
        "Room Name": rooms[i].room_name,
        "Date": e.date,
        "Start Time": e.start_time,
        "End Time": e.end_time,
      };
      array.push(newarray);
    });
  }
  res.send(array);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});