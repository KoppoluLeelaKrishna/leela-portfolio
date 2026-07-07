"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   AI/ML Engineer Gauntlet — an arcade-style learning quiz.
   Covers the full stack an AI/ML engineer is expected to know:
   ML foundations, deep learning, LLMs & GenAI, MLOps & data
   engineering, math & stats, and NLP / computer vision.
   Fully client-side, no backend. High score saved to localStorage.
   ────────────────────────────────────────────────────────────── */

type Difficulty = "easy" | "medium" | "hard";

type Question = {
  category: CategoryId;
  difficulty: Difficulty;
  q: string;
  options: string[];
  answer: number; // index into options
  explain: string;
};

type CategoryId =
  | "ml"
  | "dl"
  | "llm"
  | "mlops"
  | "math"
  | "nlpcv"
  | "projects"
  | "interview";

type Category = {
  id: CategoryId;
  label: string;
  icon: string;
  blurb: string;
};

const CATEGORIES: Category[] = [
  { id: "ml", label: "ML Foundations", icon: "🧠", blurb: "Supervised & unsupervised learning, overfitting, regularization, evaluation." },
  { id: "dl", label: "Deep Learning", icon: "🕸️", blurb: "Backprop, activations, CNNs, RNNs, optimizers, transformers." },
  { id: "llm", label: "LLMs & GenAI", icon: "🤖", blurb: "Attention, tokenization, RAG, embeddings, fine-tuning, prompting." },
  { id: "mlops", label: "MLOps & Data Eng", icon: "⚙️", blurb: "Pipelines, feature stores, serving, drift, monitoring, CI/CD." },
  { id: "math", label: "Math & Stats", icon: "📐", blurb: "Probability, linear algebra, loss functions, metrics." },
  { id: "nlpcv", label: "NLP & Vision", icon: "👁️", blurb: "Text representations, embeddings, convolutions, image models." },
  { id: "projects", label: "Projects & Stack", icon: "🚀", blurb: "Concepts & tools from Leela's real portfolio projects — RAG, streaming features, LLM data quality." },
  { id: "interview", label: "Interview Prep", icon: "🎯", blurb: "Classic tradeoff & scenario questions asked in real AI/ML interviews." },
];

const CATEGORY_MAP: Record<CategoryId, Category> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.id]: c }),
  {} as Record<CategoryId, Category>
);

