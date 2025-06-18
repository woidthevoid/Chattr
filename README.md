# Chattr – Mobil chat-app med Firebase og React Native

**Chattr** er en prototype på en real-time chat-app, lavet med React Native og Firebase. Appen bruger Facebook-login, Firebase Authentication og Firestore til beskedlagring. UI er bygget med `react-native-gifted-chat`. Android-versionen fungerer, mens iOS og multi-session support er ikke integreret.

---

## 🎯 Formål
At demonstrere evner inden for mobiludvikling, real-time databaser og autentifikation ved at bygge en funktionel chat-applikation.

---

## 🚀 Funktionaliteter
- **Login via Facebook** (Firebase Auth)
- **Real-time chat** med Firestore
- Brug af `react-native-gifted-chat` komponentbibliotek
- Kun Android-version fungerer – iOS og sessionshåndtering er endnu ikke implementeret

---

## 🧠 Teknologier og arkitektur
- **Frontend**: React Native (JavaScript/TypeScript)
- **Chat UI**: `react-native-gifted-chat`
- **Backend**: Firebase Authentication + Firestore
- **Platforme**: Android (færdig), iOS (under udvikling)

---

## 🛠 Status
- ✅ Android-chat fungerer
- ⚠️ iOS, multi-session og chat-historik er endnu ikke klar
- 🧪 Demo-klar til Android

---

## Struktur
```
Chattr/
├── components/         # UI-komponenter
├── screens/            # Views (ChatScreen, LoginScreen)
├── App.tsx             # Hovedfil
├── firebaseConfig.js   # Firebase initialisering
├── package.json
├── android/ / ios/     # Plattformsspecifik kode
└── README.md
```
---

## Run

- Installer afhængigheder  
   ```bash
   yarn install
   ```
- Opsæt Firebase-projekt og Facebook-login
  - Tilføj google-services.json (Android) i android/app/
  - Konfigurer Facebook App og opdater firebaseConfig.js

- Kør på Android:
     ```bash
     yarn android
     ```
