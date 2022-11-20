import { fetchAllPlayers, fetchSinglePlayer, addNewPlayer, removePlayer } from './ajaxHelpers';

const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

export const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if (!playerList || !playerList.length) {
    playerContainer.innerHTML = '<h3>No players to display!</h3>';
    return;
  }

  // Loop through the list of players, and construct some HTML to display each one
  let playerContainerHTML = '';
  for (let i = 0; i < playerList.length; i++) {
    const pup = playerList[i];
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
      </div>
    `;
    playerContainerHTML += pupHTML;
  }

  // After looping, fill the `playerContainer` div with the HTML we constructed above
  playerContainer.innerHTML = playerContainerHTML;

  // Now that the HTML for all players has been added to the DOM,
  // we want to grab those "See details" buttons on each player
  // and attach a click handler to each one
  let detailButtons = [...document.getElementsByClassName('detail-button')];
  for (let i = 0; i < detailButtons.length; i++) {
    const button = detailButtons[i];
    button.addEventListener('click', async () => {
      /*
        YOUR CODE HERE
      */
        const dataId = button.dataset.id;
        console.log(dataId);
        const player = await fetchSinglePlayer(dataId);
        console.log(player);
        renderSinglePlayer(player);
        });
      }
    
      //Delete Button Click Handler
      let deleteButtons = [...document.getElementsByClassName('delete-button')];
      for (let i = 0; i < deleteButtons.length; i++) {
        const button = deleteButtons[i];
        button.addEventListener('click', async () => {
          await removePlayer(button.dataset.id);
          const players = await fetchAllPlayers();
          renderAllPlayers(players);    
    });
  }
};

export const renderSinglePlayer = (playerObj) => {
  if (!playerObj || !playerObj.id) {
    playerContainer.innerHTML = "<h3>Couldn't find data for this player!</h3>";
    return;
  }

  let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      
      <button id="see-all">Back to all players</button>
    </div>`;

  playerContainer.innerHTML = pupHTML;
  const goBackButton = document.getElementById('see-all');
  console.log(goBackButton);

  goBackButton.addEventListener('click', async () => {
    console.log('clicked');
    const getAllPlayers = await fetchAllPlayers();
    const homePage = await renderAllPlayers(getAllPlayers);
  })
};

export const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;

  let form = document.querySelector('#new-player-form > form');
  form.addEventListener('submit', async (event) => {
    /*
      YOUR CODE HERE
    */
      event.preventDefault();
      let playerData = {
        name: form.elements.name.value,
        breed: form.elements.breed.value
      };
      const newPlayer = await addNewPlayer(playerData);
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
  
      renderNewPlayerForm();
      
  });
};