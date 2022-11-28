const logoutBtn = document.querySelector('.logout-button');
const mainPart = document.querySelector('.main-part');

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

const renderProfile = ({
  user_name,
  age,
  gender,
  height,
  weight,
  eye_color,
  country,
  additional_info,
}) => {
  return createElement('div', { className: 'profile-box' }, [
    createElement('h2', { innerText: user_name + ', ' + age }),
    createElement('h4', { innerText: gender + ' from ' + country }),
    createElement('div', { className: 'info-box' }, [
      createElement('h5', { innerText: 'Height:' }),
      createElement('p', { innerText: height + 'cm' }),
    ]),
    createElement('div', { className: 'info-box' }, [
      createElement('h5', { innerText: 'Weight:' }),
      createElement('p', { innerText: weight + 'kg' }),
    ]),
    createElement('div', { className: 'info-box' }, [
      createElement('h5', { innerText: 'Eye color:' }),
      createElement('p', { innerText: eye_color }),
    ]),
    createElement('div', { className: 'info-box' }, [
      createElement('h5', { innerText: 'Additional info:' }),
      createElement('p', { innerText: additional_info }),
    ]),
  ]);
};

const renderPhoto = ({ photo_path }) => {
  return createElement('img', { src: photo_path });
};

async function logout() {
  await fetch('http://localhost:3020/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  logout();
  window.location.pathname = '/';
});

(async function fetchProfile() {
  const id = window.location.pathname;
  const reposne = await fetch(`http://localhost:3020/api/user${id}`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await reposne.json();
  mainPart.appendChild(renderPhoto(data));
  mainPart.appendChild(renderProfile(data));
})();
