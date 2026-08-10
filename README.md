# 💊 MediCo - Medicine Reminder App

## 🌟 Introduction

MediCo is a comprehensive medicine reminder mobile application built with React Native and Expo. The app helps users manage their medication schedules effectively with smart reminders, AI-powered chat assistance, and secure user authentication. Never miss your medicine again with MediCo's intuitive interface and reliable notification system.

### ✨ Key Features

- 📱 **Cross-Platform**: Works seamlessly on both Android and iOS
- 🔐 **Secure Authentication**: Firebase Authentication with email/password
- 💊 **Medicine Management**: Add, edit, delete, and organize medications
- ⏰ **Smart Reminders**: Customizable notification schedules
- 🤖 **AI Medical Assistant**: Chat with AI for medical guidance and information
- 📊 **Medicine History**: Track your medication intake history
- 👤 **User Profile**: Personalized user experience
- ☁️ **Cloud Storage**: Firebase Firestore for data synchronization

## 📱 App Screenshots

|   Home Screen   |Add Medicine| Medicine History | AI Chat |
|----------------|------------|------------------|-----------------|
| ![Home](https://github.com/user-attachments/assets/97f317c3-81fe-45ac-968e-d8f5504c737a) | ![Add](https://github.com/user-attachments/assets/d1bf781c-f730-477b-ad9c-617569402e08) | ![History](https://github.com/user-attachments/assets/38663144-b92e-406c-a3b2-53713776b95d) | ![Chat](https://github.com/user-attachments/assets/636df754-d7f7-4a81-b7f8-5863c4b31d1c) |

## 🚀 Demo

📺 **Watch Demo Video**: [YouTube Demo](https://www.youtube.com/watch?v=qkYFxnq8VDo)

## 📱 Download APK

🔽 **Download Links:**
- 📱 **Android APK**: (https://expo.dev/artifacts/eas/tXXyjve1mo3vu4YnWtmBFq.apk)

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Notifications**: Expo Notifications
- **Navigation**: React Navigation
- **State Management**: React Context/Redux
- **UI Components**: React Native Elements/Native Base

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI installed globally
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)
- Firebase project setup

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rohit661199/Medicine-Reminder-App.git
cd Medicine-Reminder-App
```

### 2. Install Dependencies

```bash
# Using npm
npm install firebase @react-native-async-storage/async-storage

# Or using yarn
yarn add firebase @react-native-async-storage/async-storage
```

### 3. Firebase Project Setup

#### 3.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" → Enter project name: `medi-track`
3. Enable Google Analytics (optional) → Click "Create project"

#### 3.2 Add Web App
1. Click on "Web" icon (`</>`)
2. Register app with nickname: `MediTrack`
3. Copy the Firebase configuration object

#### 3.3 Enable Authentication
1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider → Click **Save**

#### 3.4 Create Firestore Database
1. Go to **Firestore Database** → Click **Create database**
2. Choose **Start in test mode** → Select location → Click **Done**

### 4. Firebase Configuration Files

#### 4.1 Create Firebase Config
Create `firebase/config.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };
export default app;
```

#### 4.2 Environment Variables (Optional)
Create `.env` file:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

### 5. Authentication Context Setup

Create `context/auth-context.js`:

```javascript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email,
      displayName,
      createdAt: new Date()
    });
    return result;
  };

  const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
```

### 6. Firestore Service Setup

Create `services/firestoreService.js`:

```javascript
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  doc 
} from 'firebase/firestore';
import { db } from '../firebase/config';

class FirestoreService {
  async addMedication(userId, medicationData) {
    const docRef = await addDoc(collection(db, 'medications'), {
      ...medicationData,
      userId,
      createdAt: new Date(),
      isActive: true
    });
    return docRef.id;
  }

  async getUserMedications(userId) {
    const q = query(
      collection(db, 'medications'), 
      where('userId', '==', userId),
      where('isActive', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async deleteMedication(medicationId) {
    await deleteDoc(doc(db, 'medications', medicationId));
  }
}

export default new FirestoreService();
```

### 7. Install Expo CLI (if not installed)

```bash
npm install -g @expo/cli
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Start the Expo development server
npx expo start

# Or using yarn
yarn expo start
```

### Run on Specific Platform

```bash
# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios

# Run on web
npx expo start --web
```

### Using Expo Go App

1. Install Expo Go on your mobile device
2. Scan the QR code displayed in the terminal
3. The app will load on your device

## 📦 Building the Application

### Generate APK (Android)

#### Method 1: Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo account
eas login

# Configure build
eas build:configure

# Build APK for Android
eas build --platform android --profile preview

# Build AAB for Google Play Store
eas build --platform android --profile production
```

#### Method 2: Local Build

```bash
# Generate Android bundle
npx expo run:android --variant release

# Create APK from bundle (requires Android SDK)
cd android
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

### Generate IPA (iOS)

```bash
# Build for iOS (requires macOS and Xcode)
eas build --platform ios --profile production

# For local build
npx expo run:ios --configuration Release
```

### Universal Build (Both Platforms)

```bash
# Build for both Android and iOS
eas build --platform all
```



```


## 🚀 Deployment

### Expo Application Services (EAS)

1. **Setup EAS**:
```bash
eas build:configure
```

2. **Build and Submit**:
```bash
# Build and submit to Google Play Store
eas submit --platform android

# Build and submit to App Store
eas submit --platform ios
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rohit**
- GitHub: (https://github.com/rohit661199)

## 🙏 Acknowledgments

- Firebase for backend services
- Expo team for the amazing development platform
- React Native community for continuous support
- Medical professionals for guidance on app features

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/rohit661199/Medicine-Reminder-App/issues) page
2. Create a new issue if your problem isn't already listed

---

<div align="center">
  <p>Made with ❤️ by Rohit</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
