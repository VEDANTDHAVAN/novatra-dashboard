# Novatra Dashboard

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Novatra Dashboard** is a real-time auctioning dashboard developed for **Novatra 1.0**, a business presentation competition organized by the **Microsoft Learn Student Club (MLSC)**. The dashboard allows seamless tracking of auction events with a clean, modern interface.

---

## 🚀 Features

- Real-time auction updates using Firebase Realtime Database.
- Responsive and intuitive UI built with Tailwind CSS.
- Secure authentication with Firebase Authentication.
- Deployed live for easy access and demonstration.

---

## 🛠 Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend / Realtime**: [Firebase](https://firebase.google.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```

novatra-dashboard/
├── src/                # Application source code
├── public/             # Static assets (images, icons, sounds)
├── docs/               # Documentation
├── firebase.json       # Firebase configuration
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── package.json        # NPM dependencies

````

---

## ⚡ Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/VEDANTDHAVAN/novatra-dashboard.git
cd novatra-dashboard
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Firebase

* Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
* Enable **Realtime Database** and **Authentication**.
* Add a `.env.local` file at the root with your Firebase credentials:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Project

```bash
npm run dev
# or
yarn dev
```

* Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 📦 Deployment

The app is deployed on **Vercel**:

[https://novatra-dashboard.vercel.app](https://novatra-dashboard.vercel.app)

You can deploy your own version by connecting the repository to Vercel and setting up environment variables.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

* **Developer**: Vedant Dhavan
* **GitHub**: [VEDANTDHAVAN](https://github.com/VEDANTDHAVAN)

```
