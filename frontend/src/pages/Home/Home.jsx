import React from 'react'
import Header from '../../components/common/Header'
import FeaturedJobs from '../../components/Jobs/FeaturatedJobs'
import Blogs from '../Blog/Blogs'

const Home = () => {
  return (
    <div>
      <Header/>
      <FeaturedJobs/>
        <Blogs/>
    </div>
  )
}

export default Home
