import axios from "axios"
const influencersService = 'http://localhost:3000';

export default function useInfluencers() {
  async function fetchInfluencers () {
    try {
      const response = await axios.get(influencersService)
      return response.data
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function postInfluencerByInstaName() {
    try {
      const newUserData = { 'Influencer insta name': 'new user test', 'instagram name': 'new user', 
      'category_1': 'cars',
      'category_2': 'movies',
      'Followers': '10K',
      'Audience country(mostly)': 'Bosnia',
      'Authentic engagement': '1K',
      'Engagement avg': '1K',
    };
      const response = await axios.post(`${influencersService}/instagram-influencers`, newUserData)
      return response.data
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function patchInfluencers() {
    try {
      const userToPatch = { 'Influencer insta name': 'test_test', 'instagram name': 'test'};
      const response = await axios.put(`${influencersService}/instagram-influencers/_imyour_joy`, userToPatch)
      return response.data
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function deleteInfluencerByInstaName() {
    try {
      const response = await axios.delete(`${influencersService}/instagram-influencers/__youngbae__`)
      return response.data
    } catch (err) {
      console.log('error: ', err)
    }
  }

  return { 
    fetchInfluencers,
    patchInfluencers,
    deleteInfluencerByInstaName,
    postInfluencerByInstaName
 }
}