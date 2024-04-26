export default function Setting({ func, data }) {
  return (
    <section className="setting">
      <div className="setting__wrapper">
        <form
          className="form form--setting"
          onSubmit={(e) => func.handleGenerateInputs(e)}
          autoComplete="off"
        >
          <div className="form__item">
            {/* <label htmlFor="">ID:</label> */}
            <input
              type="text"
              value={data.inputUsername}
              name="username"
              placeholder="ユーザー名"
              onChange={(e) => func.handleInputChange(e)}
            />
          </div>
          <div className="form__item form__item--row">
            {/* <label htmlFor="">Password:</label> */}
            <input
              type="text"
              value={data.inputPassword}
              placeholder="パスワード"
              name="password"
              onChange={(e) => func.handleInputChange(e)}
            />
            <div className="form__button form__button--small">
              <button
                type="button"
                onClick={(e) => func.generateRandomPassword(e)}
              >
                ランダム
              </button>
            </div>
          </div>
          <div className="form__button">
            <button type="submit" disabled={data.generateDisabled}>
              生成
            </button>
            <button
              type="button"
              onClick={(e) => {
                func.handleResetInputs(e);
                func.handleResetAll(e);
              }}
              disabled={data.resetDisabled}
            >
              リセット
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
