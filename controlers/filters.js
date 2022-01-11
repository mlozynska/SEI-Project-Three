
import Park from '../models/parks_model.js'

export const getRegion = async (req, res) => {
  try {
    const { id } = req.params
    const region = await Park.find({
      region: id
    })
    if (!region) throw new Error(`no data available for ${id}`)
    res.status(200).json(region)

  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'error fetching region data' })
  }

}