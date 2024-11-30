# Teacher Selection App

## Overview
The Teacher Selection App is a two-page mobile application built using Expo that offers an interactive platform to connect users with qualified teachers. It features a Tinder-like swiping mechanism for intuitive profile selection, dynamic filtering for targeted searches, and real-time search functionality for instant results. User preferences are stored locally using persistent data storage, ensuring a seamless user experience.

## Features

### Swipeable Cards
- **Name**: e.g., Emily Rodriguez
- **Expertise**: Subject specialization (e.g., Mathematics)
- **Experience**: Years of teaching experience
- **Achievements**: List of notable accomplishments
- **Proximity**: Distance from the user
- **Short Video Reel**: A 30-second introductory video

### Animations and Gestures
- Smooth swipe animations implemented using `react-native-reanimated` for visual appeal.
- Efficient swipe gesture handling with `react-native-gesture-handler` for a responsive experience.

### Dynamic Filtering and Search
- **Filters**: Refine teacher profiles based on:
  - Proximity: Distance from the user
  - Expertise: Subject specialization
  - Experience: Teaching experience in years
- **Real-time Search**: Updates displayed profiles instantly as the user types keywords, ensuring a dynamic and responsive experience.

### Persistent Data Storage
- User preferences, such as accepted matches, are stored locally using `@react-native-async-storage/async-storage`.
- Data is retrieved on app startup to maintain continuity and personalization.

### Media Support
- Teacher video reels are played seamlessly using `expo-av`, enhancing user engagement and providing a glimpse into their teaching style.

### Mock Data Integration
- Simulates teacher profiles with mock data for testing and demonstration purposes. This can be easily replaced with a live API in production.

## Technologies Used
- **Expo**: Framework for development and deployment (streamlines the process)
- **React Native**: Used to build the UI and overall app structure
- **react-native-reanimated**: Library for implementing animations for swipe actions
- **react-native-gesture-handler**: Enables smooth handling of swipe gestures
- **@react-native-async-storage/async-storage**: Provides persistent data storage capabilities for user preferences
- **expo-av**: Library for seamless video playback of teacher reels

## Core Functionalities

### Swipe Actions
- **Right Swipe**: Adds the teacher to the "Accepted Matches" list.
- **Left Swipe**: Rejects the teacher's profile.
- User preferences are cached using AsyncStorage for persistent storage.

### Filtering and Search
- **Filters**: Users can filter teachers by proximity, expertise, and years of experience.
- **Real-Time Search**: Updates results instantly based on user input, providing a dynamic experience.

### Media Playback
- Teacher video reels offer a quick introduction to their expertise and teaching style.

## Code Architecture

### Components
- **SwipeCard**: Renders individual teacher profiles, handles swipe gestures and animations.
- **FilterBar**: Provides dynamic filtering options for user preferences.
- **SearchBar**: Updates teacher profiles in real-time based on user input.

### State Management
- **React.useState**: Manages teacher lists, matches, filters, and search terms.
- **React.useEffect**: Fetches and syncs data from AsyncStorage during app initialization.

### Data Flow
- Mock data (or a live API in production) simulates API responses.
- Filtered and searched results update dynamically based on user input.

## Getting Started

### Installation
```bash
npm install
npm start

npm install react-native-reanimated react-native-gesture-handler @react-native-async-storage/async-storage expo-av
```
Future Enhancements
Replace mock data with a live API for real-time teacher profiles and filtering data.

Extend filtering options (e.g., by rating, availability) for more customization.

Implement user authentication and profile creation for personalized experiences.

Integrate social media sharing for teacher profiles to increase reach.



This `README.md` should provide a comprehensive overview of your Teacher Selection App, making it easy for developers and users to understand its functionality and setup. Let me know if there's anything else you'd like to add or modify! 🌟

