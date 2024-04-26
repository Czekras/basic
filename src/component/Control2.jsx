export default function Control({ data }) {
  // console.log(data);

  return (
    <div className="control">
      <div className="control__wrapper">
        <ul className="control__list">
          {data.userList.length >= 1 ? (
            data.userList.map((item, index) => (
              <li key={index} className="control__item">
                <strong>{item.username}</strong>
                <p>{item.password}</p>
                {/* <button>
                  <span className="material-symbols-outlined">cancel</span>
                </button> */}
              </li>
            ))
          ) : (
            <small className="control__note">
              上記からベーシック認証を生成してください
            </small>
          )}
        </ul>
      </div>
    </div>
  );
}
