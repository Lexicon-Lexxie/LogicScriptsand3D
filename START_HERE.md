# Week 4 teaching starter — local review

This is practice code to inspect and customize, not a completed submission.

Use [PRACTICE_GUIDE.md](PRACTICE_GUIDE.md) to connect the videos to your own code changes.

1. Preview by opening index.html. The supplied homepage is only a launcher.
2. Preserve a Git checkpoint of your Week 3 project.
3. Copy only the week4 folder beside your existing homepage. Do not replace existing files. If a week4 folder already exists, compare it first and keep your work.
4. Add `<a href="week4/3d.html">Open my 3D view</a>` to your existing homepage. This is a small HTML fragment, not a whole-file replacement.
5. Open week4/3d.html. Its return link expects your homepage to be ../index.html. Adjust the link if your homepage has another name or location.
6. Follow the lessons. The 3D script is week4/js/app.js; its styles are week4/css/styles.css. Change one value at a time and record actual results in week4/TestNotes.txt.
7. Create a Pathway Reviews folder for a short README linking to your chosen content and, when required by P2/P3/P4, a cropped screenshot of your own Discord post. Keep review writing on the website; do not duplicate it in a second essay.
8. Test the complete published folder, then submit as directed in Canvas.

The default sphere and ground are the teaching baseline. Explain what your own version represents. The code comments and supplied reset control are support, not extra assignment requirements. Complete the console-output and visible-text exercises with your own contextual messages.

Tutorial naming map:

- Bro Code: index.js and style.css.
- Malik: js/app.js and css/styles.css.
- Substack: JavaScript inside 3d.html.
- This starter: week4/3d.html, week4/js/app.js, week4/css/styles.css.

Choose one organization. Do not paste a second scene-startup block into this working file. Files may be in different folders when relative paths match.

The engine is bundled locally as vendor/babylon.js (9.26.0, Apache-2.0). Keep vendor/license.md and vendor/NOTICE.md with it. No install or remote script request is needed for this basic scene. Your public webpage still needs hosting to share a website link.

If 3D cannot run, retain your notes and ask for the supported lab route. A readable fallback helps recovery; it does not automatically satisfy the working-scene requirement.
