import React from 'react';
import { Link } from 'react-router-dom';

const PickupList = ({ pickups, title }) => {
  if (!pickups.length) {
    return <h3>No Pickups Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {pickups &&
        pickups.map(pickup => (
          <div key={pickup._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${pickup.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {pickup.username}
              </Link>{' '}
              pickup on {pickup.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/pickup/${pickup._id}`}>
                <p>{pickup.pickupText}</p>
                <p className="mb-0">
                  Reactions: {pickup.reactionCount} || Click to{' '}
                  {pickup.reactionCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PickupList;
