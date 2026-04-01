# ML Recommendation System – Design Flow

## Overview
This system generates product recommendations using semantic embeddings, vector normalization, approximate nearest neighbor (ANN) search, and cross-encoder re-ranking.

---

### Models Used

- Embedding Model: **all-MiniLM-L6-v2**
- Normalization Model: **My own Custom-trained model**
- Re-Ranking Model: **cross-encoder/ms-marco-MiniLM-L-6-v2**



---

## System Flow

Offline:
Products → Embedding (768d) → Normalize (384d) → Store

Online:
User Query → Embedding (768d) → Normalize (384d)
           → ANN Search (Top 250)
           → Re-Rank (Cross-Encoder)
           → Return Results



## Key Features

- Semantic search (beyond keyword matching)
- Fast retrieval using ANN
- Improved accuracy via re-ranking
- Efficient vector storage with reduced dimensions

---

## Preprocessing (Offline Phase)


### 1. Product Embedding Generation
- Generate 768-dimensional embeddings for each product
- Model: all-MiniLM-L6-v2
- Input:
  - Product title
  - Product description
- Dataset size: ~100,000 Amazon products

### 2. Embedding Normalization
- Convert 768-dim vectors → 384-dim vectors
- Use a custom-trained normalization model
- Purpose:
  - Reduce dimensionality
  - Standardize vector space

### 3. Storage
- Store normalized 384-dim vectors
- Used during real-time recommendations

---

## Recommendation Pipeline (Online Phase)

### 1. Query Embedding
- Convert user str query into a 384-dimensional vector
- Model: all-MiniLM-L6-v2
- Input:
  - User query (str)
- Output:
  - 384-dimensional vector representation of query (array[int])

### 2. Query Normalization
- Apply custom normalization model
- Input:
  - 384-dimensional vector representation of query (array[int])
- Output:
  - Normilized 384-dimensional vector representation of query (array[int])

### 3. ANN Search
- Perform approximate nearest neighbor search
- Retrieve top 250 closest product vectors

### 4. Re-Ranking
- Re-rank results using cross-encoder
- Model: cross-encoder/ms-marco-MiniLM-L-6-v2
- Scores relevance between:
  - User query
  - Product Title
- Remove Products whos relevancy score is under -6.2 threshold

### 5. Final Output
- Return top-ranked products to the user
