# Background and Motivation

AmiConnect is a platform enabling Amity University students to find peers for collaboration, study groups, and networking based on shared interests, skills, learning goals, department, and year.

# Key Challenges and Analysis

- Secure user authentication and session management (Amity email verification, password hashing)
- Designing normalized PostgreSQL schema for users, interests, skills, learning goals
- Matching algorithm: scoring criteria and performance on large datasets
- API design: endpoints for signup, login, recommendations, and filtering
- Frontend integration: form validation, data flow, and UX
- Ensuring security (input sanitization, protected routes)

# High-level Task Breakdown

1. Project setup
   - Create Python virtual environment, install Flask and dependencies
   - Initialize Git repo
   - Connect to PostgreSQL database

2. Database schema
   - Define tables: users, interests, skills, learning_goals, associations
   - Create migration scripts

3. Authentication
   - POST /signup endpoint (email validation, bcrypt hashing)
   - POST /login endpoint (JWT or session tokens)
   - Middleware for protected routes

4. Data retrieval endpoints
   - GET /users with optional filters (department, year)

5. Matching engine
   - Implement similarity scoring (interests, skills/goals, department, year)
   - GET /recommend/<user_id> endpoint returning top 5–10 matches

6. Testing
   - Unit tests for models, endpoints, and matching logic
     - Test /signup: valid/invalid data, duplicate emails, Amity email check, password hashing
     - Test /login: valid/invalid credentials, JWT issuance
     - Test /users: auth required, filtering, data correctness
     - Test /recommend/<user_id>: auth required, output structure, scoring logic
     - Test core utility functions (e.g., jwt_required)
   - Success Criteria:
     - All major endpoints have tests for success and failure cases
     - JWT authentication is enforced in protected routes
     - Matching logic is covered by tests with sample data
     - Tests run in isolation and do not require manual DB setup

7. Landing Page
   - Define purpose & target audience (students seeking study/project partners).
   - Draft wireframe: hero banner (tagline + primary CTAs to Signup/Login), features overview, testimonials, footer.
   - Identify required components: `Navbar`, `HeroBanner`, `FeaturesSection`, `Testimonials`, `Footer`.
   - Outline content for each section: headline, subheading, feature items, sample testimonials.
   - Plan responsive design: mobile, tablet, desktop breakpoints using Tailwind CSS.
   - Determine routing for CTAs: `/signup` and `/login` links.

8. Frontend Integration
   - Configure environment variable `VITE_API_URL` for API base URL.
   - Refactor `src/lib/auth.ts` to call backend `/signup` and `/login` endpoints, handle JWT storage and user state.
   - Update `src/contexts/AuthContext.tsx` to use the refactored AuthService, manage user context, and display toast notifications.
   - Implement `ProtectedRoute` component to guard routes and redirect unauthenticated users to `/login`.
   - Update `Signup` page: POST to `/signup`, validate inputs, display errors, and redirect to login on success.
   - Update `Login` page: POST to `/login`, store JWT in `localStorage`, update context, and redirect to protected routes.
   - Create API methods in `src/lib/api.ts` for GET `/users` (with filters) and GET `/recommend/<user_id>`.
   - Implement `Users` page: fetch and display a filtered list of users, support department and year filters.
   - Implement `Recommendations` page: fetch and display recommended peers for the current user.
   - Add error handling and toast notifications for all API interactions.
   - Test end-to-end user flow: signup, login, access protected pages, fetch and display users/recommendations.

9. Documentation
   - Update README with instructions for env variables, API usage, and authentication flow.

# Unit Testing Plan and Criteria

## Scope
- Test all backend endpoints: /signup, /login, /users, /recommend/<user_id>
- Test authentication and authorization logic
- Test core utility functions (e.g., password hashing, JWT validation)

## Approach
- Use pytest and Flask's test client
- Use a temporary SQLite database for isolation
- Mock environment variables and JWT secret
- Cover both positive and negative cases for each endpoint

## Success Criteria
- >90% code coverage for backend logic
- All endpoints tested for valid and invalid input
- Authentication and authorization enforced and tested
- Matching algorithm tested with sample users/interests/skills
- Tests pass reliably and do not affect production DB

# Project Status Board

- [ ] Test frontend-backend integration and fix issues
- [ ] Build recommendation page UI
- [ ] Integrate frontend with backend endpoints
- [ ] Build recommendation page UI
- [ ] Integrate frontend with backend endpoints
- [ ] Write documentation (README, API docs)

# Executor's Feedback or Assistance Requests

> Frontend forms (signup/login) are now integrated with backend endpoints using fetch/async via new api.ts and refactored auth.ts/AuthContext. In-memory db logic is deprecated.
> - Signup and login now POST to Flask backend and handle JWT tokens.
> - Next: Test the integration in the browser and fix any issues with backend communication, error handling, or user feedback.

# Lessons

> (Document learnings or resolved issues here)