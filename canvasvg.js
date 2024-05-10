document.getElementById('button-cart').addEventListener('click', function() {
    var svg = document.getElementById('world-map');
    var oceanColor = getComputedStyle(document.documentElement).getPropertyValue('--ocean-color');
    var selectedColor = getComputedStyle(document.documentElement).getPropertyValue('--selected-color');
    var nonSelectedColor = getComputedStyle(document.documentElement).getPropertyValue('--non-selected-color');
    var borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color');

    // Appliquer les styles CSS directement au SVG
    var paths = svg.querySelectorAll('path');
    paths.forEach(function(path) {
        if (path.classList.contains('selected')) {
            path.setAttribute('fill', selectedColor);   
        } else {
            path.setAttribute('stroke', borderColor);
            path.setAttribute('stroke-width', '0.1');
            path.setAttribute('fill', nonSelectedColor);
        }
    });

    // Créer un conteneur pour le SVG avec les styles CSS
    var container = document.createElement('div');
    container.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="background-color: ' + oceanColor + '">' + svg.outerHTML + '</svg>';

    // Convertir le contenu HTML en image
    var svgBlob = new Blob([container.innerHTML], { type: 'image/svg+xml' });
    var svgUrl = URL.createObjectURL(svgBlob);

    // Attendre le chargement de l'image avant de la traiter
    var img = new Image();
    img.onload = function() {
        // Créer un canvas avec les dimensions souhaitées
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // Définir les dimensions souhaitées pour le canvas
        canvas.width = 4200; // Largeur du SVG
        canvas.height = 2971; // Hauteur du SVG

        // Dessiner le contenu SVG sur le canvas avec les dimensions souhaitées
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Obtenir les données de l'image au format PNG
        var dataURL = canvas.toDataURL('image/png');

        // Créer un élément de lien pour télécharger l'image
        var downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'image.png';
        
        // Ajouter le lien au body et déclencher le téléchargement
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Libérer l'URL objet pour le SVG
        URL.revokeObjectURL(svgUrl);
    };
    
    img.src = svgUrl;
});
