import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Output({ data }) {
  const path1 = data.userOptions.path1;
  const path2 = data.userOptions.path2;
  const domainName = data.userOptions.domainName;

  console.log('USERLIST', data.userList.length);

  let passwdFile = [
    {
      filename: '.htpasswd',
      filecode: [
        `<ユーザー名>:<エンコードパスワード>`,
        `# ユーザー名：<ユーザー名>`,
        `# パスワード：<パスワード>`,
      ],
    },
  ];

  let accessFile = {
    filename: '.htaccess',
    filecode: [
      `#ベーシック認証`,
      `AuthType Basic`,
      `AuthName "BASIC認証名"`,
      `# AuthUserFile <サーバーのパス>/${passwdFile[0]['filename']}`,
      `AuthUserFile C:/xampp/htdocs/50_tmpl/${passwdFile[0]['filename']}`,
      `require valid-user`,
    ],
  };

  if (data.userList.length === 1) {
    const item = data.userList[0];

    passwdFile = [
      {
        filename: '.htpasswd',
        filecode: [
          `${item.username}:${item.cryptFormat}`,
          `# ユーザー名：${item.username}`,
          `# パスワード：${item.password}`,
        ],
      },
    ];

    accessFile = {
      filename: '.htaccess',
      filecode: [
        `# ベーシック認証`,
        `AuthType Basic`,
        `AuthName "BASIC認証名"`,
        `AuthUserFile ${path1}/${domainName}/${path2}/${passwdFile[0]['filename']}`,
        `require valid-user`,
      ],
    };
  }

  if (data.userList.length >= 2) {
    accessFile = {
      filename: '.htpasswd',
      filecode: [`# ベーシック認証`],
    };

    passwdFile = [];

    data.userList.map((item, index) => {
      accessFile['filecode'].push(
        `<Files ${item.pageFN}>`,
        `AuthType Basic`,
        `AuthName "BASIC認証名"`,
        `AuthUserFile ${path1}/${domainName}/${path2}/${item.passwdFN}`,
        `AuthGroupFile /dev/null`,
        `require valid-user`,
        `</Files>\n`
      );

      passwdFile.push({
        filename: `.htpasswd-${item.username}`,
        filecode: [
          `${item.username}:${item.cryptFormat}`,
          `# ユーザー名：${item.username}`,
          `# パスワード：${item.password}`,
        ],
      });
    });
  }

  return (
    <div className="output">
      <div className="output__wrapper">
        <div className="output__item">
          <header>
            <h2>{accessFile['filename']}</h2>
            <small>下記のコードをファイルに追加してください</small>
          </header>
          <div className="output__item-code">
            <SyntaxHighlighter language="apache" style={style} showLineNumbers>
              {accessFile['filecode'].join('\n')}
            </SyntaxHighlighter>
          </div>
        </div>

        {data.userList.length >= 1 ? (
          passwdFile.map((item, index) => {
            return (
              <div className="output__item" key={index}>
                <header>
                  <h2>{item['filename']}</h2>
                  <small>
                    {item['filename']}
                    と同じ場所にファイルを作って、下記のコードを貼り付けてください
                  </small>
                </header>
                <div className="output__item-code">
                  <SyntaxHighlighter
                    language="apache"
                    style={style}
                    showLineNumbers
                  >
                    {item['filecode'].join('\n')}
                  </SyntaxHighlighter>
                </div>
              </div>
            );
          })
        ) : (
          <div className="output__item">
            <header>
              <h2>{passwdFile[0]['filename']}</h2>
              <small>
                {accessFile['filename']}
                と同じ場所にファイルを作って、下記のコードを貼り付けてください
              </small>
            </header>
            <div className="output__item-code">
              <SyntaxHighlighter
                language="apache"
                style={style}
                showLineNumbers
              >
                {passwdFile.map((item) => item['filecode'].join('\n'))}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