/* ─── Question bank ─── */
const QUESTIONS: Question[] = [
  // ── ML Foundations ──
  {
    category: "ml",
    difficulty: "easy",
    q: "Which learning setup uses labeled data to predict a target?",
    options: ["Unsupervised learning", "Supervised learning", "Reinforcement learning", "Self-organizing maps"],
    answer: 1,
    explain:
      "Supervised learning trains on input–label pairs (X → y) and learns a function that maps new inputs to a known target. If y is a category it's classification; if y is a number it's regression. Unsupervised learning has no labels (it finds structure like clusters), and reinforcement learning learns from reward signals rather than fixed labels.",
  },
  {
    category: "ml",
    difficulty: "easy",
    q: "A model that scores 99% on training data but 62% on test data is most likely…",
    options: ["Underfitting", "Overfitting", "Perfectly calibrated", "Data-leaking to test"],
    answer: 1,
    explain:
      "A large train-minus-test gap is the textbook signature of overfitting: the model memorized noise and quirks of the training set instead of the underlying pattern, so it fails to generalize. Fixes: more data, regularization (L1/L2, dropout), a simpler model, early stopping, or cross-validation. Underfitting would instead show low scores on BOTH sets.",
  },
  {
    category: "ml",
    difficulty: "easy",
    q: "What does L2 (ridge) regularization add to the loss?",
    options: ["Sum of absolute weights", "Sum of squared weights", "Number of non-zero weights", "Entropy of predictions"],
    answer: 1,
    explain:
      "L2 adds λ·Σw² to the loss, penalizing large weights and shrinking them smoothly toward (but never exactly to) zero. This reduces variance and makes the model less sensitive to any single feature. The λ hyperparameter controls strength: too high underfits, too low barely regularizes.",
  },
  {
    category: "ml",
    difficulty: "medium",
    q: "L1 (lasso) regularization is preferred over L2 primarily because it…",
    options: ["Trains faster", "Produces sparse weights / feature selection", "Never overfits", "Guarantees convexity"],
    answer: 1,
    explain:
      "L1 adds λ·Σ|w|, and its constant-magnitude gradient drives some weights to become exactly zero — effectively selecting a subset of features and discarding the rest. That built-in feature selection makes the model sparser and more interpretable. L2 shrinks all weights but keeps them non-zero, so it can't zero features out.",
  },
  {
    category: "ml",
    difficulty: "medium",
    q: "In the bias–variance tradeoff, a very deep decision tree tends to have…",
    options: ["High bias, low variance", "Low bias, high variance", "High bias, high variance", "Low bias, low variance"],
    answer: 1,
    explain:
      "A deep tree can carve the feature space finely enough to fit the training data almost perfectly (low bias), but tiny changes in the data produce very different trees (high variance) — so it overfits. Bias is error from wrong assumptions (too simple); variance is sensitivity to the training sample. Pruning, max-depth limits, or averaging many trees (Random Forest) trade a little bias for a big drop in variance.",
  },
  {
    category: "ml",
    difficulty: "medium",
    q: "Why use k-fold cross-validation instead of a single train/test split?",
    options: [
      "It always increases accuracy",
      "It gives a more reliable performance estimate using all data",
      "It removes the need for a test set",
      "It prevents data leakage automatically",
    ],
    answer: 1,
    explain:
      "k-fold splits the data into k parts, trains on k−1 and validates on the held-out fold, rotating so every point is validated exactly once, then averages the scores. This lowers the variance of your performance estimate and avoids being fooled by one lucky/unlucky split. It doesn't magically raise accuracy — it just measures it more honestly. You still keep a final untouched test set for the last check.",
  },
  {
    category: "ml",
    difficulty: "hard",
    q: "Which technique reduces variance by training many models on bootstrapped samples and averaging?",
    options: ["Boosting", "Bagging", "Stacking regularization", "Label smoothing"],
    answer: 1,
    explain:
      "Bagging (Bootstrap AGGregating) trains many models in parallel on random resamples-with-replacement of the data, then averages (regression) or votes (classification). Averaging independent, high-variance learners cancels out their errors, cutting variance without raising bias much — this is exactly how Random Forests work. Contrast with boosting, which is sequential and attacks bias.",
  },
  {
    category: "ml",
    difficulty: "hard",
    q: "Gradient boosting differs from bagging because it…",
    options: [
      "Trains trees independently in parallel",
      "Fits each new model to the residual errors of the ensemble so far",
      "Only works for regression",
      "Requires no learning rate",
    ],
    answer: 1,
    explain:
      "Boosting is sequential: each new weak learner is trained to correct the residual errors the current ensemble still makes, so the ensemble steadily reduces bias. A learning rate (shrinkage) scales each tree's contribution to avoid overfitting. XGBoost, LightGBM, and CatBoost are gradient-boosting libraries. Bagging, by contrast, trains models independently to reduce variance.",
  },
  {
    category: "ml",
    difficulty: "medium",
    q: "For a heavily imbalanced fraud dataset (0.5% positives), which metric is most misleading?",
    options: ["Precision", "Recall", "Raw accuracy", "F1 score"],
    answer: 2,
    explain:
      "Predicting 'not fraud' for everyone yields 99.5% accuracy while catching zero fraud — accuracy is dominated by the majority class and hides total failure on the rare class. Prefer precision, recall, F1, or PR-AUC, which focus on the positive class. This is why 'we got 99% accuracy' is a red flag on imbalanced problems.",
  },

  // ── Deep Learning ──
  {
    category: "dl",
    difficulty: "easy",
    q: "What is the purpose of an activation function in a neural network?",
    options: [
      "To normalize the learning rate",
      "To introduce non-linearity",
      "To shuffle the training data",
      "To reduce the number of parameters",
    ],
    answer: 1,
    explain:
      "Without a non-linear activation, stacking layers just composes linear maps, which collapses into a single linear layer — no matter how deep, it could only learn straight-line relationships. Non-linear activations (ReLU, sigmoid, tanh) let the network bend and combine features to approximate complex functions. This non-linearity is what makes deep learning 'deep'.",
  },
  {
    category: "dl",
    difficulty: "easy",
    q: "Which activation outputs values in the range (0, 1)?",
    options: ["ReLU", "Sigmoid", "Tanh", "Leaky ReLU"],
    answer: 1,
    explain:
      "Sigmoid, σ(x)=1/(1+e^−x), squashes any real number into (0, 1), which is why it's used for the final layer of binary classifiers to represent a probability. Downside: it saturates for large |x| (gradients ≈ 0), causing vanishing gradients in deep nets. Tanh outputs (−1, 1); ReLU outputs [0, ∞).",
  },
  {
    category: "dl",
    difficulty: "medium",
    q: "The 'dying ReLU' problem refers to neurons that…",
    options: [
      "Explode to infinity",
      "Get stuck outputting zero and stop learning",
      "Oscillate forever",
      "Overflow in float16",
    ],
    answer: 1,
    explain:
      "ReLU outputs max(0, x), so if a neuron's input stays negative it always outputs 0 — and its gradient is also 0, meaning weight updates stop and the neuron 'dies' permanently. A too-high learning rate can push many neurons into this state. Leaky ReLU (small negative slope) or variants like ELU/GELU keep a non-zero gradient to prevent it.",
  },
  {
    category: "dl",
    difficulty: "medium",
    q: "What does backpropagation compute?",
    options: [
      "The forward activations",
      "Gradients of the loss w.r.t. each weight via the chain rule",
      "The optimal learning rate",
      "The confusion matrix",
    ],
    answer: 1,
    explain:
      "Backprop runs the chain rule backward through the computation graph to get ∂loss/∂w for every parameter — telling each weight which direction and how much to change to reduce the loss. Those gradients are then handed to an optimizer (SGD, Adam) that actually updates the weights. Backprop finds the gradients; the optimizer takes the step.",
  },
  {
    category: "dl",
    difficulty: "medium",
    q: "Dropout regularizes a network by…",
    options: [
      "Removing layers permanently",
      "Randomly zeroing activations during training",
      "Lowering the batch size",
      "Clipping gradients",
    ],
    answer: 1,
    explain:
      "During training, dropout randomly sets a fraction (e.g. 50%) of a layer's activations to zero each step, so the network can't rely on any single neuron and must learn redundant, robust features — like training an ensemble of sub-networks. At inference dropout is turned off and activations are scaled accordingly. It's a cheap, powerful cure for overfitting.",
  },
  {
    category: "dl",
    difficulty: "easy",
    q: "Batch normalization mainly helps by…",
    options: [
      "Encrypting the weights",
      "Stabilizing and speeding up training via normalized layer inputs",
      "Removing the need for data",
      "Increasing model size",
    ],
    answer: 1,
    explain:
      "BatchNorm normalizes each layer's inputs to roughly zero mean and unit variance per mini-batch (with learnable scale/shift), which smooths the loss landscape, reduces sensitivity to weight initialization, and lets you use higher learning rates. The result is faster, more stable convergence and a mild regularizing effect. LayerNorm (used in Transformers) does the same across features instead of the batch.",
  },
  {
    category: "dl",
    difficulty: "hard",
    q: "The vanishing gradient problem is most associated with…",
    options: [
      "Shallow linear models",
      "Deep networks with saturating activations like sigmoid/tanh",
      "Random forests",
      "K-means clustering",
    ],
    answer: 1,
    explain:
      "In deep nets, backprop multiplies many small derivatives together; with saturating activations (sigmoid/tanh) those derivatives are <1, so the product shrinks toward zero and early layers barely learn. Remedies: ReLU-family activations (gradient 1 for positive inputs), residual/skip connections (ResNet), careful initialization, and normalization. The opposite failure — exploding gradients — is handled with gradient clipping.",
  },
  {
    category: "dl",
    difficulty: "hard",
    q: "Adam optimizer combines which two ideas?",
    options: [
      "Dropout and weight decay",
      "Momentum and per-parameter adaptive learning rates (RMSProp)",
      "Bagging and boosting",
      "L1 and L2 penalties",
    ],
    answer: 1,
    explain:
      "Adam keeps an exponential moving average of past gradients (momentum → smooths the direction) and of squared gradients (RMSProp → gives each parameter its own adaptive step size). This makes it fast and robust with little learning-rate tuning, which is why it's the default optimizer for most deep learning. AdamW adds decoupled weight decay for better generalization.",
  },
  {
    category: "dl",
    difficulty: "medium",
    q: "A CNN's convolutional layers are effective on images because they…",
    options: [
      "Use fully connected weights everywhere",
      "Exploit local spatial patterns with shared weights (translation invariance)",
      "Require no training",
      "Only work in grayscale",
    ],
    answer: 1,
    explain:
      "A convolution slides a small filter across the image, reusing the same weights everywhere — so a feature (edge, texture) is detected wherever it appears (translation invariance) using far fewer parameters than a dense layer. Early layers learn edges; deeper layers compose them into shapes and objects. Weight sharing + locality is what makes CNNs data-efficient on images.",
  },

  // ── LLMs & GenAI ──
  {
    category: "llm",
    difficulty: "easy",
    q: "What is the core mechanism of the Transformer architecture?",
    options: ["Recurrence", "Convolution", "Self-attention", "Pooling"],
    answer: 2,
    explain:
      "Self-attention lets every token directly attend to (weigh) every other token in the sequence, capturing long-range dependencies in a single step and in parallel — unlike RNNs, which process tokens one at a time and struggle with long contexts. This parallelism is why Transformers scale to huge models and datasets. The 2017 paper was aptly titled 'Attention Is All You Need'.",
  },
  {
    category: "llm",
    difficulty: "easy",
    q: "In an LLM, 'tokens' are…",
    options: [
      "Security keys",
      "Sub-word units the model reads and predicts",
      "Individual pixels",
      "Neurons in the final layer",
    ],
    answer: 1,
    explain:
      "A tokenizer (e.g. BPE) splits text into sub-word pieces — common words may be one token, rare words several — and the model predicts the next token given all previous ones. Tokens matter practically: context windows, latency, and API pricing are all measured in tokens (~4 characters / ~0.75 words each in English).",
  },
  {
    category: "llm",
    difficulty: "medium",
    q: "Raising the sampling 'temperature' during generation…",
    options: [
      "Makes output more deterministic",
      "Increases randomness/diversity of output",
      "Shortens the context window",
      "Disables the tokenizer",
    ],
    answer: 1,
    explain:
      "Temperature divides the logits before softmax: higher temperature flattens the probability distribution so lower-ranked tokens get sampled more often — more creative and varied, but more error-prone. Temperature 0 (greedy) is deterministic and best for factual/structured tasks; ~0.7–1.0 suits brainstorming. top-p (nucleus) sampling is a related knob that caps the cumulative probability mass considered.",
  },
  {
    category: "llm",
    difficulty: "medium",
    q: "In Retrieval-Augmented Generation (RAG), the retrieval step exists to…",
    options: [
      "Fine-tune the model weights",
      "Fetch relevant external context to ground the answer",
      "Compress the prompt",
      "Reduce GPU memory",
    ],
    answer: 1,
    explain:
      "RAG embeds the user query, retrieves the most relevant chunks from a knowledge base (usually via vector search), and injects them into the prompt so the model answers from real, up-to-date sources instead of its frozen training memory. This reduces hallucination, enables citations, and lets you update knowledge by changing documents — no retraining. It's the go-to pattern for enterprise Q&A over private data.",
  },
  {
    category: "llm",
    difficulty: "medium",
    q: "A vector database enables semantic search by storing…",
    options: [
      "Raw text only",
      "Embeddings and finding nearest neighbors by distance",
      "SQL indexes on keywords",
      "Model checkpoints",
    ],
    answer: 1,
    explain:
      "Text (or images) is converted into high-dimensional embedding vectors where similar meanings sit close together, and the DB uses approximate nearest-neighbor (ANN) indexes to find the closest vectors fast. Unlike keyword search, it matches meaning — 'car' can retrieve 'automobile'. Pinecone, Weaviate, FAISS, and pgvector are common implementations powering RAG.",
  },
  {
    category: "llm",
    difficulty: "hard",
    q: "LoRA makes fine-tuning cheaper by…",
    options: [
      "Retraining all weights at low precision",
      "Learning small low-rank adapter matrices while freezing base weights",
      "Deleting attention heads",
      "Using more data",
    ],
    answer: 1,
    explain:
      "LoRA (Low-Rank Adaptation) freezes the original weights and injects small trainable low-rank matrices (A·B) into layers, so you train a tiny fraction of parameters — cutting memory and cost by orders of magnitude while nearly matching full fine-tuning. Adapters are small and swappable per task, and QLoRA adds 4-bit quantization to fine-tune large models on a single GPU. It's the dominant parameter-efficient fine-tuning (PEFT) method.",
  },
  {
    category: "llm",
    difficulty: "hard",
    q: "In scaled dot-product attention, why divide the scores by √(d_k)?",
    options: [
      "To normalize the batch",
      "To keep dot products from growing large and saturating softmax",
      "To add positional info",
      "To enforce sparsity",
    ],
    answer: 1,
    explain:
      "For large key dimension d_k, the dot products query·key grow in magnitude, pushing softmax into a region where one value dominates and gradients vanish. Dividing by √(d_k) rescales the scores to unit-ish variance, keeping softmax well-behaved and training stable. The full formula: softmax(QKᵀ/√d_k)·V.",
  },
  {
    category: "llm",
    difficulty: "medium",
    q: "'Hallucination' in an LLM refers to output that is…",
    options: [
      "Grammatically wrong",
      "Fluent and confident but factually false/unsupported",
      "Too short",
      "In the wrong language",
    ],
    answer: 1,
    explain:
      "A hallucination is a plausible-sounding, confidently stated fabrication — invented facts, citations, or APIs — because the model optimizes for likely text, not truth. Mitigations: ground answers with RAG and require citations, lower temperature, ask the model to say 'I don't know', and add verification/eval steps. It's the #1 reliability concern when shipping LLM features.",
  },
  {
    category: "llm",
    difficulty: "easy",
    q: "Why do Transformers need positional encodings?",
    options: [
      "To compress the model",
      "Because self-attention alone is order-agnostic",
      "To reduce vocabulary size",
      "To speed up the GPU",
    ],
    answer: 1,
    explain:
      "Self-attention treats the input as an unordered set — it has no built-in sense of which token came first — so 'dog bites man' and 'man bites dog' would look identical without help. Positional encodings (sinusoidal, learned, or rotary/RoPE) add order information to each token's representation. RoPE is now standard in modern LLMs because it generalizes well to longer contexts.",
  },
  {
    category: "llm",
    difficulty: "hard",
    q: "RLHF (Reinforcement Learning from Human Feedback) is primarily used to…",
    options: [
      "Pretrain on raw web text",
      "Align model outputs with human preferences using a reward model",
      "Quantize the weights",
      "Build the tokenizer",
    ],
    answer: 1,
    explain:
      "After pretraining and supervised fine-tuning, RLHF collects human rankings of model responses, trains a reward model to predict those preferences, then optimizes the LLM (often via PPO) to maximize that reward — making it more helpful, honest, and harmless. It's the step that turned raw language models into usable assistants. DPO is a newer, simpler alternative that skips the separate reward model.",
  },

  // ── MLOps & Data Engineering ──
  {
    category: "mlops",
    difficulty: "easy",
    q: "A feature store exists mainly to…",
    options: [
      "Store trained model binaries",
      "Serve consistent features for both training and inference",
      "Replace the data warehouse",
      "Host dashboards",
    ],
    answer: 1,
    explain:
      "A feature store centralizes feature definitions and computation so the exact same logic feeds offline training and online (real-time) serving — eliminating train/serve skew. It also provides an offline store for historical training data and a low-latency online store (e.g. Redis) for inference. Feast and Tecton are common examples.",
  },
  {
    category: "mlops",
    difficulty: "medium",
    q: "'Training–serving skew' happens when…",
    options: [
      "The model is too large",
      "Feature computation differs between training and production",
      "The learning rate is too high",
      "The GPU runs out of memory",
    ],
    answer: 1,
    explain:
      "If a feature is computed one way in the training pipeline (e.g. batch SQL) and a subtly different way in production (e.g. streaming code), the model sees a different input distribution at inference and silently underperforms. It's a top cause of 'great offline, bad online' models. Sharing one feature-computation path (a feature store) is the standard fix.",
  },
  {
    category: "mlops",
    difficulty: "medium",
    q: "Data drift refers to…",
    options: [
      "Model weights changing during training",
      "The input data distribution shifting over time vs. training data",
      "Disk latency",
      "A bug in the tokenizer",
    ],
    answer: 1,
    explain:
      "Data (covariate) drift is when the distribution of incoming features P(X) moves away from what the model trained on — e.g. new user demographics or seasonal changes — quietly degrading accuracy even though the model itself is unchanged. You detect it by monitoring feature distributions (PSI, KL divergence) and trigger retraining. It's distinct from concept drift, where the input→output relationship changes.",
  },
  {
    category: "mlops",
    difficulty: "hard",
    q: "Concept drift specifically means…",
    options: [
      "The input features change",
      "The relationship between inputs and the target changes",
      "The schema changes",
      "The model file corrupts",
    ],
    answer: 1,
    explain:
      "Concept drift is a change in P(y|X) — the mapping from inputs to target evolves — so the same input should now yield a different label. Example: spammers change tactics, so features that once meant 'spam' no longer do. Even with identical input distributions, the model's learned rule goes stale, requiring relabeling and retraining. Monitor prediction quality against ground truth to catch it.",
  },
  {
    category: "mlops",
    difficulty: "medium",
    q: "A shadow deployment lets you…",
    options: [
      "Serve a new model to real traffic without exposing its outputs to users",
      "Encrypt the model",
      "Skip testing",
      "Train faster",
    ],
    answer: 0,
    explain:
      "In a shadow (dark) deployment the candidate model receives a copy of live production traffic and its predictions are logged and compared, but users only ever see the current model's output. This validates latency and quality on real data with zero user risk before promotion. Contrast with canary (small % of real users see the new model) and A/B tests (measure business impact).",
  },
  {
    category: "mlops",
    difficulty: "easy",
    q: "In a batch ETL pipeline, orchestrators like Airflow are used to…",
    options: [
      "Render the UI",
      "Schedule and manage task dependencies (DAGs)",
      "Train neural nets",
      "Serve REST endpoints",
    ],
    answer: 1,
    explain:
      "Airflow models a workflow as a DAG (directed acyclic graph) of tasks and handles scheduling, dependency ordering, retries, backfills, and alerting — so step B only runs after step A succeeds. It orchestrates work (calling Spark, dbt, warehouses) rather than doing the heavy compute itself. Dagster and Prefect are modern alternatives.",
  },
  {
    category: "mlops",
    difficulty: "hard",
    q: "Why is idempotency important in data pipelines?",
    options: [
      "It makes jobs run faster",
      "Re-running a task produces the same result without duplicates/corruption",
      "It reduces model size",
      "It encrypts the data",
    ],
    answer: 1,
    explain:
      "An idempotent task yields the same end state whether it runs once or five times, so after a failure you can safely retry or backfill without creating duplicate rows or double-counting. Achieve it with techniques like upserts/MERGE on a key, overwriting a partition, or dedup on ingest. It's foundational to reliable, self-healing pipelines.",
  },
  {
    category: "mlops",
    difficulty: "medium",
    q: "Model registry tools (e.g. MLflow) primarily provide…",
    options: [
      "Real-time inference",
      "Versioning, staging, and lineage for trained models",
      "Feature computation",
      "Data labeling",
    ],
    answer: 1,
    explain:
      "A model registry tracks each model version with its metrics, parameters, and artifacts, manages stage transitions (Staging → Production → Archived), and records lineage so deployments are reproducible and auditable. It's the source of truth for 'which model is in prod and how was it made'. This underpins rollbacks, approvals, and governance in an MLOps stack.",
  },
  {
    category: "mlops",
    difficulty: "medium",
    q: "A canary release reduces risk by…",
    options: [
      "Deploying to 100% of users at once",
      "Routing a small % of traffic to the new version first",
      "Skipping rollback",
      "Disabling monitoring",
    ],
    answer: 1,
    explain:
      "A canary sends a small slice of real traffic (say 5%) to the new version while you watch error rates, latency, and metrics; if healthy you ramp up gradually, and if not you roll back with minimal blast radius. It limits the impact of a bad release compared to flipping everyone at once. The name comes from 'canary in a coal mine'.",
  },

  // ── Math & Stats ──
  {
    category: "math",
    difficulty: "easy",
    q: "Cross-entropy loss is the standard choice for…",
    options: ["Regression", "Multi-class classification", "Clustering", "Dimensionality reduction"],
    answer: 1,
    explain:
      "Cross-entropy measures the divergence between the predicted probability distribution and the true one-hot label, heavily penalizing confident wrong answers — ideal for classification with a softmax output. For regression you'd use MSE/MAE instead. Minimizing cross-entropy is equivalent to maximum-likelihood estimation of the correct class.",
  },
  {
    category: "math",
    difficulty: "easy",
    q: "Which metric is a distance, so lower is better, for regression?",
    options: ["R²", "Accuracy", "RMSE", "AUC"],
    answer: 2,
    explain:
      "RMSE (root mean squared error) is the square root of the average squared error, in the same units as the target, so smaller means predictions are closer to truth. Because it squares errors, it punishes large mistakes more than MAE (mean absolute error) does. R², by contrast, is a goodness-of-fit score where higher (up to 1) is better.",
  },
  {
    category: "math",
    difficulty: "medium",
    q: "Precision is defined as…",
    options: [
      "TP / (TP + FN)",
      "TP / (TP + FP)",
      "TN / (TN + FP)",
      "(TP + TN) / total",
    ],
    answer: 1,
    explain:
      "Precision = TP / (TP + FP): of everything the model flagged positive, what fraction was actually positive — it answers 'when it says yes, how often is it right?'. Recall = TP / (TP + FN) answers 'of all real positives, how many did we catch?'. Optimize precision when false positives are costly (spam filters), recall when false negatives are costly (cancer screening).",
  },
  {
    category: "math",
    difficulty: "medium",
    q: "ROC-AUC measures a classifier's ability to…",
    options: [
      "Minimize training time",
      "Rank positives above negatives across all thresholds",
      "Reduce variance",
      "Compress features",
    ],
    answer: 1,
    explain:
      "AUC is the probability that a randomly chosen positive is scored higher than a randomly chosen negative — a threshold-independent measure of ranking quality (0.5 = random, 1.0 = perfect). It's handy for comparing models, but on heavily imbalanced data PR-AUC (precision–recall) is often more informative because ROC-AUC can look optimistic.",
  },
  {
    category: "math",
    difficulty: "hard",
    q: "The softmax function converts a vector of logits into…",
    options: [
      "A single scalar",
      "A probability distribution summing to 1",
      "A binary mask",
      "An orthogonal basis",
    ],
    answer: 1,
    explain:
      "Softmax exponentiates each logit and normalizes by the sum, producing positive values that add to 1 — usable as class probabilities, with the largest logit getting the largest share. It's the standard output layer for multi-class classification and the normalization inside attention. Implementations subtract the max logit first for numerical stability.",
  },
  {
    category: "math",
    difficulty: "hard",
    q: "The 'curse of dimensionality' means that as dimensions grow…",
    options: [
      "Data becomes denser",
      "Data becomes sparse and distances lose meaning",
      "Models train faster",
      "Overfitting disappears",
    ],
    answer: 1,
    explain:
      "As dimensions increase, the volume of the space explodes, points spread out, and nearest vs. farthest distances converge — so distance-based methods (kNN, clustering) degrade and you need exponentially more data to cover the space. Remedies include dimensionality reduction (PCA), feature selection, and embeddings. It's a core reason high-dimensional problems demand either lots of data or strong structure.",
  },
  {
    category: "math",
    difficulty: "medium",
    q: "Gradient descent updates parameters in the direction of…",
    options: [
      "The positive gradient",
      "The negative gradient of the loss",
      "A random vector",
      "The largest weight",
    ],
    answer: 1,
    explain:
      "The gradient points toward steepest increase of the loss, so you step in the opposite (negative) direction to go downhill: w ← w − η·∇L, where η is the learning rate. Too large an η overshoots or diverges; too small crawls. SGD uses mini-batches for noisy but fast, scalable updates.",
  },
  {
    category: "math",
    difficulty: "easy",
    q: "Principal Component Analysis (PCA) is used for…",
    options: [
      "Increasing dimensions",
      "Linear dimensionality reduction along directions of max variance",
      "Classification only",
      "Text tokenization",
    ],
    answer: 1,
    explain:
      "PCA finds orthogonal directions (principal components) that capture the most variance and projects the data onto the top few, compressing features while retaining most of the signal. It's used for visualization, denoising, and speeding up downstream models. Note it's unsupervised and linear — for non-linear structure, t-SNE/UMAP or autoencoders work better.",
  },

  // ── NLP & Vision ──
  {
    category: "nlpcv",
    difficulty: "easy",
    q: "Word embeddings like Word2Vec represent words as…",
    options: [
      "One-hot vectors",
      "Dense vectors where similar meanings are close",
      "Random hashes",
      "ASCII codes",
    ],
    answer: 1,
    explain:
      "Embeddings map each word to a dense continuous vector learned so that words used in similar contexts land near each other — turning meaning into geometry (famously, king − man + woman ≈ queen). This beats sparse one-hot vectors, which are huge and treat every word as equally different. Modern models use contextual embeddings (BERT) where a word's vector depends on its sentence.",
  },
  {
    category: "nlpcv",
    difficulty: "medium",
    q: "TF-IDF weights a term higher when it is…",
    options: [
      "Common in every document",
      "Frequent in one document but rare across the corpus",
      "A stop word",
      "The longest word",
    ],
    answer: 1,
    explain:
      "TF-IDF = term frequency × inverse document frequency: a word scores high if it appears often in one document (TF) but rarely across the whole corpus (IDF), surfacing distinctive, informative terms while down-weighting ubiquitous words like 'the'. It's a fast, interpretable baseline for search and text classification before reaching for embeddings.",
  },
  {
    category: "nlpcv",
    difficulty: "medium",
    q: "In a CNN, a pooling layer (e.g. max pooling) mainly…",
    options: [
      "Adds parameters",
      "Downsamples feature maps for translation robustness and efficiency",
      "Normalizes gradients",
      "Tokenizes input",
    ],
    answer: 1,
    explain:
      "Max pooling slides a window and keeps only the strongest activation, shrinking the feature map's spatial size — this cuts computation, enlarges the receptive field, and adds small-shift invariance (a feature still registers if it moves a pixel). It has no learnable parameters. Some modern architectures replace it with strided convolutions.",
  },
  {
    category: "nlpcv",
    difficulty: "hard",
    q: "Named Entity Recognition (NER) is best described as a…",
    options: [
      "Regression task",
      "Sequence-labeling / token classification task",
      "Clustering task",
      "Image segmentation task",
    ],
    answer: 1,
    explain:
      "NER assigns each token an entity tag (Person, Organization, Location, Date…), typically with a BIO scheme (Begin/Inside/Outside) to mark spans — making it token-level classification over a sequence. Classic models used CRFs/BiLSTMs; today fine-tuned Transformers like BERT dominate. It powers information extraction, search, and redaction.",
  },
  {
    category: "nlpcv",
    difficulty: "hard",
    q: "Cosine similarity is preferred over Euclidean distance for embeddings because it…",
    options: [
      "Is faster to store",
      "Compares orientation (angle), ignoring vector magnitude",
      "Requires no normalization",
      "Only works in 2D",
    ],
    answer: 1,
    explain:
      "Cosine similarity measures the angle between two vectors, so it captures semantic direction regardless of length — useful because embedding magnitude often reflects word frequency or document length rather than meaning. Two texts about the same topic score high even if one is much longer. It's the default similarity in most vector search / RAG systems.",
  },
  {
    category: "nlpcv",
    difficulty: "easy",
    q: "Transfer learning in vision typically means…",
    options: [
      "Training from scratch every time",
      "Reusing a pretrained backbone and fine-tuning on your task",
      "Copying labels",
      "Using only synthetic data",
    ],
    answer: 1,
    explain:
      "You take a network pretrained on a large dataset (e.g. ImageNet), which has already learned general features like edges and textures, and fine-tune it on your smaller task-specific dataset — often freezing early layers. This needs far less data and compute and usually beats training from scratch. It's the default approach in applied CV and NLP.",
  },
  {
    category: "nlpcv",
    difficulty: "medium",
    q: "Data augmentation for images (flips, crops, color jitter) helps by…",
    options: [
      "Shrinking the model",
      "Expanding effective training variety to improve generalization",
      "Removing the need for a GPU",
      "Speeding up inference",
    ],
    answer: 1,
    explain:
      "Augmentation applies label-preserving transformations (flips, rotations, crops, color/brightness shifts) to create new plausible variations, so the model sees more diversity and learns invariances instead of memorizing exact pixels — reducing overfitting when data is limited. It's applied only at training time. Mixup, Cutout, and RandAugment are stronger modern variants.",
  },


  // ── ML Foundations (expansion) ──
  {
    category: "ml",
    difficulty: "easy",
    q: "Unsupervised learning is best described as…",
    options: [
      "Learning from labeled examples",
      "Finding structure in data without labels",
      "Learning from rewards and penalties",
      "Copying a teacher model",
    ],
    answer: 1,
    explain:
      "Unsupervised learning discovers patterns in unlabeled data — grouping similar points (clustering, e.g. K-means) or compressing features (PCA). There's no target y to predict; the goal is structure itself. Common uses: customer segmentation, anomaly detection, and pre-processing before a supervised model.",
  },
  {
    category: "ml",
    difficulty: "easy",
    q: "In the k-Nearest Neighbors (kNN) algorithm, 'k' is…",
    options: [
      "The number of features",
      "The number of nearest points that vote on the prediction",
      "The learning rate",
      "The number of classes",
    ],
    answer: 1,
    explain:
      "kNN classifies a new point by looking at its k closest training points and taking a majority vote (or average for regression). Small k is sensitive to noise (high variance); large k over-smooths (high bias). It's a lazy, non-parametric method — no training step, but slow at prediction on big datasets.",
  },
  {
    category: "ml",
    difficulty: "easy",
    q: "A confusion matrix is used to…",
    options: [
      "Tune the learning rate",
      "Break down predictions into TP, FP, FN, and TN counts",
      "Reduce dimensions",
      "Store model weights",
    ],
    answer: 1,
    explain:
      "A confusion matrix tabulates true positives, false positives, false negatives, and true negatives, giving a full picture of where a classifier succeeds and fails. From it you compute precision, recall, F1, and accuracy. It's far more informative than a single accuracy number, especially on imbalanced data.",
  },
  {
    category: "ml",
    difficulty: "medium",
    q: "Why does feature scaling (standardization) matter for models like SVM, kNN, and neural nets?",
    options: [
      "It adds more features",
      "These methods use distances/gradients, so unscaled features with large ranges dominate",
      "It removes outliers automatically",
      "Tree models require it most",
    ],
    answer: 1,
    explain:
      "Distance- and gradient-based models treat a feature ranging 0–100000 as far more important than one ranging 0–1 simply because of scale. Standardizing (mean 0, std 1) or min-max scaling puts features on equal footing, speeding convergence and improving accuracy. Tree-based models (Random Forest, XGBoost) are scale-invariant and don't need it.",
  },
  {
    category: "ml",
    difficulty: "medium",
    q: "One-hot encoding a categorical feature is preferred over integer-encoding when…",
    options: [
      "The categories have a true numeric order",
      "The categories are unordered, to avoid implying a false ranking",
      "You want fewer columns",
      "The model is a decision tree",
    ],
    answer: 1,
    explain:
      "Integer-encoding an unordered category (red=0, green=1, blue=2) falsely tells the model blue > green > red, which linear/distance models will exploit incorrectly. One-hot creates a separate 0/1 column per category, removing the fake ordinality. The tradeoff is dimensionality — for high-cardinality features, target or embedding encodings scale better.",
  },
  {
    category: "ml",
    difficulty: "hard",
    q: "Random Forest decorrelates its trees (beyond bagging) by…",
    options: [
      "Using the same features for every split",
      "Considering only a random subset of features at each split",
      "Training on the full dataset each time",
      "Pruning every tree to depth 1",
    ],
    answer: 1,
    explain:
      "On top of bagging (bootstrap samples), Random Forest picks a random subset of features to consider at each split, so trees don't all key on the same dominant feature. Less-correlated trees mean their averaged prediction cancels more variance — the core reason RF beats plain bagged trees. Fewer features per split = more decorrelation but slightly higher individual-tree bias.",
  },
  {
    category: "ml",
    difficulty: "hard",
    q: "The 'No Free Lunch' theorem implies that…",
    options: [
      "Deep learning always wins",
      "No single algorithm is best across all possible problems",
      "More data never helps",
      "Regularization is unnecessary",
    ],
    answer: 1,
    explain:
      "Averaged over all possible problems, every algorithm performs the same — so there's no universally best model; performance depends on matching the algorithm's assumptions to your data. Practically, this is why you try multiple models and validate empirically rather than assuming one is always superior. It also justifies domain knowledge and feature engineering.",
  },
  {
    category: "ml",
    difficulty: "hard",
    q: "The SVM 'kernel trick' allows a linear classifier to…",
    options: [
      "Train without any data",
      "Learn non-linear boundaries by implicitly mapping to a higher-dimensional space",
      "Skip the optimization step",
      "Reduce features to one dimension",
    ],
    answer: 1,
    explain:
      "A kernel (RBF, polynomial) computes dot products in a high-dimensional space without ever building the coordinates explicitly, letting an SVM draw a linear boundary there that's non-linear back in the original space. This makes SVMs powerful on complex, low-to-medium-sized datasets. The choice of kernel and its parameters (e.g. RBF's γ) is a key tuning decision.",
  },
  {
    category: "ml",
    difficulty: "medium",
    q: "Setting class_weight='balanced' in a classifier helps because it…",
    options: [
      "Deletes majority-class rows",
      "Penalizes errors on the minority class more heavily in the loss",
      "Adds synthetic samples",
      "Increases the learning rate",
    ],
    answer: 1,
    explain:
      "Class weighting scales each class's contribution to the loss inversely to its frequency, so mistakes on the rare class cost more and the model stops ignoring it. It's a simple, data-free alternative to resampling (SMOTE/undersampling) for imbalance. Pair it with threshold tuning and PR-AUC to actually measure the improvement.",
  },

  // ── Deep Learning (expansion) ──
  {
    category: "dl",
    difficulty: "easy",
    q: "In neural network training, one 'epoch' is…",
    options: [
      "One weight update",
      "One full pass over the entire training dataset",
      "One layer's forward pass",
      "One mini-batch",
    ],
    answer: 1,
    explain:
      "An epoch is one complete sweep through all training examples; with mini-batch training, each epoch contains many gradient updates (one per batch). You typically train for multiple epochs, watching validation loss to decide when to stop. Too few epochs underfit; too many can overfit.",
  },
  {
    category: "dl",
    difficulty: "easy",
    q: "A loss (cost) function measures…",
    options: [
      "The model's speed",
      "How far the model's predictions are from the true targets",
      "The number of parameters",
      "The GPU temperature",
    ],
    answer: 1,
    explain:
      "The loss quantifies prediction error (e.g. MSE for regression, cross-entropy for classification), and training works by minimizing it via gradient descent. It's the single scalar the optimizer pushes downhill. Choosing a loss that matches your task and error costs is a core modeling decision.",
  },
  {
    category: "dl",
    difficulty: "easy",
    q: "The learning rate hyperparameter controls…",
    options: [
      "The number of layers",
      "The size of each weight-update step",
      "The batch size",
      "The activation function",
    ],
    answer: 1,
    explain:
      "The learning rate η scales how big a step the optimizer takes down the gradient. Too high overshoots or diverges; too low trains painfully slowly or gets stuck. It's often the single most important hyperparameter — schedules (warmup, decay) and adaptive optimizers like Adam help manage it.",
  },
  {
    category: "dl",
    difficulty: "medium",
    q: "Good weight initialization (He/Xavier) matters because…",
    options: [
      "It sets the labels",
      "Poor init makes signals/gradients vanish or explode, stalling training",
      "It replaces the optimizer",
      "It only affects the last layer",
    ],
    answer: 1,
    explain:
      "If initial weights are too small or too large, activations and gradients shrink or blow up as they propagate through layers, so the network trains slowly or not at all. Xavier/Glorot (for tanh/sigmoid) and He init (for ReLU) scale initial weights by layer size to keep variance stable. Combined with normalization, it makes deep nets trainable.",
  },
  {
    category: "dl",
    difficulty: "medium",
    q: "Mini-batch gradient descent is usually preferred over full-batch because it…",
    options: [
      "Always finds the global minimum",
      "Updates more frequently and fits in memory, with useful gradient noise",
      "Needs no learning rate",
      "Ignores most of the data",
    ],
    answer: 1,
    explain:
      "Mini-batches (e.g. 32–512 examples) give frequent, memory-friendly updates and inject helpful stochastic noise that can escape sharp minima and generalize better, while being far faster than computing gradients over the whole dataset each step. Batch size trades off gradient noise vs. hardware efficiency. It's the standard for training deep nets.",
  },
  {
    category: "dl",
    difficulty: "hard",
    q: "Residual (skip) connections in ResNets primarily help by…",
    options: [
      "Reducing the number of layers",
      "Giving gradients a shortcut path, enabling very deep networks to train",
      "Removing the need for activations",
      "Encrypting the features",
    ],
    answer: 1,
    explain:
      "A residual block computes F(x)+x, so gradients can flow directly through the identity shortcut, sidestepping the vanishing-gradient problem and letting networks go 100+ layers deep. It also makes it easy for a block to learn an identity mapping when extra depth isn't needed. This idea underpins ResNets and appears in Transformer blocks too.",
  },
  {
    category: "dl",
    difficulty: "hard",
    q: "Gradient clipping is mainly used to prevent…",
    options: [
      "Underfitting",
      "Exploding gradients, especially in RNNs",
      "Slow inference",
      "Overfitting to the test set",
    ],
    answer: 1,
    explain:
      "Gradient clipping caps the gradient's norm (or value) before the weight update, stopping rare huge gradients — common in RNNs/deep nets — from blowing the weights up into NaNs. It stabilizes training without changing the gradient's direction. It's the standard remedy for exploding gradients, the mirror image of vanishing gradients.",
  },
  {
    category: "dl",
    difficulty: "hard",
    q: "LayerNorm (used in Transformers) differs from BatchNorm because it normalizes across…",
    options: [
      "The batch dimension",
      "The features of each individual sample, independent of batch size",
      "The learning rate",
      "The output classes",
    ],
    answer: 1,
    explain:
      "LayerNorm normalizes across a single sample's features, so it doesn't depend on other examples in the batch — ideal for variable-length sequences and small/□batch-1 inference where BatchNorm's batch statistics break down. That batch-independence is why Transformers use it. BatchNorm, by contrast, normalizes each feature across the batch.",
  },
  {
    category: "dl",
    difficulty: "medium",
    q: "An autoencoder learns useful representations by…",
    options: [
      "Predicting labels from images",
      "Compressing input to a bottleneck and reconstructing it",
      "Classifying text",
      "Playing a game for rewards",
    ],
    answer: 1,
    explain:
      "An autoencoder is trained (unsupervised) to reproduce its own input through a narrow bottleneck, forcing it to learn a compressed encoding that captures the data's essential structure. The bottleneck codes are useful for dimensionality reduction, denoising, and anomaly detection (high reconstruction error = anomaly). Variational autoencoders (VAEs) extend this to generation.",
  },

  // ── LLMs & GenAI (expansion) ──
  {
    category: "llm",
    difficulty: "easy",
    q: "In prompting, a 'prompt' is…",
    options: [
      "The model's internal weights",
      "The input text/instructions you give the model",
      "The tokenizer",
      "The GPU driver",
    ],
    answer: 1,
    explain:
      "The prompt is the text you feed the model — instructions, context, examples, and the question — and it heavily shapes the output. Prompt engineering is the practice of structuring it well (clear task, constraints, examples, output format). For chat models it's split into system, user, and assistant roles.",
  },
  {
    category: "llm",
    difficulty: "easy",
    q: "An LLM's 'context window' is…",
    options: [
      "The screen resolution",
      "The maximum number of tokens it can consider at once",
      "The training set size",
      "The number of layers",
    ],
    answer: 1,
    explain:
      "The context window caps how many tokens (prompt + generated output) the model can attend to in a single call — exceed it and earlier text is truncated or must be summarized. It bounds how much document/history you can include, which is why RAG chunks and retrieves rather than pasting everything. Larger windows cost more compute and money per call.",
  },
  {
    category: "llm",
    difficulty: "easy",
    q: "'Zero-shot' prompting means…",
    options: [
      "Fine-tuning on zero data",
      "Asking the model to do a task with no examples in the prompt",
      "Setting temperature to zero",
      "Using zero tokens",
    ],
    answer: 1,
    explain:
      "Zero-shot means you describe the task and ask directly, without providing worked examples, relying on the model's pretrained knowledge. Few-shot adds a handful of examples to steer format and behavior. Zero-shot is simplest and cheapest; few-shot often improves accuracy on tricky or format-specific tasks.",
  },
  {
    category: "llm",
    difficulty: "medium",
    q: "Few-shot prompting improves results by…",
    options: [
      "Retraining the model",
      "Including a few input–output examples in the prompt to demonstrate the task",
      "Lowering the context window",
      "Removing the system prompt",
    ],
    answer: 1,
    explain:
      "Few-shot (in-context learning) puts 2–5 examples of the desired input→output in the prompt, so the model infers the pattern, format, and tone without any weight updates. It's powerful for consistent formatting and edge cases. Downsides: it consumes context tokens and results can be sensitive to example choice and order.",
  },
  {
    category: "llm",
    difficulty: "medium",
    q: "top-p (nucleus) sampling chooses the next token from…",
    options: [
      "The single most likely token always",
      "The smallest set of tokens whose cumulative probability ≥ p",
      "A fixed list of 50 tokens",
      "Random tokens uniformly",
    ],
    answer: 1,
    explain:
      "top-p keeps only the most probable tokens that together make up probability mass p (e.g. 0.9) and samples from that dynamic 'nucleus', discarding the unlikely long tail. It adapts the candidate set to the model's confidence, unlike top-k's fixed count. Combined with temperature, it balances coherence and diversity.",
  },
  {
    category: "llm",
    difficulty: "hard",
    q: "Chain-of-thought (CoT) prompting improves reasoning tasks by…",
    options: [
      "Making answers shorter",
      "Prompting the model to produce intermediate reasoning steps before the answer",
      "Increasing the vocabulary",
      "Disabling attention",
    ],
    answer: 1,
    explain:
      "Asking the model to 'think step by step' lets it externalize intermediate reasoning, which markedly improves accuracy on math, logic, and multi-step problems versus jumping straight to an answer. It works because computation is spread across more tokens. Variants include self-consistency (sample several chains and vote) and tool-augmented reasoning.",
  },
  {
    category: "llm",
    difficulty: "hard",
    q: "The KV cache speeds up autoregressive LLM generation by…",
    options: [
      "Storing the training data",
      "Caching past tokens' key/value tensors so they aren't recomputed each step",
      "Compressing the vocabulary",
      "Skipping the softmax",
    ],
    answer: 1,
    explain:
      "During generation, each new token would normally re-attend over all previous tokens; the KV cache stores the keys and values already computed so only the new token's attention is calculated, turning quadratic re-computation into incremental work. This dramatically cuts latency for long outputs. The tradeoff is memory — the cache grows with sequence length.",
  },
  {
    category: "llm",
    difficulty: "hard",
    q: "Quantizing an LLM to int8/4-bit reduces its size and cost by…",
    options: [
      "Deleting layers",
      "Storing weights at lower numeric precision",
      "Removing the tokenizer",
      "Training on less data",
    ],
    answer: 1,
    explain:
      "Quantization represents weights (and sometimes activations) with fewer bits — e.g. 4-bit instead of 16-bit — shrinking memory ~4× and speeding inference, letting big models run on smaller GPUs. Modern methods (GPTQ, AWQ, bitsandbytes) keep accuracy loss small. QLoRA even fine-tunes on top of a 4-bit frozen base.",
  },
  {
    category: "llm",
    difficulty: "medium",
    q: "In a RAG system, why is a document typically split into 'chunks'?",
    options: [
      "To delete duplicates",
      "So retrieval returns focused, relevant passages that fit the context window",
      "To train the embedding model",
      "To increase hallucination",
    ],
    answer: 1,
    explain:
      "Chunking breaks long documents into passages (often a few hundred tokens with overlap) so vector search can pinpoint the specific relevant section and only that fits into the prompt's context budget. Chunk size is a tradeoff: too large dilutes relevance and wastes tokens, too small loses context. Good chunking is one of the biggest levers on RAG quality.",
  },

  // ── MLOps & Data Engineering (expansion) ──
  {
    category: "mlops",
    difficulty: "easy",
    q: "In ML, 'inference' refers to…",
    options: [
      "Training the model",
      "Using a trained model to make predictions on new data",
      "Labeling the dataset",
      "Cleaning the data",
    ],
    answer: 1,
    explain:
      "Inference is the serving/prediction phase — the trained model takes new inputs and outputs predictions, ideally with low latency and high throughput. It's distinct from training (learning the weights). Production concerns shift to latency, cost, scaling, and monitoring rather than accuracy on a fixed test set.",
  },
  {
    category: "mlops",
    difficulty: "easy",
    q: "Containerizing an ML service with Docker mainly helps by…",
    options: [
      "Making the model more accurate",
      "Packaging code + dependencies so it runs the same everywhere",
      "Removing the need for a model",
      "Encrypting predictions",
    ],
    answer: 1,
    explain:
      "A container bundles your code, libraries, and runtime into a reproducible image, eliminating 'works on my machine' issues between dev, CI, and production. It's the standard unit for deploying and scaling services (often via Kubernetes). This reproducibility is foundational to reliable MLOps.",
  },
  {
    category: "mlops",
    difficulty: "easy",
    q: "The difference between batch and online (real-time) inference is that online inference…",
    options: [
      "Runs once a year",
      "Serves predictions on demand, per request, with low latency",
      "Never uses a model",
      "Only works offline",
    ],
    answer: 1,
    explain:
      "Online inference responds to individual requests in real time (e.g. a fraud check at checkout), demanding low latency and high availability. Batch inference scores large sets on a schedule (e.g. nightly churn scores), optimizing throughput over latency. The choice drives your architecture, feature freshness, and infra costs.",
  },
  {
    category: "mlops",
    difficulty: "easy",
    q: "CI/CD in an MLOps pipeline automates…",
    options: [
      "Only writing documentation",
      "Testing, building, and deploying code/models on each change",
      "Manual data labeling",
      "Choosing the learning rate",
    ],
    answer: 1,
    explain:
      "Continuous Integration/Continuous Delivery runs automated tests and checks on every commit and then packages and ships the artifact, so changes reach production quickly and safely. In ML it extends to data validation, model tests, and sometimes automated retraining/deployment (CT — continuous training). It reduces manual error and shortens iteration cycles.",
  },
  {
    category: "mlops",
    difficulty: "hard",
    q: "Blue-green deployment differs from a canary release because it…",
    options: [
      "Sends 1% of traffic to the new version",
      "Keeps two full environments and switches all traffic at once (with instant rollback)",
      "Never allows rollback",
      "Only works for batch jobs",
    ],
    answer: 1,
    explain:
      "Blue-green runs two complete environments — current (blue) and new (green) — and flips all traffic to green once it's verified, enabling instant rollback by flipping back. Canary instead ramps a small traffic percentage gradually. Blue-green gives clean, fast cutover; canary gives finer-grained risk control. Both beat an in-place replace.",
  },
  {
    category: "mlops",
    difficulty: "hard",
    q: "Tracking data/feature lineage answers the question…",
    options: [
      "What GPU was used",
      "Where each dataset came from and how it was transformed into features",
      "How warm the server is",
      "Which user is logged in",
    ],
    answer: 1,
    explain:
      "Lineage records the path from raw sources through each transformation to the features and models that consumed them, so you can trace a bad prediction back to its data, reproduce results, and assess the blast radius of an upstream change. It's essential for debugging, audits, and compliance. Tools like OpenLineage and dbt's DAG capture it.",
  },
  {
    category: "mlops",
    difficulty: "hard",
    q: "In production, what most reliably signals it's time to retrain a model?",
    options: [
      "The calendar says Monday",
      "Monitored metrics show performance decay or significant data/concept drift",
      "The model file is large",
      "A new GPU is available",
    ],
    answer: 1,
    explain:
      "Retraining should be triggered by evidence — declining live accuracy (once labels arrive), rising error, or drift detectors firing — not a fixed schedule that either wastes compute or reacts too late. Automate the trigger off your monitoring signals. Fixed-cadence retraining can still be a baseline, but drift-/metric-driven retraining is more efficient and responsive.",
  },
  {
    category: "mlops",
    difficulty: "medium",
    q: "Why keep the exact model version, code, and data snapshot for each deployed model?",
    options: [
      "To make files bigger",
      "For reproducibility, debugging, rollback, and audit",
      "It's required by the GPU",
      "To increase accuracy automatically",
    ],
    answer: 1,
    explain:
      "Pinning the model artifact, training code, and data (or its snapshot/hash) lets you reproduce a result exactly, roll back a bad release, and answer 'why did the model do that?' during audits or incidents. Without it, production issues become guesswork. This is the core promise of a model registry plus data/version control (e.g. DVC).",
  },

  // ── Math & Stats (expansion) ──
  {
    category: "math",
    difficulty: "easy",
    q: "Compared with the mean, the median is more robust to…",
    options: [
      "Small datasets",
      "Outliers / extreme values",
      "Categorical data",
      "Missing labels",
    ],
    answer: 1,
    explain:
      "The median (middle value) barely moves when a few extreme values are added, while the mean gets dragged toward them. That's why median income/house price is reported instead of mean on skewed distributions. Knowing when to use each — and that skew pulls the mean toward the tail — is a common analytics check.",
  },
  {
    category: "math",
    difficulty: "easy",
    q: "Variance (or standard deviation) of a dataset measures…",
    options: [
      "The central value",
      "How spread out the values are around the mean",
      "The number of samples",
      "The correlation between features",
    ],
    answer: 1,
    explain:
      "Variance is the average squared distance from the mean; standard deviation is its square root, in the data's own units. High variance means values are widely dispersed. It underpins normalization, confidence intervals, and the bias–variance tradeoff.",
  },
  {
    category: "math",
    difficulty: "easy",
    q: "A valid probability value must lie…",
    options: [
      "Between -1 and 1",
      "Between 0 and 1 inclusive",
      "Above 1",
      "Only at 0 or 1",
    ],
    answer: 1,
    explain:
      "Probabilities range from 0 (impossible) to 1 (certain), and the probabilities of all mutually exclusive outcomes sum to 1. Classifier outputs like softmax obey this. If a 'probability' falls outside [0,1] or a distribution doesn't sum to 1, something's wrong with the model or normalization.",
  },
  {
    category: "math",
    difficulty: "medium",
    q: "The F1 score is the…",
    options: [
      "Arithmetic mean of precision and recall",
      "Harmonic mean of precision and recall",
      "Sum of precision and recall",
      "Difference of precision and recall",
    ],
    answer: 1,
    explain:
      "F1 = 2·(precision·recall)/(precision+recall), the harmonic mean, which stays low unless BOTH precision and recall are decent — it punishes a lopsided model. That makes it a good single metric for imbalanced classification. When false positives and false negatives have different costs, use Fβ to weight recall vs precision.",
  },
  {
    category: "math",
    difficulty: "medium",
    q: "R² (coefficient of determination) represents…",
    options: [
      "The average error in units of y",
      "The proportion of variance in the target explained by the model",
      "The number of features",
      "The classification accuracy",
    ],
    answer: 1,
    explain:
      "R² is the fraction of the target's variance the model accounts for: 1.0 is perfect, 0 means no better than predicting the mean, and it can go negative for a bad model. It's unitless, aiding comparison, but doesn't tell you error magnitude — pair it with RMSE/MAE. Adjusted R² penalizes adding useless features.",
  },
  {
    category: "math",
    difficulty: "medium",
    q: "MAE (mean absolute error) differs from MSE (mean squared error) in that MAE…",
    options: [
      "Squares the errors",
      "Is more robust to outliers because it doesn't square errors",
      "Can only be negative",
      "Ignores the sign but also the magnitude",
    ],
    answer: 1,
    explain:
      "MAE averages the absolute errors, treating all misses proportionally, so a few large outliers influence it less than MSE, which squares errors and so heavily penalizes big misses. Choose MSE when large errors are especially bad; choose MAE when you want robustness to outliers. RMSE is MSE's square root, back in the target's units.",
  },
  {
    category: "math",
    difficulty: "hard",
    q: "The bias–variance decomposition splits a model's expected error into…",
    options: [
      "Precision + recall",
      "Bias² + variance + irreducible noise",
      "Training + test error",
      "Mean + median",
    ],
    answer: 1,
    explain:
      "Expected test error = bias² (error from wrong assumptions/underfitting) + variance (sensitivity to the training sample/overfitting) + irreducible noise you can't remove. Reducing one often raises the other, so the art is balancing them. This framework guides whether to add capacity/features (cut bias) or more data/regularization (cut variance).",
  },
  {
    category: "math",
    difficulty: "hard",
    q: "Maximum Likelihood Estimation (MLE) chooses parameters that…",
    options: [
      "Minimize the number of parameters",
      "Maximize the probability of the observed data under the model",
      "Maximize the learning rate",
      "Minimize the prior",
    ],
    answer: 1,
    explain:
      "MLE finds the parameters θ that make the observed data most probable, i.e. maximize the likelihood (usually the log-likelihood for numerical stability). Minimizing cross-entropy or MSE is equivalent to MLE under the right noise assumptions. Adding a prior turns it into MAP (maximum a posteriori) estimation.",
  },
  {
    category: "math",
    difficulty: "hard",
    q: "Bayes' theorem lets you compute the posterior P(A|B) from…",
    options: [
      "Only the prior P(A)",
      "The likelihood P(B|A), the prior P(A), and the evidence P(B)",
      "The learning rate",
      "The confusion matrix",
    ],
    answer: 1,
    explain:
      "Bayes' theorem: P(A|B) = P(B|A)·P(A) / P(B) — it updates a prior belief with new evidence to get a posterior. It underlies Naive Bayes classifiers, Bayesian inference, and probabilistic reasoning. A classic trap: a rare condition with an imperfect test yields a low posterior despite a positive result, because the low prior dominates.",
  },

  // ── NLP & Vision (expansion) ──
  {
    category: "nlpcv",
    difficulty: "easy",
    q: "Tokenization in NLP is the process of…",
    options: [
      "Encrypting text",
      "Splitting text into smaller units (words or sub-words)",
      "Translating languages",
      "Removing all punctuation permanently",
    ],
    answer: 1,
    explain:
      "Tokenization breaks raw text into the units a model processes — words, sub-words (BPE/WordPiece), or characters. It's the first step in almost every NLP pipeline and determines vocabulary size and how rare/unknown words are handled. Sub-word tokenization is standard in modern LLMs because it balances vocabulary size and coverage.",
  },
  {
    category: "nlpcv",
    difficulty: "easy",
    q: "'Stop words' are…",
    options: [
      "Misspelled words",
      "Very common words (the, is, a) often removed in classic NLP",
      "The last word of a sentence",
      "Rare technical terms",
    ],
    answer: 1,
    explain:
      "Stop words are high-frequency, low-information words that traditional pipelines (search, TF-IDF, bag-of-words) often strip to reduce noise and dimensionality. Modern Transformer models usually keep them, since context and function words carry meaning for attention. Whether to remove them depends on the method and task.",
  },
  {
    category: "nlpcv",
    difficulty: "easy",
    q: "Stemming and lemmatization both aim to…",
    options: [
      "Translate text",
      "Reduce words to a common base/root form",
      "Add synonyms",
      "Count characters",
    ],
    answer: 1,
    explain:
      "Both normalize word variants so 'running', 'ran', 'runs' collapse toward a shared form, shrinking vocabulary and helping match related words. Stemming chops crudely (running→run, studies→studi), while lemmatization uses linguistic rules to produce real words (studies→study). They're classic preprocessing; sub-word tokenizers make them less necessary for LLMs.",
  },
  {
    category: "nlpcv",
    difficulty: "easy",
    q: "A bag-of-words representation ignores…",
    options: [
      "The words themselves",
      "Word order and grammar",
      "The document length",
      "The vocabulary",
    ],
    answer: 1,
    explain:
      "Bag-of-words represents text as word counts/frequencies, discarding order and syntax — 'dog bites man' and 'man bites dog' look identical. It's simple and effective for many classification tasks but loses meaning that depends on sequence. Embeddings and Transformers were developed precisely to capture that lost order and context.",
  },
  {
    category: "nlpcv",
    difficulty: "medium",
    q: "BERT is pretrained primarily using…",
    options: [
      "Next-word (causal) prediction only",
      "Masked language modeling — predicting randomly hidden tokens from both sides",
      "Image reconstruction",
      "Reinforcement learning",
    ],
    answer: 1,
    explain:
      "BERT masks ~15% of tokens and trains the model to predict them using left AND right context, making it bidirectional — great for understanding tasks like classification, NER, and QA. This differs from GPT-style causal models that predict the next token left-to-right for generation. The pretraining objective shapes what each model is good at.",
  },
  {
    category: "nlpcv",
    difficulty: "medium",
    q: "Compared with image classification, object detection additionally outputs…",
    options: [
      "Only the image caption",
      "Bounding-box locations for each detected object",
      "The image resolution",
      "The file format",
    ],
    answer: 1,
    explain:
      "Classification assigns one label to the whole image; object detection localizes and labels multiple objects, drawing bounding boxes (e.g. YOLO, Faster R-CNN). Detection is evaluated with IoU-based metrics like mAP. Semantic/instance segmentation goes further, labeling at the pixel level.",
  },
  {
    category: "nlpcv",
    difficulty: "medium",
    q: "An embedding layer in a neural network converts…",
    options: [
      "Images into text",
      "Discrete token IDs into learnable dense vectors",
      "Probabilities into logits",
      "Gradients into weights",
    ],
    answer: 1,
    explain:
      "An embedding layer is a lookup table mapping each token ID to a trainable dense vector, learned jointly with the task so similar tokens get similar vectors. It replaces sparse one-hot inputs with compact, meaningful representations. The same idea powers categorical embeddings for tabular features and item embeddings in recommenders.",
  },
  {
    category: "nlpcv",
    difficulty: "hard",
    q: "Semantic segmentation assigns a class label to…",
    options: [
      "The whole image only",
      "Every individual pixel",
      "Each sentence",
      "One bounding box per image",
    ],
    answer: 1,
    explain:
      "Semantic segmentation classifies each pixel (road, car, sky), producing a dense mask — crucial for autonomous driving and medical imaging. Architectures like U-Net and DeepLab use encoder–decoder structures with skip connections to keep spatial detail. Instance segmentation adds separating individual objects of the same class.",
  },
  {
    category: "nlpcv",
    difficulty: "hard",
    q: "Intersection over Union (IoU) measures…",
    options: [
      "Model training speed",
      "The overlap between a predicted region/box and the ground truth",
      "The number of classes",
      "The embedding dimension",
    ],
    answer: 1,
    explain:
      "IoU = area of overlap / area of union between the predicted and true box or mask, ranging 0 (no overlap) to 1 (perfect). A threshold (e.g. IoU ≥ 0.5) decides whether a detection counts as correct, feeding metrics like mAP. It's the standard yardstick in detection and segmentation.",
  },
  {
    category: "nlpcv",
    difficulty: "hard",
    q: "Contrastive learning (e.g. CLIP) trains representations by…",
    options: [
      "Predicting the next word",
      "Pulling matched pairs together and pushing mismatched pairs apart in embedding space",
      "Reconstructing the input pixel by pixel",
      "Clustering with K-means",
    ],
    answer: 1,
    explain:
      "Contrastive methods learn an embedding space where related items (an image and its caption, or two augmentations of one image) are close and unrelated items are far apart, using losses like InfoNCE. CLIP does this over image–text pairs, enabling zero-shot classification by comparing embeddings. It's a powerful self-supervised approach that scales with unlabeled/weakly-labeled data.",
  },

  // ── Projects & Stack (from Leela's portfolio case studies) ──
  {
    category: "projects",
    difficulty: "easy",
    q: "In the AI-Powered Data Intelligence Pipeline, what role does Pinecone play?",
    options: [
      "A workflow scheduler",
      "A vector store that indexes embeddings for semantic search",
      "A relational database for transactions",
      "A dashboard tool",
    ],
    answer: 1,
    explain:
      "Pinecone is a managed vector database: the pipeline generates embeddings (via the OpenAI API) for documents and structured data, indexes them in Pinecone, and runs nearest-neighbor search to retrieve semantically relevant context for the RAG query layer. It's what turns 'find similar meaning' into a fast lookup. Alternatives include Weaviate, FAISS, and pgvector.",
  },
  {
    category: "projects",
    difficulty: "easy",
    q: "In the RAG pipeline, LangChain is used to…",
    options: [
      "Train a CNN",
      "Orchestrate the query layer that routes questions to the vector store and synthesizes grounded answers",
      "Schedule nightly ETL",
      "Store raw files",
    ],
    answer: 1,
    explain:
      "LangChain wires together the retrieval-and-generation flow: it takes a user question, retrieves relevant chunks from the vector store, builds the prompt, and calls the LLM to produce a grounded, context-aware answer. It provides the glue (retrievers, chains, prompt templates) so you don't hand-code each step. This enabled self-serve document Q&A and cut ad-hoc analyst requests.",
  },
  {
    category: "projects",
    difficulty: "easy",
    q: "Across the projects, Snowflake primarily serves as…",
    options: [
      "A message queue",
      "A cloud data warehouse holding analytics-ready and offline training data",
      "A GPU cluster",
      "A front-end framework",
    ],
    answer: 1,
    explain:
      "Snowflake is the cloud data warehouse where curated, analytics-ready datasets (and, in the ML platform, offline training features) live alongside traditional reporting tables. It integrates with the AWS S3 and pipeline layers so AI outputs stay accessible to existing BI. Warehouses like Snowflake/BigQuery/Redshift are the backbone of enterprise analytics.",
  },
  {
    category: "projects",
    difficulty: "medium",
    q: "In the Real-Time ML Feature Engineering Platform, why is Redis used for online serving?",
    options: [
      "It trains the model",
      "It's an in-memory store giving sub-millisecond feature lookups at inference time",
      "It orchestrates DAGs",
      "It stores embeddings for search",
    ],
    answer: 1,
    explain:
      "Redis is an in-memory key-value store, so online models can fetch the latest computed features with sub-millisecond latency — essential for real-time fraud and personalization scoring. The platform pairs it with Snowflake as the offline store for training, a classic feature-store split. This cut feature-serving latency from 4-hour batch cycles to under 2 seconds.",
  },
  {
    category: "projects",
    difficulty: "medium",
    q: "The feature platform uses Kafka + PySpark Structured Streaming to…",
    options: [
      "Render BI dashboards",
      "Compute windowed/aggregation ML features from live event streams with sub-second latency",
      "Fine-tune an LLM",
      "Store model checkpoints",
    ],
    answer: 1,
    explain:
      "Kafka ingests production event streams and PySpark Structured Streaming computes rolling aggregations and window-based features on them in near real time, so models see fresh signals instead of hours-stale batch features. Streaming compute is what makes low-latency features possible. Schema-registry validation guards type/range constraints before features reach serving.",
  },
  {
    category: "projects",
    difficulty: "medium",
    q: "In the feature platform, what does MLflow track?",
    options: [
      "User passwords",
      "Feature versions and lineage for model reproducibility",
      "Network traffic",
      "CSS styles",
    ],
    answer: 1,
    explain:
      "MLflow records feature versions, parameters, metrics, and lineage so a model's inputs are reproducible and auditable — you can tie a prediction back to the exact feature definitions that produced it. It's central to reproducibility and governance in an MLOps stack. MLflow also offers a model registry for staging and deployment.",
  },
  {
    category: "projects",
    difficulty: "medium",
    q: "The LLM-Powered Data Quality engine exposes its checks through…",
    options: [
      "A Kafka topic",
      "A FastAPI service that returns anomaly flags, plain-English explanations, and fixes",
      "A Spark job only",
      "A spreadsheet",
    ],
    answer: 1,
    explain:
      "A FastAPI endpoint lets pipelines submit a dataset sample and receive structured anomaly flags plus natural-language explanations and suggested remediations generated with the Claude API. FastAPI is a fast, typed Python web framework ideal for such ML microservices. Airflow triggers these scans post-transform, making AI-driven validation a standard checkpoint.",
  },
  {
    category: "projects",
    difficulty: "hard",
    q: "In the data-quality engine, how is the Claude API applied?",
    options: [
      "To replace the database",
      "To profile datasets, detect statistical/semantic anomalies, and generate natural-language quality reports",
      "To render charts",
      "To compress files",
    ],
    answer: 1,
    explain:
      "The Claude API inspects new datasets, flags statistical and contextual anomalies that rigid rules miss, and writes plain-English reports engineers can act on immediately. It even proposes dbt tests and Great Expectations rules from column distributions, cutting manual rule authoring. This augments — not replaces — traditional validation with contextual, explainable checks.",
  },
  {
    category: "projects",
    difficulty: "hard",
    q: "Why deploy the data-quality service on AWS Lambda with Airflow triggering scans?",
    options: [
      "Lambda trains deep nets fastest",
      "Serverless scales on demand and runs only when Airflow triggers a post-transform scan — cost-efficient and event-driven",
      "Lambda stores the warehouse",
      "It removes the need for the model",
    ],
    answer: 1,
    explain:
      "AWS Lambda is serverless: it runs the quality-check function only when invoked (here, when Airflow fires a post-transform scan), scaling automatically and billing per execution rather than for idle servers. This fits spiky, event-driven validation workloads well. Airflow provides the orchestration and dependency ordering so scans run at the right pipeline stage.",
  },
  {
    category: "projects",
    difficulty: "hard",
    q: "In the RAG pipeline, why orchestrate ingestion, chunking, embedding, and refresh with Airflow?",
    options: [
      "To serve the web UI",
      "To schedule and manage dependencies so the vector store stays in sync with upstream source updates",
      "To lower embedding dimensions",
      "To replace Pinecone",
    ],
    answer: 1,
    explain:
      "Airflow models the ingest→chunk→embed→index refresh as a scheduled DAG with dependency ordering and retries, so the vector store is kept current with source changes on defined intervals instead of drifting stale. Orchestration is what makes a RAG system maintainable in production. Stale embeddings are a top cause of RAG answers going out of date.",
  },
  {
    category: "projects",
    difficulty: "medium",
    q: "In the AWS analytics pipelines, PySpark and Databricks are used mainly to…",
    options: [
      "Serve real-time REST APIs",
      "Run distributed ETL transformations on large enterprise datasets",
      "Store dashboards",
      "Tokenize text for an LLM",
    ],
    answer: 1,
    explain:
      "PySpark (often on Databricks) distributes transformation work across a cluster, letting the pipeline process large structured and semi-structured datasets that wouldn't fit on one machine. It prepares analytics-ready tables for downstream reporting on recurring refresh cycles. Spark is the workhorse for big-data ETL in enterprise data engineering.",
  },
  {
    category: "projects",
    difficulty: "easy",
    q: "Great Expectations and dbt tests in the projects are used to…",
    options: [
      "Deploy models",
      "Automatically validate data quality (types, ranges, freshness) in the pipeline",
      "Generate embeddings",
      "Balance GPU load",
    ],
    answer: 1,
    explain:
      "Great Expectations defines and runs data-quality assertions (not-null, ranges, uniqueness, freshness) and dbt tests validate transformations in the warehouse, catching bad data before it reaches reports or models. The LLM engine even suggests these rules automatically. Automated data validation is what keeps pipelines trustworthy.",
  },

  {
    category: "projects",
    difficulty: "easy",
    q: "Across the pipelines, AWS S3 is used as…",
    options: [
      "A model training framework",
      "Scalable object storage / data-lake landing zone for raw and processed data",
      "A vector database",
      "A dashboard tool",
    ],
    answer: 1,
    explain:
      "S3 is durable, scalable object storage that acts as the data lake — raw ingests land there and processed/AI-ready outputs are staged alongside warehouse tables. It integrates with Spark, Snowflake, and Lambda across the projects. Object storage decoupled from compute is a foundational cloud data-engineering pattern.",
  },
  {
    category: "projects",
    difficulty: "easy",
    q: "In the RAG pipeline, the OpenAI API is called to…",
    options: [
      "Schedule DAGs",
      "Generate embeddings for documents and data so they can be indexed for semantic search",
      "Store the vectors",
      "Balance server load",
    ],
    answer: 1,
    explain:
      "The pipeline uses the OpenAI API's embedding models to turn text/records into vectors that capture meaning, which are then indexed in Pinecone for nearest-neighbor retrieval. Embeddings are the bridge between raw content and semantic search. The same embedding model must be used at index and query time for results to be comparable.",
  },
  {
    category: "projects",
    difficulty: "hard",
    q: "Why does the streaming feature platform keep BOTH an offline (Snowflake) and online (Redis) store?",
    options: [
      "For redundancy only",
      "Offline serves historical training data; online serves low-latency features — using one source prevents train/serve skew",
      "Redis trains the model",
      "Snowflake is faster than Redis at inference",
    ],
    answer: 1,
    explain:
      "The offline store (Snowflake) holds full history for training and backfills; the online store (Redis) serves the freshest feature values with sub-ms latency for inference. Computing both from the same feature definitions is what prevents training–serving skew. This offline/online split is the defining architecture of a feature store.",
  },
  {
    category: "projects",
    difficulty: "hard",
    q: "In the streaming platform, schema-registry validation at ingestion ensures…",
    options: [
      "Faster GPUs",
      "Features meet type and range constraints before reaching the serving layer",
      "The model retrains itself",
      "Lower embedding dimensions",
    ],
    answer: 1,
    explain:
      "A schema registry enforces the expected structure, types, and ranges of streaming events so malformed or drifting data is caught at ingestion rather than silently corrupting features the model consumes. It's a data-contract guardrail for real-time pipelines. Combined with quality checks, it keeps online features trustworthy.",
  },
  {
    category: "projects",
    difficulty: "medium",
    q: "A recurring theme across the projects is integrating AI/ML with existing infrastructure rather than replacing it. Why?",
    options: [
      "To make migration harder",
      "So AI-ready outputs stay accessible alongside proven reporting/warehouse systems, lowering risk and adoption cost",
      "Because AI can't use cloud storage",
      "To avoid using Python",
    ],
    answer: 1,
    explain:
      "Bolting AI onto established S3/Snowflake/Airflow foundations means new capabilities (RAG, real-time features, LLM validation) coexist with trusted BI and pipelines — reducing risk, reuse cost, and organizational friction. Enterprises rarely rip-and-replace; incremental, interoperable AI adoption is what actually ships. It also keeps a fallback path if a new component misbehaves.",
  },
  // ── Broader coverage: Reinforcement Learning, Time Series, Recommenders (ML) ──
  {
    category: "ml",
    difficulty: "easy",
    q: "Reinforcement learning trains an agent to…",
    options: [
      "Predict labels from a fixed dataset",
      "Take actions in an environment to maximize cumulative reward",
      "Cluster unlabeled data",
      "Reduce dimensionality",
    ],
    answer: 1,
    explain:
      "In RL an agent observes a state, takes an action, and receives a reward, learning a policy that maximizes long-term (cumulative, often discounted) reward through trial and error. It powers game-playing, robotics, and RLHF for LLMs. Key ideas: exploration vs. exploitation, value functions, and the Markov Decision Process framing.",
  },
  {
    category: "ml",
    difficulty: "medium",
    q: "A key rule when validating a time-series forecasting model is…",
    options: [
      "Shuffle the data randomly before splitting",
      "Split by time (train on past, test on future) to avoid look-ahead leakage",
      "Use the future to predict the past",
      "Ignore seasonality",
    ],
    answer: 1,
    explain:
      "Time-series data is ordered, so you must train on earlier periods and validate on later ones (forward-chaining / rolling-origin CV); random shuffling leaks future information into training and inflates scores. Also account for trend, seasonality, and autocorrelation. Classic models: ARIMA and Prophet; modern ones use gradient boosting or sequence models.",
  },
  {
    category: "ml",
    difficulty: "medium",
    q: "Collaborative filtering in recommender systems makes suggestions based on…",
    options: [
      "Only the item's text description",
      "Patterns in user–item interactions ('users like you also liked…')",
      "Random sampling",
      "The server's clock",
    ],
    answer: 1,
    explain:
      "Collaborative filtering learns from the user–item interaction matrix — recommending items that similar users engaged with — often via matrix factorization or embeddings, without needing item content. Content-based filtering instead uses item features; hybrid systems combine both. The cold-start problem (new users/items with no history) is its main challenge.",
  },
  {
    category: "ml",
    difficulty: "hard",
    q: "Why is XGBoost/LightGBM often the go-to for tabular data problems?",
    options: [
      "It needs no data",
      "Gradient-boosted trees capture non-linear feature interactions with strong accuracy, speed, and little scaling",
      "It only works on images",
      "It requires a GPU always",
    ],
    answer: 1,
    explain:
      "Gradient-boosted decision trees model complex non-linear interactions, handle mixed feature types, are robust to unscaled inputs and outliers, and include built-in regularization — routinely winning on structured/tabular data where deep nets underperform. They're fast and give feature importances too. Tuning learning rate, depth, and estimators is the main effort.",
  },

  // ── Broader coverage: Generative models (DL) ──
  {
    category: "dl",
    difficulty: "medium",
    q: "A Generative Adversarial Network (GAN) trains two networks that…",
    options: [
      "Both classify images",
      "Compete: a generator makes fakes while a discriminator tries to spot them",
      "Cluster data",
      "Translate languages",
    ],
    answer: 1,
    explain:
      "A GAN pits a generator (creates synthetic samples) against a discriminator (distinguishes real from fake); as they compete, the generator learns to produce increasingly realistic outputs. It excels at image synthesis but can be unstable to train (mode collapse). Diffusion models have since overtaken GANs for many state-of-the-art generation tasks.",
  },
  {
    category: "dl",
    difficulty: "hard",
    q: "Diffusion models (e.g. Stable Diffusion) generate images by…",
    options: [
      "Retrieving images from a database",
      "Learning to reverse a gradual noising process — denoising random noise into an image",
      "Averaging training images",
      "Running a single forward pass with no steps",
    ],
    answer: 1,
    explain:
      "Diffusion models are trained to reverse a process that progressively adds noise to images; at generation time they start from pure noise and iteratively denoise, guided (e.g. by a text prompt) toward a coherent image. They produce high-quality, diverse outputs and train more stably than GANs. The tradeoff is slower, multi-step sampling.",
  },
  {
    category: "dl",
    difficulty: "medium",
    q: "In a fairness/bias audit, a model can be biased even with high accuracy when it…",
    options: [
      "Uses too few parameters",
      "Performs much worse for certain demographic subgroups",
      "Trains too quickly",
      "Has a small learning rate",
    ],
    answer: 1,
    explain:
      "Aggregate accuracy can hide disparate performance across subgroups — a model may be accurate overall yet systematically worse for a protected group, causing real harm. Responsible AI evaluates sliced/subgroup metrics and fairness criteria (demographic parity, equalized odds), and mitigates via reweighting, data collection, or constraints. Bias often traces back to skewed training data.",
  },

  // ── Broader coverage: Agents & LLM applications (LLM) ──
  {
    category: "llm",
    difficulty: "medium",
    q: "An 'LLM agent' differs from a plain chatbot because it…",
    options: [
      "Can't use any tools",
      "Plans and calls external tools/APIs in a loop to accomplish multi-step goals",
      "Only returns one word",
      "Never uses a prompt",
    ],
    answer: 1,
    explain:
      "An agent uses the LLM as a reasoning engine that decides which tools to call (search, code, databases, APIs), observes results, and iterates until a goal is met — enabling multi-step tasks a single response can't. Patterns include ReAct (reason+act) and tool/function calling. Guardrails, step limits, and evaluation are essential to keep agents reliable.",
  },
  {
    category: "llm",
    difficulty: "hard",
    q: "'Function calling' (tool use) lets an LLM…",
    options: [
      "Rewrite its own weights",
      "Return a structured request to invoke a defined function, which your code executes and feeds back",
      "Skip the tokenizer",
      "Train faster",
    ],
    answer: 1,
    explain:
      "With function/tool calling, you describe available functions (name, params as JSON schema) and the model, instead of guessing, emits a structured call your application runs — then the result is returned to the model to continue. This bridges LLMs to real systems (databases, calculators, APIs) reliably. It's the backbone of agents and grounded, action-taking assistants.",
  },
  {
    category: "llm",
    difficulty: "medium",
    q: "How do you best evaluate an LLM application's answer quality at scale?",
    options: [
      "Only read a few by hand and hope",
      "Build an eval set with graded criteria, using automated metrics and LLM-as-judge, plus human spot-checks",
      "Trust training accuracy",
      "Measure GPU temperature",
    ],
    answer: 1,
    explain:
      "Because outputs are open-ended, you curate a representative eval set with clear rubrics and combine automated scoring (exact-match/BLEU where applicable, or an LLM-as-judge grading against criteria) with periodic human review. This makes quality measurable and regressions catchable across prompt/model changes. Grounding checks and citation coverage help catch hallucinations.",
  },
  // ── Interview Prep ──
  {
    category: "interview",
    difficulty: "medium",
    q: "Interviewer: 'Your model has high bias. What does that tell you and what would you do?'",
    options: [
      "It's overfitting — add regularization",
      "It's underfitting — use a more complex model or better features",
      "The data is imbalanced — resample",
      "The learning rate is too low — nothing to change",
    ],
    answer: 1,
    explain:
      "High bias = underfitting: the model is too simple to capture the pattern, so it does poorly on BOTH train and test sets. Fixes: a more expressive model, more/better features, less regularization, or training longer. High VARIANCE would be the opposite (great on train, poor on test) and calls for more data or regularization. Naming which one you see — and the matching fix — is what interviewers want.",
  },
  {
    category: "interview",
    difficulty: "medium",
    q: "You must choose between precision and recall for a cancer-screening model. Which do you favor, and why?",
    options: [
      "Precision — false alarms are the main cost",
      "Recall — missing a real case (false negative) is far more dangerous",
      "Accuracy — it balances both",
      "It never matters which you optimize",
    ],
    answer: 1,
    explain:
      "In screening, a false negative means a sick patient is told they're fine — potentially fatal — so you maximize recall (catch every true case) even at the cost of more false positives, which a follow-up test can filter out. The general rule: optimize recall when misses are costly, precision when false alarms are costly. Always tie the metric back to the real-world cost of each error type.",
  },
  {
    category: "interview",
    difficulty: "easy",
    q: "Classic question: 'What's the difference between bagging and boosting?'",
    options: [
      "They're identical",
      "Bagging trains models in parallel to cut variance; boosting trains sequentially to cut bias",
      "Bagging is only for neural nets",
      "Boosting averages independent models",
    ],
    answer: 1,
    explain:
      "Bagging (e.g. Random Forest) trains many models independently on bootstrap samples and averages them, reducing variance. Boosting (e.g. XGBoost) trains models sequentially, each fixing the previous ensemble's errors, reducing bias. Mnemonic: Bagging = parallel + variance, Boosting = sequential + bias. Boosting often gets higher accuracy but is more prone to overfitting noisy data.",
  },
  {
    category: "interview",
    difficulty: "medium",
    q: "How would you handle a highly imbalanced dataset (e.g. 1% positive class)?",
    options: [
      "Only report accuracy",
      "Resample (SMOTE/undersample), use class weights, and evaluate with PR-AUC / F1",
      "Delete the minority class",
      "Always collect no more data",
    ],
    answer: 1,
    explain:
      "Combine data-level fixes (oversample the minority with SMOTE, undersample the majority) with algorithm-level fixes (class weights / cost-sensitive loss), then evaluate with precision, recall, F1, or PR-AUC — never raw accuracy, which is misleading here. Also consider adjusting the decision threshold. Mentioning both resampling AND the right metric signals real experience.",
  },
  {
    category: "interview",
    difficulty: "medium",
    q: "'Why might you choose ReLU over sigmoid in hidden layers?'",
    options: [
      "ReLU outputs probabilities",
      "ReLU avoids saturation for positive inputs, easing vanishing gradients and training faster",
      "Sigmoid is non-differentiable",
      "ReLU has more parameters",
    ],
    answer: 1,
    explain:
      "ReLU's gradient is 1 for positive inputs (no saturation) and it's cheap to compute, so deep networks train faster and suffer far less from vanishing gradients than with sigmoid/tanh, which flatten out at the extremes. Sigmoid is still fine for a binary output layer where you need a probability. The trade-off is 'dying ReLU', addressed by Leaky ReLU/GELU.",
  },
  {
    category: "interview",
    difficulty: "hard",
    q: "A model performs great offline but poorly in production. What's your first hypothesis?",
    options: [
      "The GPU is broken",
      "Training–serving skew or data drift — features differ or the live distribution moved",
      "The model is too small",
      "Nothing can be done",
    ],
    answer: 1,
    explain:
      "'Great offline, bad online' almost always points to training–serving skew (features computed differently in prod, or leakage that inflated offline scores) or data/concept drift since training. Debug by logging live feature values and comparing distributions to training, checking for leakage, and verifying label timing. This scenario is a very common senior-level interview probe.",
  },
  {
    category: "interview",
    difficulty: "easy",
    q: "'What is the difference between a parameter and a hyperparameter?'",
    options: [
      "They're the same",
      "Parameters are learned from data; hyperparameters are set before training to control it",
      "Hyperparameters are learned by backprop",
      "Parameters are only in trees",
    ],
    answer: 1,
    explain:
      "Parameters (weights, biases) are learned by the training algorithm from data. Hyperparameters (learning rate, number of layers, regularization strength, k in kNN) are set by you before/around training and control how learning happens — they're tuned via grid/random/Bayesian search on a validation set. Confusing the two is a classic red flag in interviews.",
  },
  {
    category: "interview",
    difficulty: "medium",
    q: "How do you detect and prevent data leakage?",
    options: [
      "Train on the full dataset including the test set",
      "Fit preprocessing on train only, split before transforming, and remove target-derived features",
      "Add more features regardless of source",
      "Use the target as an input feature",
    ],
    answer: 1,
    explain:
      "Leakage is when information unavailable at prediction time sneaks into training, giving unrealistically good scores that collapse in production. Prevent it by splitting BEFORE any preprocessing, fitting scalers/encoders on the training fold only (then applying to val/test), and dropping features that are proxies for or computed from the target/future. A too-good-to-be-true score is the tell.",
  },
  {
    category: "interview",
    difficulty: "medium",
    q: "'When would you use fine-tuning vs. RAG for an LLM application?'",
    options: [
      "Always fine-tune",
      "RAG for changing/factual knowledge; fine-tuning for style, format, or specialized behavior",
      "They do the same thing",
      "RAG requires retraining the model",
    ],
    answer: 1,
    explain:
      "Use RAG when answers depend on large, changing, or private knowledge — you update documents, not weights, and get citations with less hallucination. Use fine-tuning to teach a consistent style, output format, or task behavior the base model lacks. They're complementary: many production systems fine-tune for format AND use RAG for facts. Leading with 'it depends on whether the need is knowledge or behavior' scores well.",
  },
  {
    category: "interview",
    difficulty: "hard",
    q: "'Explain the vanishing gradient problem and two ways to fix it.'",
    options: [
      "Gradients grow too large; fix with bigger learning rate",
      "Gradients shrink through deep layers; fix with ReLU-family activations and residual connections",
      "It only affects decision trees",
      "It's solved by more epochs alone",
    ],
    answer: 1,
    explain:
      "In deep nets, repeatedly multiplying small derivatives during backprop makes gradients vanish, so early layers stop learning. Fixes: (1) non-saturating activations like ReLU/GELU, (2) residual/skip connections (ResNet) that give gradients a shortcut, plus normalization (BatchNorm/LayerNorm) and good initialization (He/Xavier). The mirror problem, exploding gradients, is handled by gradient clipping.",
  },
  {
    category: "interview",
    difficulty: "medium",
    q: "How would you design an A/B test to prove a new model is better?",
    options: [
      "Ship to everyone and eyeball the metrics",
      "Randomly split users, define a primary metric upfront, run to statistical significance, then compare",
      "Compare offline accuracy only",
      "Pick whichever model the team prefers",
    ],
    answer: 1,
    explain:
      "Randomly assign users to control (old) vs. treatment (new), fix a primary business metric and minimum detectable effect beforehand, size the sample for adequate power, run long enough to reach statistical significance, and guard against peeking/multiple-comparison bias. Offline metrics justify launching the test; the A/B test proves real-world impact. Mentioning a guardrail metric (e.g. latency) is a bonus.",
  },
  {
    category: "interview",
    difficulty: "easy",
    q: "'What's the difference between classification and regression?'",
    options: [
      "Classification predicts continuous numbers",
      "Classification predicts discrete categories; regression predicts continuous values",
      "They are the same with different names",
      "Regression only works on images",
    ],
    answer: 1,
    explain:
      "Classification outputs a discrete label (spam/not-spam, digit 0–9), typically evaluated with accuracy/F1/AUC and trained with cross-entropy. Regression outputs a continuous number (price, temperature), evaluated with RMSE/MAE/R² and trained with MSE/MAE. Some tasks blur the line (ordinal, probability estimates), but knowing the output type and its matching loss/metric is the fundamentals check.",
  },
  {
    category: "interview",
    difficulty: "hard",
    q: "'Your deep model overfits. Walk me through your remediation options.'",
    options: [
      "Increase model size and train longer",
      "Add data/augmentation, regularization (L2, dropout), early stopping, and reduce capacity",
      "Remove the validation set",
      "Raise the learning rate only",
    ],
    answer: 1,
    explain:
      "A structured answer wins: get more data or augment it; add regularization (L2/weight decay, dropout); use early stopping on validation loss; reduce model capacity or add constraints; and consider transfer learning. Walking through the options in order — data first, then regularization, then architecture — shows a systematic debugging mindset rather than a single trick.",
  },
  {
    category: "interview",
    difficulty: "medium",
    q: "'What does a p-value of 0.03 mean in a hypothesis test?'",
    options: [
      "There's a 3% chance the hypothesis is true",
      "If the null hypothesis were true, there's a 3% chance of data this extreme",
      "The effect size is 3%",
      "The model is 97% accurate",
    ],
    answer: 1,
    explain:
      "A p-value is P(data this extreme | null hypothesis true) — here 3% — so at α=0.05 you'd reject the null. It is NOT the probability the hypothesis is true, nor the effect size. Also remember statistical significance ≠ practical significance: a tiny, useless effect can be 'significant' with a large enough sample. Interviewers love catching the common misinterpretation.",
  },
  {
    category: "interview",
    difficulty: "medium",
    q: "'How do you decide when to stop training a neural network?'",
    options: [
      "When training loss hits zero",
      "Early stopping: halt when validation loss stops improving (patience), keep the best checkpoint",
      "After exactly 10 epochs always",
      "When the GPU is warm",
    ],
    answer: 1,
    explain:
      "Monitor validation loss and use early stopping: once it stops improving for a set number of epochs (patience), stop and restore the best checkpoint — this prevents overfitting that would continue if you chased zero training loss. Training loss alone is misleading because it keeps dropping as the model memorizes. Pair with a learning-rate schedule for best results.",
  },
  {
    category: "interview",
    difficulty: "hard",
    q: "'Why can't self-attention alone tell word order, and how is that solved?'",
    options: [
      "It can; no fix needed",
      "Attention is permutation-invariant, so positional encodings inject order information",
      "By using a bigger vocabulary",
      "By lowering the temperature",
    ],
    answer: 1,
    explain:
      "Self-attention computes weighted combinations over a set of tokens with no inherent notion of sequence, so it's permutation-invariant — reorder the inputs and the math is unchanged. Positional encodings (sinusoidal, learned, or rotary/RoPE) add position-dependent signals so the model knows word order. This is a favorite Transformer deep-dive question; naming RoPE as the modern choice is a plus.",
  },
  {
    category: "interview",
    difficulty: "easy",
    q: "'What is cross-validation and why use it?'",
    options: [
      "Testing on the training set",
      "Rotating train/validation folds to get a robust performance estimate and use all data",
      "A way to deploy models",
      "A type of neural layer",
    ],
    answer: 1,
    explain:
      "Cross-validation (e.g. k-fold) partitions data into k folds, trains on k−1 and validates on the remaining fold, rotating so every point is validated once, then averages the scores for a lower-variance estimate that isn't at the mercy of one split. It's especially valuable with limited data and for reliable hyperparameter tuning. Use stratified folds to preserve class ratios in classification.",
  },
  {
    category: "interview",
    difficulty: "medium",
    q: "'A stakeholder wants to add 500 features. What's your concern?'",
    options: [
      "None — more features always help",
      "Curse of dimensionality and overfitting; prefer feature selection and validation",
      "The model will train faster",
      "It guarantees higher accuracy",
    ],
    answer: 1,
    explain:
      "More features aren't free: high dimensionality makes data sparse, raises overfitting and compute cost, and can add noise/leakage. Push back with feature selection (importance, L1), dimensionality reduction, and validation to prove each block of features actually improves held-out performance. Framing it as a cost–benefit tradeoff, not a flat 'no', shows maturity.",
  },
  {
    category: "interview",
    difficulty: "hard",
    q: "'How would you monitor an ML model in production?'",
    options: [
      "Check it once at deploy and never again",
      "Track data drift, prediction distribution, latency, and (when labels arrive) live accuracy, with alerts",
      "Only monitor CPU usage",
      "Retrain daily regardless of need",
    ],
    answer: 1,
    explain:
      "A solid monitoring plan covers operational health (latency, error rate, throughput), data quality and drift (input distributions, missing values), prediction drift (output distribution shifts), and model quality (accuracy/precision once ground-truth labels land, often delayed). Wire alerts and a retraining trigger to these signals. Naming the delayed-label problem for true accuracy is a senior-level detail.",
  },
];

