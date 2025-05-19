# Nails by Sophie

A modern, beautiful, and responsive web application for a personal nail technician business. This site allows clients to view services, book appointments, leave reviews, and explore the nail artist's portfolio—all with a soft pastel, playful, and professional design.

---

## 1. Project Overview

**Nails by Sophie** is a full-featured web platform for a nail technician to showcase their work, manage bookings, and collect client reviews. The site is designed for both guests and authenticated users, providing a seamless experience across desktop, tablet, and mobile devices. The UI is crafted with a focus on clarity, friendliness, and accessibility, using a pastel color palette and modern, rounded components.

---

## 2. Features

- **Beautiful Landing Page** with a pastel, inviting hero section and clear call-to-action buttons
- **Service Listings**: Browse all available nail services
- **Portfolio**: View a gallery of past work
- **Booking System**: Book appointments with date, time, and service selection
- **Review System**: Leave reviews with star ratings, comments, and image uploads
- **Authentication**: Sign up, sign in, and personalized experience for returning clients
- **Responsive Design**: Optimized for laptop, iPad, and mobile
- **Admin/Protected Area**: Authenticated users can access additional features and prefilled forms
- **Custom Toasts & Popups**: Friendly, on-brand notifications and confirmations
- **Accessibility**: Keyboard navigable, high-contrast text, and finger-friendly controls

---

## 3. Technologies Used

- **Next.js (App Router)** – React framework for server-side rendering and routing
- **Supabase** – Backend-as-a-service for authentication, database, and storage
- **Tailwind CSS** – Utility-first CSS for rapid, responsive design
- **shadcn/ui** – Modern, accessible React UI components
- **EmailJS** – Email notifications for booking requests
- **TypeScript** – Type safety for all components
- **Vercel** – Hosting and deployment

---

## 4. Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase account](https://supabase.com/) (for backend)
- [Vercel account](https://vercel.com/) (for deployment)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables
- Copy `.env.example` to `.env.local`:
  ```bash
  cp .env.example .env.local
  ```
- Fill in your Supabase and EmailJS credentials in `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
  NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-emailjs-service-id
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
  ```
- You can find your Supabase credentials in your [Supabase project settings](https://app.supabase.com/project/_/settings/api).

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```
- The app will be available at [http://localhost:3000](http://localhost:3000)

### 5. Set Up Supabase
- Create a new project at [Supabase](https://supabase.com/)
- Set up tables for `services`, `guest_reviews`, and a storage bucket for review images
- Configure authentication (email/password)
- Set storage policies to allow uploads for authenticated users

### 6. Deploy to Vercel
- Push your code to GitHub
- Import your repo into [Vercel](https://vercel.com/import)
- Set the same environment variables in the Vercel dashboard
- Deploy and enjoy your live site!

---

## Questions or Feedback?
Feel free to open an issue or reach out for support. Enjoy your beautiful new nail studio website! 💅