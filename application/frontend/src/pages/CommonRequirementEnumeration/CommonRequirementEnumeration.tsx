import './commonRequirementEnumeration.scss';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { DocumentNode } from '../../components/DocumentNode';
import { LoadingAndErrorIndicator } from '../../components/LoadingAndErrorIndicator';
import { DOCUMENT_TYPE_NAMES } from '../../const';
import { useEnvironment } from '../../hooks';
import { Document } from '../../types';
import { getLinksByType } from '../../utils';

export const ShowCommonRequirementEnumeration = ({id}) => {
  const { apiUrl } = useEnvironment();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ data: Document;}>();
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`${apiUrl}/id/${id}`)
    .then(function (response) {
      setData(response.data);
      setLoading(false);
      setError('');
    })
    .catch(function (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    });
  }, []);

  const cre = data?.data;
  const linksByType = useMemo(() => (cre ? getLinksByType(cre) : {}), [cre]);

  return (
    <div className="cre-page">
      <LoadingAndErrorIndicator loading={loading} error={error} />
      {!loading && !error && cre && (
        <>
          <h4 className="cre-page__heading">{cre.name}</h4>
          <h5 className="cre-page__sub-heading">{cre.id}</h5>
          <div className="cre-page__description">{cre.description}</div>
          <div className="cre-page__links-container">
            { Object.keys(linksByType).length > 0
              && Object.entries(linksByType).map(([type, links]) => (
                <div className="cre-page__links" key={type}>
                  <div className="cre-page__links-header">
                    {cre.name} is <b>{DOCUMENT_TYPE_NAMES[type]}</b>:
                  </div>
                  {links.map((link, i) => (
                    <div key={i} className="accordion ui fluid styled cre-page__links-container">
                      <DocumentNode node={link.document} />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export const CommonRequirementEnumeration = () => {
  const { id } = useParams();
  return <ShowCommonRequirementEnumeration id={id}/>
};
