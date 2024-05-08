// Récupère l'élément SVG
const worldMap = document.getElementById('world-map');
const oceanColorPicker = document.getElementById("oceanColorPicker");
const selectedColorPicker = document.getElementById("selectedColorPicker");
const borderColorPicker = document.getElementById("borderColorPicker");
const countryFlagList = document.getElementById('countryFlagList');
const countryLabels = countryFlagList.querySelectorAll('.country');

let isoCode;

// Ajoute un gestionnaire d'événements au survol de la carte
worldMap.addEventListener('mouseover', function(event) {
    // Vérifie si l'élément survolé est un <path> et s'il n'est pas déjà sélectionné
    if (event.target.tagName === 'path' && !event.target.classList.contains('selected')) {
        // Ajoute la classe "highlighted" au survol du pays
        event.target.classList.add('highlighted');
    }
});

// Supprime la surbrillance lorsque la souris quitte la carte
worldMap.addEventListener('mouseout', function(event) {
    // Vérifie si l'élément survolé est un <path> et s'il n'est pas déjà sélectionné
    if (event.target.tagName === 'path' && !event.target.classList.contains('selected')) {
        // Supprime la classe "highlighted" lorsque la souris quitte le pays
        event.target.classList.remove('highlighted');
    }
});

// Ajoute un gestionnaire d'événements au clic sur la carte
worldMap.addEventListener('click', function(event) {
    let selectedColor = selectedColorPicker.value;

    // Vérifie si l'élément cliqué est un <path>
    if (event.target.tagName === 'path') {

        isoCode = event.target.id;
        // Vérifie si le pays est déjà sélectionné (classe 'selected' présente)
        let isSelected = event.target.classList.contains('selected');

        // Si le pays est déjà sélectionné, retire la classe 'selected' (pour désélectionner)
        // Sinon, ajoute la classe 'selected' (pour sélectionner)
        if (isSelected) {
            let actualColor = event.target.getAttribute('data-selected-color');
            if(actualColor === selectedColor) {
                event.target.classList.remove('selected');
                event.target.style.fill = nonSelectedColorPicker.value;
            } else {
                event.target.setAttribute('data-selected-color', selectedColor);
                event.target.style.fill = selectedColor;
            }
            
        } else {
            event.target.classList.add('selected');
            event.target.style.removeProperty('fill');
            event.target.setAttribute('data-selected-color', selectedColor);
            event.target.classList.remove('highlighted');
        }
    }
});

oceanColorPicker.addEventListener('change', function() {
    let oceanColor = oceanColorPicker.value;
    worldMap.style.backgroundColor = oceanColor;
});

selectedColorPicker.addEventListener('change', function() {
    let selectedColor = selectedColorPicker.value;
    document.documentElement.style.setProperty('--selected-color', selectedColor);
    const selectedElements = document.querySelectorAll('.selected');
    selectedElements.forEach(function(element) {
        let actualColor = element.getAttribute('data-selected-color');
        element.style.fill = actualColor; // Nouvelle couleur de remplissage
    });

});

nonSelectedColorPicker.addEventListener('change', function() {
    let nonSelectedColor = nonSelectedColorPicker.value;
    const nonSelectedElements = document.querySelectorAll('path:not(.selected)');
    nonSelectedElements.forEach(function(element) {
        element.style.fill = nonSelectedColor; // Nouvelle couleur de remplissage
    });

    document.documentElement.style.setProperty('--non-selected-color', nonSelectedColor);
});

borderColorPicker.addEventListener('change', function() {
    let borderColor = borderColorPicker.value;
    document.documentElement.style.setProperty('--border-color', borderColor);
});


countryLabels.forEach(function(label) {
    label.addEventListener('click', function(event) {
        event.preventDefault(); // Annule le comportement par défaut de l'événement
        let isChecked = label.classList.contains('checked');
        if(isChecked) {
            label.classList.remove('checked');
        } else {
            label.classList.add('checked');
        }
        const input = this.querySelector('input[type="checkbox"]');
        if (input) {
            const value = input.value;
            changeColor(value);
        }
    });
});


function changeColor(countryCode) {
    let selectedColor = selectedColorPicker.value;
    let countryPath = document.getElementById(countryCode);
    let isSelected = countryPath.classList.contains('selected');

    if (isSelected) {
        let actualColor = countryPath.getAttribute('data-selected-color');
        if(actualColor === selectedColor) {
            countryPath.classList.remove('selected');
            countryPath.style.fill = nonSelectedColorPicker.value;
        } else {
            countryPath.setAttribute('data-selected-color', selectedColor);
            countryPath.style.fill = selectedColor;
        }
    } else {
        countryPath.classList.add('selected');
        countryPath.style.removeProperty('fill');
        countryPath.setAttribute('data-selected-color', selectedColor);
        countryPath.classList.remove('highlighted');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var filterInput = document.getElementById("countryFilter");
    var countries = document.querySelectorAll("#countryFlagList .country");

    filterInput.addEventListener("input", function() {
        var filterValue = this.value.toLowerCase();
        countries.forEach(function(country) {
            var countryName = country.textContent.toLowerCase();
            if (countryName.includes(filterValue)) {
                country.style.display = "flex";
            } else {
                country.style.display = "none";
            }
        });
    });
});