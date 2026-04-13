const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userGoal = "Learn Docker and Kubernetes";

app.get("/", (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Goal</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 50px auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
          color: #333;
        }
        .goal-display {
          background-color: #e8f5e9;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
          border-left: 4px solid #4caf50;
        }
        .form-group {
          margin: 20px 0;
        }
        label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: bold;
        }
        input[type="text"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 14px;
        }
        button {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>User Goal Manager</h1>
        
        <div class="goal-display">
          <h2>Current Goal:</h2>
          <p>${userGoal}</p>
        </div>
        
        <form action="/user-goal" method="POST">
          <div class="form-group">
            <label for="goalInput">Update Your Goal:</label>
            <input 
              type="text" 
              id="goalInput" 
              name="goal" 
              placeholder="Enter your new goal..." 
              required
            >
          </div>
          <button type="submit">Update Goal</button>
        </form>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

app.post("/user-goal", (req, res) => {
  const { goal } = req.body;

  if (!goal) {
    return res.status(400).json({ error: "Goal is required" });
  }

  userGoal = goal;
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
