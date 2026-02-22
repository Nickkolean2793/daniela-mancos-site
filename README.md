# Daniela Mancos - Hair Styling Website

Website modern pentru servicii de hair styling, creat pentru Daniela Mancos.

## Structura Proiectului

```
DM/
├── index.html          # Pagina principală
├── programare.html     # Pagina de programare online
├── cursuri.html        # Pagina de cursuri
├── contact.html        # Pagina de contact
├── css/
│   └── style.css       # Stiluri CSS
├── js/
│   ├── main.js         # JavaScript principal
│   ├── booking.js      # Sistem de programări
│   ├── courses.js      # Sistem de înscrieri cursuri
│   └── contact.js      # Formular de contact
├── static/
│   └── img/            # Imagini
└── netlify.toml        # Configurare Netlify
```

## Funcționalități

### 1. Pagina Principală (index.html)
- Hero section cu imagini atractive
- Secțiune About cu statistici
- Galerie de lucrări
- Servicii oferite

### 2. Programare Online (programare.html)
- Formular de programare complet
- Calendar cu restricții pentru weekend
- Programările încep din ziua următoare
- Validare automată a datelor
- Salvare locală (localStorage)

### 3. Cursuri (cursuri.html)
- 5 cursuri disponibile
- Modal pentru înscriere
- Validare formular

### 4. Contact (contact.html)
- Date de contact
- Formular de contact
- Secțiune FAQ interactivă

## Cum să Rulezi Local

1. Deschide folderul în VS Code
2. Instalează extensia "Live Server"
3. Click dreapta pe `index.html` → "Open with Live Server"

SAU

```bash
# Cu Python
python -m http.server 8000

# Cu Node.js
npx serve
```

## Deployment pe Netlify

### Opțiunea 1: Drag & Drop
1. Mergi la [netlify.com](https://netlify.com)
2. Drag & drop folderul `DM` în zona de deploy

### Opțiunea 2: CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Opțiunea 3: GitHub
1. Push codul pe GitHub
2. Conectează repo-ul la Netlify
3. Deploy automat!

## Backend (Opțional - Pentru Producție)

Pentru funcționalitate completă cu email-uri și calendar, folosește:

### Netlify Functions
Creează fișierul `netlify/functions/booking.js`:

```javascript
exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    
    // Trimite email cu SendGrid / Mailgun
    // Adaugă în Google Calendar API
    
    return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
    };
};
```

### Variabile de Mediu (Netlify)
```
SENDGRID_API_KEY=your_key
GOOGLE_CALENDAR_ID=your_calendar_id
NOTIFICATION_EMAIL=nicolaebordei3@gmail.com
```

## Tehnologii Folosite

- HTML5, CSS3, JavaScript (Vanilla)
- Font Awesome pentru iconițe
- Google Fonts (Playfair Display, Poppins)
- Responsive Design (Mobile-first)

## Notă

Website-ul funcționează complet pe frontend. Pentru a activa:
- Email-uri automate
- Google Calendar integration
- Bază de date reală

Va fi nevoie de un backend (Netlify Functions, Firebase, sau alt serviciu).

## Autor

Creat pentru Daniela Mancos
