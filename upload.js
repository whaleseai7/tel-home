function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result.split(',')[1]; // Ambil bagian data base64
            uploadToGitHub(file.name, content);
        };

        reader.readAsDataURL(file);
    } else {
        alert('Pilih file terlebih dahulu.');
    }
}

async function uploadToGitHub(fileName, content) {
    const token = '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';
    const repoOwner = 'whaleseai7';
    const repoName = 'tel-home';
    const branchName = 'main';

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`;

    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
            message: `Upload ${fileName}`,
            content: content,
            branch: branchName,
        }),
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        console.log('File berhasil diunggah:', data);
        alert('File berhasil diunggah!');
    } catch (error) {
        console.error('Gagal mengunggah file:', error);
        alert('Gagal mengunggah file. Silakan coba lagi.');
    }
}
