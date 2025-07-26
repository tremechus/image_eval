# Image Evaluator

A web application for evaluating professional headshots using AI (Ollama with LLaVA model).

## Live Demo

🚀 **[https://profileimg.tremech.us](https://profileimg.tremech.us)**

## Features

- **Image URL Input**: Enter any publicly accessible image URL
- **Customizable Prompts**: Default professional headshot evaluation criteria, fully editable
- **AI Analysis**: Uses Ollama's LLaVA model for intelligent image evaluation
- **JSON Output**: Structured evaluation results with scores and recommendations
- **Local Storage**: Automatically saves your custom prompts
- **Image Preview**: See the image you're evaluating
- **Professional Criteria**: Evaluates subject count, distractions, composition, background, lighting, image quality, and attire

## How to Use

1. **Enter Image URL**: Paste a direct link to an image (must be publicly accessible)
2. **Review/Edit Prompt**: The default prompt evaluates professional headshots, but you can customize it for any evaluation criteria
3. **Process Image**: Click the button to send the image to the AI for analysis
4. **View Results**: Get detailed JSON output with scores and recommendations

2. **Ensure Ollama is running:**
   Make sure you have Ollama running locally on port 11434 with the LLaVA model installed:
   ```bash
   ollama serve
   ollama pull llava
   ```

3. **Use the application:**
   - Enter an image URL (must be accessible via CORS)
   - Modify the prompt if needed (changes are saved locally)
   - Click "Process Image" to analyze the image
   - View the AI's response in the output section

## API Format

The application sends requests to the Ollama API in this format:
```json
{
    "model": "llava",
    "format": "json",
    "prompt": "<user prompt>",
    "stream": false,
    "images": ["<image as base64>"]
}
```

## Requirements

- Modern web browser with HTML5 Canvas support
- Ollama server running locally with LLaVA model
- Python 3 (for the simple HTTP server)
- Internet connection for loading external images

## Notes

- Images must be accessible via CORS or from the same domain
- The prompt text is automatically saved to localStorage
- Default prompt: "Describe this image in detail."