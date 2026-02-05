
# Creator Arc Rank Checker

## Overview
A sleek single-page web app with a black & silver premium theme where users can check their creator tier by entering their registered email.

---

## Design & Theme
- **Background**: Matte black (#0a0a0a or similar)
- **Accents**: Silver/metallic grey with subtle gradients
- **Layout**: Centered card with soft silver border and subtle glow
- **Typography**: Clean, modern sans-serif fonts
- **Mobile-first**: Fully responsive for all devices

---

## Page Structure

### Hero Section
- Small top label: "CREATOR STATUS" (silver, uppercase, letter-spaced)
- Main heading: "Check Your Creator Arc Rank"
- Subtext: Brief explanation about rank/tier visibility

### Input Section
- Email input field with placeholder "Enter your registered email"
- CTA button: "Check My Rank" with silver accent styling
- Loading state with spinner animation when checking

### Results Section (appears after search)
- Fade-in animation for smooth reveal
- **If found**: Result card displaying:
  - Creator Name (prominently displayed)
  - Tier with unique color styling:
    - **Titan** - Gold/amber accent
    - **Commander** - Purple/violet accent
    - **Warrior** - Blue/cyan accent
    - **Degen** - Green/emerald accent
- **If not found**: Friendly error message with option to try again

---

## Backend Integration
- Connect to your Google Sheet using Google Sheets API
- Match records by email column
- Fetch creator_name and tier fields
- **Requires**: Lovable Cloud for secure API calls (edge function)

---

## Tech Stack
- React + TypeScript + Tailwind CSS
- Lovable Cloud (edge function for Google Sheets API)
- Smooth CSS animations for loading and results reveal
