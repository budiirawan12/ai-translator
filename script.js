async function translateText() {
  const text = document.getElementById("inputText").value;
  const resultEl = document.getElementById("result");
  resultEl.textContent = "⏳ Menerjemahkan...";

  // Gunakan HuggingFace Inference API untuk model terjemahan
  const response = await fetch("https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-id-en", {
    method: "POST",
    headers: {
      "Authorization": "Bearer HF_API_KEY", // Ganti dengan API Key HuggingFace kamu
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: text })
  });

  const data = await response.json();
  if (data && data[0] && data[0].translation_text) {
    resultEl.textContent = data[0].translation_text;
  } else {
    resultEl.textContent = "⚠️ Gagal menerjemahkan.";
    console.log(data);
  }
}