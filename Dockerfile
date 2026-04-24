# Use Node base image
FROM node:18-slim

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy entire project
COPY . .

# Install Python dependencies (if needed)
# Add requirements.txt if you have one
RUN pip3 install --no-cache-dir --break-system-packages numpy pandas scikit-learn torch

# Expose port (adjust if your app uses different)
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]