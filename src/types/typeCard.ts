export default interface CardEl {
  _id: number//id карточки
  name: string//имя карточки
  link: string//ссылка на изображение
  likes: [Id]//массив id пользователей поставивщих лайк
  owner: dataOwner//данные создателя карточки 
}

type dataOwner = {
  _id: string// id создателя карточки
  name: string// имя создателя карточки 
  about: string// второе имя создателя
}

type Id = {
  _id: string
}
