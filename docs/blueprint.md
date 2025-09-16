# **App Name**: BidBlitz Dashboard

## Core Features:

- Image Slideshow: Display a series of images in a slideshow format, with 'next' and 'back' buttons for navigation. The tool decides how to respond to errors if image assets are unavilable.
- Responsive Image Handling: Ensure images are responsive and centered within the slideshow container.
- Countdown Timer: Implement a timer that counts down from 60 seconds, displayed prominently.  Include a 'Reset' button to restart the timer.
- Bid Submission Form: Create a form with 'Team Name' and 'Bid Amount' inputs. Upon submission, store the data in Firebase Realtime Database under the '/bids' node.  The tool will generate useful default values when the user clicks reset
- Form Reset: Clear the form fields after a successful bid submission.
- Live Bid Display: Fetch and display bids from Firebase Realtime Database in real-time. Show the 'Team Name' and 'Amount' in a vertical list, updating automatically with new bids.

## Style Guidelines:

- Primary color: Saturated blue (#4285F4) for a trustworthy and engaging feel, reminscent of auctions and marketplaces.
- Background color: Light gray (#F5F5F5), a very lightly desaturated version of the primary blue to provide a clean, neutral backdrop.
- Accent color: Orange (#FFA000) for call-to-action elements, creating a clear visual cue for user interaction.
- Headline font: 'Poppins', a geometric sans-serif for a modern and precise look.
- Body font: 'PT Sans', a humanist sans-serif that ensures good readability and balances modernity with a touch of warmth.
- Use clean, minimalist icons to represent timer controls and bid actions.
- Implement a responsive 3-column grid layout that adapts to different screen sizes. Ensure full-height sections for a modern, app-like experience.