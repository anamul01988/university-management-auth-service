import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0') //00000
  //increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementedId
}

// import { User } from './users.model'

// // let userIdCounter = 0

// export const findLastUserId = async () => {
//   const lastUser = await User.findOne({}, { id: 1, _id: 0 })
//     .sort({
//       createdAt: -1, //descending akare
//     })
//     .lean() //filed filtering and learn query for fast search
//   return lastUser?.id
// }

// export const generateUserId = async () => {
//   const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
//   const increamentedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
//   return increamentedId
// }
// // export const generateUserId = () => {
// //   userIdCounter++
// //   return `U${userIdCounter.toString().padStart(5, '0')}`
// // }