/* ─── Ranks by score ─── */
const RANKS: { min: number; title: string; icon: string }[] = [
  { min: 0, title: "ML Intern", icon: "🌱" },
  { min: 300, title: "Junior ML Engineer", icon: "🔧" },
  { min: 700, title: "ML Engineer", icon: "⚡" },
  { min: 1200, title: "Senior ML Engineer", icon: "🚀" },
  { min: 1900, title: "Staff AI Engineer", icon: "🧬" },
  { min: 2800, title: "AI Architect", icon: "👑" },
];

function rankFor(score: number) {
  let r = RANKS[0];
  for (const rank of RANKS) if (score >= rank.min) r = rank;
  return r;
}

const LIVES_START = 3;
const JOB_LIVES = 5; // more forgiving so the 50-question marathon is completable
const JOB_RUN_LEN = 50; // Job Prep marathon length
const TIME_PER_Q = 22; // seconds
const STORAGE_KEY = "aiml-gauntlet-best-v1";

type Phase = "menu" | "playing" | "over";

/* ─── Levels ───
   Basic/Intermediate/Advanced map to a difficulty tier (across topics).
   Job Prep is a fixed 50-question marathon across every core job concept.
   Interview is its own track built from the interview question bank. */
type LevelId = "basic" | "intermediate" | "advanced" | "job" | "interview";

