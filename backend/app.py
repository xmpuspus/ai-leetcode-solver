from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import base64
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variable for API Key
api_key = os.getenv('OPENAI_API_KEY')

# Pydantic model for encapsulating the image response
class ImageResponse(BaseModel):
    text: str
    full_response: dict

# Function to encode the image
def encode_image(image_file):
    return base64.b64encode(image_file).decode('utf-8')

@app.post("/solver", response_model=ImageResponse)
async def captioner(image: UploadFile = File(...)):
    base64_image = encode_image(await image.read())

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "You are an expert leetcode solver. Using the image, and using Python, solve the problem. Output only the code. Nothing more, nothing less."
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": f"data:image/jpeg;base64,{base64_image}"
                }
              }
            ]
          }
        ],
        "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error from OpenAI API")

    result = response.json()['choices'][0]['message']['content'].replace('"', "")
    full_response = response.json()
    
    return {'text': result, 'full_response': full_response}
