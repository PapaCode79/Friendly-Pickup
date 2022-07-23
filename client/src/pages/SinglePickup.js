import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_PICKUP } from '../utils/queries';

const SinglePickup = (props) => {
  const { id: pickupId } = useParams();

  const { loading, data } = useQuery(QUERY_PICKUP, {
    variables: { id: pickupId },
  });

  const pickup = data?.pickup || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {pickup.username}
          </span>{' '}
          pickup on {pickup.createdAt}
        </p>
        <div className="card-body">
          <p>{pickup.pickupText}</p>
        </div>
      </div>

      {pickup.reactionCount > 0 && (
        <ReactionList reactions={pickup.reactions} />
      )}

      {Auth.loggedIn() && <ReactionForm pickupId={pickup._id} />}
    </div>
  );
};

export default SinglePickup;
