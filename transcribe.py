# transcribe.py
import whisper
import sys
import torch
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

if len(sys.argv) < 2:
    print("Debes indicar un archivo de audio .wav")
    sys.exit(1)

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"[INFO] Usando dispositivo: {device}", file=sys.stderr)

audio_path = sys.argv[1]

model = whisper.load_model("large", device=device)  # puedes cambiar a "medium" o "large" si quieres más precisión
result = model.transcribe(audio_path, language="es")
print(result["text"])
