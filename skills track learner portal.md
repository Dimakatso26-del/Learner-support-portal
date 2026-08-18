# UNIT 5- GROUP ACTIVITY
GROUP MEMBERS:
DIMAKATSO MOSIMA | TEBOGO MNGUNI  | SENZOKUHLE NGUBANE

# PART 1- Architecture Investigation
## 1. CLIENT-SIDE
- is the creation of the user-facing part of a website or app. It uses HTML, CSS, and JavaScript so users can see and use the site. This code executes directly on the user's local device, inside a web browser. 
Execution Location
- User's Device: Code runs on local computers, phones, or tablets.
- Web Browser: Browsers like Chrome, Safari, or Firefox read and run the code.
- Local Processing: The user's own hardware does the work to show the page. 
## 2. SERVER-SIDE
- Runs on a remote server/cloud, not the browser.
- It handles data storage, authentication and security.
- In skills-Track, firebase services act as the sever-side.
## BROWSER-CODE
- Can’t be trusted with secrets, server code can.
- Skills-Track-They divide responsibilities into frontend presentation, client-side behaviour, identity security, and cloud-hosted data persistence.
______________________________________
## HTML 
- Role: Structure and Content.
- Function: It builds the fundamental skeleton of the application web page. It defines   user interface (UI) components such as input fields for email/password, sign-in buttons, navigation headers, and data containers where database entries will render. 
## CSS 
- Role: Presentation and Layout.
- Function: It handles visual aesthetics, positioning, and responsiveness across devices. CSS skins the raw HTML, styling login modals, handling text alignments, and defining colours or layout systems (like Flexbox or Grid) to ensure the interface is intuitive. 
## JavaScript (JS)
- Role: Application Logic and Integration.
- Function: It acts as the functional engine connecting the local web browser to external cloud services. JavaScript captures form values from the HTML inputs, responds to click actions via event listeners, triggers Firebase functions, and dynamically modifies DOM elements to show database updates without refreshing the page. 
________________________________________
# Backend-as-a-Service (The Cloud)
## Firebase Authentication
- Role: User Identity and Access Control.
- Function: It securely registers and verifies user credentials (e.g., email and password combinations or OAuth tokens) without requiring manual backend server management. When a login succeeds, it generates a unique User ID (UID) and an authentication token used to verify permissions on other Firebase products.
## Firebase Realtime Database
- Role: NoSQL Dynamic Storage and Synchronization.
- Function: It holds application data in a giant JSON tree structure. Because it establishes a persistent WebSocket connection with the web application, any data changes made by one user are instantly synced to all other connected clients in fractions of a second without needing constant HTTP polling requests. 
## Firebase REST API
- Role: Universal Stateless Interoperability.
- Function: It acts as an alternative data pathway for environments where full Firebase JavaScript SDKs cannot or should not be loaded. By appending .json to a Firebase Realtime Database endpoint, any HTTPS client can perform standard GET, POST, PUT, or DELETE requests. This is ideal for lightweight scripts, simple 5backend worker servers, or basic testing tools.

• Firebase and Server-side Java-script
- No, Firebase is not the same thing as server-side JavaScript . Firebase is a cloud platform by Google that provides ready-made backend services like databases, user login, and hosting . Server-side JavaScript is a way to write custom backend code using Node.js.

# What is Firebase?

- Backend-as-a-Service: Gives you tools to use out of the box [6.10].
- Pre-made features: Includes databases, login systems, and storage.
- Less code: Lets front-end apps talk directly to the database without building a custom server.
## What is Server-Side JavaScript?
- Runtime environment: Runs JavaScript on a server (using Node.js) instead of a web browser.
- Custom logic: Lets you write your own rules, route requests, and connect to any database you want .
- Total control: Requires you to manage the server code and API endpoints yourself.

5
• When a learner creates a learning task, the Client-side handles immediate UI     
- rendering, local form validation, and state updates.
• The Server-side handles database persistence, server-side validation, business logic like notifications or analytics, and syncing data across other devices.

## Client-Side Operations

- Form input: Captures the title, due date, and tags typed by the user.
- Local validation: Checks if required fields are empty before sending.
- UI update: Adds the new task to the local screen right away.
- State management: Keeps track of open forms and local drafts.

