# One Detroit — Hostinger/PHP build

This package does **not** require Node.js on the server.

## Upload
1. Create a new subdomain in Hostinger, for example `onedetroit.yourdomain.com`.
2. Upload the **contents** of this folder into that subdomain's `public_html`.
3. Open the subdomain. The demo works immediately with a mock fallback engine.

## Enable live OpenAI analysis
1. In `private/`, copy `config.example.php` to `config.php`.
2. Edit `private/config.php` on the server and paste your OpenAI project API key in `openai_api_key`.
3. Do **not** commit `private/config.php` to GitHub.
4. The `/private/.htaccess` file blocks browser access to that folder on Apache/LiteSpeed.

The API call is server-side at `api/analyze.php`; the browser never receives the API key.

## Hackathon demo flow
1. Open City Intelligence.
2. Pick a preset or choose **Custom Opportunity**.
3. Edit/add/remove inputs live.
4. Edit delivery constraints such as budget, staffing, agencies, contractors, partners, funding and hotspot hints.
5. Click **Analyze Opportunity**.
6. One Detroit returns a new opportunity.
7. Click **Generate Public Version**.
8. The new project is saved in the browser and appears immediately in the Public Portal.

## Reset demo-generated projects
Use the `Reset demo` button in City Intelligence or clear the site's localStorage.
