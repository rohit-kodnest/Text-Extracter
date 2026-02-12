import { createWorker } from 'tesseract.js';

document.getElementById('extractTextButton').addEventListener('click', async () => {
    const imageInput = document.getElementById('imageInput');
    if (!imageInput.files.length) {
        alert('Please select an image file.');
        return;
    }
    
    const worker = createWorker();
    const resultDiv = document.getElementById('result');

    try {
        resultDiv.innerHTML = "<p>Processing...</p>";
        
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        const { data: { text } } = await worker.recognize(imageInput.files[0]);
        resultDiv.innerHTML = `<p>Extracted Text:</p><pre>${text}</pre>`;
        
        await worker.terminate();
    } catch (error) {
        resultDiv.innerHTML = `<p class="text-red-600">Error processing image: ${error.message}</p>`;
    }
});