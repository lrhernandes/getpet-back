module.exports = {
    deleteAccount(firstName){
        const str = `<body style="position: relative; text-align:justify; width: 80%">
                        <h2>Sentimos falta de você... 😖</h2>
                        <p>Obrigado por passar um tempo conosco, ${firstName}. Parece que sua conta foi deletada, sinta-se à vontade para voltar assim que quiser.</p>
                        <p>Acha que essa mensagem foi enviada por engano? Entre em contato através de <b>getpetcc@gmail.com</b></p>
                        <p style="color: gray"><i> <small> GetPet - Plataforma para doação e adoção de animais de estimação</small></i></p>
                    </body>`
        return str;
    }
}