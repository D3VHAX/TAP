# 🐸  TAP API

Link all parts together !
## Getting Started

#### 1. Clone and Install

```bash
# Clone the repo

# Install dependencies
npm i
```

#### 3. Start API

```bash
# Run the api with
npm start
or
npm run prod
```

## 🚀 Available endpoints

```bash
GET /articles

POST /opinion { 
        articleID: number (required),
        action: "like" || "dislike" (required),
        readingTime: null || number (optionnal)
        }

```
