## STEP 1: Prepare Development Environment
- Verify internet connectivity
- Verify operating system compatibility
- Create development workspace folder

## STEP 2: Install Git
- Download Git installer
- Execute installation wizard
- Accept default configuration settings
- Complete installation process

## STEP 3: Configure Git
- Open terminal
- Execute:
        git config --global user.name "Full Name"
        git config --global user.email "email@example.com"

- Verify configuration:
        git config --list

## STEP 4: Create GitHub Account
- Navigate to GitHub website
- Register new account
- Verify email address
- Sign in to platform

## STEP 5: Install Integrated Development Environment (IDE)
- Download preferred IDE
   Example:
        Visual Studio Code
        IntelliJ IDEA

- Install IDE
- Launch application

---
# Installed and Configured Tools
### Formatter (Prettier)
### Installation:
       - npm install --save-dev prettier
   
## Demonstration

Before formatting:
       - const app=require('express')()

After formatting:
       - const app = require('express')();
Prettier successfully formats code automatically when files are saved.

### Linter (ESLint)
   
### Installation:   
      -  npm install --save-dev eslint
## Demonstration  
Code:
       - const message = 'Hello' 
ESLint Output:
       - Missing semicolon.
 ESLint identifies syntax and style issues before deployment.
 
### Framework Configuration (Express.js)
### Installation:
       - npm install express
## Demonstration
Run:
       - node server.js
Output:
       - Server running on port 3000
Browser Request:
       - http://localhost:3000
Response:
       - SkillsTrack Student Support API
        
Express framework installed and functioning correctly.

## Evidence of Working Environment
|Tool               |Purpose                   |Status
|Visual Studio Code | IDE                      |Configured
|Node.js            |Runtime Environment       |Installed
|Express.js         |REST API Framework        |Running
|Prettier           |Code Formatter            |Working
|ESLint             |Code Quality & Linting    |Working
|VS Code Debugger   |Debugging                 |Working
|Git                |Version Control           |Configured

---
## STEP 6: Configure IDE Extensions
- Install Git integration extension
- Install programming language extensions
- Install code formatting tools
- Install debugging tools

## STEP 7: Create GitHub Repository
- Select "New Repository"
- Enter repository name
- Add repository description
- Choose visibility setting
- Initialize repository with README file
- ## Create repository

## STEP 8: Clone Repository
- Copy repository URL
- Open terminal
- Execute:
        git clone repository_URL
- Navigate to project directory:
        cd project_name

## STEP 9: Open Project in IDE
- Launch IDE
- Select "Open Folder"
- Choose cloned repository directory
- Load project workspace

## STEP 10: Create Initial Project Files
- Create source code folder
- Create main program file
- Create documentation files

## STEP 11: Commit Changes
- Stage files:
            git add .
- Create commit:
            git commit -m "Initial project setup"

## STEP 12: Push Changes to GitHub
- Execute:
            git push origin main
- Verify repository update on GitHub

## STEP 13: Maintain Version Control
- Pull latest changes:
            git pull origin main
- Develop features
      Repeat:
            Add changes
            Commit changes
            Push changes
      OUTPUT:
        Fully configured IDE
        Connected GitHub repository
        Operational version control workflow
