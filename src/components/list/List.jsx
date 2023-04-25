import React, { useState } from 'react';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import './styles.css';

const List = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepositories = async () => {
    setIsLoading(true);
    fetch('https://api.github.com/users/devpass-tech/repos')
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        console.log(data);
        setRepositories(data);
      })
      .catch((error) => {
        console.error('Error fetching', error);
        setRepositories([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="list">
      <div className="container">
        <h2 className="title">Devpass Repositories</h2>

        {isLoading ? (
          <Spinner />
        ) : (
          <ListGroup className="repositoriesList">
            {repositories.map((repo) => (
              <ListGroup.Item key={repo.name}>{repo.name}</ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Button
          data-testid="button"
          className="button"
          variant="primary"
          onClick={() => fetchRepositories()}
        >
          Fetch repositories
        </Button>
      </div>
    </div>
  );
};

export default List;
