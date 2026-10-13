# AERIS ONE

A cinematic, fictional electric concept-car website made with **plain HTML, CSS, and JavaScript**. No framework, package installation, build pipeline, API key, or backend is needed.

## Open locally

Open `index.html` directly in a modern browser, or serve this folder:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`. Stop the server with Ctrl+C.

## Project map

```text
index.html                  Semantic content and accessible controls
styles.css                  Layout, responsive styles, CSS 3D perspective
script.js                   Scroll scene, menu, range model, specifications dialog
assets/
  hero.jpg                  Generated front three-quarter desert scene
  profile.jpg               Generated studio side profile
  rear.jpg                  Generated rear three-quarter desert scene
  interior.jpg              Generated cockpit scene
  favicon.svg               Small hand-coded brand mark
  aeris-one-concept.txt      Downloadable fictional specification brief
IMAGE-PROMPTS.md             Original image-generation prompts and provenance
.nojekyll                   Serve the static files without Jekyll processing
```

All asset paths are relative, so the site also works under a repository path such as `/aeris-one/`. Fonts are native system fonts. No external scripts, fonts, trackers, or image services are requested.

## Publish with GitHub Pages

After you create a repository and add, commit, and push these files:

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Choose your source branch (usually `main`) and **/ (root)**, then save.
4. Wait for deployment to complete; use the site URL shown in Pages settings.

Keep `index.html` at the root of that branch, alongside `styles.css`, `script.js`, and `assets/`. Filename casing matters on the deployed site. Repository access and plan must support GitHub Pages.

Reference: [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [creating a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

No Git initialization, commits, pushes, or deployment have been performed for you.

## A classroom walkthrough

1. **HTML is structure.** Change the headline in `index.html` and refresh.
2. **CSS is presentation.** Change `--lime` in `styles.css` and compare the result.
3. **JavaScript is behavior.** Adjust a driving mode's consumption in `script.js` and try the range slider.
4. **Files are the website.** Inspect the relative image and stylesheet links in the browser's Network panel.
5. **Git records changes.** Inspect a diff, commit, and push a small headline change.
6. **Pages publishes those files.** Watch the deployment, refresh the public URL, and compare local versus hosted versions.

## Interaction notes

- Scroll through the design section to transition between three generated exterior perspectives, with CSS 3D depth and rotation. The view buttons work independently of scrolling.
- This is a cinematic image-based perspective experience, not a full geometric 3D model or continuous 360° renderer.
- Select Eco, Tour, or Sport, and change battery charge to calculate illustrative range and MPGe.
- Explore opens a keyboard-accessible menu; Escape closes it. The specification dialog also supports Escape and restores focus through the browser's native dialog behavior.
- Operating-system reduced-motion preferences disable parallax and the long scroll scene; perspective buttons remain available.

## Fictional vehicle and environmental claims

AERIS ONE is an educational design study. The brand, car, and specifications are fictional. Images are AI-generated design illustrations and may vary in fine details between views. All performance, charging, and efficiency numbers are illustrative targets, not measured or certified results. Eco symbols indicate intentions, not third-party certifications.

The range lab uses a 92 kWh usable battery and consumption of 13.5, 16.8, and 21.3 kWh/100 km in Eco, Tour, and Sport respectively:

```text
range_km = 92 × (charge_percent / 100) ÷ consumption × 100
MPGe = 33.7 × 100 ÷ 1.609344 ÷ consumption
```

The hero's 680 km target rounds the full-charge Eco estimate of approximately 681 km. MPGe is a US gallon energy equivalent, not gasoline consumption. Zero tailpipe emissions does not mean zero lifecycle emissions.
