var observer = new MutationObserver(function(mutations) {
    var mainContainer = document.querySelector('div[data-region="myoverview"]')
    if (mainContainer) {
        let cardsParent = document.querySelector('div[data-region="myoverview"] > div.container-fluid.p-0');
        let searchBar = document.createElement("input");
        searchBar.type = "text";
        searchBar.className = "form-control withclear";
        searchBar.placeholder = "Rechercher";
        searchBar.style.marginTop = "2px";
        searchBar.style.marginBottom = "5px";
        searchBar.addEventListener("input", function() { searchInCards(searchBar); });
        searchBar.addEventListener("paste", function() { searchInCards(searchBar); });
        mainContainer.insertBefore(searchBar, cardsParent);
        observer.disconnect();
    }
});



window.addEventListener('load', function() {
var mlDiv = document.querySelector('ul.nav.navbar-nav.usernav > li.nav-item');
var imgElement = document.createElement('img');
imgElement.src = 'https://cdn-icons-png.flaticon.com/512/6889/6889926.png';
imgElement.width = 25;
imgElement.height = 35;
imgElement.style.padding = '5px 0';
imgElement.style.cursor = 'pointer';
mlDiv.appendChild(imgElement);
imgElement.addEventListener('click', function() {
    window.location.reload();
    });
});


function lowerCaseAndNormalize(string) {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function searchInCards(searchBar) {
    let cardContainer = document.querySelector("#page-container-1 > div > div");
    if (searchBar.value) {
        for (const element of cardContainer.children) {
            let card = element.querySelector("div > div > a > span.multiline");
            if (lowerCaseAndNormalize(card.textContent).includes(lowerCaseAndNormalize(searchBar.value)))
                element.style.display = "flex";
            else
                element.style.display = "none";
        }
    } else {
        for (const element of cardContainer.children) {
            element.style.display = "flex";
        }
    }
}


observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true
});