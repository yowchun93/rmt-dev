import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Header, Sidebar, JobList, JobItemContent, ResultsCount, SortingControls, PaginationControls, SearchForm } from './components'

import { useActiveId, useJobItems } from '../lib/hooks'
import { JobItemExpanded } from '../lib/types'

type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
}

// add customHook for activeID


function App() {
  const [ searchText, setSearchText] = useState("");
  // const [ jobItems, setJobItems ] = useState([]);

  // derivedState
  const { jobItemsSliced, isLoading } = useJobItems(searchText);
  const activeId = useActiveId();
  const jobItem = useJobItem(activeId);


  // using state to trackURL

  // useEffect()

  // const fetchData = async () => {
  //   const response = await fetch(

  //   )
  //   const data = await response.json();
  //   setJobItems(data.jobItems);
  // }

  // prevent prop-drilling using Children pattern
  return (
    <>
      <Header>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar jobItems={jobItems} />
          <div className="sidebar__top">
            <ResultsCount />
            <SortingControls />
          </div>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>


        <JobItemContent />
      </Container>
    </>
  )
}

export default App
