// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2209-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

export const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players`);
        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.players;
    } catch (err) {
        console.log('Uh oh, trouble fetching players!', err);
    }
};

export const fetchSinglePlayer = async (playerId) => {

// console.log(playerId);
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`);
        const result = await response.json();
        
        const dataOfPlayer = result.data.player; //takes away the full object and displays player object only
        return dataOfPlayer;
    } catch (error) {
        console.log('Uh oh, trouble fetching players!', error);
    }
};

export const addNewPlayer = async (playerObj) => {
    console.log(playerObj);
    try {
        const response = await fetch(
            `${APIURL}/players/`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(playerObj),
            }
          );
          const result = await response.json();
          console.log(result);
    } catch (error) {
        console.log('Could not add a new player!', error);
    }
};

export const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        if (result.error) throw result.error;
        return;
    } catch (err) {
        console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err);
    }
};