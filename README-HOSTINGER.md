# One Detroit — Signal Library Hackathon Build

## Upload
Upload the **contents** of this folder to the subdomain's `public_html`.

## OpenAI key
Edit `private/config.php` and set:

```php
'openai_api_key' => 'YOUR_KEY_HERE',
```

Do not put the key in JavaScript or GitHub.

## Demo flow
1. Open **City Intelligence**.
2. Use a **Quick demo combo**, **Surprise Me**, or pick signals manually.
3. Select 3–6 signals from different categories.
4. Optionally add one sentence of context.
5. Click **Analyze Opportunity**.
6. Confirm the result badge says **Live AI analysis**.
7. Click **Publish Public Version**.
8. The generated project appears at the top of the **Public Portal**.

## Notes
- Maximum selection is 8 signals to keep live demos focused.
- If the OpenAI API is unavailable, the site uses a demo fallback so the presentation never breaks.
- The generated project is stored in browser localStorage for the demo; no database is required.
