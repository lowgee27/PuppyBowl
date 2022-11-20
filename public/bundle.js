/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ajaxHelpers.js":
/*!*******************************!*\
  !*** ./client/ajaxHelpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAllPlayers": () => (/* binding */ fetchAllPlayers),
/* harmony export */   "fetchSinglePlayer": () => (/* binding */ fetchSinglePlayer),
/* harmony export */   "addNewPlayer": () => (/* binding */ addNewPlayer),
/* harmony export */   "removePlayer": () => (/* binding */ removePlayer)
/* harmony export */ });
// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2209-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players`);
        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.players;
    } catch (err) {
        console.log('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {

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

const addNewPlayer = async (playerObj) => {
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

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        if (result.error) throw result.error;
        return;
    } catch (err) {
        console.log(`Whoops, trouble removing player #${playerId} from the roster!`, err);
    }
};

/***/ }),

/***/ "./client/renderHelpers.js":
/*!*********************************!*\
  !*** ./client/renderHelpers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAllPlayers": () => (/* binding */ renderAllPlayers),
/* harmony export */   "renderSinglePlayer": () => (/* binding */ renderSinglePlayer),
/* harmony export */   "renderNewPlayerForm": () => (/* binding */ renderNewPlayerForm)
/* harmony export */ });
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");


const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

const renderAllPlayers = (playerList) => {
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
        const player = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchSinglePlayer)(dataId);
        console.log(player);
        renderSinglePlayer(player);
        });
      }
    
      //Delete Button Click Handler
      let deleteButtons = [...document.getElementsByClassName('delete-button')];
      for (let i = 0; i < deleteButtons.length; i++) {
        const button = deleteButtons[i];
        button.addEventListener('click', async () => {
          await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.removePlayer)(button.dataset.id);
          const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
          renderAllPlayers(players);    
    });
  }
};

const renderSinglePlayer = (playerObj) => {
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
    const getAllPlayers = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
    const homePage = await renderAllPlayers(getAllPlayers);
  })
};

const renderNewPlayerForm = () => {
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
      const newPlayer = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.addNewPlayer)(playerData);
      const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
      renderAllPlayers(players);
  
      renderNewPlayerForm();
      
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers */ "./client/ajaxHelpers.js");
/* harmony import */ var _renderHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderHelpers */ "./client/renderHelpers.js");



const init = async () => {
  const players = await (0,_ajaxHelpers__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderAllPlayers)(players)

  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderNewPlayerForm)()
}

