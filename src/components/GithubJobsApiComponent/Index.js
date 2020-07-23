import React, { useState, useEffect } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container, Spinner } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import { withRouter } from "react-router-dom";

function Index(props) {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  useEffect(props.hideLoader, []);

  return (
    <Container className="my-12">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && (
        <h1>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </h1>
      )}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })
      ) : (
        <Container className="my-4">No jobs found</Container>
      )}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default withRouter(Index);
