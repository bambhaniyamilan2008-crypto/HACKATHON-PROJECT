'use client';

import { useEffect, useState } from 'react';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { useFirebaseApp } from '@/firebase';
import { toast } from '@/hooks/use-toast';

export function NotificationSystem() {
  const app = useFirebaseApp();
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported' | 'loading'>('loading');

  useEffect(() => {
    if (!app) return;

    const setupMessaging = async () => {
      try {
        const supported = await isSupported();
        if (!supported) {
          setPermission('unsupported');
          return;
        }

        const messaging = getMessaging(app);
        
        // Check current permission
        setPermission(Notification.permission);

        // Only request if default (first time)
        if (Notification.permission === 'default') {
          try {
            const status = await Notification.requestPermission();
            setPermission(status);
          } catch (e) {
            console.warn('Notification permission request failed', e);
          }
        }

        if (Notification.permission === 'granted') {
          // Token retrieval skipped if no VAPID key is provided to avoid console errors
          // In production, users would set NEXT_PUBLIC_FIREBASE_VAPID_KEY
          const currentToken = await getToken(messaging).catch(err => {
            return null;
          });

          if (currentToken) {
            console.log('FCM Token registered');
          }
        }

        onMessage(messaging, (payload) => {
          toast({
            title: payload.notification?.title || 'Study Alert',
            description: payload.notification?.body || 'New update in your study plan.',
          });
        });

      } catch (error) {
        console.log('Messaging setup skipped');
      }
    };

    setupMessaging();
  }, [app]);

  return null;
}
