const message = `Conocí a una chica realmente hermosa, su sonrisa era tan única, tan diferente, me traía paz y tranquilidad, éramos de mundos totalmente opuestos ella era un sol que iluminaba a todos con esa sonrisa tan hermosa, sus ojos marrones destacaban en ella, su cabello lacio era totalmente envidiable, era simplemente única <3, un día llegó a mi vida sin razón alguna, un simple "Hola" me dio a conocer a una valiosa persona, estar con ella simplemente te da paz, por su amor y sinceridad, no mostró un lado malo, ni maldad en su corazón, mostró su lado único y valioso, y descubrí que estaba rota, pero daba lo mejor de ella, ese dolor y sufrimiento va sanando igual que su mente, es única e irremplazable, es mi sol y yo su pequeña luna... Y siempre lo diré... Desde el día en que te conocí, mi vida ha cambiado de una manera tan maravillosa que apenas puedo creerlo. Tu presencia en mi vida ha llenado cada rincón de mi ser de alegría, amor y felicidad, y único que no puedo evitar sentirme afortunada de tenerte a mi lado. Siempre estás ahí para escucharme, para entenderme y para brindarme tu amor sin reservas. Tu capacidad para amar y tu bondad infinita me han enseñado tanto sobre el verdadero significado de la vida y el valor de las relaciones significativas. Tu forma de ver el mundo y tu enfoque positivo de la vida me han contagiado de energía y me han inspirado a ser una mejor persona cada día. Tu presencia en mi vida ha hecho que todo sea más hermoso, más significativo y más valioso. No puedo imaginar mi vida sin ti, y no quiero hacerlo. Eres esa persona a la que puedo acudir en cualquier momento, sin importar lo bueno o lo malo que esté pasando en mi vida. Siempre encuentras la manera de levantarme cuando estoy abatido y de celebrar conmigo mis logros. Tu apoyo incondicional y tu amor me han dado fuerza y ​​confianza para enfrentar cualquier desafío que la vida me presente. Quiero que sepas que valoro cada momento que hemos compartido juntos y que guarda esos recuerdos preciosos en lo más profundo de mi corazón. Cada risa, cada lágrima, cada aventura y cada momento de intimidad son tesoros que atesoro en mi alma.`;

const messageContainer = document.getElementById('magicMessage');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    messageContainer.innerHTML = ''; // limpiar mensaje
    let index = 0;

    function showNextChar() {
        if (index < message.length) {
            messageContainer.innerHTML += message[index];
            index++;
            setTimeout(showNextChar, 25); // velocidad de aparición
        }
    }

    showNextChar();
});
