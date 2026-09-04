require('dotenv').config();
const crypto = require('crypto');
// Algoritmo usado para cifrar/decifrar:
const algorithm = 'aes-256-ctr';
// Chave secreta lida do .env; precisa ter exatamente 32 bytes por causa do aes-256
const key = process.env.ENCRYPT_KEY;



// Recebe um texto puro e devolve a versão criptografada
function encrypt(text) {
    // IV = Initialization Vector (vetor de inicialização)
    // 16 bytes aleatórios que fazem o mesmo texto gerar um resultado diferente a cada execução
    const iv = crypto.randomBytes(16)
    // Cria o "cipher" (cifrador) combinando algoritmo + chave + IV
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // Junta num único Buffer os pedaços de bytes já cifrados:
    // cipher.update(text) -> cifra o texto recebido
    // cipher.final()      -> devolve o bloco final que ainda estava pendente
    const encrypted = Buffer.concat(
        [cipher.update(text),
        cipher.final()
        ]
    );

    // Retorna um objeto com:
    // iv      -> o IV convertido para hexadecimal (necessário para decifrar depois)
    // content -> o conteúdo cifrado convertido para hexadecimal
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };

}


// Recebe o dado criptografado e devolve o texto original
function decrypt(hash) {

    // Espera uma string no formato "iv:conteudo" e separa as duas partes pelo ":"
    // newIv -> IV em hex   |   text -> conteúdo cifrado em hex
    const [newIv, text] = hash.split(':');


    // Cria o "decipher" (decifrador) com o mesmo algoritmo, a mesma chave
    // e o IV usado na cifragem (convertido de hex de volta para Buffer)
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(newIv, 'hex'));

    // Junta num único Buffer os pedaços de bytes já decifrados:
    // decipher.update(text, 'hex') -> lê o conteúdo cifrado (em hex) e decifra
    // decipher.final()             -> finaliza o processo
    const decrypted = Buffer.concat([
        decipher.update(text, 'hex'),
        decipher.final()
    ]);

    // Converte o Buffer de bytes de volta para string legível e retorna
    return decrypted.toString('hex');
}

// Exporta as duas funções para serem usadas em outros arquivos do projeto
module.exports = { encrypt, decrypt };




/*
SENHA
  ↓
derivar uma KEY
  ↓
gerar IV aleatório
  ↓
criar CIPHER com KEY + IV
  ↓
dar TEXTO para o CIPHER
  ↓
receber BYTES criptografados
  ↓
juntar os BYTES
  ↓
converter para HEX/Base64 se quiser armazenar
*/
