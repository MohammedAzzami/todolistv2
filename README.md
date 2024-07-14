# TodoList App

This is a simple TodoList web application built with Node.js, Express, EJS, and MongoDB. It allows users to create custom lists, add and delete items, and manage their tasks effectively.

## Features

- **Homepage**: Displays the default list of tasks.
- **Custom Lists**: Allows users to create custom lists by entering a list name in the URL.
- **Add Items**: Users can add new tasks to any list.
- **Delete Items**: Provides functionality to delete tasks from lists.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Web framework for Node.js
- **EJS**: Embedded JavaScript templating
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js

## View Demo

Check out the [live demo](https://to-do-list-v2-git-master-mohammed-alazamis-projects.vercel.app?_vercel_share=HjjC1BoyJZTyt9r6htgelYxT5ldAHceY) to see the final look of the application.

**Note**: Access to view and interact with the live demo requires logging into Vercel. If you don't have a Vercel account, you'll need to create one to access the application.

## Getting Started

To run this project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the root directory with the following contents:
# Replace your_mongodb_connection_string_here with your actual MongoDB Atlas connection string
echo "MONGO_URI=your_mongodb_connection_string_here" > .env
echo "PORT=3000" >> .env

# Start the server
npm start

Open your browser and visit http://localhost:3000 to view the application.

## Contributing
Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

