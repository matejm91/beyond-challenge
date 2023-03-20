import React, { useEffect, useState } from "react";
import { Influencer } from "../server/index";
import useInfluencers from "./useInfluencersHook";

const App = () => {
  const { fetchInfluencers, patchInfluencers, deleteInfluencerByInstaName, postInfluencerByInstaName } = useInfluencers()
  const [data, setData] = useState([])
  const [dataPerCategory, setDataPerCategory] = useState([])
  const [dataPerCountry, setDataPerCountry] = useState([])

  useEffect(() => {
    fetchInfluencers('category').then(res => {
      const dataArray = Object.keys(res).map(key => res[key])
      setDataPerCategory(dataArray)
    });
    fetchInfluencers('country').then(res => {
      const dataArray = Object.keys(res).map(key => res[key])
      setDataPerCountry(dataArray)
    });
    fetchInfluencers().then(res => setData(res));
  }, [])

  return (
    <>
      <button onClick={() => patchInfluencers().then(res => setData(res))}>patch _imyour_joy</button>
      <button onClick={() => deleteInfluencerByInstaName().then(res => setData(res))}>delete __youngbae__</button>
      <button onClick={() => postInfluencerByInstaName().then(res => setData(res))}>post dummy data</button>
      <h1>#1 PER CATEGORY, BY FOLLOWERS</h1>
      <table>
        <thead>
          <tr>
            <th>
              Influencer insta name
            </th>
            <th>
              instagram name
            </th>
            <th>
              category_1
            </th>
            <th>
              category_2
            </th>
            <th>
              Followers
            </th>
            <th>
              Audience country(mostly)
            </th>
            <th>
              Authentic engagement
            </th>
            <th>
              Engagement avg
            </th>
          </tr>
        </thead>
        <tbody>
          {dataPerCategory && dataPerCategory.map((item: Influencer, index: number) => <tr key={index}>
            <td>
              {item["Influencer insta name"]}
            </td>
            <td>
              {item["instagram name"]}
            </td>
            <td>
              {item["category_1"]}
            </td>
            <td>
              {item["category_2"]}
            </td>
            <td>
              {item["Followers"]}
            </td>
            <td>
              {item["Audience country(mostly)"]}
            </td>
            <td>
              {item["Authentic engagement"]}
            </td>
            <td>
              {item["Engagement avg"]}
            </td>
          </tr>)}
        </tbody>
      </table>

      <hr />
      <h1>#1 PER COUNTRY, BY ENGAGEMENT AVG</h1>
      <table>
        <thead>
          <tr>
            <th>
              Influencer insta name
            </th>
            <th>
              instagram name
            </th>
            <th>
              category_1
            </th>
            <th>
              category_2
            </th>
            <th>
              Followers
            </th>
            <th>
              Audience country(mostly)
            </th>
            <th>
              Authentic engagement
            </th>
            <th>
              Engagement avg
            </th>
          </tr>
        </thead>
        <tbody>
          {dataPerCountry && dataPerCountry.map((item: Influencer, index: number) => <tr key={index}>
            <td>
              {item["Influencer insta name"]}
            </td>
            <td>
              {item["instagram name"]}
            </td>
            <td>
              {item["category_1"]}
            </td>
            <td>
              {item["category_2"]}
            </td>
            <td>
              {item["Followers"]}
            </td>
            <td>
              {item["Audience country(mostly)"]}
            </td>
            <td>
              {item["Authentic engagement"]}
            </td>
            <td>
              {item["Engagement avg"]}
            </td>
          </tr>)}
        </tbody>
      </table>

      <hr />
      <h1>ALL INFLUENCERS LIST</h1>
      <table>
        <thead>
          <tr>
            <th>
              Influencer insta name
            </th>
            <th>
              instagram name
            </th>
            <th>
              category_1
            </th>
            <th>
              category_2
            </th>
            <th>
              Followers
            </th>
            <th>
              Audience country(mostly)
            </th>
            <th>
              Authentic engagement
            </th>
            <th>
              Engagement avg
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item: Influencer, index: number) => <tr key={index}>
            <td>
              {item["Influencer insta name"]}
            </td>
            <td>
              {item["instagram name"]}
            </td>
            <td>
              {item["category_1"]}
            </td>
            <td>
              {item["category_2"]}
            </td>
            <td>
              {item["Followers"]}
            </td>
            <td>
              {item["Audience country(mostly)"]}
            </td>
            <td>
              {item["Authentic engagement"]}
            </td>
            <td>
              {item["Engagement avg"]}
            </td>
          </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default App;