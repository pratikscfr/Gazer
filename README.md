# Gazer - Look to Speak Web Application

A web-based communication application inspired by Google's [Look to Speak](https://experiments.withgoogle.com/looktospeak) experiment, designed to help people with speech and motor impairments communicate using eye gaze or keyboard navigation.

## Project Structure

- **Backend**: Flask API server (`gazer_backend/`)
- **Frontend**: React application (`gazer_frontend/`)
- **Legacy Frontend**: Original HTML/JS implementation (`gazer frontend/`)

## Features

- **Phrase Management**: Add, edit, delete, and organize communication phrases
- **Speech Synthesis**: Text-to-speech functionality for selected phrases
- **Accessible Navigation**: Keyboard and mouse-based phrase selection
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd gazer_backend
   ```

2. Activate the virtual environment:
   ```bash
   pyenv local gazer_backend_venv
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the server:
   ```bash
   python app.py
   ```

The backend will be available at `http://localhost:9000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd gazer_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The React application will open at `http://localhost:3000`

## API Documentation

The backend provides the following endpoints:

- `GET /api/phrases` - Get all phrases
- `POST /api/phrases` - Add a new phrase
- `PUT /api/phrases/<id>` - Update a phrase
- `DELETE /api/phrases/<id>` - Delete a phrase
- `POST /api/speak` - Request speech synthesis
- `GET /api/health` - Health check

## Design Reference

Frontend design: https://xd.adobe.com/view/92e35c80-86bc-4546-55c3-eafbd7b95242-e4d2/screen/6afa3601-b0aa-465f-8a55-dc994a798318/specs/
