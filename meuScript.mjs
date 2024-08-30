document.addEventListener('DOMContentLoaded', () => {
    
    function copyLink() {
        const qrLinkElement = document.getElementById('qr-link');
        if (qrLinkElement) {
            const link = qrLinkElement.href;
            navigator.clipboard.writeText(link).then(() => {
                alert('Link copiado para a área de transferência');
            }).catch(err => {
                console.error('Erro ao copiar o link', err);
            });
        } else {
            console.log('Continue...');
        }
    }
       
});

  