type Level = {
  id: LevelId;
  label: string;
  icon: string;
  difficulty: Difficulty | null; // null = special track (job / interview)
  blurb: string;
};

const LEVELS: Level[] = [
  { id: "basic", label: "Basic", icon: "🌱", difficulty: "easy", blurb: "Core definitions and fundamentals — a solid warm-up." },
  { id: "intermediate", label: "Intermediate", icon: "⚡", difficulty: "medium", blurb: "Applied concepts, metrics, and everyday tradeoffs." },
  { id: "advanced", label: "Advanced", icon: "🔥", difficulty: "hard", blurb: "Deep mechanics, math, and tricky edge cases." },
  { id: "job", label: "Job Prep", icon: "💼", difficulty: null, blurb: "A 50-question marathon across every core concept AI/ML jobs test." },
  { id: "interview", label: "Interview", icon: "🎯", difficulty: null, blurb: "Real AI/ML engineer interview questions & scenarios." },
];

const LEVEL_MAP: Record<LevelId, Level> = LEVELS.reduce(
  (acc, l) => ({ ...acc, [l.id]: l }),
  {} as Record<LevelId, Level>
);

/* Topic categories shown for the difficulty levels (Interview is its own track) */
const TOPIC_CATEGORIES = CATEGORIES.filter((c) => c.id !== "interview");

