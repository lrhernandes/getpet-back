module.exports = {
    registerAnnouncement (firstName, name, description, type, size, sex, age, street, houseNumber, city, uf){
        const str = `<body style="position: relative; text-align:justify; width: 80%">
                        <h2>Novo anúncio inserido! ✨ 💫</h2>
                        <p>${firstName}, seu anúncio foi publicado com sucesso!</p>
                        <p>Mantenha seu cadastro atualizado, pois possíveis adotantes entrarão em contato com você através dos contatos salvos.</p>
                        <div style="background-color: #e6e6e6; padding-left: 20px; border-radius: 5px;">
                            <h3 style="padding-top: 20px;">Detalhes do anúncio 💕</h3>
                            <ul style="padding-bottom: 20px; list-style-type: none">
                                <li style="margin-bottom: 10px; font-weight: bold; font-size: 24px; text-transform: uppercase;"> <b>${name}</b> </li>
                                <li style="margin-bottom: 10px; margin-right: 60px"> ${description}</li>
                                <li style="margin-bottom: 10px;"> Tipo: ${type} • Porte: ${size} • Sexo: ${sex} • Idade: ${age}</li>
                                <li style="margin-bottom: 10px; font-style: bold"> <b>Endereço: ${street}, ${houseNumber} - ${city}/${uf}</b></li>
                            </ul>
                        </div>
                        <p>Não se esqueça que, ao adotar um animal na plataforma GetPet, o adotante <b>concorda</b> com os termos de adoção segura descritos na plataforma.</p>
                        <p>Acha que essa mensagem foi enviada por engano? Entre em contato através de <b>getpetcc@gmail.com</b></p>
                        <p style="color: gray"><i> <small> GetPet - Plataforma para doação e adoção de animais de estimação</small></i></p>
                    </body>`
        return str;
    }
}