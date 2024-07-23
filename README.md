# React Native Mobile Chat App

## Overview

This project focuses on creating a mobile chat application using React Native. The primary goal is to offer a seamless chat experience, enabling users to communicate through text messages, share images, and disclose their location. This application caters to the increasing reliance on mobile phones for various daily activities, aligning with the trend of companies prioritizing mobile app development due to its cost-effectiveness and broader reach.

## Objective

Leverage React Native, Expo, and Google Firestore Database to develop a chat application that showcases proficiency in JavaScript mobile development.

## Context

In an era where mobile usage is paramount for tasks ranging from shopping to communication, the demand for high-quality mobile apps is at an all-time high. Traditionally, creating apps for different platforms was a costly and time-consuming process, requiring specialized skills. However, the advent of frameworks like React Native has revolutionized this landscape, enabling developers to maintain a single codebase for both Android and iOS platforms.

## Features and Requirements

### User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

### Key Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

### Technical Requirements

- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data.

## Setting up the App on your device

- First, clone the project from [GitHub](https://github.com/OtmarKirch/chat-demo)
- It is recommended to use Node.js 16.19.0 or lower to insure all functionalities. 
- Install all dependencies within `package.json` with NPM
- The app requires a Firestore database and a storage at [Google Firebase](https://firebase.google.com/). Replace the credentials of `firebaseConfig` in `App.js` with your own. Make the data public by setting the rules of the database and storage to `true`: Replace `allow read, write: if false` with `allow read, write: if true`. Set the method of authentication to anonymous.
- You can test the app with [Expo](https://expo.dev/). Create an account and install Expo on your smartphone. Run `npm run start` or `npx expo start`. Then scan the QR code while with the Expo app.
- Testing is also possible with Emulators - Xcode for iOs and Android Studio for Android devices. After starting Expo in the terminal, choose a for an emulated Android device or i for an emulated iOS device.