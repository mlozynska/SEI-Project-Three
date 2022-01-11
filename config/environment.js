import dotenv from 'dotenv'
dotenv.config()
export const port = process.env.PORT || 4000
// export const dbURI = 'mongodb://127.0.0.1:27017/London'
export const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/london-parks-api'
// export const dbURI = 'mongodb://localhost/london-parks-api'
export const secret = process.env.SECRET || 'dsh823FF2asd$d'