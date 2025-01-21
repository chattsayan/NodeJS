const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender } = user;

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt={`${firstName} ${lastName}`} />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p>{`${age} years, ${gender}`}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center mt-5">
            <button className="btn btn-success">Interested</button>
            <button className="btn btn-error">Ignore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
