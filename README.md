# CampUs
An online hub and forum that encourages collaboration and communication between under-graduate students. It helps students in finding more opportunities to increase their skillset by collaborating with others and participating in various events, helps them preserve and share study resources easily and improve their overall teamwork and communication skills by engaging with the community. 

## Documentation
[SRS Document](https://github.com/user-attachments/files/27017363/CampUs_SRS_Document.pdf) (PDF)

[User Manual](https://github.com/user-attachments/files/27017423/CampUs_User_Manual.2.pdf) (PDF)

## Features
- An intuitive Registration process that supports both OCR scanning of ID cards for automatic information input as well as manual input.
- 2 Factor Authentication via email for Login.
- A Home Feed that displays posts relevant to the user based on their interests as well as the most popular posts.
- An Event Announcement Portal for announcing competitions, seminars, workshops and courses.
- A Collaboration Hub for collaborating with others for research, competition and project purposes based on the required skillset.
- A Lost and Found portal.
- A QnA forum where students can seek advice, ask questions or post helpful resources.
- A Study portal for sharing academic notes and resources for students within the same faculty/department and who are part of the same batch.
- A fully customisable User Profile that displays skills and interests alongside other information to help find like-minded individuals.
- A real-time one-on-one Messaging System
- A real-time Notifications system that supports 6 different types of notifications.

## How to use

### Visit Site
The project is currently hosted at:
https://campusbd-pearl.vercel.app/

**or**

### Manual Setup
_Manual setup requires both **git** and **Node.js** to be installed on your system._

1. Navigate to the correct directory you wish to setup the repository in either in your IDE's built-in Git terminal or in Git Bash.
2. Clone the repository using:
```
git clone https://github.com/apt-install-alvi/CampUs
```
3. Open a Node.js cmd prompt at the root directory of the repository (or use the built-in powershell terminal inside your IDE)
4. Run the project with the following command:
```
npm run dev
```
5. In a separate Node terminal(open at the same location), run the email server to recieve an OTP during the login process:
```
npm run email-server
```
Ensure you are in the root directory when running either of the above two commands and keep both terminals open when in use.
If all steps have been executed correctly, a new browser window should open at http://localhost:5173/ and land you on the Signup page.

Note that the system still works without step 5, you'll just receive a randomly generated OTP to use as a fallback instead of receiving one in your email. _This is not intended behaviour and is strictly for development._

## Tech Stack
- ReactJS + Vite
- Tailwind CSS
- TypeScript
- Node.js
- Supabase

## Additional Resources
#### Icons
https://icons8.com/icons/ 

https://lucide.dev/

#### Signup Illustrations
https://www.figma.com/community/file/1034368792791687764/playful-avatar-creator-drawkit

https://www.figma.com/community/file/1128675316324063134/30-minimal-patterns-brix-templates

#### Empty State Illustrations
https://www.figma.com/community/file/931094174831888421/empty-state-illustrations-freebies

## Contributors
#### [Alvi Binte Zamil](https://github.com/apt-install-alvi) - alvi.binte.zamil@gmail.com
- Lead front-end designer & developer
- Developer of User Profile System, Messaging System and Study Portal
- End-to-end tester

#### [Than Than Thay](https://github.com/Thay-bleh) - thanmumu13@gmail.com
- Co-frontend designer & developer
- Developer of Events Portal, User Feed and Collaboration Hub
- Lead requirements engineer

#### [Yeaser Ahmad](https://github.com/Amaterasu-u) - yeaser.007ahmad@gmail.com
- Co-frontend designer & developer
- Developer of Registration System, Login System and Lost & Found Portal
- Documentation

#### [Md. Ariful Islam](https://github.com/arifulmist) - arifulm926@gmail.com
- Co-frontend designer & developer
- Developer of Notifications System, Email server setup and co-developer of Study Portal
- Hosting and Deployment

For any bugs or suggestions, please open a new Issue and we'll get to it whenever possible.

_N.B: This is a working prototype developed with the intention to serve as a customised piece of software for educational institutes and can be modified as per the neccessity of the institute. Currently, the scope is limited to university students, specifically under-grad (may be expanded in the future), with this prototype specifically catered to students of the educational institute MIST(Military Institute of Science and Technology). For further inquiries, please mail any of the contributors and we'll get back to you shortly._
