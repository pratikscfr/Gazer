# Gazer Frontend - React Application

A React-based frontend for the Gazer "Look to Speak" web application, providing an accessible interface for phrase selection and speech synthesis.

## Features

- **Main Page**: Binary phrase selection interface with keyboard navigation
- **Edit Page**: Phrase management (add, delete) with modal interface
- **Speech Synthesis**: Browser-based text-to-speech functionality
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Navigation**: Arrow key support for accessibility
- **Real-time API Integration**: Connected to Flask backend

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## Usage

### Main Page (`/`)
- Use **left arrow** (←) to select phrases from the left column
- Use **right arrow** (→) to select phrases from the right column
- Use **up arrow** (↑) to reset/refresh the selection
- Click on phrases to speak them immediately
- Navigate to edit page using the "Edit phrases" link

### Edit Page (`/edit`)
- Use the same keyboard navigation to select phrases
- Check phrases using checkboxes or keyboard selection
- Click "Add Phrase" to add new phrases
- Click "Delete Phrase" to remove selected phrases
- Navigate back to main page using the "Gazer" link

## API Integration

The frontend connects to the Flask backend at `http://localhost:9000`:

- `GET /api/phrases` - Fetch all phrases
- `POST /api/phrases` - Add new phrase
- `DELETE /api/phrases/batch` - Delete multiple phrases
- `POST /api/speak` - Request speech synthesis

## Technologies Used

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with custom design
- **Font Awesome** - Icons
- **Web Speech API** - Browser speech synthesis

## File Structure

```
src/
├── components/
│   ├── MainPage.js          # Main phrase selection interface
│   ├── MainPage.css         # Styles for main page
│   ├── EditPage.js          # Phrase management interface
│   └── EditPage.css         # Styles for edit page
├── App.js                   # Main app component with routing
├── App.css                  # Global styles
└── index.js                 # App entry point
```

## Development

- **Hot Reload**: Changes are automatically reflected in the browser
- **Error Handling**: Console errors and user-friendly alerts
- **Loading States**: Loading indicators for API calls
- **Responsive Design**: Mobile-friendly interface

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Browser Compatibility

- Chrome/Chromium (recommended for speech synthesis)
- Firefox
- Safari
- Edge

## Accessibility Features

- Keyboard navigation support
- Screen reader friendly
- High contrast design
- Clear visual feedback
- Speech synthesis for selected phrases
