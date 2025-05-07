import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Male Users
  {
    email: "john.doe1@example.com",
    fullName: "John Doe",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/v16hjSh/1.jpg",
  },
  {
    email: "michael.smith@example.com",
    fullName: "Michael Smith",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/2tZ7J9Z/2.jpg",
  },
  {
    email: "david.johnson@example.com",
    fullName: "David Johnson",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/dcTSrn5/3.jpg",
  },
  {
    email: "james.williams@example.com",
    fullName: "James Williams",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/8sLzsRw/4.jpg",
  },
  {
    email: "robert.brown@example.com",
    fullName: "Robert Brown",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/rd6ZNC6/5.jpg",
  },
  {
    email: "william.jones@example.com",
    fullName: "William Jones",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/P61nfNp/6.jpg",
  },
  {
    email: "charles.garcia@example.com",
    fullName: "Charles Garcia",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/C23Pmnt/7.jpg",
  },
  {
    email: "joseph.martinez@example.com",
    fullName: "Joseph Martinez",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/DLgcgCR/8.jpg",
  },
  {
    email: "thomas.rodriguez@example.com",
    fullName: "Thomas Rodriguez",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/jhZ7PbM/9.jpg",
  },
  {
    email: "daniel.hernandez@example.com",
    fullName: "Daniel Hernandez",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/30ndFYh/10.jpg",
  },
  {
    email: "matthew.lee@example.com",
    fullName: "Matthew Lee",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/nmzg5FQ/11.jpg",
  },
  {
    email: "anthony.walker@example.com",
    fullName: "Anthony Walker",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/XthMhK4/12.jpg",
  },
  {
    email: "mark.hall@example.com",
    fullName: "Mark Hall",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/Zd5Ddhh/13.jpg",
  },
  {
    email: "steven.allen@example.com",
    fullName: "Steven Allen",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/6DPb4rf/14.jpg",
  },
  {
    email: "paul.young@example.com",
    fullName: "Paul Young",
    password: "12345678",
    profilePic: "https://i.ibb.co.com/gMwGMpV/15.jpg",
  },

  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    fullName: "Isabella Brown",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    fullName: "Charlotte Williams",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    fullName: "Amelia Garcia",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "12345678",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    // console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
