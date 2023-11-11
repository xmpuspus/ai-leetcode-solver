# AI Leetcode Solver
Using GPT, solve leetcode problems using pictures or screenshots.

### Web App

The UI should look like the GIF shown below. It only takes in a picture of the Leetcode problem and outputs the solution. It can even do the `hard` questions fairly easily and quickly.

![UI of Leetcode Solver](images/ai_leetcode_solver_vid.gif)

### Frontend

To install packages, run:
```
npm install @mui/material @emotion/react @emotion/styled axios
```

To run the web app locally, run the script below:
```
cd frontend
npm start
```

### Backend

First, replace the OpenAI API key with your own API key in the `docker-compose.yml` file, then `cd` to `backend`. To run the instance, make sure your docker is up, then run:

```
docker-compose up --build -d
```

to expose the Leetcode solver endpoint.
