import './standard.scss';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import axios from 'axios';

import { DocumentNode } from '../../components/DocumentNode';
import { LoadingAndErrorIndicator } from '../../components/LoadingAndErrorIndicator';
import { useEnvironment } from '../../hooks';
import { Document } from '../../types';

export const ShowStandard = ({ id }) => {
  const { apiUrl } = useEnvironment();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ standards: Document[]; total_pages: number }>();
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/standard/${id}`, {
      params: {
        page: page - 1,
      }
    })
    .then(function (response) {
      setData(response.data);
      setLoading(false);
      setError('');
    })
    .catch(function (error) {
      console.log(error);
      setError(error);
    });
  }, []);

  const documents = data?.standards || [];

  return (
    <>
      <div className="standard-page">
        <h4 className="standard-page__heading">{id}</h4>
        <LoadingAndErrorIndicator loading={loading} error={error} />
        {!loading &&
          !error &&
          documents.map((standard, i) => (
            <div key={i} className="accordion ui fluid styled standard-page__links-container">
              <DocumentNode node={standard} />
            </div>
          ))}
        {data && data.total_pages > 1 && (
          <div className="pagination-container">
            <Pagination
              onPageChange={(_, d) => setPage(d.activePage as number)}
              totalPages={data.total_pages}
            />
          </div>
        )}
      </div>
    </>
  );
}

export const Standard = () => {
  const { id } = useParams();
  return <ShowStandard id={id} />
};
