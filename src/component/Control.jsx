export default function Control({ data }) {
  const userList = data.userList;

  return (
    <div className="control">
      <div className="control__wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ユーザー名</th>
              <th>パスワード</th>
              <th>.passwdファイル名</th>
              <th>BASIC認証ページ</th>
            </tr>
          </thead>
          <tbody>
            {userList.length >= 1 ? (
              userList.map((item, index) => {
                const newIndex = (index += 1);

                return (
                  <tr key={index}>
                    <td>{newIndex}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.passwdFN}</td>
                    <td>
                      {item.pageFN}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
