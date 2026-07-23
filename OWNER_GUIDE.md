# BJS Boutique Owner Guide

Use `catalog.json` for routine website updates. You should not need to edit `script.js` for normal text, price, product, or image changes.

For simple edits, open `owner.html` through Vercel or a local server. Make your changes, click `Save catalog.json`, then replace the old `catalog.json` file with the downloaded one.

## Business Details

Edit the `business` section for common details used across the website:

```json
"business": {
  "name": "BJS Boutique",
  "tagline": "Jewellery, Sarees, Kurties & Suits",
  "phone": "9599221424",
  "phoneHref": "+919599221424",
  "whatsappNumber": "919599221424",
  "instagramUrl": "https://www.instagram.com/bjsdwarka",
  "instagramHandle": "@bjsdwarka",
  "businessHours": "Please call or WhatsApp before visiting."
}
```

`phone` is what visitors see. `phoneHref` is what phones dial. `whatsappNumber` is used for all WhatsApp buttons.

## Homepage Text And Images

Edit the `homepage` section for the main homepage visuals:

```json
"homepage": {
  "hero": {
    "image": "assets/hero.jpg",
    "title": "BJS Boutique",
    "subtitle": "Elegant sarees, jewellery, kurties and suits."
  },
  "featuredCategories": {
    "sarees": "assets/sarees/KD001.jpg",
    "jewellery": "assets/jewellery/JW001.jpeg",
    "kurties": "assets/suits/ST010.jpeg",
    "suits": "assets/suits/ST002.jpeg"
  },
  "story": {
    "image": "assets/jewellery/JW002.jpeg",
    "title": "Elegance selected with care.",
    "text": "Your story text goes here."
  }
}
```

Edit the `copy.home` section for other homepage text such as section headings and button labels.

## Other Page Text

Use the `copy` section for visible page text:

- `copy.home`
- `copy.collections`
- `copy.gallery`
- `copy.about`
- `copy.contact`

Change the value on the right side only, then save and refresh the website.

## Products

Products live inside `categories`:

```json
"categories": {
  "sarees": [],
  "jewellery": [],
  "kurties": [],
  "suits": []
}
```

To add a product, place the image in the matching folder, then add one entry:

```json
{
  "code": "KD025",
  "name": "Silk Saree",
  "description": "Elegant festive saree with a refined border.",
  "image": "assets/sarees/KD025.jpg",
  "alt": "Silk saree KD025 from BJS Boutique",
  "mrp": 6500,
  "sellingPrice": 5200,
  "newArrival": true,
  "bestSeller": false,
  "outOfStock": false,
  "comingSoon": false,
  "visible": true,
  "displayOrder": 25
}
```

## Pricing Rules

- `sellingPrice`: main price shown on the card.
- `mrp`: old price shown with a line through it.
- If `mrp` is higher than `sellingPrice`, the site automatically shows a discount badge.
- If you do not want to show a price, remove both `mrp` and `sellingPrice`.
- You can add `priceText`, such as `"priceText": "Price on request"`.

## Product Status Rules

- `"visible": false` hides a product without deleting it.
- `"outOfStock": true` shows an out-of-stock badge and changes the button to Ask Availability.
- `"comingSoon": true` shows a coming-soon badge.
- `"newArrival": true` shows a new-arrival badge.
- `"bestSeller": true` shows a best-seller badge.
- `"featured": true` shows a featured badge.
- `displayOrder` controls product order. Lower numbers appear first.

## Image Rules

- Keep image paths exact, including capital letters and file extension.
- Use folders like `assets/sarees`, `assets/jewellery`, `assets/kurties`, and `assets/suits`.
- Example path: `"image": "assets/sarees/KD025.jpg"`.
- After adding a new image and updating `catalog.json`, refresh the website.

## Quick Safety Check

Before deploying, make sure:

- `catalog.json` has no extra commas.
- Every product image path matches a real file.
- The website opens through a local server or Vercel, not by double-clicking `index.html`.