init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdXBweWJvd2wtd29ya3Nob3AvLi9jbGllbnQvYWpheEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L3JlbmRlckhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELFdBQVc7O0FBRS9EO0FBQ1A7QUFDQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVPOztBQUVQO0FBQ0E7QUFDQSx3Q0FBd0MsT0FBTyxXQUFXLFNBQVM7QUFDbkU7O0FBRUEsZ0RBQWdEO0FBQ2hEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0NBQXdDLE9BQU8sV0FBVyxTQUFTO0FBQ25FO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx3REFBd0QsU0FBUztBQUNqRTtBQUNBLEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0QrRjs7QUFFL0Y7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsU0FBUztBQUMxQyxtQ0FBbUMsT0FBTztBQUMxQztBQUNBLG9CQUFvQixhQUFhLGtCQUFrQixTQUFTO0FBQzVELGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEJBQTBCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLCtEQUFpQjtBQUM5QztBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsMEJBQTBCO0FBQy9DO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQVk7QUFDNUIsZ0NBQWdDLDZEQUFlO0FBQy9DLG9DO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZUFBZTtBQUM5QyxpQ0FBaUMsYUFBYTtBQUM5QztBQUNBLGlCQUFpQixvREFBb0Q7QUFDckUsa0JBQWtCLGdCQUFnQjs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyw2REFBZTtBQUMvQztBQUNBLEdBQUc7QUFDSDs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBEQUFZO0FBQzFDLDRCQUE0Qiw2REFBZTtBQUMzQzs7QUFFQTs7QUFFQSxHQUFHO0FBQ0gsRTs7Ozs7O1VDeEhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ04rQztBQUN3Qjs7QUFFdkU7QUFDQSx3QkFBd0IsNkRBQWU7QUFDdkMsRUFBRSxpRUFBZ0I7O0FBRWxCLEVBQUUsb0VBQW1CO0FBQ3JCOztBQUVBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFkZCB5b3VyIGNvaG9ydCBuYW1lIHRvIHRoZSBjb2hvcnROYW1lIHZhcmlhYmxlIGJlbG93LCByZXBsYWNpbmcgdGhlICdDT0hPUlQtTkFNRScgcGxhY2Vob2xkZXJcbmNvbnN0IGNvaG9ydE5hbWUgPSAnMjIwOS1GVEItRVQtV0VCLVBUJztcbi8vIFVzZSB0aGUgQVBJVVJMIHZhcmlhYmxlIGZvciBmZXRjaCByZXF1ZXN0c1xuY29uc3QgQVBJVVJMID0gYGh0dHBzOi8vZnNhLXB1cHB5LWJvd2wuaGVyb2t1YXBwLmNvbS9hcGkvJHtjb2hvcnROYW1lfS9gO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxQbGF5ZXJzID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJVVJMfS9wbGF5ZXJzYCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LmVycm9yO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEucGxheWVycztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VoIG9oLCB0cm91YmxlIGZldGNoaW5nIHBsYXllcnMhJywgZXJyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hTaW5nbGVQbGF5ZXIgPSBhc3luYyAocGxheWVySWQpID0+IHtcblxuLy8gY29uc29sZS5sb2cocGxheWVySWQpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJVVJMfS9wbGF5ZXJzLyR7cGxheWVySWR9YCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRhdGFPZlBsYXllciA9IHJlc3VsdC5kYXRhLnBsYXllcjsgLy90YWtlcyBhd2F5IHRoZSBmdWxsIG9iamVjdCBhbmQgZGlzcGxheXMgcGxheWVyIG9iamVjdCBvbmx5XG4gICAgICAgIHJldHVybiBkYXRhT2ZQbGF5ZXI7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1VoIG9oLCB0cm91YmxlIGZldGNoaW5nIHBsYXllcnMhJywgZXJyb3IpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBhZGROZXdQbGF5ZXIgPSBhc3luYyAocGxheWVyT2JqKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGxheWVyT2JqKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICAgICAgYCR7QVBJVVJMfS9wbGF5ZXJzL2AsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGxheWVyT2JqKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb3VsZCBub3QgYWRkIGEgbmV3IHBsYXllciEnLCBlcnJvcik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVBsYXllciA9IGFzeW5jIChwbGF5ZXJJZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJVVJMfS9wbGF5ZXJzLyR7cGxheWVySWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LmVycm9yO1xuICAgICAgICByZXR1cm47XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBXaG9vcHMsIHRyb3VibGUgcmVtb3ZpbmcgcGxheWVyICMke3BsYXllcklkfSBmcm9tIHRoZSByb3N0ZXIhYCwgZXJyKTtcbiAgICB9XG59OyIsImltcG9ydCB7IGZldGNoQWxsUGxheWVycywgZmV0Y2hTaW5nbGVQbGF5ZXIsIGFkZE5ld1BsYXllciwgcmVtb3ZlUGxheWVyIH0gZnJvbSAnLi9hamF4SGVscGVycyc7XG5cbmNvbnN0IHBsYXllckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGwtcGxheWVycy1jb250YWluZXInKTtcbmNvbnN0IG5ld1BsYXllckZvcm1Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXBsYXllci1mb3JtJyk7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJBbGxQbGF5ZXJzID0gKHBsYXllckxpc3QpID0+IHtcbiAgLy8gRmlyc3QgY2hlY2sgaWYgd2UgaGF2ZSBhbnkgZGF0YSBiZWZvcmUgdHJ5aW5nIHRvIHJlbmRlciBpdCFcbiAgaWYgKCFwbGF5ZXJMaXN0IHx8ICFwbGF5ZXJMaXN0Lmxlbmd0aCkge1xuICAgIHBsYXllckNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGgzPk5vIHBsYXllcnMgdG8gZGlzcGxheSE8L2gzPic7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBsaXN0IG9mIHBsYXllcnMsIGFuZCBjb25zdHJ1Y3Qgc29tZSBIVE1MIHRvIGRpc3BsYXkgZWFjaCBvbmVcbiAgbGV0IHBsYXllckNvbnRhaW5lckhUTUwgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHVwID0gcGxheWVyTGlzdFtpXTtcbiAgICBsZXQgcHVwSFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzaW5nbGUtcGxheWVyLWNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1pbmZvXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJwdXAtdGl0bGVcIj4ke3B1cC5uYW1lfTwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cInB1cC1udW1iZXJcIj4jJHtwdXAuaWR9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGltZyBzcmM9XCIke3B1cC5pbWFnZVVybH1cIiBhbHQ9XCJwaG90byBvZiAke3B1cC5uYW1lfSB0aGUgcHVwcHlcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRldGFpbC1idXR0b25cIiBkYXRhLWlkPSR7cHVwLmlkfT5TZWUgZGV0YWlsczwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICBwbGF5ZXJDb250YWluZXJIVE1MICs9IHB1cEhUTUw7XG4gIH1cblxuICAvLyBBZnRlciBsb29waW5nLCBmaWxsIHRoZSBgcGxheWVyQ29udGFpbmVyYCBkaXYgd2l0aCB0aGUgSFRNTCB3ZSBjb25zdHJ1Y3RlZCBhYm92ZVxuICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gcGxheWVyQ29udGFpbmVySFRNTDtcblxuICAvLyBOb3cgdGhhdCB0aGUgSFRNTCBmb3IgYWxsIHBsYXllcnMgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIERPTSxcbiAgLy8gd2Ugd2FudCB0byBncmFiIHRob3NlIFwiU2VlIGRldGFpbHNcIiBidXR0b25zIG9uIGVhY2ggcGxheWVyXG4gIC8vIGFuZCBhdHRhY2ggYSBjbGljayBoYW5kbGVyIHRvIGVhY2ggb25lXG4gIGxldCBkZXRhaWxCdXR0b25zID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RldGFpbC1idXR0b24nKV07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGV0YWlsQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRldGFpbEJ1dHRvbnNbaV07XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLypcbiAgICAgICAgWU9VUiBDT0RFIEhFUkVcbiAgICAgICovXG4gICAgICAgIGNvbnN0IGRhdGFJZCA9IGJ1dHRvbi5kYXRhc2V0LmlkO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhSWQpO1xuICAgICAgICBjb25zdCBwbGF5ZXIgPSBhd2FpdCBmZXRjaFNpbmdsZVBsYXllcihkYXRhSWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIpO1xuICAgICAgICByZW5kZXJTaW5nbGVQbGF5ZXIocGxheWVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgXG4gICAgICAvL0RlbGV0ZSBCdXR0b24gQ2xpY2sgSGFuZGxlclxuICAgICAgbGV0IGRlbGV0ZUJ1dHRvbnMgPSBbLi4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGVsZXRlLWJ1dHRvbicpXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVsZXRlQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBidXR0b24gPSBkZWxldGVCdXR0b25zW2ldO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgcmVtb3ZlUGxheWVyKGJ1dHRvbi5kYXRhc2V0LmlkKTtcbiAgICAgICAgICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKCk7XG4gICAgICAgICAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzKTsgICAgXG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJTaW5nbGVQbGF5ZXIgPSAocGxheWVyT2JqKSA9PiB7XG4gIGlmICghcGxheWVyT2JqIHx8ICFwbGF5ZXJPYmouaWQpIHtcbiAgICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gXCI8aDM+Q291bGRuJ3QgZmluZCBkYXRhIGZvciB0aGlzIHBsYXllciE8L2gzPlwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwdXBIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJzaW5nbGUtcGxheWVyLXZpZXdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItaW5mb1wiPlxuICAgICAgICA8cCBjbGFzcz1cInB1cC10aXRsZVwiPiR7cGxheWVyT2JqLm5hbWV9PC9wPlxuICAgICAgICA8cCBjbGFzcz1cInB1cC1udW1iZXJcIj4jJHtwbGF5ZXJPYmouaWR9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8cD5UZWFtOiAke3BsYXllck9iai50ZWFtID8gcGxheWVyT2JqLnRlYW0ubmFtZSA6ICdVbmFzc2lnbmVkJ308L3A+XG4gICAgICA8cD5CcmVlZDogJHtwbGF5ZXJPYmouYnJlZWR9PC9wPlxuICAgICAgXG4gICAgICA8YnV0dG9uIGlkPVwic2VlLWFsbFwiPkJhY2sgdG8gYWxsIHBsYXllcnM8L2J1dHRvbj5cbiAgICA8L2Rpdj5gO1xuXG4gIHBsYXllckNvbnRhaW5lci5pbm5lckhUTUwgPSBwdXBIVE1MO1xuICBjb25zdCBnb0JhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VlLWFsbCcpO1xuICBjb25zb2xlLmxvZyhnb0JhY2tCdXR0b24pO1xuXG4gIGdvQmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xuICAgIGNvbnN0IGdldEFsbFBsYXllcnMgPSBhd2FpdCBmZXRjaEFsbFBsYXllcnMoKTtcbiAgICBjb25zdCBob21lUGFnZSA9IGF3YWl0IHJlbmRlckFsbFBsYXllcnMoZ2V0QWxsUGxheWVycyk7XG4gIH0pXG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyTmV3UGxheWVyRm9ybSA9ICgpID0+IHtcbiAgbGV0IGZvcm1IVE1MID0gYFxuICAgIDxmb3JtPlxuICAgICAgPGxhYmVsIGZvcj1cIm5hbWVcIj5OYW1lOjwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiIC8+XG4gICAgICA8bGFiZWwgZm9yPVwiYnJlZWRcIj5CcmVlZDo8L2xhYmVsPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJyZWVkXCIgLz5cbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgYDtcbiAgbmV3UGxheWVyRm9ybUNvbnRhaW5lci5pbm5lckhUTUwgPSBmb3JtSFRNTDtcblxuICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcGxheWVyLWZvcm0gPiBmb3JtJyk7XG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgLypcbiAgICAgIFlPVVIgQ09ERSBIRVJFXG4gICAgKi9cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgcGxheWVyRGF0YSA9IHtcbiAgICAgICAgbmFtZTogZm9ybS5lbGVtZW50cy5uYW1lLnZhbHVlLFxuICAgICAgICBicmVlZDogZm9ybS5lbGVtZW50cy5icmVlZC52YWx1ZVxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5ld1BsYXllciA9IGF3YWl0IGFkZE5ld1BsYXllcihwbGF5ZXJEYXRhKTtcbiAgICAgIGNvbnN0IHBsYXllcnMgPSBhd2FpdCBmZXRjaEFsbFBsYXllcnMoKTtcbiAgICAgIHJlbmRlckFsbFBsYXllcnMocGxheWVycyk7XG4gIFxuICAgICAgcmVuZGVyTmV3UGxheWVyRm9ybSgpO1xuICAgICAgXG4gIH0pO1xufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZldGNoQWxsUGxheWVycyB9IGZyb20gJy4vYWpheEhlbHBlcnMnXG5pbXBvcnQgeyByZW5kZXJBbGxQbGF5ZXJzLCByZW5kZXJOZXdQbGF5ZXJGb3JtIH0gZnJvbSAnLi9yZW5kZXJIZWxwZXJzJ1xuXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKClcbiAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzKVxuXG4gIHJlbmRlck5ld1BsYXllckZvcm0oKVxufVxuXG5pbml0KCk7XG4iXSwic291cmNlUm9vdCI6IiJ9