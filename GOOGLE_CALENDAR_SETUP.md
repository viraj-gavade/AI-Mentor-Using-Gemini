# 🗓️ Google Calendar Integration - Complete Setup Guide

## Step-by-Step Setup Instructions

### 1. Google Cloud Console Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create or Select Project**
   - Click "Select a project" at the top
   - Either select existing project or click "New Project"
   - Give it a name like "StudyMentor-Calendar"
   - Click "Create"

3. **Enable Google Calendar API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click on it and press "Enable"

### 2. Create OAuth 2.0 Credentials

1. **Configure OAuth Consent Screen**
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" (unless you have G Suite)
   - Fill in required fields:
     - App name: "StudyMentor"
     - User support email: your email
     - Developer contact: your email
   - Click "Save and Continue" through all steps

2. **Create OAuth Client ID**
   - Go to "APIs & Services" > "Credentials"
   - Click "+ Create Credentials" > "OAuth client ID"
   - Application type: **"Desktop application"**
   - Name: "StudyMentor Desktop"
   - Click "Create"

3. **Download Credentials**
   - Click the download button (⬇️) for your newly created OAuth client
   - Save the file as `credentials.json`
   - **Important**: This file contains sensitive information

### 3. Backend Setup

1. **Place Credentials File**
   ```
   Backend/
   ├── credentials.json  ← Place your downloaded file here
   ├── app.py
   └── ...
   ```

2. **Install Dependencies** (if not already done)
   ```bash
   cd Backend
   pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
   ```

### 4. Test the Integration

1. **Start Backend Server**
   ```bash
   cd Backend
   python app.py
   ```

2. **Generate Study Plan** (in frontend)
   - Create a study plan using the Study Plan Generator

3. **Click "Add to Calendar"**
   - Select your start date
   - Click "Sync to Google Calendar"
   - First time: You'll be redirected to Google for authentication
   - Grant permissions to access your calendar

### 5. Expected Behavior

✅ **First Time Authentication:**
- Browser opens with Google OAuth consent screen
- You grant calendar permissions
- `token.json` file is created automatically
- Study plan syncs to your Google Calendar

✅ **Subsequent Uses:**
- No browser redirect needed
- Uses saved `token.json` for authentication
- Direct sync to calendar

### 6. Troubleshooting

**❌ "Failed to authenticate" Error:**
- Check that `credentials.json` exists in Backend folder
- Verify Google Calendar API is enabled in Google Cloud Console
- Ensure OAuth client type is "Desktop application"

**❌ "Access denied" Error:**
- Make sure you granted calendar permissions during OAuth flow
- Check that your Google account has calendar access

**❌ "Quota exceeded" Error:**
- Google Calendar API has rate limits
- Wait a few minutes and try again

### 7. Security Notes

⚠️ **Important Security:**
- Never commit `credentials.json` to version control
- Never commit `token.json` to version control
- Keep these files secure and private

📁 **File Structure After Setup:**
```
Backend/
├── credentials.json     ← Your OAuth2 credentials (keep private)
├── token.json          ← Auto-generated user token (keep private)
├── app.py
├── utils/
│   └── calendar_utils.py
└── routers/
    └── calendar.py
```

## 🎯 What This Integration Does

- **📅 Creates Study Events**: Converts your AI-generated study plan into calendar events
- **⏰ Smart Scheduling**: Morning (9 AM-12 PM) and afternoon (2 PM-5 PM) study blocks
- **📝 Detailed Descriptions**: Each event includes specific study tasks and plan overview
- **🔔 Reminders**: Automatic reminders 30 and 10 minutes before each session
- **🗂️ Organized**: Creates a dedicated "StudyMentor" calendar to keep things tidy

## 🚀 Quick Start Checklist

- [ ] Create Google Cloud project
- [ ] Enable Google Calendar API
- [ ] Create OAuth2 desktop credentials
- [ ] Download and place `credentials.json` in Backend folder
- [ ] Generate a study plan in the app
- [ ] Click "Add to Calendar" and authenticate
- [ ] Check your Google Calendar for new study events!

---

*Need help? The setup might seem complex, but it's a one-time process that enables powerful calendar integration for your study schedules!*