import React, { useEffect, useState } from "react";
import useInfluencers from "./useInfluencersHook";

const App = () => {
  const { fetchInfluencers, patchInfluencers, deleteInfluencerByInstaName, postInfluencerByInstaName } = useInfluencers()
  const [data, setData] = useState([])

  useEffect(() => {
    fetchInfluencers().then(res => setData(res));
  }, [])

  return (
    <>
      <button onClick={() => patchInfluencers().then(res => setData(res))}>patch</button>
      <button onClick={() => deleteInfluencerByInstaName().then(res => setData(res))}>delete</button>
      <button onClick={() => postInfluencerByInstaName().then(res => setData(res))}>post</button>
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
          {data && data.map((item: any, index: number) => <tr key={index}>
            <td>
             {console.log(item)}
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