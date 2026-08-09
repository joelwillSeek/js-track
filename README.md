# js-track

A universal tracking package for Web (Next.js, React, Vue, Vanilla) and React Native / Expo to integrate with the NestJS `nest-track` backend.

## Installation

```bash
pnpm add js-track
```
*(Or link locally if in a workspace)*

## Setup & Usage

Instantiate the `JsTrack` class once and use it throughout your application. Because it uses the standard `fetch` API, it works seamlessly out of the box in both browser environments and React Native!

```typescript
import { JsTrack } from 'js-track';

// 1. Initialize the tracker
export const tracker = new JsTrack({
  baseUrl: 'https://api.your-nestjs-backend.com',
  
  // Optional: pass custom headers (e.g. Auth token) so NestJS can extract the user ID
  getHeaders: () => {
    // In Web: const token = localStorage.getItem('token');
    // In React Native: const token = await AsyncStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
});

// 2. Track events from anywhere in your app
tracker.trackEvent('button_clicked', { buttonName: 'login' });
```
