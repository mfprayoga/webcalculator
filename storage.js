const cacheKey = "calculation_history";

function checkStorage() {
    return typeof(Storage) !== "undefined"
}

function putHistory(data) {
   if (checkStorage()) {
       let historyData = null;
       if (localStorage.getItem(cacheKey) === null) {
           historyData = [];
       } else {
           historyData = JSON.parse(localStorage.getItem(cacheKey));
       }

       historyData.unshift(data);

       if (historyData.length > 5) {
           historyData.pop();
       }

       localStorage.setItem(cacheKey, JSON.stringify(historyData));
   }
}

function showHistory() {
   if (checkStorage()) {
       return JSON.parse(localStorage.getItem(cacheKey)) || [];
   } else {
       return [];
   }
}

function renderHistory() {
   const historyData = showHistory();
   let storageList = document.querySelector("#storageList");

   storageList.innerHTML = "";

   for (let history of historyData) {
       let row = document.createElement('tr');
       row.innerHTML = "<td>" + history.firstNumber + "</td>";
       row.innerHTML += "<td>" + history.operator + "</td>";
       row.innerHTML += "<td>" + history.secondNumber + "</td>";
       row.innerHTML += "<td>" + history.result + "</td>";

       storageList.appendChild(row);
   }
}

renderHistory();
