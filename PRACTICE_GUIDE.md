# Week 4: connect, change, explain

Use this guide with the JavaScript introduction, Malik's Babylon tutorial, and the shared Substack page guide. Work in your chosen pathway's website. Keep your existing Week 3 work.

## 1. Find the connections

Open `week4/3d.html`, `week4/css/styles.css`, and `week4/js/app.js` beside one another in VS Code.

- The HTML `<link>` loads the stylesheet. Its `href` is relative to the HTML file.
- `<canvas id="renderCanvas">` gives Babylon a place to draw.
- The first `<script>` loads the Babylon library; the second loads your scene code. Both are below the page content.
- `document.getElementById("renderCanvas")` finds the canvas by its matching ID.

Follow the links from your homepage to the 3D page and back. The starter's return link is `../index.html`: `..` means go up one folder. Use the path that matches your actual project.

## 2. Make the introduction your own

The JavaScript introduction demonstrates console output and changing page text. Find the two lines under `INTRO PRACTICE` near the bottom of `app.js`.

Replace the message inside `console.log("...")` with a short, accurate message about your scene. Replace the text assigned to `statusText.textContent` with a useful message the visitor can read. Keep quotation marks around text. Save and reload, then check both the webpage and browser console.

A company blog might say `"Sample display ready."` Only use that message if the page explains what the sample represents. Keep the description in the HTML accurate too.

## 3. Read a small part of the scene

```javascript
const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
sphere.position.y = 1;
```

`const sphere` names a reference to the created object. It prevents assigning a different object to that variable; it does not prevent changing the object's properties.

`CreateSphere(...)` calls a library function. The values inside the parentheses are its arguments. The options inside `{ ... }` set the diameter and segment count. `sphere.position.y` is the sphere's vertical position; `=` assigns its value. The scene gives these numbers meaning as scene units, not HTML pixels.

Other supplied code creates an engine, scene, camera, light, and ground. The engine draws the scene repeatedly; the camera supplies a view; the light makes surfaces visible. You do not need to rebuild the library.

## 4. Run one controlled experiment

Before changing code, write a prediction in `TestNotes.txt`. For example: “Changing `sphere.position.y` from 1 to 2 will raise the sphere above the ground.”

Change that one value, save, and reload. Describe the result you actually see. Restore it or keep it if it serves your page. You can instead experiment with diameter, ground size, or light intensity.

If a change fails, record the exact console error and undo the last edit. Check the file path, spelling, quotation marks, and brackets. Keep a working final scene. Extra objects and new controls are optional.

## 5. Apply it to your subject

Use your selected pathway's content to explain the view. A few primitive shapes can show a place, arrangement, scale, or idea; they do not need to resemble a finished film scene. Do not describe shapes as a physical simulation unless you have built and tested one.

Finish your pathway's content and sharing directions, then check all six shared requirements. P2 needs a separate comparison page as well as the 3D page. P4's article review is separate from the coding tutorial everyone uses.

## Core resources

- [JavaScript introduction, 12:02](https://www.youtube.com/watch?v=Ihy0QziLDf0): file connections, console, comments, and visible text.
- [Jump in with Javascript and 3D, 25:23](https://www.youtube.com/watch?v=Dmztl84RtLk): 2:23–8:43 files/engine; 8:46–15:45 run/change; 17:13–23:17 external CSS.
- [Shared Substack page guide](https://buildupworkshop.substack.com/p/how-to-create-a-simple-html-page): adapt the linked-page pattern. Keep this starter's separate files; do not paste a second scene-startup block.
