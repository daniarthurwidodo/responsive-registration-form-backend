const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const cors = require("cors")
const app = express();
const PORT = 3000;

app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


// Validation middleware
const validateForm = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("telephone").isNumeric().withMessage("Telephone is number only"),

  // Add more validation rules as needed for other form fields
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Route to handle form submission
app.post("/submit-form", validateForm, (req, res) => {
  // If the form passes validation, proceed with further logic
  // req.body contains the validated form fields
  res.status(200).json({ body : req.body });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
