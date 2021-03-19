module.exports = {
    registerEmail (firstName){
        const str = `<body style="position: relative; text-align:justify; width: 80%">
                        <h2>Gratidão! ✨ 💫</h2>
                        <p>Estamos muito felizes de ter você como membro do GetPet, ${firstName}!</p>
                        <p>Uma infinidade de bichinhos está disponível para adoção na plataforma, encontre os mais próximos de você! Crie anúncios personalizados e localize uma ótima família para os bicnhinhos que cuida, e o melhor: de forma segura. 🐝</p>
                        <p>Não se esqueça que, ao adotar um animal na plataforma GetPet, você <b>concorda</b> com os termos de adoção segura descritos na plataforma.</p>
                        <p>Acha que essa mensagem foi enviada por engano? Entre em contato através de <b>getpetcc@gmail.com</b></p>
                        <p style="color: gray"><i> <small> GetPet - Plataforma para doação e adoção de animais de estimação</small></i></p>
                    </body>`
        return str;
    }
}