/* Fisher–Yates shuffle (returns a new array) */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DIFF_ORDER: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 };

/* A served question carries its shuffled options + the new correct index */
type ServedQuestion = Question & { shuffledOptions: string[]; correctIndex: number };

function serveQuestion(q: Question): ServedQuestion {
  const idxs = shuffle(q.options.map((_, i) => i));
  const shuffledOptions = idxs.map((i) => q.options[i]);
  const correctIndex = idxs.indexOf(q.answer);
  return { ...q, shuffledOptions, correctIndex };
}

/* Select the raw question pool for a chosen level (+ optional topic filter). */
function filterPool(level: LevelId, cats: Set<CategoryId>): Question[] {
  if (level === "interview") {
    return QUESTIONS.filter((q) => q.category === "interview");
  }
  if (level === "job") {
    // Every core job concept — all topical questions (interview scenarios excluded).
    return QUESTIONS.filter((q) => q.category !== "interview");
  }
  const diff = LEVEL_MAP[level].difficulty;
  return QUESTIONS.filter(
    (q) =>
      q.category !== "interview" &&
      q.difficulty === diff &&
      (cats.size === 0 || cats.has(q.category))
  );
}

/* Levels that run a fixed-length queue and end when it's done (vs. endless). */
function isFiniteLevel(level: LevelId): boolean {
  return level === "job";
}

