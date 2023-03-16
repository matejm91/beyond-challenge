import React from "react";
import useFetch from "./fetchHook";

const App = () => {
  const { data, loading, error } = useFetch('http://localhost:3000')

  if (error) {
    console.log(error)
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {data && <div>{data.map((item: any) => <div key={item.followers}>{item.category_1}</div>)}</div>}
    </>
  )
}

export default App;