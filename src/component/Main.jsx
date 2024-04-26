import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import md5 from 'md5';
import { Buffer } from 'buffer';

import settings from '../data/settings.json';
import Setting from './Setting';
import Control from './Control';
import Output from './Output';

export default function Main() {
  const [userList, setUserList] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  const [userListCount, setUserListCount] = useState(1);

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => {
    const localList = localStorage.getItem('basicArrays');
    loadSetting(localList, settings);
  }, []);

  const loadSetting = (list, setting) => {
    if (!list) {
      localStorage.setItem('basicArrays', JSON.stringify(setting.initialList));
      localStorage.setItem(
        'basicOptions',
        JSON.stringify(setting.initialOption)
      );
    }

    const localList = JSON.parse(localStorage.getItem('basicArrays'));
    const localOption = JSON.parse(localStorage.getItem('basicOptions'));

    setUserList(localList);
    setUserOptions(localOption);
  };

  const generateMD5Format = (pass) => {
    const md5Pass = md5(pass);
    return md5Pass;
  };

  const generateRandomPassword = (e) => {
    e.preventDefault();
    const randPass = nanoid(12);
    setInputPassword(randPass);
  };

  const handleUpdateStorage = (item, target) => {
    const stringItem = JSON.stringify(item);

    if (target === 'array') {
      localStorage.setItem('basicArrays', stringItem);
    }
  };

  const handleResetAll = (e) => {
    e.preventDefault();
    setUserList([]);
    setUserListCount(1);
    handleUpdateStorage([], 'array');
  };

  const handleResetInputs = (e) => {
    e.preventDefault();
    setInputUsername('');
    setInputPassword('');
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === 'username') setInputUsername(value);
    if (name === 'password') setInputPassword(value);
  };

  const handleGenerateInputs = (e) => {
    e.preventDefault();

    setUserListCount(userListCount + 1);

    const formData = new FormData(e.target);
    const itemUser = formData.get('username');
    const itemPass = formData.get('password');
    const itemCrypt = generateMD5Format(`${itemUser}:${itemPass}`);
    // const itemCrypt = Buffer.from(`${itemUser}:${itemPass}`).toString('base64');

    const item =
      userListCount <= 1
        ? {
            username: itemUser,
            password: itemPass,
            cryptFormat: itemCrypt,
            passwdFN: `.htpasswd-${itemUser}`,
            pageFN: `example-page${userListCount}`,
          }
        : {
            username: itemUser,
            password: itemPass,
            cryptFormat: itemCrypt,
            passwdFN: `.htpasswd-${itemUser}`,
            pageFN: `example-page${userListCount}`,
          };

    const newItem = [...userList, item];

    setInputUsername('');
    setInputPassword('');

    setUserList(newItem);
    handleUpdateStorage(newItem, 'array');

    // console.log(userListCount);
    // console.log('userlist', userList);
    // console.log('ITEM', item);
  };

  const customHeight = userListCount <= 2 ? 'dvh100' : '';

  return (
    <main className="main cmn-px">
      <section className={`main__wrapper ${customHeight}`}>
        <Setting
          func={{
            generateRandomPassword: generateRandomPassword,
            handleInputChange: handleInputChange,
            handleResetInputs: handleResetInputs,
            handleResetAll: handleResetAll,
            handleGenerateInputs: handleGenerateInputs,
          }}
          data={{
            inputUsername: inputUsername,
            inputPassword: inputPassword,
          }}
        />
        {/* <Control
          data={{
            userList: userList,
          }}
        /> */}
        <Output data={{ userList: userList, userOptions: userOptions }} />
      </section>
    </main>
  );
}