export default function AIGame() {
  const [phase, setPhase] = useState<Phase>("menu");
  const [level, setLevel] = useState<LevelId | null>(null);
  const [selectedCats, setSelectedCats] = useState<Set<CategoryId>>(new Set());

  const [queue, setQueue] = useState<ServedQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lives, setLives] = useState(LIVES_START);
  const [livesMax, setLivesMax] = useState(LIVES_START);
  const [answered, setAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);

  const [best, setBest] = useState(0);
  const [lastGain, setLastGain] = useState<number | null>(null);

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeLeftRef = useRef(TIME_PER_Q);
  const resolveRef = useRef<(pickedIdx: number) => void>(() => {});

  // Load best score once (in an effect, not a lazy initializer, so the
  // localStorage read stays client-side and can't cause a hydration mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage post-mount
      if (raw) setBest(parseInt(raw, 10) || 0);
    } catch {
      /* ignore */
    }
  }, []);

  const current = queue[qIndex];

  const clearTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  /* Build a shuffled queue for the chosen level. Tracks that span difficulties
     (Interview, Job Prep) are ramped easy→hard; single-difficulty levels are
     simply shuffled. Job Prep is capped to a fixed marathon length. */
  const buildQueue = useCallback((lvl: LevelId, cats: Set<CategoryId>): ServedQuestion[] => {
    const pool = filterPool(lvl, cats);
    const buckets: Record<Difficulty, Question[]> = { easy: [], medium: [], hard: [] };
    for (const q of pool) buckets[q.difficulty].push(q);

    if (lvl === "job") {
      // Balanced 50-question marathon: sample across difficulties, then ramp easy→hard.
      const want: Record<Difficulty, number> = { easy: 17, medium: 17, hard: 16 };
      const pick = (d: Difficulty) => shuffle(buckets[d]).slice(0, want[d]);
      return [...pick("easy"), ...pick("medium"), ...pick("hard")].map(serveQuestion);
    }
    if (lvl === "interview") {
      const ordered = [
        ...shuffle(buckets.easy),
        ...shuffle(buckets.medium),
        ...shuffle(buckets.hard),
      ].sort((a, b) => DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]);
      return ordered.map(serveQuestion);
    }
    return shuffle(pool).map(serveQuestion);
  }, []);

  const startGame = useCallback(() => {
    if (!level) return;
    const q = buildQueue(level, selectedCats);
    if (q.length === 0) return; // nothing to play
    const startLives = level === "job" ? JOB_LIVES : LIVES_START;
    setQueue(q);
    setQIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLives(startLives);
    setLivesMax(startLives);
    setAnswered(0);
    setCorrectCount(0);
    setPicked(null);
    setRevealed(false);
    setLastGain(null);
    setTimeLeft(TIME_PER_Q);
    setPhase("playing");
  }, [buildQueue, level, selectedCats]);

  const endGame = useCallback(
    (finalScore: number) => {
      clearTick();
      setPhase("over");
      setBest((prev) => {
        const next = Math.max(prev, finalScore);
        try {
          localStorage.setItem(STORAGE_KEY, String(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [clearTick]
  );

  /* Resolve an answer (or a timeout when pickedIdx === -1) */
  const resolveAnswer = useCallback(
    (pickedIdx: number) => {
      if (revealed || !current) return;
      clearTick();
      setPicked(pickedIdx);
      setRevealed(true);
      setAnswered((a) => a + 1);

      const isCorrect = pickedIdx === current.correctIndex;
      if (isCorrect) {
        const diffBonus = current.difficulty === "hard" ? 150 : current.difficulty === "medium" ? 100 : 60;
        const speedBonus = Math.round((timeLeft / TIME_PER_Q) * 40);
        const newStreak = streak + 1;
        const streakMult = 1 + Math.min(newStreak - 1, 5) * 0.2; // up to 2x
        const gain = Math.round((diffBonus + speedBonus) * streakMult);
        setLastGain(gain);
        setScore((s) => s + gain);
        setStreak(newStreak);
        setBestStreak((b) => Math.max(b, newStreak));
        setCorrectCount((c) => c + 1);
      } else {
        setLastGain(0);
        setStreak(0);
        setLives((l) => l - 1);
      }
    },
    [revealed, current, clearTick, timeLeft, streak]
  );

  // Keep the latest resolveAnswer reachable from the interval callback.
  useEffect(() => {
    resolveRef.current = resolveAnswer;
  }, [resolveAnswer]);

  /* Timer: runs while a fresh question is shown and not yet answered.
     All setState happens inside the interval callback (an async boundary),
     so the effect body itself never sets state synchronously. */
  useEffect(() => {
    if (phase !== "playing" || revealed || !current) return;
    clearTick();
    timeLeftRef.current = TIME_PER_Q;
    tickRef.current = setInterval(() => {
      const next = Math.round((timeLeftRef.current - 0.1) * 10) / 10;
      timeLeftRef.current = next <= 0 ? 0 : next;
      setTimeLeft(timeLeftRef.current);
      if (next <= 0) {
        clearTick();
        resolveRef.current(-1); // ran out of time → counts as a miss
      }
    }, 100);
    return clearTick;
  }, [phase, qIndex, revealed, current, clearTick]);

  /* Advance to the next question (or end the game) */
  const goNext = useCallback(() => {
    if (lives <= 0) {
      endGame(score);
      return;
    }
    const next = qIndex + 1;
    const finite = level ? isFiniteLevel(level) : false;
    if (next >= queue.length) {
      if (finite) {
        // Marathon complete — end after the fixed-length queue is exhausted.
        endGame(score);
        return;
      }
      // Endless levels loop, re-shuffling for freshness.
      setQueue((prev) => {
        const lastQ = prev[prev.length - 1]?.q;
        const reshuffled = shuffle(prev);
        // Avoid an immediate back-to-back repeat of the just-seen question
        if (reshuffled.length > 1 && reshuffled[0].q === lastQ) {
          [reshuffled[0], reshuffled[1]] = [reshuffled[1], reshuffled[0]];
        }
        return reshuffled.map((sq) => serveQuestion(sq));
      });
      setQIndex(0);
    } else {
      setQIndex(next);
    }
    setPicked(null);
    setRevealed(false);
    setLastGain(null);
    setTimeLeft(TIME_PER_Q);
  }, [lives, score, endGame, qIndex, queue.length, level]);

  // Cleanup on unmount
  useEffect(() => clearTick, [clearTick]);

  const toggleCat = (id: CategoryId) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const poolSize = useMemo(
    () => (level ? filterPool(level, selectedCats).length : 0),
    [level, selectedCats]
  );

  const accuracy = answered > 0 ? Math.round((correctCount / answered) * 100) : 0;

  /* ─────────────── RENDER ─────────────── */

  if (phase === "menu") {
    const showTopics = level === "basic" || level === "intermediate" || level === "advanced";
    const canStart = level !== null && poolSize > 0;
    const jobCount = Math.min(JOB_RUN_LEN, poolSize);
    return (
      <div className="game" data-reveal="">
        <div className="gameMenu">
          {/* Step 1 — Level */}
          <div className="gameMenuHead">
            <p className="eyebrow">Step 1 · Choose your level</p>
            <h2 className="gameH2">Warm up, run the 50-question Job Prep, or hit interview mode.</h2>
            <p className="gameLead">
              Answer fast and keep a streak alive for bonus points. A wrong answer or a run-out timer costs
              a life. Every question ends with a full explanation, so you learn the concept even when you
              miss — the Job Prep marathon covers everything an AI/ML role expects in one sitting.
            </p>
          </div>

          <div className="gameLevelGrid">
            {LEVELS.map((lv) => {
              const on = level === lv.id;
              return (
                <button
                  key={lv.id}
                  type="button"
                  className={`gameLevelCard gameLevel-${lv.id}${on ? " gameLevelOn" : ""}`}
                  onClick={() => setLevel(lv.id)}
                  aria-pressed={on}
                >
                  <span className="gameLevelIcon" aria-hidden="true">{lv.icon}</span>
                  <span className="gameLevelLabel">{lv.label}</span>
                  <span className="gameLevelBlurb">{lv.blurb}</span>
                  <span className="gameLevelCheck" aria-hidden="true">{on ? "✓ Selected" : "Select"}</span>
                </button>
              );
            })}
          </div>

          {/* Step 2 — Topics (only for the difficulty levels) */}
          {showTopics && (
            <div className="gameTopicsBlock">
              <div className="gameMenuHead">
                <p className="eyebrow">Step 2 · Narrow the topics (optional)</p>
                <h2 className="gameH2 gameH2Sm">Pick focus areas, or leave blank for the full mix.</h2>
              </div>
              <div className="gameCatGrid">
                {TOPIC_CATEGORIES.map((c) => {
                  const on = selectedCats.has(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`gameCatCard${on ? " gameCatOn" : ""}`}
                      onClick={() => toggleCat(c.id)}
                      aria-pressed={on}
                    >
                      <span className="gameCatIcon" aria-hidden="true">{c.icon}</span>
                      <span className="gameCatLabel">{c.label}</span>
                      <span className="gameCatBlurb">{c.blurb}</span>
                      <span className="gameCatCheck" aria-hidden="true">{on ? "✓ Selected" : "Tap to add"}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {level === "job" && (
            <div className="gameInterviewNote gameJobNote">
              💼 <strong>Job Prep marathon</strong> — a fixed {JOB_RUN_LEN}-question run spanning every core
              concept AI/ML engineering roles test: ML & deep learning, LLMs, MLOps, math, NLP/vision, and
              your real project stack. You get {JOB_LIVES} lives and a full concept report at the end.
            </div>
          )}

          {level === "interview" && (
            <div className="gameInterviewNote">
              🎯 <strong>Interview mode</strong> pulls real AI/ML engineer interview questions across all
              topics and difficulties — tradeoffs, scenarios, and the classics recruiters ask.
            </div>
          )}

          <div className="gameMenuFoot">
            <div className="gameMenuStats">
              <span className="gamePill">
                {!level
                  ? "Pick a level to begin"
                  : level === "job"
                  ? `${jobCount}-question marathon`
                  : `${poolSize} question${poolSize === 1 ? "" : "s"} in pool`}
              </span>
              <span className="gamePill">Best score: {best.toLocaleString()}</span>
            </div>
            <button
              type="button"
              className="btn btnPrimary gameStartBtn"
              onClick={startGame}
              disabled={!canStart}
            >
              {level === "interview"
                ? "Start Interview →"
                : level === "job"
                ? "Start Job Prep →"
                : "Start Gauntlet →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "over") {
    const rank = rankFor(score);
    const isRecord = score >= best && score > 0;
    return (
      <div className="game" data-reveal="">
        <div className="gameOver">
          <p className="eyebrow">
            Run complete{level ? ` · ${LEVEL_MAP[level].icon} ${LEVEL_MAP[level].label} level` : ""}
          </p>
          <div className="gameOverRank">
            <span className="gameOverRankIcon" aria-hidden="true">{rank.icon}</span>
            <div>
              <h2 className="gameH2 gameOverTitle">{rank.title}</h2>
              <p className="gameLead">
                {isRecord ? "🏆 New personal best! " : ""}
                You scored {score.toLocaleString()} points.
              </p>
            </div>
          </div>

          <div className="gameOverStats">
            <div className="gameStat">
              <span className="gameStatVal">{score.toLocaleString()}</span>
              <span className="gameStatLabel">Score</span>
            </div>
            <div className="gameStat">
              <span className="gameStatVal">{accuracy}%</span>
              <span className="gameStatLabel">Accuracy</span>
            </div>
            <div className="gameStat">
              <span className="gameStatVal">{correctCount}</span>
              <span className="gameStatLabel">Correct</span>
            </div>
            <div className="gameStat">
              <span className="gameStatVal">🔥 {bestStreak}</span>
              <span className="gameStatLabel">Best streak</span>
            </div>
            <div className="gameStat">
              <span className="gameStatVal">{best.toLocaleString()}</span>
              <span className="gameStatLabel">All-time best</span>
            </div>
          </div>

          <div className="gameOverActions">
            <button type="button" className="btn btnPrimary" onClick={startGame}>
              Play again ↻
            </button>
            <button type="button" className="btn" onClick={() => setPhase("menu")}>
              Change level
            </button>
          </div>
        </div>
      </div>
    );
  }

  // phase === "playing"
  const cat = current ? CATEGORY_MAP[current.category] : null;
  const timePct = Math.max(0, (timeLeft / TIME_PER_Q) * 100);
  const timerLow = timeLeft <= 6;

  return (
    <div className="game">
      {level && (
        <div className={`gameLevelBanner gameLevel-${level}`}>
          <span aria-hidden="true">{LEVEL_MAP[level].icon}</span>
          <span>
            {LEVEL_MAP[level].label}
            {isFiniteLevel(level)
              ? ` · Question ${Math.min(qIndex + 1, queue.length)} of ${queue.length}`
              : " level"}
          </span>
        </div>
      )}
      <div className="gameHud">
        <div className="gameHudItem">
          <span className="gameHudLabel">Score</span>
          <span className="gameHudVal">{score.toLocaleString()}</span>
        </div>
        <div className="gameHudItem">
          <span className="gameHudLabel">Streak</span>
          <span className="gameHudVal">🔥 {streak}{streak >= 2 ? ` ·${(1 + Math.min(streak - 1, 5) * 0.2).toFixed(1)}x` : ""}</span>
        </div>
        <div className="gameHudItem">
          <span className="gameHudLabel">Lives</span>
          <span className="gameHudVal gameLives">
            {Array.from({ length: livesMax }).map((_, i) => (
              <span key={i} className={i < lives ? "gameHeart" : "gameHeart gameHeartOut"} aria-hidden="true">
                {i < lives ? "❤️" : "🖤"}
              </span>
            ))}
          </span>
        </div>
        <div className="gameHudItem gameHudBestWrap">
          <span className="gameHudLabel">{level && isFiniteLevel(level) ? "Answered" : "Best"}</span>
          <span className="gameHudVal">
            {level && isFiniteLevel(level) ? `${answered}/${queue.length}` : best.toLocaleString()}
          </span>
        </div>
      </div>

      <div className={`gameTimer${timerLow ? " gameTimerLow" : ""}`}>
        <div className="gameTimerFill" style={{ width: `${timePct}%` }} />
      </div>

      {current && (
        <div className="gameCard" key={qIndex}>
          <div className="gameCardTop">
            <span className="gameQCat">
              <span aria-hidden="true">{cat?.icon}</span> {cat?.label}
            </span>
            <span className={`gameDiff gameDiff-${current.difficulty}`}>{current.difficulty}</span>
          </div>

          <h2 className="gameQ">{current.q}</h2>

          <div className="gameOpts">
            {current.shuffledOptions.map((opt, i) => {
              let cls = "gameOpt";
              if (revealed) {
                if (i === current.correctIndex) cls += " gameOptCorrect";
                else if (i === picked) cls += " gameOptWrong";
                else cls += " gameOptDim";
              }
              return (
                <button
                  key={i}
                  type="button"
                  className={cls}
                  disabled={revealed}
                  onClick={() => resolveAnswer(i)}
                >
                  <span className="gameOptKey" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                  <span className="gameOptText">{opt}</span>
                  {revealed && i === current.correctIndex && <span className="gameOptMark">✓</span>}
                  {revealed && i === picked && i !== current.correctIndex && <span className="gameOptMark">✕</span>}
                </button>
              );
            })}
          </div>

          {revealed && (
            <div className={`gameFeedback${picked === current.correctIndex ? " gameFeedbackGood" : " gameFeedbackBad"}`}>
              <div className="gameFeedbackHead">
                <strong>
                  {picked === current.correctIndex
                    ? `Correct! +${lastGain?.toLocaleString()} pts`
                    : picked === -1
                    ? "Time's up! −1 life"
                    : "Not quite — −1 life"}
                </strong>
              </div>
              <p className="gameExplain">{current.explain}</p>
              <button type="button" className="btn btnPrimary gameNextBtn" onClick={goNext} autoFocus>
                {lives <= 0 || (level && isFiniteLevel(level) && qIndex + 1 >= queue.length)
                  ? "See results →"
                  : "Next question →"}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="gameQuitRow">
        <button type="button" className="gameQuit" onClick={() => endGame(score)}>
          End run
        </button>
      </div>
    </div>
  );
}
