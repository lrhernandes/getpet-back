module.exports = {
    changePassword (firstName, password){
        const str = `<body style="position: relative; text-align:justify; width: 80%">
                        <h2>Sua nova senha</h2>
                        <p>Olá, ${firstName}</p>
                        <p>Uma nova senha foi solicitada para sua conta na plataforma. Acesse o site utilizando seu e-mail e: </p>
                        <p><b>${password}</b></p>
                        <p style="color: gray"><i> <small> GetPet - Plataforma para doação e adoção de animais de estimação</small></i></p>
                    </body>`
        return str;
    }
}