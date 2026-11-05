<USER_REQUEST>
Recomendation - 
StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform
📽️📽️[Requirement Explanation](https://drive.google.com/file/d/1lVNLKu7j2MGoHskr-zdNU7s0KCT2ElPP/view?usp=sharing)
Project Theme
StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners and hosts can list their creative spaces—ranging from photography cyc walls and cinema sound stages to podcast lounges, music recording suites, and art workshops. Fellow creators can discover, filter, inspect dynamic availability, and reserve studio slots with transparent pricing and real-time booking management.
Key Rules:
GitHub Commits:
Include a minimum of 15 notable GitHub commits on the client side.
Include a minimum of 8 notable GitHub commits on the server side
Readme.md: Add a meaningful readme.md file with the name of your website and a live site URL on the client side. Include a minimum of five bullet points to feature your website, tech stack, local setup steps, and examiner test credentials.
Lorem Text: Don't use any Lorem ipsum text; you can not use the default alert to show any error or success message. All notifications must use modern toast components (Sonner/React Hot Toast) and custom modal dialogs.
Host your Application: You can choose deployment systems like Vercel or Render for hosting. As you develop a single-page application:
Ensure that the page doesn't throw any errors on reloading from any route.
A logged-in user must not be redirected to Login on reloading any private route.
1. Layout Structure
Header / Navbar: Clean StudioSpace logo with an aperture or studio spotlight icon on the left.
Navigation links:
Home (/)
Explore Studios (/studios)
How It Works
About Us
Unauthenticated State: displays Login and Register action buttons.
Authenticated State: displays user profile photo/avatar; on hover/click, displays user name and dropdown menu containing Dashboard, Add New Studio, My Studio Listings, My Bookings, and Logout button; sticky header with active route indicators.
Footer: Consistent branding featuring StudioSpace logo, mission statement, copyright & terms notice, quick navigation links, popular studio categories, newsletter input, and social links using the new X logo (do NOT use the old Twitter bird).
2. Home
Banner / Hero Slider: Interactive slider with at least 3 slides using Swiper.js, Slick-slider, or slideshow-image. High-res visuals, punchy headline, subtext, and primary CTA buttons ("Explore Studios" / "Host Your Space") linking to /studios.
Featured Studios Section (Dynamic): Fetch dynamically from MongoDB, displaying 6 top-rated or newest studio spaces using .limit(6). Each card displays studio image, category badge, title, hourly rate ($XX / hr), rating badge, location, and a "View Details" button.
Browse by Studio Categories: Interactive category cards (Photo Studios, Sound Stages, Podcast Rooms, Music Suites, Art Workshops). Clicking any category redirects to /studios with that specific category pre-selected.
Extra Home Sections (2 Static/Dynamic Sections):
Section 1 (How Booking Works): 4-step workflow (1. Discover Spaces → 2. Select Shoot Hours → 3. Book Instantly → 4. Create & Produce).
Section 2 (Host Guarantee & Creator Support): Platform assurances covering liability protection, verified profiles, equipment safety, and 24/7 host support.
3. Authentication
a. User Login
The user will see a Login page with a form so that the user can log in to this application.
Show a Title for Login. & a form with the following fields:
(Email, Password, Forgot Password, Login button)
If the user logs in successfully, then navigate them to their desired Route / Home page.
If not, show him an error with a toast/error message anywhere in the form.
There will be some other options like:
Show the user a Link for Register so that he can go to the register page.
Show users a Social Login Button (Google only); on clicking it, the user authenticates with Google and navigates them to their desired Route / Home page.
b. User Registration
Create a registration page with a form, so that the user can register themselves in this application.
Show a Title for registration and a Form with the following fields:
(Name, Email, Photo URL, Password, & Register Button)
If the user registers successfully, then navigate them to their Login page.
If not, show him an error with a toast/error message anywhere in the form.
Implement password validation:
For password validation, you need to follow the criteria below. Show a password error in the form, and don't register with an invalid password:
Must have an Uppercase letter in the password
Must have a Lowercase letter in the password
Length must be at least 6 characters
There will be some other options like:
Show the user a Link for Login so that he can go to the login page.
Show users a Social Login Button (Google/Github/Others) on clicking it: The user authenticates with Google Navigate the user to the Home page.
Don't implement email verification or the forgot password method, as it will inconvenience the examiner. If you want, you can add these after receiving the assignment result.
4. CRUD Operation:
Define the CRUD operations with the required Routes below. Integrate an image uploading system using imgbb/postimage and store all data in the MongoDB Database.
• Add New Studio (Private Route — /add-studio):
Form with Title, Category (Select: Photo Studio, Film Stage, Podcast Lounge, Music Suite, Workshop, etc.), Hourly Rate ($), Security Deposit ($), Max Capacity, Location/Address, Image URL, Amenities List (Tags/Checkboxes), Detailed Overview, and Read-only User Email & Name.
Upon submission, save data in the MongoDB studios collection, show a success toast, and redirect to /my-listings.
• Explore Studios Page (/studios):
Grid view listing all available workspaces with title, category badge, hourly rate, location, rating, and View Details button.
• Studio Details Page (/studios/[id]):
Displays full workspace specifications, gallery carousel, amenity list, host details, reviews, and a "Book Workspace Now" button launching the booking modal.
• My Studio Listings Page (Private Route — /my-listings):
Table/Card format showing user-owned spaces (ownerEmail match) with Update and Delete buttons.
Delete Action: Show confirmation modal before deleting the document from MongoDB with a success toast.
• Update Studio Page (Private Route — /studios/edit/[id]):
Pre-filled form with existing listing data; read-only host info. On submit, update MongoDB via PUT/PATCH and show a success toast before redirecting to /my-listings.
• Booking System & My Bookings Page (Private Route — /my-bookings):
Saves reservation in bookings collection with status "Pending".
My Bookings page displays reservations with a status badge (Pending, Confirmed, Completed, Cancelled) and a "Cancel Booking" option for pending slots.
5. Other Requirements
Loading State: Add a requirement for branded skeleton loaders or animated spinners during route transitions and asynchronous data fetches.
Not-Found Page: Add a requirement for a custom 404 page featuring creative studio illustration and a direct "Return to Home" button.
Toast Notifications: Standardized feedback (Sonner / React Hot Toast) across all CRUD, auth, and booking actions.
Empty States: Friendly empty state displays with CTA buttons when search queries return no results or booking lists are empty.
UI Design Requirements:
Unique Design: First, decide what kind of website you want to make. Then, search online or check out websites like ThemeForest to get ideas for the design. But remember, your website idea shouldn't be similar to any projects you've done before or to any examples in our modules or conceptual sessions.
Keep the main heading style (font, size, color) consistent across all sections.
Keep paragraph spacing balanced and text easily readable.
Maintain uniform image sizes and spacing.
Use the same button style as on the home page.
Ensure good spacing and proper alignment.
Navbar: Keep the heading/logo the same style and size as on the home page.
Use a grid layout with equal image sizes.
Keep all cards equal height and width (especially in services, projects, or products section).
Use the new X logo instead of the old Twitter bird to match the latest rebrand.
Responsiveness: Make it responsive for all devices, including mobile, tablet, and desktop views.
Resources:
https://uiverse.io
https://devmeetsdevs.com
https://bootcamp.uxdesign.cc/free-images-and-resources-collection-for-website-c77f2fc46ce5
https://themeforest.net
https://codecanyon.net
Challenges
Implement 3-4 challenge requirements to test higher-order thinking with MongoDB operators and security:
Challenge 1 (JWT Security with HTTPOnly Cookies): Protect server-side mutations (POST /api/studios, DELETE /api/studios/[id], POST /api/bookings) by storing JWT in HTTPOnly cookies and rejecting unauthorized requests with 401 Unauthorized.
Challenge 2 (Booking Double-Booking Prevention): Verify time overlap against existing "Confirmed" bookings in MongoDB before saving new reservations, rejecting collisions with a clear error message.
Challenge 3 (Theme Customization): Add a theme toggling button for changing themes from light to dark / dark to light. Changing the theme should make the full system dark/light based on user interaction.
Optional Requirements
Add optional requirements so energetic students can differentiate their project:
PDF Booking Invoice Generator: Downloadable PDF receipt for confirmed studio bookings.
Saved Studios Wishlist: Heart icon on studio cards allowing logged-in users to save favorite spaces in MongoDB.
Tech Stack:
Layer
Technology Selection
FrontEnd
Next JS (App Router), Hero UI / Daisy UI / Shadcn UI, TypeScript / JavaScript
Authentication & Authorization
BetterAuth, MongoDB Adapter, JWT
BackEnd
Express JS, MongoDB, TypeScript / JavaScript
What to submit:
Your client-side code GitHub repository
Your server-side code GitHub repository
Your live website link                                        My promt- # Project: StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

Act as a Senior Full-Stack Developer, UI/UX Designer, and Software Architect.

I want you to build a complete, production-quality, responsive web application called **StudioSpace** based on the following requirements.

## 1. Project Vision

StudioSpace is a peer-to-peer marketplace where photographers, filmmakers, content creators, podcasters, musicians, and artists can discover and rent creative workspaces.

Studio owners can register, list their studios, manage availability, and receive bookings. Creators can explore studios, view details, reserve time slots, and manage their reservations.

The website must look like a premium creative marketplace, not a generic CRUD project.

## 2. Technology Stack

Frontend:
- Next.js with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React Icons
- Swiper.js for hero slider
- Sonner for toast notifications
- React Hook Form and Zod for form validation

Authentication:
- Better Auth
- MongoDB Adapter
- Google OAuth
- Secure session/JWT handling
- HTTPOnly cookies

Backend:
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

Image Hosting:
- ImgBB API

Deployment:
- Frontend: Vercel
- Backend: Render

## 3. UI/UX Design Direction

Create a premium, modern, cinematic and editorial design.

Theme:
- Primary background: #17191C
- Secondary background: #24272B
- Accent: #E7A65A
- Primary text: #F5F0E8
- Secondary text: #858A90

Typography:
- Headings: Playfair Display
- Body: Inter

Design requirements:
- Premium dark theme with light/dark theme switching.
- Minimal and elegant navigation.
- Consistent spacing and typography.
- Large high-quality studio photographs.
- Rounded cards with subtle borders.
- Smooth hover effects and transitions.
- Beautiful loading skeletons.
- Consistent button styles.
- Responsive mobile-first layout.
- Professional empty states and error states.
- Avoid excessive gradients and unnecessary animations.

Create a unique StudioSpace logo using an aperture or spotlight concept.

## 4. Required Pages

Public:
- /
- /studios
- /studios/[id]
- /login
- /register
- /about
- /how-it-works

Private:
- /dashboard
- /add-studio
- /my-listings
- /my-bookings
- /studios/edit/[id]

Also create a custom 404 page.

## 5. Homepage

Build the homepage with the following sections:

1. Sticky Navbar with logo, navigation, authentication buttons and user profile dropdown.
2. Hero slider containing at least three professional studio photographs.
3. Search section with location, category and date filters.
4. Featured Studios section displaying six dynamically fetched studios.
5. Browse by Categories:
   - Photo Studios
   - Film Stages
   - Podcast Rooms
   - Music Suites
   - Art Workshops
6. How Booking Works with four steps.
7. Host Guarantee and Creator Support section.
8. Become a Host CTA section.
9. Professional footer with newsletter and social links, including the new X logo.

## 6. Authentication

Implement:
- Email and password registration.
- Email and password login.
- Google social authentication.
- User profile and logout.
- Protected routes.
- Persistent login after browser refresh.
- Redirect users to their originally requested private route after login.

Registration fields:
- Name
- Email
- Photo URL
- Password

Password validation:
- At least one uppercase letter.
- At least one lowercase letter.
- Minimum six characters.

Do not implement email verification or actual forgot-password functionality.

## 7. Studio Management (CRUD)

Create a Studio model with:

- title
- category
- hourlyRate
- securityDeposit
- maxCapacity
- location
- imageUrl
- amenities
- description
- ownerName
- ownerEmail
- rating
- createdAt
- updatedAt

Implement:

POST /api/studios
GET /api/studios
GET /api/studios/:id
GET /api/my-studios
PUT /api/studios/:id
DELETE /api/studios/:id

Requirements:
- Add Studio form.
- Upload images through ImgBB.
- Store studio information in MongoDB.
- Explore and search studios.
- Filter by category, price, location and amenities.
- Sort by price, rating and newest.
- Display six featured studios on the homepage.
- Show only the authenticated user's listings on My Listings.
- Update existing studio information.
- Confirm before deleting a listing.

Never allow users to update or delete another user's studio.

## 8. Booking Management

Create a Booking model with:

- studioId
- studioTitle
- creatorEmail
- creatorName
- hostEmail
- bookingDate
- startTime
- endTime
- totalHours
- hourlyRate
- totalPrice
- status
- createdAt

Booking statuses:
- Pending
- Confirmed
- Completed
- Cancelled

Implement:
- Booking modal.
- Date selection.
- Start and end time selection.
- Price calculation.
- Booking confirmation.
- My Bookings page.
- Cancel pending bookings.
- Prevent booking time collisions with existing Confirmed bookings.

Use MongoDB queries to check time overlap before accepting a reservation.

Two bookings overlap when:
existing.startTime < requested.endTime AND existing.endTime > requested.startTime

Check the same studio and date. Make the booking process safe against concurrent requests using an appropriate database transaction or atomic reservation strategy.

## 9. Security Requirements

Implement JWT authentication using secure HTTPOnly cookies.

Protect:
- POST /api/studios
- PUT /api/studios/:id
- DELETE /api/studios/:id
- POST /api/bookings

Requirements:
- Verify authentication on the server.
- Reject unauthorized requests with HTTP 401.
- Reject unauthorized ownership changes with HTTP 403.
- Validate all incoming data.
- Never trust client-provided ownerEmail or creatorEmail.
- Read authenticated user information from the verified session.
- Configure CORS with credentials.
- Use environment variables for secrets.
- Never expose API keys in frontend code.

Ensure Better Auth and Express authentication use a consistent, properly verified session/JWT strategy. Do not implement an insecure custom JWT system alongside Better Auth.

## 10. Additional Features

Implement:
- Light/dark theme toggle.
- Branded loading skeletons.
- Custom 404 page.
- Empty states.
- Sonner toast notifications.
- Custom confirmation dialogs.
- Responsive dashboard.
- Booking status badges.
- Proper error handling.

Optional:
- PDF booking invoice.
- Saved studio wishlist.

## 11. Database Structure

Create the following MongoDB collections:

- users
- studios
- bookings
- wishlists (optional)

Create appropriate indexes for:
- Studio categories.
- Owner email.
- Studio location.
- Booking studioId and bookingDate.
- Booking status.

## 12. GitHub Requirements

Client repository:
- Minimum 15 meaningful commits.

Server repository:
- Minimum 8 meaningful commits.

Use clear commit messages describing actual completed work.

Create a meaningful README.md containing:
- Project name.
- Project description.
- Live website URL.
- Main features.
- Technology stack.
- Installation instructions.
- Environment variable instructions.
- Examiner test credentials.

Never invent completed commits, live URLs or working credentials.

## 13. Development Instructions

IMPORTANT: Build the project step by step.

Do not generate the entire application in one response.

Phase 1: Project architecture, folder structure, design system and frontend setup.

Phase 2: Homepage, navbar, footer and reusable components.

Phase 3: Authentication and protected routes.

Phase 4: Express server and MongoDB connection.

Phase 5: Studio CRUD operations.

Phase 6: Studio search, filters and details page.

Phase 7: Booking system and collision prevention.

Phase 8: Dashboard and user management pages.

Phase 9: JWT security, validation and error handling.

Phase 10: Responsive design, testing and deployment.

At the beginning of each phase:
1. Explain what you will build.
2. Show the files that need to be created or modified.
3. Provide complete working code for those files.
4. Explain how to run and test the feature.
5. Wait for me to confirm before proceeding to the next phase.

## 14. Quality Requirements

- Use clean and reusable components.
- Follow TypeScript best practices.
- Avoid unnecessary code duplication.
- Do not use Lorem Ipsum.
- Do not use browser default alert() for notifications.
- Do not leave non-functional buttons.
- Do not use fake authentication.
- Do not expose private information.
- Ensure all API routes work correctly.
- Ensure private routes remain accessible after page refresh.
- Ensure direct navigation and page reloads work on every route.
- Test both success and failure scenarios.
- Make sure the application is fully responsive.

## Final Goal

Deliver a complete, functional, secure and visually impressive StudioSpace marketplace that satisfies every mandatory assignment requirement and includes at least three challenge features.

Start with Phase 1 only. First show me the architecture, folder structure, design system and setup commands. Do not skip any phase or generate incomplete placeholder code.
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-11-04T21:43:08+06:00.
</ADDITIONAL_METADATA>
<USER_SETTINGS_CHANGE>
The user changed setting `Model Selection` from None to Gemini 3.8 Flash (High). No need to comment on this change if the user doesn't ask about it. If reporting what model you are, please use a human readable name instead of the exact string.
</USER_SETTINGS_CHANGE>