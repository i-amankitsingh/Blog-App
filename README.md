📝 Code Blogify – Modern Blogging Platform

🌐 Live Demo: https://code-blogify.netlify.app/

🚀 Overview

Code Blogify is a modern full-stack blogging platform built for developers and creators who want a fast, clean, and powerful writing experience.

It allows users to create, edit, and publish blogs with a rich text editor (TinyMCE) while managing authentication, images, and content seamlessly using Appwrite as a backend-as-a-service.

This project is deployed on Netlify and built with a strong focus on performance, simplicity, and scalability.

✨ Key Features
🧑‍💻 Secure user authentication (Appwrite)
✍️ Rich text blog editor powered by TinyMCE
🖼️ Image upload & storage via Appwrite
📚 Create, edit, delete blog posts
🔍 Clean blog reading experience
⚡ Fast, responsive UI with Tailwind CSS
🌐 Fully deployed on Netlify (CI/CD ready)
📱 Mobile-friendly design
🧠 What Makes It Special

Code Blogify is not just a blog app — it's a content creation system designed for real-world use cases:

Writers can focus purely on content with a distraction-free editor
Developers get a clean backend abstraction via Appwrite
Media handling is fully integrated (images + text in one flow)
Optimized for deployment in serverless environments
🛠️ Tech Stack
Frontend: React.js, Tailwind CSS
Editor: TinyMCE (Rich Text Editor)
Backend Services: Appwrite
Authentication
Database
Storage (Images)
Hosting: Netlify
Architecture: Client-side SPA (Serverless-ready)
✍️ Writing Experience

One of the core highlights of this project is the TinyMCE editor integration, which provides:

Rich formatting (headings, bold, lists, links)
Media embedding
Clean HTML output
Smooth writing experience similar to CMS platforms

This makes the platform suitable for:

Technical blogging
Personal journaling
Portfolio articles
Content publishing systems
📦 Project Structure (Simplified)
src/
 ├── components/
 ├── pages/
 ├── appwrite/
 ├── editor/
 ├── hooks/
 └── styles/
⚙️ Installation & Setup
git clone https://github.com/i-amankitsingh/Blog-App
cd code-blogify
npm install
npm run dev

Create a .env file:

VITE_APPWRITE_URL=your_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_APPWRITE_DATABASE_ID=your_database_id
🌍 Deployment

This project is deployed using Netlify with automatic CI/CD from GitHub.

Every push to the main branch triggers a new build and deployment.

🎯 Future Improvements
🧾 Markdown export/import support
💬 Comment system
❤️ Likes & reactions
👤 Author profiles
🔎 Advanced search & filters
📊 Admin dashboard
🤝 Purpose of This Project

This project was built to demonstrate:

Full-stack frontend engineering skills
Working with Backend-as-a-Service (Appwrite)
Real-world authentication + storage workflows
UI/UX design for content-heavy applications
⚡ Final Note

“A clean writing experience turns ideas into impact.”

Code Blogify is designed to make publishing simple, fast, and enjoyable.

📄 License

This project is open-source for learning and portfolio purposes.
