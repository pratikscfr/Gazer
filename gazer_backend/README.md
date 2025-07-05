# Gazer Backend API

A Flask-based backend API for the Gazer "Look to Speak" web application, inspired by Google's Look to Speak experiment.

## Features

- **Phrase Management**: CRUD operations for phrases
- **Speech Synthesis**: Endpoint for speech requests
- **CORS Support**: Cross-origin resource sharing enabled
- **JSON Storage**: Simple file-based storage for phrases

## Setup

1. **Activate the virtual environment**:
   ```bash
   pyenv local gazer_backend_venv
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python app.py
   ```

The server will start on `http://localhost:9000`

## API Endpoints

### Phrases

- `GET /api/phrases` - Get all phrases
- `POST /api/phrases` - Add a new phrase
- `PUT /api/phrases/<id>` - Update a phrase
- `DELETE /api/phrases/<id>` - Delete a phrase
- `DELETE /api/phrases/batch` - Delete multiple phrases

### Speech

- `POST /api/speak` - Request speech synthesis

### Health

- `GET /api/health` - Health check endpoint

## Example Usage

### Add a phrase
```bash
curl -X POST http://localhost:9000/api/phrases \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world", "category": "greeting"}'
```

### Get all phrases
```bash
curl http://localhost:9000/api/phrases
```

### Request speech
```bash
curl -X POST http://localhost:9000/api/speak \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello world"}'
```

## Data Structure

Phrases are stored with the following structure:
```json
{
  "id": 1,
  "text": "Hello",
  "created_at": "2024-01-01T12:00:00",
  "category": "greeting"
}
```

## Development

The application runs in debug mode by default. For production, set `FLASK_ENV=production` and disable debug mode. 