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

// const renderItems = ({
//   id,
//   itemName,
//   expiryDate,
//   highestBid,
//   highestBidderName,
// }) => {
//   return createElement('div', { className: 'item', id: id }, [
//     createElement('h3', { textContent: itemName }),
//     createElement('p', { innerHTML: `Highest Bid: ${highestBid}` }),
//     createElement('p', { innerHTML: `Bidder Name: ${highestBidderName}` }),
//     createElement('p', { innerHTML: `Expires: ${expiryDate}` }),
//   ]);
// };

// const renderForm = ({ id, itemName }) => {
//   return createElement('option', {
//     value: itemName,
//     textContent: itemName,
//     value: id,
//   });
// };

// async function printAllItems() {
//   const response = await fetch('/api/items');
//   const data = await response.json();
//   data.forEach((item) => wrapper.appendChild(renderItems(item)));
//   data.forEach((item) => select.appendChild(renderForm(item)));
// }

// printAllItems();

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const name = form.elements['name'].value;
//   const amount = form.elements['amount'].value;
//   const result = await fetch(`/api/items/${select.value}/bids`, {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify({
//       name: name,
//       amount: amount,
//     }),
//   });
// });
