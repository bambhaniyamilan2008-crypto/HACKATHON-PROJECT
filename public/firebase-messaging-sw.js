importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// These values are typically injected or can be hardcoded for the demo.
firebase.initializeApp({
  apiKey: "AIzaSyAWbOFNGqZ44QupcKPeX7yGsF6zPvp1PVk",
  authDomain: "studio-8186080283-f4574.firebaseapp.com",
  projectId: "studio-8186080283-f4574",
  storageBucket: "studio-8186080283-f4574.firebasestorage.app",
  messagingSenderId: "31466290334",
  appId: "1:31466290334:web:027b890f614e7aceb68f8f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
