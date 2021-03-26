module.exports = {
    adopted (firstName, name, adopterDescription, adopterName, adopterPhone){
        const str = `<body style="position: relative; text-align:justify; width: 80%">
                        <h2>Seu pet foi adotado! ✨ 💫</h2>
                        <p>${firstName}, seu anúncio não é mais visível para os usuários, lembre-se de manter contato com o adotante e certificar-se do bem-estar do seu bichinho doado</p>
                        <div style="background-color: #e6e6e6; padding-left: 20px; border-radius: 5px;">
                            <h3 style="padding-top: 20px;">Detalhes do anúncio 💕</h3>
                            <ul style="padding-bottom: 20px; list-style-type: none">
                                <li style="margin-bottom: 10px; font-weight: bold; font-size: 24px; text-transform: uppercase;"> <b>${name}</b> </li>
                                <li style="margin-bottom: 10px; margin-right: 60px"> Adotante: ${adopterName}</li>
                                <li style="margin-bottom: 10px; margin-right: 60px"> Telefone para contato: ${adopterPhone}</li>
                                <li style="margin-bottom: 10px; margin-right: 60px"> Mais detalhes para contato: ${adopterDescription}</li>
                            </ul>
                        </div>
                        <p>Não se esqueça que, ao adotar um animal na plataforma GetPet, o adotante <b>concorda</b> com os termos de adoção segura descritos na plataforma.</p>
                        <p>Acha que essa mensagem foi enviada por engano? Entre em contato através de <b>getpetcc@gmail.com</b></p>
                        <p style="color: gray"><i> <small> GetPet - Plataforma para doação e adoção de animais de estimação</small></i></p>
                    </body>`
        return str;
    }
}