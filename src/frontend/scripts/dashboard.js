const logoutBtn = document.querySelector('.logout-button');
const userList = document.querySelector('.userlist');

const createElement = (tagName, properties = null, children = []) => {
  const element = document.createElement(tagName);

  if (properties !== null) {
    for (let key in properties) {
      const value = properties[key];
      element[key] = value;
    }
  }

  children.forEach((child) => {
    element.appendChild(child);
  });

  return element;
};

const renderUser = ({ user_id, user_name, age, photo_path }) => {
  return createElement('div', { className: 'userbox' }, [
    createElement(
      'a',
      {
        innerText: user_name + ', ' + age,
        className: 'profile',
        href: user_id,
      },
      [
        createElement('img', {
          src: photo_path,
          alt: user_name,
        }),
      ]
    ),
  ]);
};

async function logout() {
  await fetch('http://localhost:3020/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

(async function listUsers() {
  const response = await fetch('http://localhost:3020/api/users', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  console.log(data);
  data.forEach((user) => {
    userList.appendChild(renderUser(user));
  });
})();

logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  logout();
  window.location.pathname = '/';
});
