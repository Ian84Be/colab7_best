import { useState } from 'react'

export const useForm = (callback: any, initialState = {}) => {
  const [formData, setFormData] = useState(initialState)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event, { searchQuery }) => {
    setSearchTerm(searchQuery)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    name === 'letMeKnow'
      ? setFormData({ ...formData, [name]: !formData[name] })
      : setFormData({ ...formData, [name]: value })
  }

  const handleDropdown = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    object
  ) => {
    const { name, value, searchQuery } = object
    // console.log('handle dropdown object', object)
    console.log('handle dropdown', name, value)
    console.log('handle dropdown searchQuery', searchQuery)
    setFormData((prevState) => {
      const newState = { [name]: value }
      if (name === 'food') newState.occasion = null
      if (name === 'occasion') newState.food = null
      if (name === 'location' || name === 'answer') setSearchTerm('')
      if (name === 'location' || name === 'answer') {
        const [location, placeId] = value.split('|')
        newState[name] = location
        newState.placeId = placeId
        setSearchTerm(location)
      }
      return {
        ...prevState,
        ...newState,
      }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await callback()
  }

  return {
    formData,
    handleSearchChange,
    handleChange,
    handleDropdown,
    handleSubmit,
    searchTerm,
  }
}
