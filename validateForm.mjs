// validateForm.mjs
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const buttonCad = document.querySelector('#btn-submit-cadastro');
    const loadingCad = document.querySelector('.loading-cad');
    const telefoneInput = document.getElementById('number_telefone');

    telefoneInput.addEventListener('input', function(event) {
        let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

        // Adiciona a máscara ao valor
        if (value.length > 0) {
            value = '(' + value;
        }
        if (value.length > 3) {
            value = value.slice(0, 3) + ') ' + value.slice(3);
        }
        if (value.length > 10) {
            value = value.slice(0, 10) + '-' + value.slice(10, 15);
        }

        // Define o valor formatado de volta no input
        event.target.value = value;
    });
    if (form) {
        form.addEventListener('submit', function(event) {
            buttonCad.disabled = true;
            loadingCad.style.display = 'flex';
            // Obtenha os valores dos campos
            try {
                const nome = document.getElementById('nome').value.trim();
                const numberTelefone = document.getElementById('number_telefone').value.replace(/\D/g, '');
                const cep = document.getElementById('cep').value.trim();
                const cidade = document.getElementById('cidade').value;
    
                // Valide o nome
                if (nome === '') {
                    alert('O nome é obrigatório.');
                    event.preventDefault(); // Impede o envio do formulário
                    return; // Saia da função após exibir o erro
                }
    
                // Valide o número de telefone (deve ter pelo menos 10 dígitos)
                const numberTelefoneRegex = /^\d{10,11}$/;
                if (!numberTelefoneRegex.test(numberTelefone)) {
                    console.log('Telefone', numberTelefone)
                    alert('O número de telefone deve ter entre 10 e 11 dígitos.', numberTelefone);
                    event.preventDefault(); // Impede o envio do formulário
                    return; // Saia da função após exibir o erro
                }
    
                // Valide o CEP (deve ter exatamente 8 dígitos)
                const cepRegex = /^\d{8}$/;
                if (!cepRegex.test(cep)) {
                    alert('O CEP deve ter exatamente 8 dígitos.');
                    event.preventDefault(); // Impede o envio do formulário
                    return; // Saia da função após exibir o erro
                }
    
                // Valide a seção
                if (cidade === '') {
                    event.preventDefault(); // Impede o envio do formulário
                    alert('Você deve selecionar a cidade.');
                    return; // Saia da função após exibir o erro
                }
            } catch (error) {
                alert('Algo aconteceu, recarregue a pagina e tente novamente')
            }finally{
                setTimeout(() => {
                    buttonCad.disabled = false;
                    loadingCad.style.display = 'none';
                }, 500);
            }
        });
    }
});