## Server-Side Operations
- Database save: Stores the task data permanently in the main database.
- Security check: Verifies user login tokens and access rights.
- Data sync: Sends the new task to other devices linked to the account.
- Triggers: Starts background jobs like reminders or points systems.

## 6. Treating authentication, database access, and security as client-side concerns is dangerous because users can inspect, modify, and bypass all code running in their browsers or devices. Trusting the client exposes your database, leaks sensitive logic, and lets attackers fake identity or steal data.
Security Risks
- Exposed credentials: Client code reveals secret API keys and database passwords to anyone.
- Easy tampering: Users can change client code to skip login steps or unlock paid features.
- Direct data access: Attackers can read or delete your entire database without server guards.

###Technical Problems
- Slow performance: Loading huge database drivers onto a phone or laptop wastes data and battery.
- Broken logic: Users can turn off JavaScript or block network requests to break app rules.
- No central control: You cannot patch security flaws safely if the fix relies on user devices.

## 7. Two alternative technologies that could provide back end/server-side functionality instead of firebase
* are Supa-base (an open-source Firebase alternative using PostgreSQL) and Pocket-Base (an ultra-lightweight backend in a single Go file). Moving away from Firebase changes your architecture from a vendor-locked NoSQL system to self-hosted or managed relational databases
Supa-base Architecture
- Supa-base replaces Firebase Realtime Database and Fire-store with a powerful relational database.
- Database Core: Uses PostgreSQL instead of a proprietary NoSQL store.
- API Layer: Generates REST and Graph-QL APIs automatically from your database schema using Post-g-REST.
- Authentication: Managed via Go-True, handling JWTs and third-party logins directly in Postgres.
- Realtime: Uses Postgres replication piped through a Elixir-based web-socket server to broadcast database changes.
- Hosting Shift: Can be self-hosted on Docker or run via their cloud, eliminating vendor lock-in.

###Pocket-Base Architecture
- Pocket-Base offers an embedded, monolithic approach for smaller projects or lightweight services.
- Embedded DB: Uses SQLite instead of a cloud database server, running directly on the file system.
- Single Binary: Combines the Go core, database, and web server into one executable file.
- Realtime & Auth: Built-in hooks for real-time subscriptions and native user authentication out of the box.
- Hosting Shift: Extremely cheap and simple to host on a single low-cost Virtual Private Server rather than managing multiple cloud services.

## 8. Key Security Risks

- Sensitive Data Exposure: Hardcoding private API keys, database credentials, or proprietary business logic directly in front-end scripts allows anyone to read them using browser developer tools. 
- Bypassed Access Control and Validation: Handling authorization rules or input checks only in JavaScript lets attackers disable scripts, modify local variables, or send forged requests directly to the server. 
- Tampering and Code Injection: Flaws in handling client-side inputs or untrusted third-party scripts can lead to Cross-Site Scripting , letting attackers steal active session cookies or execute malicious actions. 

# Part 2- Map actual application
=============================================
feature | Classification | Justification
=============================================

Registration | Both	| Client- form + validation
Server-firebase auth creates user
Login |	Both	| Client-capture email/password
Server-firebase auth verifies
Form validation	| Client-side |	JS checks required fields before sending to firebase
Displaying the dashboard |	Client-side	JS | fetches data and renders html/ CSS in browser
Creating a learning task	| Both	| Client-build task object.
Server-firebase DB stores it
Retrieving tasks	| Both | Client-JS requests data.
Server-firebase DB returns it
Updating a task	| Both |Client-JS sends update
Server-firebase DB updates record
Deleting a task | Both | Client-JS sends delete
Server-firebase DB removes record
Calculating learner progress | Client-side |	JS uses filter() / map() on task array to calculate%
Filtering/searching tasks |	Client-side |	JS filters array already loaded in browser
Storing learner data | Server/Cloud Service	| Firebase real-time data base stores all data
Authentication	| Server/Cloud Service | Firebase authentication manages users/token
Database security/access rules | Server/Cloud Service |	Firebase security rules enforce who can read/write
Updating the DOM | Client-side | JS manipulates html elements after data changes
Displaying success/error messages |	Client-side	JS | shows alerts base on firebase response



