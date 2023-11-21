function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;
            uploadToGitHub(file.name, content);
        };

        reader.readAsArrayBuffer(file);
    } else {
        alert('Pilih file terlebih dahulu.');
    }
}

function uploadToGitHub(fileName, content) {
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
            content: btoa(String.fromCharCode.apply(null, new Uint8Array(content.slice()))),
            branch: branchName,
        }),
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('File berhasil diunggah:', data);
            alert('File berhasil diunggah!');
        })
        .catch(error => {
            console.error('Gagal mengunggah file:', error);
            alert('Gagal mengunggah file. Silakan coba lagi.');
        });
}
