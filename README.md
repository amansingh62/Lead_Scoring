# Lead Scoring Backend Project

A backend service that accepts Product/Offer info and a CSV of leads, then scores each lead’s buying intent (High / Medium / Low) using a rule-based logic + AI reasoning.

Built with Node.js, Express, MongoDB, and OpenAI GPT API.

**Table of Contents**

Setup

APIs

POST /offer

POST /leads/upload

POST /score

GET /results

Testing with Postman

Rule Layer Logic

AI Layer Prompt

Deployment


## Setup

Created server.js and all the routes and files and installed all the npm packages 

Saved all the keys in the environment vaiables
*MONGO_URI=your_mongo_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000*

Made the server run on Port 5000 locally

## APIs

*POST /offer*

URL: http://localhost:5000/offer

Body (JSON):

{
  "name": "AI Outreach Automation",
  "value_props": ["24/7 outreach", "6x more meetings"],
  "ideal_use_cases": ["B2B SaaS mid-market"]
}

*# Response:*

{
    "name": "AI Outreach Automation",
    "value_props": [
        "24/7 outreach",
        "6x more meetings"
    ],
    "ideal_use_cases": [
        "B2B SaaS mid-market"
    ],
    "_id": "68cbb85bdb423eb73b96d401",
    "__v": 0
}

*POST /leads/upload*

URL: http://localhost:5000/leads/upload

Body: Form-data, key=file, value=leads.csv

*CSV Columns:*
name,role,company,industry,location,linkedin_bio
Ava Patel,Head of Growth,FlowMetrics,SaaS,London,"Growth leader driving B2B SaaS marketing initiatives"
John Doe,Marketing Lead,TechSolutions,B2B SaaS,New York,"Experienced marketer helping mid-market SaaS companies scale"
Maria Lopez,VP of Sales,CloudSync,Cloud Services,San Francisco,"VP leading sales teams and enterprise client acquisition"
David Kim,Software Engineer,DataHub,AI & Analytics,Boston,"Engineer focused on AI/ML solutions for enterprise clients"
Sarah Johnson,CEO,InnovateX,FinTech,Chicago,"Founder & CEO scaling financial technology products for SMBs"

*Response:*

{
  "message": "Leads uploaded successfully",
  "count": 5
}

*POST /score*

URL: http://localhost:5000/score

Body: Empty JSON {}

*Response:*

{
  "message": "Scoring complete",
  "total": 5
}

*GET /results*

URL: http://localhost:5000/results

*Response:*

[
    {
        "_id": "68cbb3deb15f7c7c7177959d",
        "name": "Ava Patel",
        "role": "Head of Growth",
        "company": "FlowMetrics",
        "industry": "SaaS",
        "location": "London",
        "linkedin_bio": "Growth leader driving B2B SaaS marketing initiatives",
        "aiScore": 30,
        "finalScore": 60,
        "intent": "Medium",
        "reasoning": "Defaulted due to parse error",
        "ruleScore": 30
    },
    {
        "_id": "68cbb3deb15f7c7c7177959e",
        "name": "John Doe",
        "role": "Marketing Lead",
        "company": "TechSolutions",
        "industry": "B2B SaaS",
        "location": "New York",
        "linkedin_bio": "Experienced marketer helping mid-market SaaS companies scale",
        "aiScore": 30,
        "finalScore": 50,
        "intent": "Medium",
        "reasoning": "Defaulted due to parse error",
        "ruleScore": 20
    },
    {
        "_id": "68cbb3deb15f7c7c7177959f",
        "name": "Maria Lopez",
        "role": "VP of Sales",
        "company": "CloudSync",
        "industry": "Cloud Services",
        "location": "San Francisco",
        "linkedin_bio": "VP leading sales teams and enterprise client acquisition",
        "aiScore": 30,
        "finalScore": 60,
        "intent": "Medium",
        "reasoning": "Defaulted due to parse error",
        "ruleScore": 30
    },
    {
        "_id": "68cbb3deb15f7c7c717795a0",
        "name": "David Kim",
        "role": "Software Engineer",
        "company": "DataHub",
        "industry": "AI & Analytics",
        "location": "Boston",
        "linkedin_bio": "Engineer focused on AI/ML solutions for enterprise clients",
        "aiScore": 30,
        "finalScore": 50,
        "intent": "Medium",
        "reasoning": "Defaulted due to parse error",
        "ruleScore": 20
    },
    {
        "_id": "68cbb3deb15f7c7c717795a1",
        "name": "Sarah Johnson",
        "role": "CEO",
        "company": "InnovateX",
        "industry": "FinTech",
        "location": "Chicago",
        "linkedin_bio": "Founder & CEO scaling financial technology products for SMBs",
        "aiScore": 30,
        "finalScore": 60,
        "intent": "Medium",
        "reasoning": "Defaulted due to parse error",
        "ruleScore": 30
    }
]

## Rule Layer Logic

Role relevance:

Decision maker (Head, VP, CEO, Director, Manager) → +20

Influencer (Lead, Senior, Architect, Engineer) → +10

Others → 0

Industry match:

Exact ICP → +20

Adjacent / substring → +10

Else → 0

Data completeness: +10 if all fields present

Maximum rule layer score: 50

## AI Layer Prompt

Sends prospect + offer info to GPT API:
You are a sales analyst. Given the product and the prospect, classify the buying intent.

Product:
- Name: AI Outreach Automation
- Value Props: 24/7 outreach, 6x more meetings
- Ideal Use Cases: B2B SaaS mid-market

Prospect:
- Name: Ava Patel
- Role: Head of Growth
- Company: FlowMetrics
- Industry: SaaS
- Location: London
- LinkedIn Bio: "Growth leader in demand gen"

Return JSON only: {"intent":"High/Medium/Low","reason":"short explanation"}

Mapping: High=50, Medium=30, Low=10

Final score = ruleScore + aiScore (0–100)

## Deployment

Deployed backend on Render:
https://lead-scoring-xjbj.onrender.com

## Loome video- https://www.loom.com/share/ed758592e286427e9766f19bea328b6c