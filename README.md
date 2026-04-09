# EveryTech AI - Premium Content Generation Platform

![EveryTech AI](https://img.shields.io/badge/EveryTech-AI%20Content%20Studio-ff6b6b)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

&gt; **Professional AI-Powered eBook & Video Course Generation Platform**
&gt; 
&gt; Create premium, branded digital content with AI-generated images, professional video production, and expert-level writing - all delivered instantly to your customers.

## 🚀 Features

### AI Content Generation
- **Premium eBooks** - 30-150 pages with professional layouts, branded with "Lucky Joy" signature
- **AI-Generated Images** - DALL-E 3 creates custom illustrations for every chapter and step
- **Professional Videos** - HD video courses with voiceover, intro/outro, and chapter breaks
- **Dynamic Pricing** - Higher prices = more content, detail, and elaboration

### Platform Capabilities
| Feature | Basic ($19-29) | Standard ($39-59) | Premium ($69-99) | Enterprise ($149+) |
|---------|---------------|-------------------|------------------|-------------------|
| Pages | 30 | 60 | 100 | 150 |
| Chapters | 5 | 8 | 12 | 15 |
| Video Length | 5 min | 15 min | 30 min | 60 min |
| AI Images | ✓ | ✓✓ | ✓✓✓ | ✓✓✓✓ |
| Step-by-Step Guides | 3/chapter | 5/chapter | 7/chapter | 10/chapter |

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **AI Services**: OpenAI GPT-4 + DALL-E 3, ElevenLabs Voice
- **Video**: FFmpeg + Custom scene generation
- **Email**: Nodemailer + Premium HTML templates
- **Payments**: Stripe Integration

## 📦 Installation

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- OpenAI API key
- ElevenLabs API key
- Gmail/Zoho email credentials

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/yourusername/everyeye.git
cd everyeye

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

Markdown
Fullscreen 
Download 
Fit
Code
Preview
Premium eBooks - 30-150 pages with professional layouts, branded with "Lucky Joy" signature
AI-Generated Images - DALL-E 3 creates custom illustrations for every chapter and step
Professional Videos - HD video courses with voiceover, intro/outro, and chapter breaks
Dynamic Pricing - Higher prices = more content, detail, and elaboration
AI Content Generation
Feature	Basic ($19-29)	Standard ($39-59)	Premium ($69-99)	Enterprise ($149+)
Pages	30	60	100	150
Chapters	5	8	12	15
Video Length	5 min	15 min	30 min	60 min
AI Images	✓	✓✓	✓✓✓	✓✓✓✓
Step-by-Step Guides	3/chapter	5/chapter	7/chapter	10/chapter
Platform Capabilities
Frontend: React 18 + TypeScript + Vite 7.2.4 + Tailwind CSS 3.4.19
UI Components: shadcn/ui (40+ components)
Backend: Node.js 20 + Express + MongoDB
AI Services: OpenAI GPT-4 + DALL-E 3, ElevenLabs Voice
Video: FFmpeg + Custom scene generation
Email: Nodemailer + Premium HTML templates
Payments: Stripe Integration
Tech Stack
🚀 Features
Node.js 20+
MongoDB Atlas account
OpenAI API key
ElevenLabs API key
Gmail/Zoho email credentials
Prerequisites
# Clone repository
git clone https://github.com/yourusername/everyeye.git
cd everyeye

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
1. Clone & Install
📦 Installation
EveryTech AI - Premium Content Generation Platform
2. Environment Setup
Server .env:
env
Copy
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# AI Services
OPENAI_API_KEY=sk-your-openai-key
ELEVENLABS_API_KEY=sk-your-elevenlabs-key
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Social Auth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
Client .env:
env
Copy
VITE_API_URL=http://localhost:5000
3. Start Development
bash
Copy
# Terminal 1 - Start Server
cd server
npm run dev

# Terminal 2 - Start Client
cd client
npm run dev
Visit: http://localhost:5173
🎨 UI Components (shadcn/ui)
This project uses shadcn/ui with 40+ pre-built components styled with Tailwind CSS:
Available Components
plain
Copy
accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb,
button-group, button, calendar, card, carousel, chart, checkbox, collapsible,
command, context-menu, dialog, drawer, dropdown-menu, empty, field, form,
hover-card, input-group, input-otp, input, item, kbd, label, menubar,
navigation-menu, pagination, popover, progress, radio-group, resizable,
scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,
spinner, switch, table, tabs, textarea, toggle-group, toggle, tooltip
Usage Example
tsx
Copy
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Email</Label>
        <Input type="email" placeholder="your@email.com" />
        <Button>Generate</Button>
      </CardContent>
    </Card>
  )
}
📁 Project Structure
plain
Copy
everyeye/
├── client/                    # React Frontend (Vite + Tailwind + shadcn)
│   ├── src/
│   │   ├── sections/          # Page sections
│   │   ├── hooks/             # Custom hooks
│   │   ├── types/             # Type definitions
│   │   ├── components/ui/     # shadcn/ui components (40+)
│   │   ├── pages/
│   │   │   ├── ContentGenerator.tsx
│   │   │   └── admin/
│   │   │       └── AdminDashboard.tsx
│   │   ├── App.css            # App-specific styles
│   │   ├── App.tsx            # Root React component
│   │   ├── index.css          # Global styles + Tailwind
│   │   └── main.tsx           # Entry point
│   ├── index.html             # HTML entry point
│   ├── tailwind.config.js     # Tailwind theme config
│   ├── vite.config.ts         # Vite build settings
│   ├── postcss.config.js      # CSS post-processing
│   └── package.json
│
└── server/                    # Node.js Backend
    ├── index.js
    ├── routes/
    │   ├── generator.js       # AI generation API
    │   └── admin.js           # Admin dashboard API
    ├── services/
    │   ├── openai.js          # GPT-4 + DALL-E
    │   ├── elevenlabs.js      # Voice generation
    │   ├── pdf.js             # PDF creation
    │   ├── video.js           # Video production
    │   └── contentEmail.js    # Email delivery
    ├── models/
    │   └── Generation.js      # MongoDB schema
    └── package.json
🎯 Usage
For Customers
Visit the content generator page
Enter email, name, and topic
Select skill level and content depth
Choose video option
Receive premium eBook + video via email in 5-10 minutes
For Admins
Access /admin to:
View all content generations
Monitor delivery status
Resend emails
Track revenue and analytics
🛠️ API Endpoints
Table
Endpoint	Method	Description
/api/generate-content	POST	Create new content generation
/api/generate-content/status/:id	GET	Check generation status
/api/downloads/:id/ebook.pdf	GET	Download generated eBook
/api/downloads/:id/video.mp4	GET	Download generated video
/api/admin/ai-generations	GET	List all generations (admin)
/api/admin/ai-dashboard	GET	View analytics (admin)
🔧 Customization
Branding
Edit server/services/ files to customize:
Author name (default: "Lucky Joy")
Brand colors (default: Coral #FF6B6B, Teal #4ECDC4)
Email templates
PDF layouts
Pricing Tiers
Modify CONTENT_TIERS in server/services/openai.js:
JavaScript
Copy
const CONTENT_TIERS = {
  basic: { pages: 30, chapters: 5, videoLength: 5 },
  standard: { pages: 60, chapters: 8, videoLength: 15 },
  premium: { pages: 100, chapters: 12, videoLength: 30 },
  enterprise: { pages: 150, chapters: 15, videoLength: 60 }
};
shadcn/ui Theme
Customize in tailwind.config.js:
JavaScript
Copy
theme: {
  extend: {
    colors: {
     