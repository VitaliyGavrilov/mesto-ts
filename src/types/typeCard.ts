export default interface CardEl {
  _id: number//id карточки
  name: string//имя карточки
  link: string//ссылка на изображение
  likes: [Id]//массив id пользователей поставивщих лайк
  owner: Id//id создателя карточки 
}

interface Id {
  _id: string
}
