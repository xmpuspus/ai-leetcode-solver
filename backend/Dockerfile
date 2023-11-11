# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Define environment variable for the API Key
# ENV OPENAI_API_KEY=""

# Run FastAPI server on container startup
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80"]
